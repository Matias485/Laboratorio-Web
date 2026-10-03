"use client";

import { useState } from "react";
import Vista from "@/components/Vista";
import Codigo from "@/components/Codigo";

// Escribe en la pantalla del iframe y, sobre todo, engancha window.onerror:
// así los errores que normalmente solo verías en la consola aparecen acá.
const AYUDANTE = `<ol id="salida"></ol>
<script>
  function mostrar(texto, clase) {
    var li = document.createElement("li");
    li.textContent = texto;
    if (clase) li.className = clase;
    document.getElementById("salida").appendChild(li);
  }
  window.addEventListener("error", function (evento) {
    mostrar(evento.message, "error");
  });
</script>`;

const CASOS = [
  {
    id: "clasicos",
    etiqueta: "Dos <script> normales",
    html: `${AYUDANTE}
<script>
  // archivo-a.js
  var saludo = "hola desde A";
</script>
<script>
  // archivo-b.js — nunca importó nada y sin embargo lo ve
  mostrar('typeof saludo → "' + typeof saludo + '"');
  mostrar("window.saludo → " + window.saludo);
</script>`,
    fuente: `<script>
  // archivo-a.js
  var saludo = "hola desde A";
</script>

<script>
  // archivo-b.js — nunca importó nada y sin embargo lo ve
  mostrar('typeof saludo → "' + typeof saludo + '"');
  mostrar("window.saludo → " + window.saludo);
</script>`,
    explicacion:
      "Dos archivos sueltos comparten el mismo alcance global. B ve la variable de A sin pedirla, porque en realidad la variable quedó colgada de window. Cómodo hasta que dos archivos eligen el mismo nombre y uno pisa al otro.",
  },
  {
    id: "modulos",
    etiqueta: 'Los mismos dos, con type="module"',
    html: `${AYUDANTE}
<script type="module">
  // archivo-a.js
  var saludo = "hola desde A";
</script>
<script type="module">
  // archivo-b.js — mismo código que antes, otro resultado
  mostrar('typeof saludo → "' + typeof saludo + '"');
  mostrar("window.saludo → " + window.saludo);
</script>`,
    fuente: `<script type="module">
  // archivo-a.js
  var saludo = "hola desde A";
</script>

<script type="module">
  // archivo-b.js — mismo código que antes, otro resultado
  mostrar('typeof saludo → "' + typeof saludo + '"');
  mostrar("window.saludo → " + window.saludo);
</script>`,
    explicacion:
      "El código es idéntico salvo por type=\"module\", y ahora B no ve nada: cada módulo tiene su propio alcance y sus variables no van a parar a window. Si B quiere el saludo, A tiene que exportarlo y B importarlo. Eso es exactamente lo que se ganó con los módulos.",
  },
  {
    id: "importSuelto",
    etiqueta: "Un import en un <script> normal",
    html: `${AYUDANTE}
<script>
  import { suma } from "./matematica.js";
  mostrar("2 + 3 = " + suma(2, 3));
</script>
<script>
  mostrar("Este script de acá abajo sí se ejecutó.");
</script>`,
    fuente: `<script>
  import { suma } from "./matematica.js";
  mostrar("2 + 3 = " + suma(2, 3));
</script>

<script>
  mostrar("Este script de acá abajo sí se ejecutó.");
</script>`,
    explicacion:
      "Este es \"el mismo archivo .js que no anda\". El navegador ni siquiera llega a ejecutar la primera línea: falla al leerla, porque import solo es sintaxis válida adentro de un módulo. Se arregla agregando type=\"module\" en la etiqueta, no tocando el archivo.",
  },
];

const CSS = `#salida {
  margin: 0;
  padding: 10px 10px 10px 32px;
  background: #0f1b2b;
  color: #dbe6f3;
  border-radius: 6px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 12px;
  line-height: 1.9;
}
#salida .error { color: #ff8f9f; }
#salida:empty::after {
  content: "(no se escribió nada)";
  color: #64809f;
}`;

export default function ModulosDemo() {
  const [elegido, setElegido] = useState("clasicos");
  const [vuelta, setVuelta] = useState(0);
  const caso = CASOS.find((c) => c.id === elegido);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        {CASOS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={elegido === c.id ? "boton" : "boton boton-suave"}
            onClick={() => {
              setElegido(c.id);
              setVuelta((n) => n + 1);
            }}
          >
            {c.etiqueta}
          </button>
        ))}
      </div>

      <Vista key={`${elegido}-${vuelta}`} html={caso.html} css={CSS} />

      <p style={{ margin: "0 0 12px" }}>{caso.explicacion}</p>

      <Codigo archivo="lo que corre adentro del recuadro" codigo={caso.fuente} />
    </div>
  );
}
