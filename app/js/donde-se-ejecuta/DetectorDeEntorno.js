"use client";

import { useState, useSyncExternalStore } from "react";

// No hay nada a qué suscribirse: lo único que queremos saber es si ya estamos
// corriendo en el navegador. React usa la última función cuando renderiza en el
// servidor y la del medio cuando el componente ya vive en la página.
const sinSuscripcion = () => () => {};
const hayNavegador = () => true;
const noHayNavegador = () => false;

// Lo que vamos a buscar. El segundo campo dice de qué entorno es cada cosa,
// para que se entienda qué significa que esté o que falte.
const APIS = [
  ["window", "navegador", "El objeto global del navegador: la pestaña entera."],
  ["document", "navegador", "El árbol de la página. Todo el DOM cuelga de acá."],
  ["navigator", "navegador", "Datos del navegador y del dispositivo."],
  [
    "localStorage",
    "navegador",
    "Un cajón de texto que sobrevive al cierre de la pestaña.",
  ],
  ["alert", "navegador", "El cartelito bloqueante que nadie quiere ver."],
  ["fetch", "los dos", "Pedir cosas por la red. Node.js lo tiene desde la v18."],
  ["setTimeout", "los dos", "Programar algo para dentro de un rato."],
  [
    "process",
    "Node.js",
    "El proceso del sistema operativo: argumentos, variables de entorno.",
  ],
  ["require", "Node.js", "La forma de importar de CommonJS."],
  ["module", "Node.js", "Donde un archivo CommonJS deja lo que exporta."],
];

// Preguntamos por globalThis["window"] en vez de escribir window a secas a
// propósito: el empaquetador reemplaza algunos nombres sueltos cuando compila,
// y acá queremos medir la realidad del navegador, no lo que dejó el compilador.
function medir() {
  return {
    filas: APIS.map(([nombre, entorno, para]) => ({
      nombre,
      entorno,
      para,
      tipo: typeof globalThis[nombre],
    })),
    userAgent: navigator.userAgent,
    nucleos: navigator.hardwareConcurrency,
    idioma: navigator.language,
    enLinea: navigator.onLine,
    origen: window.location.origin,
    procesoFalso:
      typeof globalThis.process === "object" && globalThis.process !== null
        ? Object.keys(globalThis.process).join(", ")
        : null,
  };
}

const th = {
  textAlign: "left",
  fontSize: "0.74rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--texto-suave)",
  padding: "6px 10px",
  borderBottom: "2px solid var(--borde)",
};

const td = {
  padding: "6px 10px",
  borderBottom: "1px solid var(--borde)",
  verticalAlign: "top",
};

export default function DetectorDeEntorno() {
  // Ojo con esto: la medición NO se puede hacer en el primer render, porque ese
  // render ocurre en el servidor, donde navigator no existe. Este hook nos dice
  // en cuál de los dos lados estamos parados, y recién cuando la respuesta es
  // que sí hay navegador, medimos. De eso habla la sección "window is not
  // defined" más abajo.
  const enElNavegador = useSyncExternalStore(
    sinSuscripcion,
    hayNavegador,
    noHayNavegador,
  );
  const [vuelta, setVuelta] = useState(1);

  if (!enElNavegador) {
    return (
      <p className="tenue" style={{ margin: 0 }}>
        Midiendo tu entorno… (si esto se queda acá para siempre, es que el
        JavaScript de la página no llegó a ejecutarse).
      </p>
    );
  }

  const medicion = medir();

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setVuelta((n) => n + 1)}
        >
          Volver a medir
        </button>
        <span className="tenue">
          Medición nº {vuelta} en <code>{medicion.origen}</code>
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Se busca</th>
              <th style={th}>typeof acá</th>
              <th style={th}>Veredicto</th>
              <th style={th}>Qué es</th>
            </tr>
          </thead>
          <tbody>
            {medicion.filas.map((fila) => {
              const hay = fila.tipo !== "undefined";
              return (
                <tr key={fila.nombre}>
                  <td
                    style={{
                      ...td,
                      fontFamily: "var(--fuente-mono)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {fila.nombre}
                  </td>
                  <td
                    style={{
                      ...td,
                      fontFamily: "var(--fuente-mono)",
                      color: "var(--texto-suave)",
                    }}
                  >
                    &quot;{fila.tipo}&quot;
                  </td>
                  <td
                    style={{
                      ...td,
                      color: hay ? "var(--verde)" : "var(--rojo)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {hay ? "✓ disponible" : "✗ no existe"}
                  </td>
                  <td style={{ ...td, color: "var(--texto-suave)" }}>
                    {fila.para}{" "}
                    <span style={{ opacity: 0.75 }}>({fila.entorno})</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: 20 }}>Y lo que navigator sabe de vos</h3>
      <ol
        style={{
          margin: 0,
          paddingLeft: 24,
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.82rem",
          lineHeight: 1.9,
        }}
      >
        <li>navigator.hardwareConcurrency → {String(medicion.nucleos)}</li>
        <li>navigator.language → &quot;{medicion.idioma}&quot;</li>
        <li>navigator.onLine → {String(medicion.enLinea)}</li>
        <li style={{ wordBreak: "break-word" }}>
          navigator.userAgent → &quot;{medicion.userAgent}&quot;
        </li>
      </ol>

      {medicion.procesoFalso !== null && (
        <p className="tenue" style={{ marginTop: 14, marginBottom: 0 }}>
          Atención con <code>process</code>: acá figura como disponible, pero{" "}
          <strong>no estás en Node.js</strong>. Es un objeto de mentira que dejó
          el empaquetador para que funcionen las variables de entorno, y lo
          único que tiene adentro es{" "}
          <code>{medicion.procesoFalso || "(nada)"}</code>. El{" "}
          <code>process</code> de verdad tiene decenas de propiedades, entre
          ellas <code>process.version</code> y <code>process.cwd()</code>.
        </p>
      )}
    </div>
  );
}
