"use client";

import { useState } from "react";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";

// Este pedacito va siempre primero y solo sirve para poder escribir en la
// pantalla del iframe. Si el <ol> todavía no existe, guarda los mensajes y los
// vuelca cuando la página termina de armarse.
const AYUDANTE = `<script>
  var pendientes = [];
  function agregar(salida, texto) {
    var li = document.createElement("li");
    li.textContent = texto;
    salida.appendChild(li);
  }
  function mostrar(texto) {
    var salida = document.getElementById("salida");
    if (!salida) { pendientes.push(texto); return; }
    while (pendientes.length > 0) agregar(salida, pendientes.shift());
    agregar(salida, texto);
  }
  document.addEventListener("DOMContentLoaded", function () {
    var salida = document.getElementById("salida");
    while (salida && pendientes.length > 0) agregar(salida, pendientes.shift());
  });
</script>`;

const CONTENIDO = `<h4>Contenido de la página</h4>
<ul id="lista">
  <li>uno</li>
  <li>dos</li>
  <li>tres</li>
</ul>
<p class="rotulo">Lo que informó el script:</p>
<ol id="salida"></ol>`;

// Lo mismo en los tres casos: contar los <li> que hay en la página y mirar en
// qué estado estaba el documento en ese momento.
const MEDICION = `mostrar("document.querySelectorAll('#lista li').length → " +
    document.querySelectorAll("#lista li").length);
  mostrar('document.readyState era "' + document.readyState + '"');`;

const CASOS = [
  {
    id: "arriba",
    etiqueta: "Arriba del contenido (como en el <head>)",
    html: `${AYUDANTE}
<script>
  ${MEDICION}
</script>
${CONTENIDO}`,
    fuente: `<head>
  <script src="app.js"></script>
</head>
<body>
  <ul id="lista"> ... </ul>
</body>`,
    explicacion:
      "El script se ejecuta apenas el parser lo encuentra. En ese momento la lista todavía no fue leída, así que para el script no existe: encuentra 0.",
  },
  {
    id: "abajo",
    etiqueta: "Al final del <body>",
    html: `${AYUDANTE}
${CONTENIDO}
<script>
  ${MEDICION}
</script>`,
    fuente: `<body>
  <ul id="lista"> ... </ul>
  <script src="app.js"></script>
</body>`,
    explicacion:
      "Cuando el parser llega hasta acá abajo, el resto del documento ya está armado. El script encuentra los tres elementos.",
  },
  {
    id: "modulo",
    etiqueta: 'Arriba, pero con type="module"',
    html: `${AYUDANTE}
<script type="module">
  ${MEDICION}
</script>
${CONTENIDO}`,
    fuente: `<head>
  <script type="module" src="app.js"></script>
</head>
<body>
  <ul id="lista"> ... </ul>
</body>`,
    explicacion:
      'Está escrito arriba, igual que el primer caso, pero encuentra los tres. type="module" implica defer: el navegador lo deja para el final, cuando el documento ya está completo. Fijate que readyState cambió a "interactive".',
  },
];

const CSS = `h4 { margin: 0 0 6px; font-size: 14px; }
ul { margin: 0 0 14px; padding-left: 22px; font-size: 13px; }
.rotulo { margin: 0 0 4px; font-size: 12px; color: #55697f; }
#salida {
  margin: 0;
  padding: 10px 10px 10px 30px;
  background: #0f1b2b;
  color: #dbe6f3;
  border-radius: 6px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 12px;
  line-height: 1.8;
}
#salida:empty::after {
  content: "(el script no llegó a escribir nada)";
  color: #64809f;
}`;

export default function OrdenDeCargaDemo() {
  const [elegido, setElegido] = useState("arriba");
  const [vuelta, setVuelta] = useState(0);
  const caso = CASOS.find((c) => c.id === elegido);

  return (
    <div>
      <fieldset
        style={{
          border: "1px solid var(--borde)",
          borderRadius: "var(--radio)",
          padding: "10px 14px",
          margin: "0 0 14px",
        }}
      >
        <legend className="tenue" style={{ padding: "0 6px" }}>
          ¿Dónde ponemos el script?
        </legend>
        {CASOS.map((c) => (
          <div key={c.id}>
            <label className="fila" style={{ gap: 8, flexWrap: "nowrap" }}>
              <input
                type="radio"
                name="orden-de-carga"
                value={c.id}
                checked={elegido === c.id}
                onChange={() => {
                  setElegido(c.id);
                  setVuelta((n) => n + 1);
                }}
              />
              <span>{c.etiqueta}</span>
            </label>
          </div>
        ))}
      </fieldset>

      <Vista key={`${elegido}-${vuelta}`} html={caso.html} css={CSS} />

      <p style={{ margin: "0 0 12px" }}>{caso.explicacion}</p>

      <div className="fila" style={{ marginBottom: 12 }}>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setVuelta((n) => n + 1)}
        >
          Volver a cargar la página de arriba
        </button>
        <span className="tenue">
          Se rearma el documento entero y los scripts corren de nuevo.
        </span>
      </div>

      <Codigo archivo="así queda el documento" codigo={caso.fuente} />
    </div>
  );
}
