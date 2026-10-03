"use client";

import { useState } from "react";

// El ejemplo tal cual aparece en la diapositiva de la clase 6.
export default function ContadorMasTres() {
  const [numero, setNumero] = useState(0);

  function manejarMasTres() {
    // Tres llamadas seguidas. Parecería que suma tres... probalo.
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
      <p className="tenue">
        Apretá +3 unas cuantas veces y fijate de a cuánto sube el número.
      </p>
    </div>
  );
}
