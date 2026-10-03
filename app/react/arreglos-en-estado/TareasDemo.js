"use client";

import { useState } from "react";

const INICIALES = [
  { id: 1, texto: "Leer la clase 6", hecha: true },
  { id: 2, texto: "Practicar con map", hecha: false },
  { id: 3, texto: "Entregar el TP", hecha: false },
];

export default function TareasDemo() {
  const [tareas, setTareas] = useState(INICIALES);

  // map + spread: la combinación que más veces vas a escribir en tu vida.
  // map arma el arreglo nuevo; spread arma el objeto nuevo de la tarea tocada.
  function alternar(id) {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea,
      ),
    );
  }

  function marcarTodas() {
    setTareas(tareas.map((tarea) => ({ ...tarea, hecha: true })));
  }

  function reiniciar() {
    setTareas(INICIALES);
  }

  const completadas = tareas.filter((tarea) => tarea.hecha).length;

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px" }}>
        {tareas.map((tarea) => (
          <li key={tarea.id} style={{ padding: "4px 0" }}>
            <label className="fila" style={{ gap: 8 }}>
              <input
                type="checkbox"
                checked={tarea.hecha}
                onChange={() => alternar(tarea.id)}
              />
              <span
                style={{
                  textDecoration: tarea.hecha ? "line-through" : "none",
                  color: tarea.hecha ? "var(--texto-suave)" : "inherit",
                }}
              >
                {tarea.texto}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="fila">
        <button type="button" className="boton" onClick={marcarTodas}>
          Marcar todas
        </button>
        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar
        </button>
        <span className="tenue">
          {completadas} de {tareas.length} completadas
        </span>
      </div>

      <p className="tenue" style={{ marginTop: 14, marginBottom: 6 }}>
        El estado, en vivo:
      </p>
      <pre
        style={{
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          borderRadius: "var(--radio)",
          padding: 12,
          margin: 0,
          overflowX: "auto",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.8rem",
        }}
      >
        {JSON.stringify(tareas)}
      </pre>
    </div>
  );
}
