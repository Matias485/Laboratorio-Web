"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Un servidor de mentira. Nada acá depende de internet: cada "pedido" es un
// setTimeout que tarda distinto según qué le pidas. Eso es lo que nos deja
// provocar la condición de carrera a voluntad.
// ---------------------------------------------------------------------------
const CATALOGO = {
  algebra: {
    nombre: "Álgebra",
    demora: 2500,
    temas: ["Matrices", "Determinantes", "Espacios vectoriales"],
  },
  bases: {
    nombre: "Bases de datos",
    demora: 400,
    temas: ["Modelo relacional", "SQL", "Normalización"],
  },
  redes: {
    nombre: "Redes",
    demora: 900,
    temas: ["Modelo OSI", "TCP/IP", "Ruteo"],
  },
  caida: {
    nombre: "Materia caída",
    demora: 700,
    temas: null,
  },
};

const CLAVES = Object.keys(CATALOGO);

function pedirTemas(clave) {
  const materia = CATALOGO[clave];
  return new Promise((resolver, rechazar) => {
    setTimeout(() => {
      if (materia.temas === null) {
        rechazar(new Error("El servidor contestó 500."));
      } else {
        resolver({ clave, nombre: materia.nombre, temas: materia.temas });
      }
    }, materia.demora);
  });
}

let proximaLinea = 0;

const CAJA_REGISTRO = {
  margin: 0,
  padding: "10px 12px",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  background: "var(--superficie-2)",
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.76rem",
  listStyle: "none",
  minHeight: 80,
};

const CLAVE_INICIAL = "bases";

export default function DatosDemo() {
  const [clave, setClave] = useState(CLAVE_INICIAL);
  const [protegido, setProtegido] = useState(true);
  const [estado, setEstado] = useState({
    fase: "cargando",
    pedido: CLAVE_INICIAL,
  });
  const [registro, setRegistro] = useState([]);

  useEffect(() => {
    // `ignorar` vive adentro de ESTA ejecución del efecto. Cada vez que el
    // efecto se vuelve a ejecutar hay una variable nueva, y la limpieza de la
    // ejecución anterior levanta la bandera de la suya.
    let ignorar = false;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Acá sí corresponde: arrancar el pedido ES la sincronización con el sistema externo, y "cargando" es el primer estado de ese pedido. No se puede calcular durante el render porque todavía no pasó nada.
    setEstado({ fase: "cargando", pedido: clave });

    function anotar(texto, descartado) {
      proximaLinea += 1;
      const linea = { id: proximaLinea, texto, descartado };
      setRegistro((anterior) => [...anterior, linea].slice(-6));
    }

    pedirTemas(clave).then(
      (datos) => {
        anotar(
          "llegó la respuesta de " + datos.nombre + (ignorar ? " → la tiro" : " → la muestro"),
          ignorar,
        );
        if (ignorar) return;
        setEstado({ fase: "ok", datos });
      },
      (error) => {
        anotar(
          "falló el pedido de " + CATALOGO[clave].nombre + (ignorar ? " → lo tiro" : " → lo muestro"),
          ignorar,
        );
        if (ignorar) return;
        setEstado({ fase: "error", mensaje: error.message });
      },
    );

    return () => {
      // Con la protección puesta, la limpieza marca esta ejecución como vieja.
      // Sin protección no hacemos nada, y la respuesta vieja va a pisar a la
      // nueva cuando llegue.
      if (protegido) ignorar = true;
    };
  }, [clave, protegido]);

  // El dato que estamos mostrando, ¿es de lo que pediste?
  const desfasado = estado.fase === "ok" && estado.datos.clave !== clave;

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 6px" }}>
        Materia (la demora de cada una está a propósito)
      </p>
      <div className="fila" style={{ marginBottom: 12 }}>
        {CLAVES.map((id) => (
          <button
            key={id}
            type="button"
            className={id === clave ? "boton" : "boton boton-suave"}
            onClick={() => setClave(id)}
          >
            {CATALOGO[id].nombre} · {CATALOGO[id].demora} ms
          </button>
        ))}
      </div>

      <label className="fila" style={{ gap: 6, marginBottom: 14 }}>
        <input
          type="checkbox"
          checked={protegido}
          onChange={(evento) => setProtegido(evento.target.checked)}
        />
        la limpieza levanta la bandera <code>ignorar</code>
      </label>

      <div
        className="tarjeta"
        style={{
          boxShadow: "none",
          marginBottom: 14,
          borderColor: desfasado ? "var(--rojo)" : "var(--borde)",
        }}
      >
        {estado.fase === "cargando" && (
          <div>
            <p style={{ margin: 0 }}>Cargando {CATALOGO[estado.pedido].nombre}…</p>
            <p className="tenue" style={{ margin: "4px 0 0" }}>
              el pedido está en camino
            </p>
          </div>
        )}

        {estado.fase === "error" && (
          <div>
            <p style={{ margin: 0, color: "var(--rojo)", fontWeight: 700 }}>
              No se pudo cargar
            </p>
            <p className="tenue" style={{ margin: "4px 0 10px" }}>
              {estado.mensaje}
            </p>
            <button
              type="button"
              className="boton boton-suave"
              onClick={() => setClave(CLAVE_INICIAL)}
            >
              Probar con otra materia
            </button>
          </div>
        )}

        {estado.fase === "ok" && (
          <div>
            <h3 style={{ margin: "0 0 6px" }}>{estado.datos.nombre}</h3>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.9rem" }}>
              {estado.datos.temas.map((tema) => (
                <li key={tema}>{tema}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {desfasado && (
        <p
          style={{
            margin: "0 0 14px",
            padding: "10px 12px",
            borderRadius: 8,
            background: "var(--rojo-fondo)",
            color: "var(--rojo)",
            fontWeight: 700,
          }}
        >
          ⚠ Pediste {CATALOGO[clave].nombre} y en pantalla hay{" "}
          {estado.datos.nombre}. Esto es la condición de carrera.
        </p>
      )}

      <p className="tenue" style={{ margin: "0 0 6px" }}>
        Qué fue pasando
      </p>
      <ul style={CAJA_REGISTRO}>
        {registro.length === 0 && (
          <li className="tenue">Todavía no llegó ninguna respuesta.</li>
        )}
        {registro.map((linea) => (
          <li
            key={linea.id}
            style={{ color: linea.descartado ? "var(--texto-suave)" : "var(--texto)" }}
          >
            {linea.descartado ? "· " : "→ "}
            {linea.texto}
          </li>
        ))}
      </ul>

      <ol className="tenue" style={{ margin: "14px 0 0", paddingLeft: 20 }}>
        <li>
          Destildá la protección. Tocá <strong>Álgebra</strong> (tarda 2500 ms) y,
          sin esperar, tocá <strong>Bases de datos</strong> (tarda 400 ms).
        </li>
        <li>
          Vas a ver Bases de datos… y dos segundos después Álgebra{" "}
          <strong>pisa la pantalla</strong> aunque no sea lo que pediste.
        </li>
        <li>
          Volvé a tildar la protección y repetí: la respuesta vieja llega igual,
          pero la limpieza ya la marcó como vieja y se descarta.
        </li>
      </ol>
    </div>
  );
}
