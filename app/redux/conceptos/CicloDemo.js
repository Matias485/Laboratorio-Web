"use client";

import { useEffect, useRef, useState } from "react";
import { crearStore } from "./redux-casero";
import { useEstado } from "./useEstado";

// Un store mínimo, solo para esta demo: un número y una acción.
function reducirClics(estado = { clics: 0 }, accion) {
  switch (accion.type) {
    case "ciclo/botonTocado":
      return { clics: estado.clics + 1 };
    default:
      return estado;
  }
}

const store = crearStore(reducirClics);

const ETAPAS = [
  {
    titulo: "La vista despacha",
    detalle: 'dispatch({ type: "ciclo/botonTocado" })',
    nota: "Un clic. La vista no cambia nada: solo cuenta lo que pasó.",
  },
  {
    titulo: "El reducer calcula",
    detalle: "reducir(estadoViejo, accion) → estadoNuevo",
    nota: "Función pura. Mira lo viejo y la acción, y devuelve un objeto nuevo.",
  },
  {
    titulo: "El store guarda y avisa",
    detalle: "estado = nuevo; avisar a los suscritos",
    nota: "Reemplaza el estado y llama a todos los que se anotaron.",
  },
  {
    titulo: "La vista se redibuja",
    detalle: "useSyncExternalStore lee el estado nuevo",
    nota: "React se entera por el aviso y vuelve a dibujar con el valor nuevo.",
  },
];

const CAJA_BASE = {
  flex: "1 1 160px",
  minWidth: 150,
  border: "1px solid var(--borde)",
  borderRadius: 10,
  background: "var(--superficie)",
  padding: "10px 12px",
  transition: "background 120ms, border-color 120ms",
};

function Etapa({ indice, activa }) {
  const etapa = ETAPAS[indice];

  return (
    <div
      style={{
        ...CAJA_BASE,
        borderColor: activa ? "var(--pista, var(--azul-600))" : "var(--borde)",
        background: activa ? "var(--azul-100)" : "var(--superficie)",
        boxShadow: activa ? "var(--sombra)" : "none",
      }}
    >
      <div className="fila" style={{ gap: 6, marginBottom: 2 }}>
        <span
          style={{
            fontFamily: "var(--fuente-mono)",
            fontSize: "0.7rem",
            fontWeight: 700,
            width: 18,
            height: 18,
            lineHeight: "18px",
            textAlign: "center",
            borderRadius: 999,
            color: activa ? "#fff" : "var(--texto-suave)",
            background: activa
              ? "var(--pista, var(--azul-600))"
              : "var(--superficie-2)",
          }}
        >
          {indice + 1}
        </span>
        <strong style={{ fontSize: "0.86rem" }}>{etapa.titulo}</strong>
      </div>
      <code
        style={{
          display: "block",
          fontSize: "0.68rem",
          wordBreak: "break-word",
          marginBottom: 4,
        }}
      >
        {etapa.detalle}
      </code>
      <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--texto-suave)" }}>
        {etapa.nota}
      </p>
    </div>
  );
}

export default function CicloDemo() {
  const estado = useEstado(store);
  const [etapa, setEtapa] = useState(-1);
  const temporizadores = useRef([]);

  // Si el alumno se va de la página en el medio de la animación, cancelamos
  // los temporizadores que quedaron pendientes.
  useEffect(() => {
    const pendientes = temporizadores.current;
    return () => {
      for (const id of pendientes) clearTimeout(id);
    };
  }, []);

  function programar(fn, ms) {
    temporizadores.current.push(setTimeout(fn, ms));
  }

  function arrancar() {
    if (etapa !== -1) return;
    temporizadores.current = [];
    setEtapa(0);
    programar(() => setEtapa(1), 550);
    programar(() => setEtapa(2), 1100);
    programar(() => {
      // Acá pasa de verdad: recién ahora el store tiene el número nuevo.
      store.dispatch({ type: "ciclo/botonTocado" });
      setEtapa(3);
    }, 1650);
    programar(() => setEtapa(-1), 2500);
  }

  const corriendo = etapa !== -1;

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={arrancar}
          disabled={corriendo}
        >
          {corriendo ? "Dando la vuelta…" : "Despachar una acción"}
        </button>
        <span className="tenue">
          store.getState().clics ={" "}
          <strong style={{ color: "var(--pista, var(--azul-700))" }}>
            {estado.clics}
          </strong>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        {ETAPAS.map((etapaDelCiclo, indice) => (
          <Etapa
            key={etapaDelCiclo.titulo}
            indice={indice}
            activa={indice === etapa}
          />
        ))}
      </div>

      <p
        style={{
          margin: "8px 0 0",
          textAlign: "center",
          fontSize: "0.78rem",
          color: "var(--texto-suave)",
        }}
      >
        ↺ y el ciclo vuelve a empezar, siempre en este orden y nunca al revés
      </p>

      <p className="tenue" style={{ margin: "12px 0 0" }}>
        Las cuatro etapas pasan en menos de un milisegundo: acá las separamos
        para que se vean. El número de arriba cambia en la etapa 3, que es
        cuando el store ya guardó el estado nuevo.
      </p>
    </div>
  );
}
