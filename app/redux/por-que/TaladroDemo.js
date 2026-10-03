"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// El árbol de la demo. Cinco niveles: el primero es el dueño del dato, el
// último es el único que lo usa, y los tres del medio están ahí nada más que
// para pasarlo de la mano de arriba a la de abajo.
// ---------------------------------------------------------------------------
const NIVELES = [
  { nombre: "App", papel: "dueno", nota: "acá vive el useState" },
  { nombre: "Tablero", papel: "pasamanos", nota: "yo no la uso · solo la paso" },
  {
    nombre: "BarraLateral",
    papel: "pasamanos",
    nota: "yo no la uso · solo la paso",
  },
  {
    nombre: "MenuUsuario",
    papel: "pasamanos",
    nota: "yo no la uso · solo la paso",
  },
  { nombre: "Avatar", papel: "consumidor", nota: "acá por fin se usa" },
];

const USUARIOS = ["Ana", "Beto", "Carla"];

const COLOR = {
  dueno: "var(--azul-600)",
  pasamanos: "var(--ambar)",
  consumidor: "var(--verde)",
};

const FONDO = {
  dueno: "var(--azul-100)",
  pasamanos: "var(--ambar-fondo)",
  consumidor: "var(--verde-fondo)",
};

const MONO = { fontFamily: "var(--fuente-mono)", fontSize: "0.8rem" };

// ---------------------------------------------------------------------------
// Una caja por nivel, dibujada adentro de la anterior. Se llama a sí misma:
// es el mismo truco de la recursión, pero con JSX.
//
//   llegada = cuántos niveles ya recibieron la prop (0 a 5).
// ---------------------------------------------------------------------------
function Caja({ indice, usuario, llegada }) {
  const nivel = NIVELES[indice];
  const tiene = indice < llegada;
  const recien = indice === llegada - 1;
  const ultimo = indice === NIVELES.length - 1;

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: tiene ? COLOR[nivel.papel] : "var(--borde)",
        borderRadius: 10,
        background: tiene ? FONDO[nivel.papel] : "var(--superficie)",
        boxShadow: recien ? "0 0 0 3px rgba(130, 80, 196, 0.22)" : "none",
        padding: "10px 12px",
        transition: "border-color .2s, background .2s, box-shadow .2s",
      }}
    >
      <div
        className="fila"
        style={{ justifyContent: "space-between", gap: 8, rowGap: 4 }}
      >
        <strong style={MONO}>{"<" + nivel.nombre + " />"}</strong>
        <span
          style={{
            ...MONO,
            fontSize: "0.74rem",
            padding: "2px 8px",
            borderRadius: 999,
            border: "1px solid var(--borde)",
            background: "var(--superficie)",
            color: tiene ? COLOR[nivel.papel] : "var(--texto-suave)",
            opacity: tiene ? 1 : 0.4,
          }}
        >
          {tiene ? 'usuario="' + usuario + '"' : "todavía nada"}
        </span>
      </div>

      <p
        style={{
          margin: "2px 0 0",
          fontSize: "0.76rem",
          color: tiene ? COLOR[nivel.papel] : "var(--texto-suave)",
          fontWeight: tiene ? 600 : 400,
        }}
      >
        {nivel.nota}
      </p>

      {!ultimo && (
        <div style={{ marginTop: 10 }}>
          <p
            style={{
              ...MONO,
              fontSize: "0.74rem",
              margin: "0 0 4px",
              color: tiene ? COLOR.pasamanos : "var(--texto-suave)",
              opacity: tiene ? 1 : 0.35,
            }}
          >
            ↓ usuario={"{usuario}"}
          </p>
          <Caja indice={indice + 1} usuario={usuario} llegada={llegada} />
        </div>
      )}
    </div>
  );
}

export default function TaladroDemo() {
  const [usuario, setUsuario] = useState(USUARIOS[0]);
  // Arranca con el dato ya entregado abajo del todo.
  const [llegada, setLlegada] = useState(NIVELES.length);

  // La prop baja un nivel cada 450 ms hasta llegar al fondo. El setLlegada no
  // está en el cuerpo del efecto sino adentro del temporizador, así que no es
  // una actualización sincrónica: es la forma correcta de animar esto.
  useEffect(() => {
    if (llegada >= NIVELES.length) return undefined;
    const id = setTimeout(() => setLlegada((n) => n + 1), 450);
    return () => clearTimeout(id);
  }, [llegada]);

  function elegir(nombre) {
    setUsuario(nombre);
    setLlegada(1); // App ya lo tiene; el viaje empieza de nuevo
  }

  const enViaje = llegada < NIVELES.length;

  return (
    <div>
      <div className="fila" style={{ marginBottom: 6 }}>
        <span className="tenue">Cambiá el usuario que vive en App:</span>
      </div>
      <div className="fila" style={{ marginBottom: 16 }}>
        {USUARIOS.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className={usuario === nombre ? "boton" : "boton boton-suave"}
            onClick={() => elegir(nombre)}
          >
            {nombre}
          </button>
        ))}
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setLlegada(1)}
          disabled={enViaje}
        >
          Volver a mandarlo
        </button>
      </div>

      <Caja indice={0} usuario={usuario} llegada={llegada} />

      <div
        className="fila"
        style={{
          marginTop: 14,
          justifyContent: "space-between",
          fontSize: "0.85rem",
        }}
      >
        <span>
          Componentes que escriben <code>usuario</code> en su firma:{" "}
          <strong style={{ color: "var(--rojo)" }}>5</strong>
        </span>
        <span>
          Componentes que realmente lo usan:{" "}
          <strong style={{ color: "var(--verde)" }}>1</strong>
        </span>
      </div>
    </div>
  );
}
