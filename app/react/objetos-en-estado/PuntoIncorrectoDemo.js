"use client";

import { useState } from "react";

/**
 * Versión INCORRECTA del ejemplo de la clase: el punto que sigue al mouse.
 * Movés el mouse por el recuadro y el punto se queda quieto, porque mutamos
 * el objeto del estado en vez de crear uno nuevo.
 */
export default function PuntoIncorrectoDemo() {
  // El punto arranca adentro del recuadro para que se vea desde el principio
  // que se queda quieto mientras movés el mouse.
  const [posicion, setPosicion] = useState({ x: 70, y: 85 });
  const [forzados, setForzados] = useState(0);

  function alMover(e) {
    // getBoundingClientRect() nos dice dónde está el recuadro en la pantalla,
    // así las coordenadas quedan relativas al recuadro y no a la ventana.
    const caja = e.currentTarget.getBoundingClientRect();

    // ✗ Mutamos el objeto que ya está guardado en el estado.
    //   El linter marca estas dos líneas; las dejamos así a propósito.
    /* eslint-disable react-hooks/immutability */
    posicion.x = e.clientX - caja.left;
    posicion.y = e.clientY - caja.top;
    /* eslint-enable react-hooks/immutability */
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
        {Math.round(posicion.y)} · re-renders forzados: {forzados}
      </p>

      <div className="fila">
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setForzados(forzados + 1)}
        >
          Forzar un re-render
        </button>
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

// Objetos de estilo: los sacamos del JSX para que se lea el mecanismo y no el CSS.
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
