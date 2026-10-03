"use client";

import { useState } from "react";

// --------------------------------------------------------------------------
// Las dos funciones de abajo son el demo. No hay nada simulado: cada una crea
// tres manejadores adentro de un for y los devuelve. Lo único que cambia entre
// ellas es la palabra con la que se declara `i`.
// --------------------------------------------------------------------------

function manejadoresConVar() {
  const lista = [];
  for (var i = 0; i < 3; i++) {
    // Hay UNA sola `i` para todo el for, porque var no conoce los bloques.
    lista.push(() => `Soy el botón ${i}`);
  }
  return lista;
}

function manejadoresConLet() {
  const lista = [];
  for (let i = 0; i < 3; i++) {
    // let crea una `i` nueva en cada vuelta. Cada función se lleva la suya.
    lista.push(() => `Soy el botón ${i}`);
  }
  return lista;
}

// Se crean una sola vez, al cargar el módulo: los tres manejadores de cada
// grupo ya quedaron atados a su variable.
const CON_VAR = manejadoresConVar();
const CON_LET = manejadoresConLet();

export default function BotonesVarLet() {
  const [registro, setRegistro] = useState([]);

  function ejecutar(grupo, manejador) {
    setRegistro((anterior) => [
      ...anterior,
      { n: anterior.length + 1, grupo, texto: manejador() },
    ]);
  }

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 6px" }}>
        Creados con <code>var</code> — tocá los tres:
      </p>
      <div className="fila" style={{ marginBottom: 14 }}>
        {CON_VAR.map((manejador, indice) => (
          <button
            key={indice}
            type="button"
            className="boton boton-suave"
            onClick={() => ejecutar("var", manejador)}
          >
            Botón {indice}
          </button>
        ))}
      </div>

      <p className="tenue" style={{ margin: "0 0 6px" }}>
        Creados con <code>let</code> — tocá los tres:
      </p>
      <div className="fila" style={{ marginBottom: 14 }}>
        {CON_LET.map((manejador, indice) => (
          <button
            key={indice}
            type="button"
            className="boton"
            onClick={() => ejecutar("let", manejador)}
          >
            Botón {indice}
          </button>
        ))}
      </div>

      <div
        style={{
          border: "1px solid var(--borde)",
          borderRadius: 8,
          background: "var(--superficie-2)",
          padding: 12,
          minHeight: 80,
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.8rem",
        }}
      >
        {registro.length === 0 ? (
          <p className="tenue" style={{ margin: 0 }}>
            Lo que devuelva cada manejador aparece acá.
          </p>
        ) : (
          <ol style={{ margin: 0, paddingLeft: 26 }}>
            {registro.map((entrada) => (
              <li key={entrada.n}>
                <span
                  style={{
                    color:
                      entrada.grupo === "var" ? "var(--rojo)" : "var(--verde)",
                  }}
                >
                  {entrada.grupo}
                </span>{" "}
                → {entrada.texto}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="fila" style={{ marginTop: 12 }}>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setRegistro([])}
          disabled={registro.length === 0}
        >
          Limpiar el panel
        </button>
      </div>
    </div>
  );
}
