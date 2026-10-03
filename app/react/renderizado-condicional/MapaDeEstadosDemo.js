"use client";

import { useState } from "react";

// Cuando los casos son muchos, en vez de encadenar ternarios guardamos un
// objeto que mapea cada estado a lo que hay que mostrar. Agregar un estado
// nuevo es agregar una línea acá arriba, sin tocar el JSX.

const CARTELES = {
  pendiente: { icono: "🕒", texto: "Estamos preparando tu pedido.", color: "var(--ambar)" },
  "en-camino": { icono: "🚚", texto: "Tu pedido está en camino.", color: "var(--azul-700)" },
  entregado: { icono: "📦", texto: "Entregado el martes a las 14:20.", color: "var(--verde)" },
  cancelado: { icono: "🚫", texto: "Pedido cancelado.", color: "var(--rojo)" },
};

// Plan B para cualquier estado que no esté en el objeto.
const DESCONOCIDO = {
  icono: "❔",
  texto: "Estado desconocido, escribinos.",
  color: "var(--texto-suave)",
};

const BOTONES = ["pendiente", "en-camino", "entregado", "cancelado", "devuelto"];

export default function MapaDeEstadosDemo() {
  const [estado, setEstado] = useState("pendiente");

  // "devuelto" no está en CARTELES: sin el ?? la página explotaría al leer
  // .texto de undefined.
  const cartel = CARTELES[estado] ?? DESCONOCIDO;

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        {BOTONES.map((id) => (
          <button
            key={id}
            type="button"
            className={estado === id ? "boton" : "boton boton-suave"}
            onClick={() => setEstado(id)}
          >
            {id}
          </button>
        ))}
      </div>

      <div
        className="fila"
        style={{
          border: "1px solid var(--borde)",
          borderRadius: 8,
          padding: 14,
          gap: 12,
        }}
      >
        <span style={{ fontSize: "1.6rem" }}>{cartel.icono}</span>
        <strong style={{ color: cartel.color }}>{cartel.texto}</strong>
      </div>

      <p className="tenue" style={{ marginBottom: 0 }}>
        <code>CARTELES[&quot;{estado}&quot;]</code>{" "}
        {CARTELES[estado]
          ? "existe en el objeto, así que el ?? ni se usa."
          : "es undefined: ahí entra el plan B del ??."}
      </p>
    </div>
  );
}
