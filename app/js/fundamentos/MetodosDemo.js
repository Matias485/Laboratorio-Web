"use client";

import { useState } from "react";
import { ALUMNOS } from "./datos";

// El texto de `expresion` es literalmente lo que corre en `correr`.
const METODOS = [
  {
    id: "map",
    devuelve: "un arreglo NUEVO, siempre del mismo largo",
    expresion: "ALUMNOS.map((a) => a.nombre)",
    correr: () => ALUMNOS.map((a) => a.nombre),
    detalle:
      "Transforma cada elemento. Entra un alumno, sale lo que vos devuelvas. Es el que usa React para dibujar listas.",
  },
  {
    id: "filter",
    devuelve: "un arreglo nuevo, más corto o igual",
    expresion: "ALUMNOS.filter((a) => a.nota >= corte)",
    correr: (corte) => ALUMNOS.filter((a) => a.nota >= corte),
    detalle:
      "Se queda con los que dan true. Si ninguno cumple devuelve [], nunca undefined.",
  },
  {
    id: "find",
    devuelve: "UN elemento, o undefined",
    expresion: "ALUMNOS.find((a) => a.nota >= corte)",
    correr: (corte) => ALUMNOS.find((a) => a.nota >= corte),
    detalle:
      "El primero que cumple, y se frena ahí. Si no hay ninguno devuelve undefined: acordate de contemplarlo.",
  },
  {
    id: "reduce",
    devuelve: "UN solo valor, del tipo que vos quieras",
    expresion: "ALUMNOS.reduce((total, a) => total + a.nota, 0)",
    correr: () => ALUMNOS.reduce((total, a) => total + a.nota, 0),
    detalle:
      "Arranca con el 0 del final y va acumulando: en cada vuelta, lo que devolvés es el total de la vuelta siguiente.",
  },
];

export default function MetodosDemo() {
  const [corte, setCorte] = useState(6);
  const [metodo, setMetodo] = useState(METODOS[0]);

  const resultado = metodo.correr(corte);
  const tipo = Array.isArray(resultado)
    ? `arreglo de ${resultado.length}`
    : typeof resultado;

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <label htmlFor="metodos-corte">
          Valor de <code>corte</code> (nota mínima)
        </label>
        <input
          id="metodos-corte"
          className="entrada"
          type="number"
          min="1"
          max="10"
          value={corte}
          onChange={(evento) => setCorte(Number(evento.target.value))}
          style={{ width: 80 }}
        />
      </div>

      <div className="fila" style={{ marginBottom: 14 }}>
        {METODOS.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={metodo.id === opcion.id ? "boton" : "boton boton-suave"}
            aria-pressed={metodo.id === opcion.id}
            style={{ fontFamily: "var(--fuente-mono)", fontSize: "0.8rem" }}
            onClick={() => setMetodo(opcion)}
          >
            {opcion.id}
          </button>
        ))}
      </div>

      <p
        style={{
          margin: "0 0 4px",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.82rem",
        }}
      >
        {metodo.expresion}
      </p>
      <p className="tenue" style={{ margin: "0 0 10px" }}>
        {metodo.detalle}
      </p>

      <div className="fila" style={{ marginBottom: 6 }}>
        <span className="tenue">
          devuelve <strong>{metodo.devuelve}</strong>
        </span>
        <span className="tenue">·</span>
        <span className="tenue">
          acá dio: <code>{tipo}</code>
        </span>
      </div>

      <pre
        style={{
          margin: 0,
          padding: 12,
          borderRadius: 8,
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.8rem",
          maxHeight: 280,
          overflow: "auto",
        }}
      >
        {resultado === undefined
          ? "undefined"
          : JSON.stringify(resultado, null, 2)}
      </pre>
    </div>
  );
}
