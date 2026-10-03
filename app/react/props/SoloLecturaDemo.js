"use client";

import { useState } from "react";

// El hijo recibe "valor" por props e intenta cambiarlo. Spoiler: no puede.
function Medidor({ valor }) {
  const [intentos, setIntentos] = useState(0);

  function intentarSubir() {
    // Contar los intentos sí lo puede hacer: ese estado es del hijo.
    // Escribirle encima a la prop "valor", no: esa prop es del padre y React
    // va a volver a dibujar este componente con lo que el padre diga.
    setIntentos(intentos + 1);
  }

  return (
    <div className="tarjeta" style={{ maxWidth: 380 }}>
      <p>El hijo recibe la prop valor:</p>
      <p className="marcador">{valor}</p>
      <button type="button" className="boton boton-suave" onClick={intentarSubir}>
        Intentar subirlo desde el hijo
      </button>
      {intentos > 0 && (
        <p className="tenue" style={{ marginTop: 10 }}>
          Apretaste {intentos} {intentos === 1 ? "vez" : "veces"}. El hijo podría
          calcular {valor + 1} en una variable local, pero la prop sigue
          valiendo {valor}: no es suya.
        </p>
      )}
    </div>
  );
}

export default function SoloLecturaDemo() {
  const [valor, setValor] = useState(0);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setValor(valor + 1)}
        >
          +1 desde el padre
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setValor(0)}
        >
          Reiniciar
        </button>
        <span className="tenue">El padre es el dueño del valor.</span>
      </div>

      <Medidor valor={valor} />
    </div>
  );
}
