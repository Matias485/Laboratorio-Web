"use client";

import { useEffect, useRef, useState } from "react";

// Los datos viven afuera del componente porque no cambian nunca. Si estuvieran
// adentro se crearía un arreglo nuevo en cada render, y eso ensucia las
// dependencias de cualquier efecto que los mire.
const LENGUAJES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
  "Ruby",
  "PHP",
];

function filtrar(texto) {
  const busqueda = texto.trim().toLowerCase();
  if (busqueda === "") return LENGUAJES;
  return LENGUAJES.filter((nombre) => nombre.toLowerCase().includes(busqueda));
}

const LISTA = {
  listStyle: "none",
  margin: "10px 0 0",
  padding: 0,
  fontSize: "0.88rem",
  minHeight: 96,
};

function Resultados({ nombres }) {
  if (nombres.length === 0) {
    return (
      <p className="tenue" style={{ margin: "10px 0 0", minHeight: 96 }}>
        Ningún lenguaje coincide.
      </p>
    );
  }
  return (
    <ul style={LISTA}>
      {nombres.map((nombre) => (
        <li key={nombre}>{nombre}</li>
      ))}
    </ul>
  );
}

function Contador({ cuenta, tono }) {
  return (
    <p className="tenue" style={{ margin: "12px 0 0" }}>
      renders de este componente:{" "}
      <strong style={{ color: tono, fontSize: "1.1rem" }}>{cuenta}</strong>
    </p>
  );
}

// ---------------------------------------------------------------------------
// ✗ La versión con estado espejo: los resultados se guardan en un useState y un
//   efecto se encarga de mantenerlos al día.
// ---------------------------------------------------------------------------
function ConEfecto() {
  const [texto, setTexto] = useState("");
  const [resultados, setResultados] = useState(LENGUAJES);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- A PROPÓSITO. Acá el linter tiene toda la razón: este efecto sobra y el error que marca es justamente el tema de la lección. Lo dejamos para que se pueda comparar con la versión de al lado.
    setResultados(filtrar(texto));
  }, [texto]);

  // Instrumento de la demo: contamos cuántas veces React dibujó esto. Escribir
  // en un ref adentro de un efecto es legal; leerlo mientras se dibuja no lo es
  // tanto, y por eso el linter pide permiso.
  const renders = useRef(0);
  useEffect(() => {
    renders.current += 1;
  });
  // eslint-disable-next-line react-hooks/refs -- solo para poder mostrar el número en pantalla
  const cuenta = renders.current;

  return (
    <div>
      <label htmlFor="ef-espejo" style={{ display: "block" }}>
        Buscar lenguaje
      </label>
      <input
        id="ef-espejo"
        className="entrada"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="escribí ja, ty, o…"
        style={{ width: "100%", marginTop: 4 }}
      />
      <Resultados nombres={resultados} />
      <Contador cuenta={cuenta} tono="var(--rojo)" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ✓ La versión que simplemente calcula. No hay efecto ni estado de más.
// ---------------------------------------------------------------------------
function SinEfecto() {
  const [texto, setTexto] = useState("");

  // Esto se recalcula en cada render, como cualquier variable común.
  const resultados = filtrar(texto);

  const renders = useRef(0);
  useEffect(() => {
    renders.current += 1;
  });
  // eslint-disable-next-line react-hooks/refs -- solo para poder mostrar el número en pantalla
  const cuenta = renders.current;

  return (
    <div>
      <label htmlFor="ef-calculado" style={{ display: "block" }}>
        Buscar lenguaje
      </label>
      <input
        id="ef-calculado"
        className="entrada"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="escribí ja, ty, o…"
        style={{ width: "100%", marginTop: 4 }}
      />
      <Resultados nombres={resultados} />
      <Contador cuenta={cuenta} tono="var(--verde)" />
    </div>
  );
}

export default function BuscadorEspejoDemo() {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        <div
          className="tarjeta"
          style={{ borderColor: "var(--rojo)", boxShadow: "none" }}
        >
          <h3 style={{ color: "var(--rojo)" }}>Con useEffect + estado espejo</h3>
          <ConEfecto />
        </div>

        <div
          className="tarjeta"
          style={{ borderColor: "var(--verde)", boxShadow: "none" }}
        >
          <h3 style={{ color: "var(--verde)" }}>Calculado durante el render</h3>
          <SinEfecto />
        </div>
      </div>

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Escribí una letra en cada casillero y compará cuánto subió cada contador.
        El de la izquierda sube de a dos: uno por la tecla y otro por el{" "}
        <code>setResultados</code> del efecto. El de la derecha sube de a uno.
      </p>
    </div>
  );
}
