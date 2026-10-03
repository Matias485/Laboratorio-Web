"use client";

import { useState } from "react";

// Las tres llamadas usan el valor de la instantánea: las tres piden lo mismo.
export default function MasTresDirecto() {
  const [numero, setNumero] = useState(0);

  function manejarMasTres() {
    setNumero(numero + 1);
    setNumero(numero + 1);
    setNumero(numero + 1);
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
      <p className="tenue">Sube de a 1.</p>
    </div>
  );
}
