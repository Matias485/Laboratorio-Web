"use client";

import { useState } from "react";
import PanelRegistro from "./PanelRegistro";

let proximoId = 1;
// Guardamos el último evento nativo para saber si una línea nueva pertenece
// al mismo click que la anterior. Así el panel muestra un click por vez.
let ultimoEvento = null;

export default function PropagacionDemo() {
  const [registro, setRegistro] = useState([]);
  const [cortar, setCortar] = useState(false);

  function anotar(e, texto) {
    const linea = { id: proximoId++, texto };
    if (e.nativeEvent === ultimoEvento) {
      // Sigue siendo el mismo click: el evento está subiendo.
      setRegistro((anteriores) => [...anteriores, linea]);
    } else {
      // Click nuevo: empezamos el registro de cero.
      ultimoEvento = e.nativeEvent;
      setRegistro([linea]);
    }
  }

  function manejarClickBoton(e) {
    anotar(e, "onClick del BOTÓN (lo más de adentro)");
    if (cortar) {
      e.stopPropagation();
      anotar(e, "e.stopPropagation() → el evento no sube más");
    }
  }

  function manejarClickMedia(e) {
    anotar(e, "onClick de la caja DEL MEDIO");
  }

  function manejarClickExterna(e) {
    anotar(e, "onClick de la caja EXTERNA");
  }

  return (
    <div>
      {/* El checkbox va AFUERA de las cajas: si estuviera adentro, tocarlo
          también dispararía los onClick y se mezclaría todo. */}
      <label className="fila" style={{ gap: 8, marginBottom: 14 }}>
        <input
          type="checkbox"
          checked={cortar}
          onChange={(e) => setCortar(e.target.checked)}
        />
        Cortar la propagación con <code>e.stopPropagation()</code> en el botón
      </label>

      <div
        onClick={manejarClickExterna}
        style={{
          border: "2px solid var(--azul-300)",
          borderRadius: 12,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <strong className="tenue">caja EXTERNA</strong>
        <div
          onClick={manejarClickMedia}
          style={{
            border: "2px solid var(--azul-500)",
            borderRadius: 10,
            padding: 14,
            marginTop: 8,
          }}
        >
          <strong className="tenue">caja DEL MEDIO</strong>
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              className="boton"
              onClick={manejarClickBoton}
            >
              Botón de adentro
            </button>
          </div>
        </div>
      </div>

      <PanelRegistro
        lineas={registro}
        vacio="Tocá el botón, o el borde de cada caja, y mirá el orden en que se disparan."
      />
    </div>
  );
}
