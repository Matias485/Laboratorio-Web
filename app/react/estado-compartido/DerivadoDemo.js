"use client";

import { useState } from "react";

const TAREAS_INICIALES = [
  { id: 1, texto: "Leer la clase 6", hecha: true },
  { id: 2, texto: "Hacer el TP de React", hecha: false },
  { id: 3, texto: "Repasar useState", hecha: false },
];

export default function DerivadoDemo() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES);

  // ✗ Esto es una COPIA de algo que ya está adentro de `tareas`.
  const [hechasGuardadas, setHechasGuardadas] = useState(1);

  // ✓ Esto se calcula en cada render. No hay nada que mantener al día.
  const hechasCalculadas = tareas.filter((tarea) => tarea.hecha).length;

  function alternar(id) {
    const nuevas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea,
    );
    setTareas(nuevas);
    // Acá nos acordamos de actualizar la copia...
    setHechasGuardadas(nuevas.filter((tarea) => tarea.hecha).length);
  }

  function borrar(id) {
    // ...y acá nos olvidamos. Borrá una tarea tildada y mirá los dos números.
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  function reiniciar() {
    setTareas(TAREAS_INICIALES);
    setHechasGuardadas(1);
  }

  const desincronizado = hechasGuardadas !== hechasCalculadas;

  return (
    <div>
      <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0 }}>
        {tareas.map((tarea) => (
          <li key={tarea.id} className="fila" style={{ marginBottom: 8 }}>
            <label className="fila" style={{ gap: 6 }}>
              <input
                type="checkbox"
                checked={tarea.hecha}
                onChange={() => alternar(tarea.id)}
              />
              {tarea.texto}
            </label>
            <button
              type="button"
              className="boton boton-suave"
              onClick={() => borrar(tarea.id)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>

      {tareas.length === 0 && (
        <p className="tenue" style={{ margin: "0 0 16px" }}>
          No queda ninguna tarea.
        </p>
      )}

      <div className="fila" style={{ alignItems: "stretch" }}>
        <div
          className="tarjeta"
          style={{ flex: "1 1 190px", borderColor: "var(--rojo)" }}
        >
          <p className="tenue" style={{ margin: 0 }}>
            hechasGuardadas (estado aparte)
          </p>
          <p className="marcador" style={{ color: "var(--rojo)" }}>
            {hechasGuardadas}
          </p>
        </div>
        <div
          className="tarjeta"
          style={{ flex: "1 1 190px", borderColor: "var(--verde)" }}
        >
          <p className="tenue" style={{ margin: 0 }}>
            hechasCalculadas (filter en el render)
          </p>
          <p className="marcador" style={{ color: "var(--verde)" }}>
            {hechasCalculadas}
          </p>
        </div>
      </div>

      <p
        style={{
          margin: "14px 0 0",
          color: desincronizado ? "var(--rojo)" : "var(--texto-suave)",
        }}
      >
        {desincronizado
          ? "Se desincronizaron: el número de la izquierda ya no significa nada."
          : "Por ahora coinciden. Borrá una tarea tildada y mirá qué pasa."}
      </p>

      <button
        type="button"
        className="boton"
        style={{ marginTop: 12 }}
        onClick={reiniciar}
      >
        Reiniciar
      </button>
    </div>
  );
}
