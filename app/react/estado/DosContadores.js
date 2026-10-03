"use client";

import { useState } from "react";

// Un componente Contador cualquiera. Lo importante: el useState está adentro
// de ESTE componente, así que cada vez que lo usás nace un estado nuevo.
function Contador({ mesa }) {
  const [tazas, setTazas] = useState(0);

  return (
    <div className="tarjeta" style={{ flex: "1 1 190px" }}>
      <h3>{mesa}</h3>
      <p className="marcador">{tazas}</p>
      <div className="fila">
        <button
          type="button"
          className="boton"
          onClick={() => setTazas(tazas + 1)}
        >
          Servir té
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setTazas(0)}
          disabled={tazas === 0}
        >
          Levantar
        </button>
      </div>
    </div>
  );
}

export default function DosContadores() {
  return (
    <div>
      <div className="fila" style={{ alignItems: "stretch" }}>
        <Contador mesa="Mesa 1" />
        <Contador mesa="Mesa 2" />
      </div>
      <p className="tenue" style={{ margin: "12px 0 0" }}>
        Es el mismo componente, escrito una sola vez y usado dos veces. Servir
        té en una mesa no toca la cuenta de la otra.
      </p>
    </div>
  );
}
