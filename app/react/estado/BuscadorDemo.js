"use client";

import { useState } from "react";

const MATERIAS = [
  { id: 1, nombre: "Análisis Matemático I", anio: 1, nota: 4 },
  { id: 2, nombre: "Algoritmos y Estructuras de Datos", anio: 1, nota: 8 },
  { id: 3, nombre: "Taller de Programación II", anio: 2, nota: 9 },
  { id: 4, nombre: "Base de Datos", anio: 2, nota: 3 },
  { id: 5, nombre: "Programación Orientada a Objetos", anio: 2, nota: 10 },
  { id: 6, nombre: "Sistemas Operativos", anio: 3, nota: 2 },
  { id: 7, nombre: "Redes de Computadoras", anio: 3, nota: 6 },
];

export default function BuscadorDemo() {
  // Tres estados independientes en el mismo componente: un string, un booleano
  // y un número. Cada uno con su propio useState y su propia función.
  const [texto, setTexto] = useState("");
  const [soloAprobadas, setSoloAprobadas] = useState(false);
  const [anio, setAnio] = useState(0); // 0 quiere decir "todos los años"

  const visibles = MATERIAS.filter((materia) => {
    const coincideTexto = materia.nombre
      .toLowerCase()
      .includes(texto.trim().toLowerCase());
    const coincideNota = !soloAprobadas || materia.nota >= 4;
    const coincideAnio = anio === 0 || materia.anio === anio;
    return coincideTexto && coincideNota && coincideAnio;
  });

  return (
    <div>
      <div className="fila" style={{ marginBottom: 10 }}>
        <label htmlFor="buscador-texto">Buscar</label>
        <input
          id="buscador-texto"
          className="entrada"
          type="text"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="probá escribir: datos"
        />
      </div>

      <label className="fila" style={{ marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={soloAprobadas}
          onChange={(evento) => setSoloAprobadas(evento.target.checked)}
        />
        Mostrar solo las aprobadas (nota 4 o más)
      </label>

      <div className="fila" style={{ marginBottom: 14 }}>
        <span className="tenue">Año:</span>
        {[0, 1, 2, 3].map((numero) => (
          <button
            key={numero}
            type="button"
            className={anio === numero ? "boton" : "boton boton-suave"}
            onClick={() => setAnio(numero)}
            aria-pressed={anio === numero}
          >
            {numero === 0 ? "Todos" : numero + "°"}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {visibles.map((materia) => (
          <li
            key={materia.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              padding: "7px 0",
              borderTop: "1px solid var(--borde)",
              marginBottom: 0,
            }}
          >
            <span>
              {materia.nombre}{" "}
              <span className="tenue">· {materia.anio}° año</span>
            </span>
            <strong
              style={{
                color: materia.nota >= 4 ? "var(--verde)" : "var(--rojo)",
              }}
            >
              {materia.nota}
            </strong>
          </li>
        ))}
      </ul>

      {visibles.length === 0 && (
        <p className="tenue" style={{ margin: "10px 0 0" }}>
          Ninguna materia cumple con los tres filtros a la vez.
        </p>
      )}

      <p className="tenue" style={{ margin: "12px 0 0" }}>
        Mostrando {visibles.length} de {MATERIAS.length} materias.
      </p>
    </div>
  );
}
