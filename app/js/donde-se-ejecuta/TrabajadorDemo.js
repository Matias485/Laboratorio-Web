"use client";

import { useRef, useState } from "react";

// Este es el código que va a correr adentro del worker. Es JavaScript común y
// corriente: el lenguaje es exactamente el mismo que el de afuera. Lo único
// que cambia es el entorno que lo rodea, y por eso document no está.
const CODIGO_DEL_WORKER = `
self.onmessage = function () {
  var informe = [];
  informe.push('typeof self         → "' + typeof self + '"');
  informe.push('typeof fetch        → "' + typeof fetch + '"');
  informe.push('typeof setTimeout   → "' + typeof setTimeout + '"');
  informe.push('typeof window       → "' + typeof window + '"');
  informe.push('typeof document     → "' + typeof document + '"');
  informe.push('typeof localStorage → "' + typeof localStorage + '"');

  try {
    document.title = "hola";
    informe.push("Pude tocar el document, cosa que no debería pasar.");
  } catch (error) {
    informe.push("Al hacer document.title = ... → " + error.name + ": " + error.message);
  }

  self.postMessage(informe);
};
`;

export default function TrabajadorDemo() {
  const [informe, setInforme] = useState(null);
  const [error, setError] = useState(null);
  const refUrl = useRef(null);

  function correr() {
    setError(null);
    setInforme(null);
    try {
      // Armamos un archivo .js al vuelo y se lo damos al worker.
      const archivo = new Blob([CODIGO_DEL_WORKER], {
        type: "text/javascript",
      });
      const url = URL.createObjectURL(archivo);
      refUrl.current = url;

      const trabajador = new Worker(url);
      trabajador.onmessage = (evento) => {
        setInforme(evento.data);
        trabajador.terminate();
        URL.revokeObjectURL(url);
      };
      trabajador.onerror = (evento) => {
        setError(evento.message || "El worker no pudo arrancar.");
        trabajador.terminate();
        URL.revokeObjectURL(url);
      };
      trabajador.postMessage("medí");
    } catch (fallo) {
      setError(fallo.message);
    }
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        <button type="button" className="boton" onClick={correr}>
          Correr ese código en un Web Worker
        </button>
        <span className="tenue">
          Mismo navegador, mismo motor, otro entorno.
        </span>
      </div>

      {error && (
        <p className="tenue" style={{ margin: 0, color: "var(--rojo)" }}>
          No se pudo crear el worker: {error}
        </p>
      )}

      {informe && (
        <ol
          style={{
            margin: 0,
            paddingLeft: 26,
            fontFamily: "var(--fuente-mono)",
            fontSize: "0.8rem",
            lineHeight: 1.9,
            wordBreak: "break-word",
          }}
        >
          {informe.map((linea, indice) => (
            <li key={linea + indice}>{linea}</li>
          ))}
        </ol>
      )}

      {!informe && !error && (
        <p className="tenue" style={{ margin: 0 }}>
          Tocá el botón: el worker se fija qué tiene a mano y nos contesta.
        </p>
      )}
    </div>
  );
}
