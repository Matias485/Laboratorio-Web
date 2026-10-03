"use client";

import { useState } from "react";
import { useEstado } from "./useEstado";
import {
  store,
  puntoSumado,
  puntoRestado,
  tareaAgregada,
  tareaAlternada,
  tareaBorrada,
  demoReiniciada,
} from "./store";

const PANEL = {
  border: "1px solid var(--borde)",
  borderRadius: 10,
  background: "var(--superficie-2)",
  padding: "10px 12px",
};

const TITULO_PANEL = {
  margin: "0 0 6px",
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--texto-suave)",
};

export default function TiendaDemo() {
  // Lo único que React necesita saber del store: su estado de ahora.
  const estado = useEstado(store);

  // El registro de acciones NO es parte del estado de la aplicación: es un
  // instrumento de esta demo, así que vive en un useState común.
  const [registro, setRegistro] = useState([]);
  const [texto, setTexto] = useState("");

  function despachar(accion) {
    store.dispatch(accion);
    setRegistro((previo) => [{ n: previo.length + 1, accion }, ...previo]);
  }

  function agregar(evento) {
    evento.preventDefault();
    const limpio = texto.trim();
    if (limpio === "") return;
    despachar(tareaAgregada(limpio));
    setTexto("");
  }

  function reiniciar() {
    store.dispatch(demoReiniciada());
    setRegistro([]);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
        gap: 14,
        alignItems: "start",
      }}
    >
      {/* ------------------------------------------------- la aplicación --- */}
      <div style={{ display: "grid", gap: 14 }}>
        <div style={PANEL}>
          <p style={TITULO_PANEL}>contador</p>
          <div className="fila">
            <p className="marcador" style={{ minWidth: 48 }}>
              {estado.contador}
            </p>
            <button
              type="button"
              className="boton boton-suave"
              onClick={() => despachar(puntoRestado())}
            >
              − 1
            </button>
            <button
              type="button"
              className="boton"
              onClick={() => despachar(puntoSumado())}
            >
              + 1
            </button>
          </div>
        </div>

        <div style={PANEL}>
          <p style={TITULO_PANEL}>tareas</p>

          <form onSubmit={agregar} className="fila" style={{ marginBottom: 10 }}>
            <label htmlFor="tarea-nueva" className="tenue">
              Nueva tarea
            </label>
            <input
              id="tarea-nueva"
              className="entrada"
              style={{ flex: "1 1 120px" }}
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
              placeholder="Lo que sea"
            />
            <button type="submit" className="boton">
              Agregar
            </button>
          </form>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {estado.tareas.map((tarea) => (
              <li
                key={tarea.id}
                className="fila"
                style={{
                  gap: 8,
                  padding: "5px 0",
                  borderTop: "1px solid var(--borde)",
                }}
              >
                <input
                  type="checkbox"
                  id={"tarea-" + tarea.id}
                  checked={tarea.hecha}
                  onChange={() => despachar(tareaAlternada(tarea.id))}
                />
                <label
                  htmlFor={"tarea-" + tarea.id}
                  style={{
                    flex: 1,
                    fontSize: "0.9rem",
                    textDecoration: tarea.hecha ? "line-through" : "none",
                    color: tarea.hecha ? "var(--texto-suave)" : "var(--texto)",
                  }}
                >
                  {tarea.texto}
                </label>
                <button
                  type="button"
                  className="boton boton-suave"
                  style={{ padding: "3px 9px", fontSize: "0.78rem" }}
                  onClick={() => despachar(tareaBorrada(tarea.id))}
                >
                  borrar
                </button>
              </li>
            ))}
            {estado.tareas.length === 0 && (
              <li className="tenue" style={{ padding: "6px 0" }}>
                No queda ninguna.
              </li>
            )}
          </ul>
        </div>

        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar el store
        </button>
      </div>

      {/* ------------------------------------------- el estado y el registro --- */}
      <div style={{ display: "grid", gap: 14 }}>
        <div style={PANEL}>
          <p style={TITULO_PANEL}>store.getState()</p>
          <pre
            style={{
              margin: 0,
              padding: "10px 12px",
              borderRadius: 8,
              background: "var(--codigo-fondo)",
              color: "var(--codigo-texto)",
              fontFamily: "var(--fuente-mono)",
              fontSize: "0.72rem",
              lineHeight: 1.5,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(estado, null, 2)}
          </pre>
        </div>

        <div style={PANEL}>
          <p style={TITULO_PANEL}>
            acciones despachadas · {registro.length}
          </p>

          {registro.length === 0 ? (
            <p className="tenue" style={{ margin: 0, fontSize: "0.82rem" }}>
              Todavía ninguna. Tocá algo de la izquierda.
            </p>
          ) : (
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                maxHeight: 230,
                overflowY: "auto",
              }}
            >
              {registro.map((entrada) => (
                <li
                  key={entrada.n}
                  style={{
                    padding: "5px 8px",
                    marginBottom: 4,
                    borderRadius: 6,
                    border: "1px solid var(--borde)",
                    background: "var(--superficie)",
                    fontFamily: "var(--fuente-mono)",
                    fontSize: "0.72rem",
                  }}
                >
                  <span style={{ color: "var(--texto-suave)" }}>
                    #{entrada.n}{" "}
                  </span>
                  <strong style={{ color: "var(--pista, var(--azul-700))" }}>
                    {entrada.accion.type}
                  </strong>
                  {entrada.accion.payload !== undefined && (
                    <span
                      style={{
                        display: "block",
                        color: "var(--texto-suave)",
                        wordBreak: "break-all",
                      }}
                    >
                      payload: {JSON.stringify(entrada.accion.payload)}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
