"use client";

import { useState } from "react";
import Codigo from "@/components/Codigo";

// Panel no sabe ni le importa qué hay adentro: lo que escribas entre
// <Panel> y </Panel> le llega en la prop children.
function Panel({ titulo, children }) {
  return (
    <div
      style={{
        border: "1px solid var(--borde)",
        borderRadius: 10,
        overflow: "hidden",
        background: "var(--superficie)",
      }}
    >
      <p
        style={{
          margin: 0,
          padding: "8px 14px",
          background: "var(--superficie-2)",
          borderBottom: "1px solid var(--borde)",
          fontWeight: 700,
        }}
      >
        {titulo}
      </p>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

const OPCIONES = [
  { id: "texto", etiqueta: "Un párrafo" },
  { id: "lista", etiqueta: "Una lista" },
  { id: "boton", etiqueta: "Un botón que cuenta" },
];

export default function PanelDemo() {
  const [cual, setCual] = useState("texto");
  const [titulo, setTitulo] = useState("Recordatorio");
  const [aplausos, setAplausos] = useState(0);

  // Esto es lo que va a ir adentro del Panel, o sea su children.
  let contenido;
  if (cual === "lista") {
    contenido = (
      <ul style={{ margin: 0 }}>
        <li>Leer la lección</li>
        <li>Tocar el demo</li>
        <li>Romper algo a propósito</li>
      </ul>
    );
  } else if (cual === "boton") {
    contenido = (
      <button
        type="button"
        className="boton"
        onClick={() => setAplausos(aplausos + 1)}
      >
        Aplausos: {aplausos}
      </button>
    );
  } else {
    contenido = (
      <p style={{ margin: 0 }}>
        Todo lo que escribís entre las dos etiquetas llega como children.
      </p>
    );
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 10 }}>
        <label htmlFor="titulo-del-panel">Título del panel</label>
        <input
          id="titulo-del-panel"
          className="entrada"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
        />
      </div>

      <div className="fila" style={{ marginBottom: 18 }}>
        <span className="tenue">Qué poner adentro:</span>
        {OPCIONES.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={cual === opcion.id ? "boton" : "boton boton-suave"}
            onClick={() => setCual(opcion.id)}
          >
            {opcion.etiqueta}
          </button>
        ))}
      </div>

      <Panel titulo={titulo}>{contenido}</Panel>

      <p className="tenue" style={{ marginBottom: 6, marginTop: 18 }}>
        El mismo Panel, con otro children:
      </p>
      <Codigo archivo="lo que se está renderizando" codigo={comoSeEscribe(cual, titulo)} />
    </div>
  );
}

// Devuelve, como texto, el JSX que corresponde a lo que se ve arriba.
function comoSeEscribe(cual, titulo) {
  const apertura = '<Panel titulo="' + titulo + '">';
  if (cual === "lista") {
    return [
      apertura,
      "  <ul>",
      "    <li>Leer la lección</li>",
      "    <li>Tocar el demo</li>",
      "    <li>Romper algo a propósito</li>",
      "  </ul>",
      "</Panel>",
    ].join("\n");
  }
  if (cual === "boton") {
    return [
      apertura,
      "  <button",
      "    type=\"button\"",
      "    className=\"boton\"",
      "    onClick={() => setAplausos(aplausos + 1)}",
      "  >",
      "    Aplausos: {aplausos}",
      "  </button>",
      "</Panel>",
    ].join("\n");
  }
  return [
    apertura,
    "  <p>Todo lo que escribís entre las dos etiquetas llega como children.</p>",
    "</Panel>",
  ].join("\n");
}
