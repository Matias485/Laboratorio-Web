"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementado,
  decrementado,
  pasoCambiado,
  reiniciado,
  tareaAgregada,
  tareaAlternada,
  tareaBorrada,
  registroLimpiado,
} from "./almacen";

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

const PRE = {
  margin: 0,
  padding: "10px 12px",
  borderRadius: 8,
  background: "var(--codigo-fondo)",
  color: "var(--codigo-texto)",
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.72rem",
  lineHeight: 1.5,
  overflowX: "auto",
};

export default function AplicacionDemo() {
  // Leer: useSelector. Cada componente pide solo lo suyo.
  const valor = useSelector((estado) => estado.contador.valor);
  const paso = useSelector((estado) => estado.contador.paso);
  const tareas = useSelector((estado) => estado.tareas);
  const registro = useSelector((estado) => estado.registro);

  // Escribir: useDispatch devuelve la función del store.
  const despachar = useDispatch();

  const [texto, setTexto] = useState("");

  function agregar(evento) {
    evento.preventDefault();
    const limpio = texto.trim();
    if (limpio === "") return;
    // tareaAgregada("Lo que sea") pasa por prepare, que le pone el id.
    despachar(tareaAgregada(limpio));
    setTexto("");
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
            <p className="marcador" style={{ minWidth: 56 }}>
              {valor}
            </p>
            <button
              type="button"
              className="boton boton-suave"
              onClick={() => despachar(decrementado())}
            >
              − {paso}
            </button>
            <button
              type="button"
              className="boton"
              onClick={() => despachar(incrementado())}
            >
              + {paso}
            </button>
          </div>

          <div className="fila" style={{ marginTop: 10 }}>
            <label htmlFor="paso-del-contador" className="tenue">
              Paso
            </label>
            <select
              id="paso-del-contador"
              className="entrada"
              value={paso}
              onChange={(evento) =>
                despachar(pasoCambiado(Number(evento.target.value)))
              }
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        <div style={PANEL}>
          <p style={TITULO_PANEL}>tareas</p>

          <form onSubmit={agregar} className="fila" style={{ marginBottom: 10 }}>
            <label htmlFor="tarea-rtk" className="tenue">
              Nueva
            </label>
            <input
              id="tarea-rtk"
              className="entrada"
              style={{ flex: "1 1 110px" }}
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
              placeholder="Lo que sea"
            />
            <button type="submit" className="boton">
              Agregar
            </button>
          </form>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {tareas.map((tarea) => (
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
                  id={"rtk-" + tarea.id}
                  checked={tarea.hecha}
                  onChange={() => despachar(tareaAlternada(tarea.id))}
                />
                <label
                  htmlFor={"rtk-" + tarea.id}
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
            {tareas.length === 0 && (
              <li className="tenue" style={{ padding: "6px 0" }}>
                No queda ninguna.
              </li>
            )}
          </ul>
        </div>

        <div className="fila">
          <button
            type="button"
            className="boton boton-suave"
            onClick={() => despachar(reiniciado())}
          >
            Reiniciar el contador
          </button>
          <button
            type="button"
            className="boton boton-suave"
            onClick={() => despachar(registroLimpiado())}
          >
            Limpiar el registro
          </button>
        </div>
      </div>

      {/* -------------------------------------- el estado y las acciones --- */}
      <div style={{ display: "grid", gap: 14 }}>
        <div style={PANEL}>
          <p style={TITULO_PANEL}>almacen.getState()</p>
          <pre style={PRE}>
            {JSON.stringify({ contador: { valor, paso }, tareas }, null, 2)}
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
                maxHeight: 240,
                overflowY: "auto",
              }}
            >
              {registro.map((entrada) => (
                <li
                  key={entrada.id}
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
                  <strong style={{ color: "var(--pista, var(--azul-700))" }}>
                    {entrada.type}
                  </strong>
                  {entrada.payload !== undefined && (
                    <span
                      style={{
                        display: "block",
                        color: "var(--texto-suave)",
                        wordBreak: "break-all",
                      }}
                    >
                      payload: {JSON.stringify(entrada.payload)}
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
