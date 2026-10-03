"use client";

import { useState } from "react";

// Cada llamada recibe el último valor de la cola, no el de la instantánea.
export default function MasTresActualizador() {
  const [numero, setNumero] = useState(0);

  function manejarMasTres() {
    setNumero((n) => n + 1);
    setNumero((n) => n + 1);
    setNumero((n) => n + 1);
  }

  return (
    <div>
      <p className="marcador">{numero}</p>
      <div className="fila">
        <button type="button" className="boton" onClick={manejarMasTres}>
          +3
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setNumero(0)}
        >
          Reiniciar
        </button>
      </div>
      <p className="tenue">Sube de a 3.</p>
    </div>
  );
}
