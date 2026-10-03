"use client";

import { useState } from "react";

// Los datos son un arreglo de objetos común y silvestre: acá no hay nada de
// React todavía. React aparece recién cuando los transformamos en JSX.
const TODOS = [
  { id: 1, nombre: "Ana", nota: 8 },
  { id: 2, nombre: "Bruno", nota: 6 },
  { id: 3, nombre: "Carla", nota: 10 },
  { id: 4, nombre: "Dante", nota: 4 },
  { id: 5, nombre: "Eli", nota: 7 },
  { id: 6, nombre: "Fede", nota: 9 },
];

export default function MapDemo() {
  const [cuantos, setCuantos] = useState(3);
  const alumnos = TODOS.slice(0, cuantos);

  // El corazón de todo: entra un arreglo de datos, sale un arreglo de <li>.
  const filas = alumnos.map((alumno) => (
    <li key={alumno.id}>
      {alumno.nombre} — nota {alumno.nota}
    </li>
  ));

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setCuantos((n) => n + 1)}
          disabled={cuantos === TODOS.length}
        >
          Agregar alumno
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setCuantos((n) => n - 1)}
          disabled={cuantos === 0}
        >
          Quitar el último
        </button>
        <span className="tenue">
          {alumnos.length} objetos → {filas.length} elementos en pantalla
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 18,
        }}
      >
        <div>
          <p className="tenue" style={{ margin: "0 0 6px" }}>
            El arreglo de datos
          </p>
          <div
            style={{
              fontFamily: "var(--fuente-mono)",
              fontSize: "0.78rem",
              lineHeight: 1.8,
            }}
          >
            {alumnos.map((alumno) => (
              <div key={alumno.id}>
                {`{ id: ${alumno.id}, nombre: "${alumno.nombre}", nota: ${alumno.nota} }`}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="tenue" style={{ margin: "0 0 6px" }}>
            Lo que ve el usuario
          </p>
          {filas.length === 0 ? (
            <p className="tenue">
              El arreglo quedó vacío: map devuelve un arreglo vacío y React no
              dibuja nada. No es un error.
            </p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 22 }}>{filas}</ul>
          )}
        </div>
      </div>
    </div>
  );
}
