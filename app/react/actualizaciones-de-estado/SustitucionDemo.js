"use client";

import { useState } from "react";

// Las tres líneas del manejador. Solo necesitamos tres ids estables para
// poder dibujarlas con map sin que React se queje de las keys.
const LINEAS = [{ id: "linea-1" }, { id: "linea-2" }, { id: "linea-3" }];

export default function SustitucionDemo() {
  const [numero, setNumero] = useState(0);

  function manejarMasTres() {
    setNumero(numero + 1);
    setNumero(numero + 1);
    setNumero(numero + 1);
  }

  return (
    <div>
      <p className="marcador">{numero}</p>
      <p>
        En <strong>este</strong> render, <code>numero</code> es una constante que
        vale <strong>{numero}</strong>. Reemplazá la variable por su valor y el
        manejador dice, literalmente, esto:
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: "10px 14px",
          margin: "0 0 12px",
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          borderRadius: "var(--radio)",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.88rem",
        }}
      >
        {LINEAS.map((linea) => (
          <li key={linea.id}>
            setNumero({numero} + 1); <span className="tenue">→ poné {numero + 1}</span>
          </li>
        ))}
      </ul>
      <p className="tenue">
        Las tres piden exactamente lo mismo. Por eso el resultado es{" "}
        {numero + 1} y no {numero + 3}.
      </p>
      <div className="fila">
        <button type="button" className="boton" onClick={manejarMasTres}>
          Ejecutar el manejador
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setNumero(0)}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
