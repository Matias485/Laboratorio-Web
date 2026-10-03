"use client";

import { useState } from "react";
import PanelRegistro from "./PanelRegistro";

let proximoId = 1;

export default function LlamarOPasarDemo() {
  const [registro, setRegistro] = useState([]);

  function anotar(texto) {
    const id = proximoId++;
    setRegistro((anteriores) => [...anteriores, { id, texto }].slice(-6));
  }

  function manejarClick() {
    anotar("onClick={manejarClick} → se disparó al hacer click ✓");
  }

  // Esta lista se crea de cero en cada render. Si al terminar de armar el JSX
  // tiene algo adentro, es porque alguien ejecutó la función de abajo mientras
  // React estaba dibujando, sin que nadie tocara nada.
  const avisosDelRender = [];

  // ✗ Este es el manejador "roto". Fijate abajo: lo llamamos con paréntesis.
  function avisarAlRenderizar() {
    avisosDelRender.push(registro.length);
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        {/* ✗ MAL: los paréntesis la ejecutan AHORA, durante el render. */}
        <button type="button" className="boton" onClick={avisarAlRenderizar()}>
          Botón roto
        </button>

        {/* ✓ BIEN: pasás la función y React la guarda para después. */}
        <button type="button" className="boton" onClick={manejarClick}>
          Botón correcto
        </button>

        {/* ✓ BIEN: la flecha es una función nueva que envuelve la llamada. */}
        <button
          type="button"
          className="boton"
          onClick={() => anotar("onClick={() => anotar(...)} → click ✓")}
        >
          Botón con flecha
        </button>

        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setRegistro([])}
        >
          Limpiar
        </button>
      </div>

      {avisosDelRender.length > 0 && (
        <p
          style={{
            margin: "0 0 12px",
            padding: "10px 12px",
            borderRadius: 8,
            background: "var(--rojo-fondo)",
            color: "var(--rojo)",
            fontSize: "0.88rem",
          }}
        >
          ⚠ El manejador del <strong>botón roto</strong> acaba de ejecutarse
          mientras React dibujaba esta pantalla (en el panel había{" "}
          {avisosDelRender[0]} mensajes). Nadie tocó ese botón. Hacé click en
          cualquier otro y mirá cómo el número cambia: se ejecuta en{" "}
          <strong>cada render</strong>.
        </p>
      )}

      <PanelRegistro
        lineas={registro}
        vacio="Todavía no hubo ningún click de verdad. Probá el botón roto: no hace nada."
      />
    </div>
  );
}
