"use client";

import { useState } from "react";

// Solución de referencia del proyecto final. Usa todo lo del laboratorio:
// componentes, props, children implícito, eventos, useState, arreglos y objetos
// en estado, listas con key, renderizado condicional y formularios controlados.

let siguienteId = 4;

const TAREAS_INICIALES = [
  { id: 1, texto: "Leer la lección de useState", completada: true },
  { id: 2, texto: "Hacer los desafíos de props", completada: false },
  { id: 3, texto: "Romper un demo a propósito", completada: false },
];

const FILTROS = [
  { id: "todas", etiqueta: "Todas" },
  { id: "pendientes", etiqueta: "Pendientes" },
  { id: "completadas", etiqueta: "Completadas" },
];

export default function ListaDeTareas() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas");

  // Estado derivado: no se guarda, se calcula en cada render a partir de tareas.
  const pendientes = tareas.filter((t) => !t.completada).length;
  const visibles = tareas.filter((tarea) => {
    if (filtro === "pendientes") return !tarea.completada;
    if (filtro === "completadas") return tarea.completada;
    return true;
  });

  function agregar(e) {
    e.preventDefault(); // sin esto el formulario recarga la página
    const limpio = texto.trim();
    if (limpio === "") return;
    setTareas([...tareas, { id: siguienteId++, texto: limpio, completada: false }]);
    setTexto("");
  }

  function alternar(id) {
    // map + spread: se reemplaza solo la tarea que cambió, sin mutar las demás
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
      ),
    );
  }

  function borrar(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  function limpiarCompletadas() {
    setTareas(tareas.filter((tarea) => !tarea.completada));
  }

  return (
    <div>
      <form onSubmit={agregar} className="fila" style={{ marginBottom: 16 }}>
        <label htmlFor="tarea-nueva" className="tenue">
          Nueva tarea
        </label>
        <input
          id="tarea-nueva"
          className="entrada"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="¿Qué tenés que hacer?"
          style={{ flex: 1 }}
        />
        <button type="submit" className="boton" disabled={texto.trim() === ""}>
          Agregar
        </button>
      </form>

      <div className="fila" style={{ marginBottom: 12 }}>
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={filtro === f.id ? "boton" : "boton boton-suave"}
            onClick={() => setFiltro(f.id)}
          >
            {f.etiqueta}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <p className="tenue">No hay tareas para mostrar con este filtro.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
          {visibles.map((tarea) => (
            <li
              key={tarea.id}
              className="fila"
              style={{
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid var(--borde)",
              }}
            >
              <label className="fila" style={{ gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => alternar(tarea.id)}
                />
                <span
                  style={{
                    textDecoration: tarea.completada ? "line-through" : "none",
                    opacity: tarea.completada ? 0.55 : 1,
                  }}
                >
                  {tarea.texto}
                </span>
              </label>
              <button
                type="button"
                className="boton boton-suave"
                onClick={() => borrar(tarea.id)}
                aria-label={"Borrar " + tarea.texto}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="fila" style={{ justifyContent: "space-between" }}>
        <span className="tenue">
          {pendientes === 0
            ? "No te queda nada pendiente."
            : pendientes === 1
              ? "Te queda 1 tarea pendiente."
              : "Te quedan " + pendientes + " tareas pendientes."}
        </span>
        {tareas.some((t) => t.completada) && (
          <button
            type="button"
            className="boton boton-suave"
            onClick={limpiarCompletadas}
          >
            Borrar completadas
          </button>
        )}
      </div>
    </div>
  );
}
