"use client";

import { useState } from "react";

const INICIAL = { nombre: "Camila", apellido: "Ferrari", edad: 30 };

/**
 * Muestra para qué sirve el spread: sin él, el objeto nuevo se queda
 * únicamente con la propiedad que escribiste y el resto desaparece.
 */
export default function SpreadDemo() {
  const [persona, setPersona] = useState(INICIAL);

  function cumplirSinSpread() {
    // ✗ El objeto nuevo tiene SOLO edad: nombre y apellido se pierden.
    setPersona({ edad: persona.edad + 1 });
  }

  function cumplirConSpread() {
    // ✓ Copiamos todo lo que ya había y encima pisamos la edad.
    setPersona({ ...persona, edad: persona.edad + 1 });
  }

  return (
    <>
      <p style={{ margin: "0 0 2px", fontWeight: 600 }}>
        {persona.nombre ?? "(se perdió el nombre)"}{" "}
        {persona.apellido ?? "(se perdió el apellido)"}
      </p>
      <p className="marcador">{persona.edad} años</p>

      <div className="fila" style={{ marginTop: 8 }}>
        <button type="button" className="boton" onClick={cumplirConSpread}>
          Cumplir años con spread
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={cumplirSinSpread}
        >
          Cumplir años sin spread
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setPersona(INICIAL)}
        >
          Reiniciar
        </button>
      </div>

      <pre style={estiloJson}>{JSON.stringify(persona, null, 2)}</pre>
    </>
  );
}

const estiloJson = {
  margin: "14px 0 0",
  padding: "10px 12px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.82rem",
  overflowX: "auto",
};
