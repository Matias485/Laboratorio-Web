"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

// ===========================================================================
// 1) EL CONTEXTO. Es un canal vacío. No guarda nada y no sabe nada: solo le
//    da un nombre al dato que va a viajar por adentro del árbol.
// ===========================================================================
const SesionContexto = createContext(null);

// ===========================================================================
// 2) EL PROVEEDOR. Acá vive el estado de verdad, con useState de toda la vida.
//    Lo único nuevo es que, en vez de bajar las props una por una, envolvemos
//    al subárbol y le entregamos el valor al canal.
// ===========================================================================
function ProveedorSesion({ children }) {
  const [usuario, setUsuario] = useState("Ana");
  const [tema, setTema] = useState("claro");

  // Ojo con esta línea: es un objeto nuevo en cada render del proveedor.
  const valor = {
    usuario,
    tema,
    cambiarUsuario: setUsuario,
    cambiarTema: setTema,
  };

  return (
    <SesionContexto.Provider value={valor}>{children}</SesionContexto.Provider>
  );
}

// ===========================================================================
// 3) EL LECTOR. Un hook propio de dos líneas que evita repetir el useContext
//    y avisa claro si alguien lo usa afuera del proveedor.
// ===========================================================================
function useSesion() {
  const valor = useContext(SesionContexto);
  if (valor === null) {
    throw new Error("useSesion() tiene que usarse adentro de <ProveedorSesion>");
  }
  return valor;
}

// ---------------------------------------------------------------------------
// Instrumento de la demo: cuántas veces React dibujó este componente. Va en un
// ref y se actualiza en un efecto, porque guardarlo en un useState provocaría
// otro render y nunca pararía.
// ---------------------------------------------------------------------------
function useRenders() {
  const renders = useRef(0);
  useEffect(() => {
    renders.current += 1;
  });
  // eslint-disable-next-line react-hooks/refs -- solo para mostrar el número en pantalla
  return renders.current + 1;
}

const USUARIOS = ["Ana", "Beto", "Carla"];

function Contador({ cuenta, consume }) {
  return (
    <span
      style={{
        fontFamily: "var(--fuente-mono)",
        fontSize: "0.72rem",
        padding: "2px 8px",
        borderRadius: 999,
        border: "1px solid",
        borderColor: consume ? "var(--rojo)" : "var(--borde)",
        color: consume ? "var(--rojo)" : "var(--texto-suave)",
        background: consume ? "var(--rojo-fondo)" : "var(--superficie)",
        whiteSpace: "nowrap",
      }}
    >
      renders: {cuenta}
    </span>
  );
}

const CAJA = {
  border: "1px solid var(--borde)",
  borderRadius: 10,
  padding: "10px 12px",
  background: "var(--superficie)",
};

const TITULO = { fontFamily: "var(--fuente-mono)", fontSize: "0.8rem" };

// Encabezado común: el nombre del componente y su contador de renders.
function Encabezado({ nombre, consume, detalle }) {
  return (
    <>
      <div className="fila" style={{ justifyContent: "space-between", gap: 8 }}>
        <strong style={TITULO}>{"<" + nombre + " />"}</strong>
        <Contador cuenta={detalle.renders} consume={consume} />
      </div>
      <p
        style={{
          margin: "2px 0 8px",
          fontSize: "0.74rem",
          color: consume ? "var(--rojo)" : "var(--texto-suave)",
        }}
      >
        {detalle.texto}
      </p>
    </>
  );
}

// --- Los dos componentes hondos, los únicos que leen el contexto -----------

function BotonTema() {
  // Solo le importa el tema.
  const { tema, cambiarTema } = useSesion();
  const renders = useRenders();

  return (
    <div style={CAJA}>
      <Encabezado
        nombre="BotonTema"
        consume
        detalle={{ renders, texto: "useSesion() → usa tema" }}
      />
      <button
        type="button"
        className="boton boton-suave"
        onClick={() => cambiarTema(tema === "claro" ? "oscuro" : "claro")}
      >
        {tema === "claro" ? "Pasar a oscuro" : "Pasar a claro"}
      </button>
    </div>
  );
}

function FichaUsuario() {
  // Solo le importa el usuario. El tema no lo mira ni de casualidad.
  const { usuario, tema } = useSesion();
  const renders = useRenders();
  const oscuro = tema === "oscuro";

  return (
    <div style={CAJA}>
      <Encabezado
        nombre="FichaUsuario"
        consume
        detalle={{ renders, texto: "useSesion() → usa usuario" }}
      />
      <p
        style={{
          margin: 0,
          padding: "8px 10px",
          borderRadius: 8,
          fontSize: "0.9rem",
          background: oscuro ? "#101c2b" : "var(--azul-100)",
          color: oscuro ? "#e6eef7" : "var(--texto)",
        }}
      >
        Sesión iniciada como <strong>{usuario}</strong>
      </p>
    </div>
  );
}

// --- Los del medio, que ya no reciben nada --------------------------------

function Panel() {
  const renders = useRenders();
  return (
    <div style={CAJA}>
      <Encabezado
        nombre="Panel"
        consume={false}
        detalle={{ renders, texto: "no toca el contexto" }}
      />
      <div style={{ display: "grid", gap: 10 }}>
        <BotonTema />
        <FichaUsuario />
      </div>
    </div>
  );
}

function Tablero() {
  const renders = useRenders();
  return (
    <div style={CAJA}>
      <Encabezado
        nombre="Tablero"
        consume={false}
        detalle={{ renders, texto: "no toca el contexto" }}
      />
      <Panel />
    </div>
  );
}

// --- Los controles, que sí leen el contexto para poder cambiarlo -----------

function Controles() {
  const { usuario, tema, cambiarUsuario } = useSesion();

  return (
    <div
      style={{
        border: "1px solid var(--borde)",
        borderRadius: 10,
        padding: "10px 12px",
        marginBottom: 14,
        background: "var(--superficie-2)",
      }}
    >
      <div className="fila">
        <span className="tenue">Cambiar usuario:</span>
        {USUARIOS.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className="boton boton-suave"
            style={{
              fontWeight: usuario === nombre ? 700 : 400,
              borderColor:
                usuario === nombre ? "var(--azul-600)" : "var(--borde)",
            }}
            onClick={() => cambiarUsuario(nombre)}
          >
            {nombre}
          </button>
        ))}
        <span className="tenue">
          tema actual: <strong>{tema}</strong>
        </span>
      </div>
    </div>
  );
}

export default function ContextoDemo() {
  // ContextoDemo no tiene estado propio: el estado está adentro del proveedor.
  // Por eso este componente no se vuelve a dibujar nunca, y los elementos
  // <Controles /> y <Tablero /> que crea acá son siempre los mismos.
  return (
    <div>
      <ProveedorSesion>
        <Controles />
        <Tablero />
      </ProveedorSesion>

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Tocá <strong>Pasar a oscuro</strong>, que solo cambia el tema, y mirá el
        contador de <code>&lt;FichaUsuario /&gt;</code>: también sube, aunque el
        tema no le interese. <code>&lt;Tablero /&gt;</code> y{" "}
        <code>&lt;Panel /&gt;</code>, que no llaman a <code>useSesion()</code>,
        se quedan quietos.
      </p>
      <p className="tenue" style={{ margin: "6px 0 0" }}>
        El primer salto va de 1 a 3 y después suben de a uno: en desarrollo
        React monta todo dos veces a propósito, el modo estricto que viste en
        Efectos. Lo que importa acá no es el número sino cuáles se mueven.
      </p>
    </div>
  );
}
