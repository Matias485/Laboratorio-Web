"use client";

import { useState } from "react";
import PanelRegistro from "./PanelRegistro";

let proximoId = 1;

export default function BotonBasicoDemo() {
  const [registro, setRegistro] = useState([]);

  // 1. La función manejadora se define ADENTRO del componente.
  //    En la diapositiva esta función hacía alert("¡Me tocaste!").
  function manejarClick() {
    const id = proximoId++;
    setRegistro((anteriores) =>
      [...anteriores, { id, texto: "¡Me tocaste!" }].slice(-6),
    );
  }

  // 2. Se la pasás al botón SIN paréntesis: pasás la función, no la llamás.
  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button type="button" className="boton" onClick={manejarClick}>
          Tocame
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setRegistro([])}
        >
          Limpiar
        </button>
      </div>
      <PanelRegistro lineas={registro} />
    </div>
  );
}
