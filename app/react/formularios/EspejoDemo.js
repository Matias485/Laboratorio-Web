"use client";

import { useRef, useState } from "react";

/**
 * El input controlado más chiquito posible: value sale del estado y onChange
 * lo vuelve a escribir. Abajo mostramos el estado y cuántas veces se renderizó.
 */
export default function EspejoDemo() {
  const [texto, setTexto] = useState("");

  // useRef es una caja que sobrevive a los renderizados y que, al cambiarla, NO
  // provoca uno nuevo. Acá la usamos solo para contar cuántas veces React
  // volvió a dibujar este componente.
  //
  // Tocar un ref mientras el componente se está renderizando está prohibido en
  // el código de verdad: el valor no participa del dibujo, así que React no se
  // entera si cambia. Por eso ESLint marca estas dos líneas y por eso acá lo
  // apagamos a mano: este demo es justo la excepción, queremos espiar el
  // renderizado desde adentro.
  const renderizados = useRef(0);
  // eslint-disable-next-line react-hooks/refs
  renderizados.current += 1;

  return (
    <div>
      <label htmlFor="espejo-texto" style={{ display: "block", marginBottom: 4 }}>
        Tu nombre
      </label>
      <input
        id="espejo-texto"
        className="entrada"
        style={{ width: "100%", maxWidth: 360 }}
        // 1. Lo que se ve en pantalla lo decide el estado, no el navegador.
        value={texto}
        // 2. Cada tecla avisa a React, que guarda el valor nuevo y redibuja.
        onChange={(e) => setTexto(e.target.value)}
      />

      <div className="fila" style={{ marginTop: 12 }}>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setTexto("")}
        >
          Vaciar
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setTexto(texto.toUpperCase())}
        >
          A MAYÚSCULAS
        </button>
      </div>

      <p
        style={{
          margin: "14px 0 0",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.85rem",
        }}
      >
        texto ={" "}
        <span style={{ color: "var(--azul-700)" }}>&quot;{texto}&quot;</span>
      </p>
      <p className="tenue" style={{ margin: "4px 0 0" }}>
        {texto.length} caracteres · renderizados:{" "}
        {/* eslint-disable-next-line react-hooks/refs */}
        <strong suppressHydrationWarning>{renderizados.current}</strong>
      </p>
    </div>
  );
}
