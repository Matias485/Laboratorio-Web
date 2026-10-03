"use client";

import { useState } from "react";

/**
 * Versión CORRECTA: en cada movimiento creamos un objeto nuevo y se lo
 * pasamos a setPosicion. El punto sigue al mouse.
 */
export default function PuntoCorrectoDemo() {
  // Mismo punto de partida que el demo incorrecto, para poder compararlos.
  const [posicion, setPosicion] = useState({ x: 70, y: 85 });

  function alMover(e) {
    const caja = e.currentTarget.getBoundingClientRect();

    // ✓ Objeto NUEVO. La referencia cambió, así que React vuelve a dibujar.
    setPosicion({
      x: e.clientX - caja.left,
      y: e.clientY - caja.top,
    });
  }

  return (
    <>
      <div style={estiloArea} onPointerMove={alMover}>
        <div
          style={{
            ...estiloPunto,
            transform: `translate(${posicion.x - 10}px, ${posicion.y - 10}px)`,
          }}
        />
      </div>

      <p className="tenue" style={{ margin: "10px 0" }}>
        Lo último que dibujó React: x = {Math.round(posicion.x)}, y ={" "}
        {Math.round(posicion.y)}
      </p>

      <div className="fila">
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setPosicion({ x: 70, y: 85 })}
        >
          Reiniciar
        </button>
      </div>
    </>
  );
}

const estiloArea = {
  position: "relative",
  height: 170,
  borderRadius: 10,
  border: "1px solid var(--borde)",
  background: "var(--superficie-2)",
  overflow: "hidden",
  touchAction: "none",
  cursor: "crosshair",
};

const estiloPunto = {
  position: "absolute",
  top: 0,
  left: 0,
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: "var(--rojo)",
  pointerEvents: "none",
};
