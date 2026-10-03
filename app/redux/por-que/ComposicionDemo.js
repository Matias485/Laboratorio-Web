"use client";

import { useState } from "react";

const MONO = { fontFamily: "var(--fuente-mono)", fontSize: "0.8rem" };

const COLOR = {
  dueno: "var(--azul-600)",
  pasamanos: "var(--ambar)",
  consumidor: "var(--verde)",
  neutro: "var(--texto-suave)",
};

const FONDO = {
  dueno: "var(--azul-100)",
  pasamanos: "var(--ambar-fondo)",
  consumidor: "var(--verde-fondo)",
  neutro: "var(--superficie)",
};

// ---------------------------------------------------------------------------
// El marco visual. No tiene nada que ver con la técnica: es solo la cajita que
// dibuja a cada componente con su firma a la vista.
// ---------------------------------------------------------------------------
function Caja({ nombre, firma, tono, nota, children }) {
  return (
    <div
      style={{
        border: "1px solid",
        borderColor: tono === "neutro" ? "var(--borde)" : COLOR[tono],
        background: FONDO[tono],
        borderRadius: 10,
        padding: "10px 12px",
      }}
    >
      <p style={{ ...MONO, margin: 0 }}>
        <span style={{ color: "var(--texto-suave)" }}>function </span>
        <strong>{nombre}</strong>({firma}) {"{"}
      </p>
      <p
        style={{
          margin: "2px 0 0",
          fontSize: "0.76rem",
          color: COLOR[tono],
          fontWeight: tono === "neutro" ? 400 : 600,
        }}
      >
        {nota}
      </p>
      {children && <div style={{ marginTop: 10 }}>{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// El único componente que de verdad necesita el dato. Es el mismo en las dos
// versiones: no se toca.
// ---------------------------------------------------------------------------
function Avatar({ usuario }) {
  return (
    <Caja
      nombre="Avatar"
      firma="{ usuario }"
      tono="consumidor"
      nota="lo usa de verdad"
    >
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        👤 Sesión iniciada como <strong>{usuario}</strong>
      </p>
    </Caja>
  );
}

// --- Versión 1: el taladro. Los tres del medio reciben `usuario`. ----------

function TableroConProps({ usuario }) {
  return (
    <Caja
      nombre="Tablero"
      firma="{ usuario }"
      tono="pasamanos"
      nota="recibe el usuario solo para pasarlo"
    >
      <BarraConProps usuario={usuario} />
    </Caja>
  );
}

function BarraConProps({ usuario }) {
  return (
    <Caja
      nombre="BarraLateral"
      firma="{ usuario }"
      tono="pasamanos"
      nota="recibe el usuario solo para pasarlo"
    >
      <MenuConProps usuario={usuario} />
    </Caja>
  );
}

function MenuConProps({ usuario }) {
  return (
    <Caja
      nombre="MenuUsuario"
      firma="{ usuario }"
      tono="pasamanos"
      nota="recibe el usuario solo para pasarlo"
    >
      <Avatar usuario={usuario} />
    </Caja>
  );
}

// --- Versión 2: composición. Los tres del medio reciben `children`. -------

function TableroConHuecos({ children }) {
  return (
    <Caja
      nombre="Tablero"
      firma="{ children }"
      tono="neutro"
      nota="ni se entera de que existe un usuario"
    >
      {children}
    </Caja>
  );
}

function BarraConHuecos({ children }) {
  return (
    <Caja
      nombre="BarraLateral"
      firma="{ children }"
      tono="neutro"
      nota="ni se entera de que existe un usuario"
    >
      {children}
    </Caja>
  );
}

function MenuConHuecos({ children }) {
  return (
    <Caja
      nombre="MenuUsuario"
      firma="{ children }"
      tono="neutro"
      nota="ni se entera de que existe un usuario"
    >
      {children}
    </Caja>
  );
}

const USUARIOS = ["Ana", "Beto", "Carla"];

export default function ComposicionDemo() {
  const [conProps, setConProps] = useState(true);
  const [usuario, setUsuario] = useState(USUARIOS[0]);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className={conProps ? "boton" : "boton boton-suave"}
          onClick={() => setConProps(true)}
        >
          Pasando props
        </button>
        <button
          type="button"
          className={conProps ? "boton boton-suave" : "boton"}
          onClick={() => setConProps(false)}
        >
          Pasando children
        </button>
      </div>

      <div className="fila" style={{ marginBottom: 14 }}>
        <span className="tenue">Usuario:</span>
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
            onClick={() => setUsuario(nombre)}
          >
            {nombre}
          </button>
        ))}
      </div>

      <Caja
        nombre="App"
        firma=""
        tono="dueno"
        nota={
          conProps
            ? "dueña del dato · se lo pasa a Tablero"
            : "dueña del dato · arma el árbol completo acá mismo"
        }
      >
        {conProps ? (
          // El dato arranca arriba y baja de la mano en mano.
          <TableroConProps usuario={usuario} />
        ) : (
          // El árbol se declara acá, así que <Avatar /> ya nace con su prop
          // puesta: los del medio solo lo transportan como children.
          <TableroConHuecos>
            <BarraConHuecos>
              <MenuConHuecos>
                <Avatar usuario={usuario} />
              </MenuConHuecos>
            </BarraConHuecos>
          </TableroConHuecos>
        )}
      </Caja>

      <p
        style={{
          margin: "14px 0 0",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        Componentes que nombran <code>usuario</code>:{" "}
        <strong
          style={{
            fontSize: "1.3rem",
            color: conProps ? "var(--rojo)" : "var(--verde)",
          }}
        >
          {conProps ? 5 : 2}
        </strong>{" "}
        <span className="tenue">
          {conProps
            ? "(App, Tablero, BarraLateral, MenuUsuario y Avatar)"
            : "(App y Avatar, los dos únicos a los que les importa)"}
        </span>
      </p>
    </div>
  );
}
