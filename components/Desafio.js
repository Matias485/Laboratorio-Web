"use client";

import { useState } from "react";

/**
 * Ejercicio con pista y solución escondidas detrás de dos botones.
 *
 * Props:
 *   titulo   (string)
 *   children el enunciado
 *   pista    (nodo JSX, opcional)
 *   solucion (nodo JSX, opcional) normalmente un <Codigo />
 */
export default function Desafio({ titulo, children, pista, solucion }) {
  const [verPista, setVerPista] = useState(false);
  const [verSolucion, setVerSolucion] = useState(false);

  return (
    <div className="desafio">
      <h3 className="desafio-titulo">🧪 {titulo}</h3>
      {children}

      <div className="desafio-acciones">
        {pista && (
          <button
            type="button"
            className="boton boton-suave"
            onClick={() => setVerPista(!verPista)}
          >
            {verPista ? "Ocultar pista" : "Ver pista"}
          </button>
        )}
        {solucion && (
          <button
            type="button"
            className="boton boton-suave"
            onClick={() => setVerSolucion(!verSolucion)}
          >
            {verSolucion ? "Ocultar solución" : "Ver solución"}
          </button>
        )}
      </div>

      {verPista && <div className="desafio-revelado">{pista}</div>}
      {verSolucion && <div className="desafio-revelado">{solucion}</div>}
    </div>
  );
}
