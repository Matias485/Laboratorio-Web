"use client";

import { useState } from "react";

/**
 * Mismo input, con y sin onChange. Sin onChange el campo queda congelado:
 * React vuelve a poner el valor del estado después de cada tecla.
 */
export default function CampoCongeladoDemo() {
  const [texto, setTexto] = useState("probá borrar esto");
  const [conectado, setConectado] = useState(true);

  return (
    <div>
      <label className="fila" style={{ gap: 8, marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={conectado}
          onChange={(e) => setConectado(e.target.checked)}
        />
        Pasarle <code>onChange</code> al input
      </label>

      <label htmlFor="congelado-campo" style={{ display: "block", marginBottom: 4 }}>
        Campo de prueba
      </label>
      <input
        id="congelado-campo"
        className="entrada"
        style={{ width: "100%", maxWidth: 360 }}
        value={texto}
        // Si no hay onChange, React no se entera de nada de lo que tipeás y en
        // el renderizado siguiente vuelve a poner el valor del estado.
        onChange={conectado ? (e) => setTexto(e.target.value) : undefined}
      />

      <p style={{ margin: "12px 0 0", fontSize: "0.9rem" }}>
        {conectado ? (
          <span style={{ color: "var(--verde)" }}>
            Anda: cada tecla actualiza el estado.
          </span>
        ) : (
          <span style={{ color: "var(--rojo)" }}>
            Congelado: tipeá todo lo que quieras, el campo no se mueve. Abrí la
            consola del navegador (F12) y mirá el aviso de React.
          </span>
        )}
      </p>
      <p className="tenue" style={{ margin: "4px 0 0" }}>
        texto = &quot;{texto}&quot;
      </p>
    </div>
  );
}
