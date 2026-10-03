"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// useAlmacenamientoLocal: un useState que sobrevive al recargar la página.
//
// La parte delicada es que en Next.js el primer HTML se arma EN EL SERVIDOR,
// donde no existe window ni localStorage. Por eso arrancamos siempre con el
// valor inicial y recién leemos lo guardado en un efecto, que solo corre en el
// navegador. Así el HTML del servidor y el primer render del cliente coinciden.
// ---------------------------------------------------------------------------
function useAlmacenamientoLocal(clave, inicial) {
  const [valor, setValor] = useState(inicial);
  const [listo, setListo] = useState(false);

  // 1) Al montar: leemos lo que haya guardado.
  //
  // El linter avisa cuando se llama a una función setEstado dentro de un efecto,
  // porque casi siempre significa que ese efecto sobra. Acá es una de las pocas
  // excepciones legítimas: localStorage es un sistema externo que solo existe en
  // el navegador, así que no podemos leerlo mientras se arma el HTML en el
  // servidor. Leerlo al montar es exactamente para lo que sirve useEffect.
  useEffect(() => {
    try {
      const crudo = window.localStorage.getItem(clave);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- ver el comentario de arriba
      if (crudo !== null) setValor(JSON.parse(crudo));
    } catch {
      // JSON corrupto o almacenamiento bloqueado: seguimos con el inicial.
    }
    setListo(true);
  }, [clave]);

  // 2) Cada vez que el valor cambia: lo escribimos.
  useEffect(() => {
    if (!listo) return; // no pisamos lo guardado antes de haberlo leído
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // Modo incógnito o cuota llena: la app tiene que seguir funcionando.
    }
  }, [clave, valor, listo]);

  return [valor, setValor, listo];
}

const estiloPanel = {
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.78rem",
  lineHeight: 1.8,
  margin: 0,
  padding: "12px 14px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const CLAVE_APUNTE = "lab.hooks-propios.apunte";
const CLAVE_COLOR = "lab.hooks-propios.color";

const COLORES = [
  { id: "azul", nombre: "Azul", valor: "#2f6fb5" },
  { id: "verde", nombre: "Verde", valor: "#0f7a52" },
  { id: "violeta", nombre: "Violeta", valor: "#8250c4" },
];

export default function AlmacenamientoDemo() {
  const [apunte, setApunte, listo] = useAlmacenamientoLocal(CLAVE_APUNTE, "");
  const [color, setColor] = useAlmacenamientoLocal(CLAVE_COLOR, "azul");

  const elegido = COLORES.find((c) => c.id === color) ?? COLORES[0];

  function borrarTodo() {
    window.localStorage.removeItem(CLAVE_APUNTE);
    window.localStorage.removeItem(CLAVE_COLOR);
    setApunte("");
    setColor("azul");
  }

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="hp-apunte" style={{ display: "block" }}>
          Tu apunte (se guarda solo mientras escribís)
        </label>
        <textarea
          id="hp-apunte"
          className="entrada"
          rows={3}
          value={apunte}
          onChange={(evento) => setApunte(evento.target.value)}
          placeholder="Escribí cualquier cosa y después recargá la página con F5."
          style={{ width: "100%", marginTop: 4, fontFamily: "inherit" }}
        />
      </div>

      <fieldset
        style={{
          border: "1px solid var(--borde)",
          borderRadius: 8,
          padding: "10px 14px 14px",
          marginBottom: 14,
        }}
      >
        <legend className="tenue">Color favorito</legend>
        <div className="fila">
          {COLORES.map((opcion) => (
            <label key={opcion.id} className="fila" style={{ gap: 6 }}>
              <input
                type="radio"
                name="hp-color"
                value={opcion.id}
                checked={color === opcion.id}
                onChange={() => setColor(opcion.id)}
              />
              {opcion.nombre}
            </label>
          ))}
          <span
            aria-hidden="true"
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: elegido.valor,
              border: "1px solid var(--borde)",
            }}
          />
        </div>
      </fieldset>

      <p className="tenue" style={{ margin: "0 0 6px" }}>
        Lo que hay guardado en localStorage ahora mismo
      </p>
      <pre style={estiloPanel}>
        {`"${CLAVE_APUNTE}" → ${JSON.stringify(apunte)}
"${CLAVE_COLOR}" → ${JSON.stringify(color)}
leído del navegador: ${listo ? "sí" : "todavía no"}`}
      </pre>

      <div className="fila" style={{ marginTop: 14 }}>
        <button type="button" className="boton boton-suave" onClick={borrarTodo}>
          Borrar lo guardado
        </button>
        <span className="tenue">
          Recargá la página (F5) y volvé a esta sección: el texto y el color
          siguen ahí.
        </span>
      </div>
    </div>
  );
}
