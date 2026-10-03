"use client";

import { useCallback, useState } from "react";

/**
 * Panel de registro compartido por los demos de esta lección.
 *
 * Como en una página no hay consola a la vista, cada demo escribe acá lo que
 * va pasando. Cada línea lleva su número de orden real de ejecución y, cuando
 * hace falta, cuántos milisegundos pasaron desde que arrancó la corrida.
 */

const COLORES = {
  sincronico: "var(--codigo-etiqueta)",
  microtarea: "var(--codigo-clave)",
  tarea: "var(--codigo-numero)",
  ok: "var(--codigo-cadena)",
  error: "var(--codigo-funcion)",
};

export default function Registro({
  lineas,
  vacio = "Todavía no corriste nada. Tocá un botón.",
  alto = 150,
}) {
  return (
    <div
      style={{
        background: "var(--codigo-fondo)",
        color: "var(--codigo-texto)",
        borderRadius: 8,
        padding: "10px 12px",
        fontFamily: "var(--fuente-mono)",
        fontSize: "0.8rem",
        lineHeight: 1.7,
        minHeight: alto,
        maxHeight: 320,
        overflowY: "auto",
      }}
    >
      {lineas.length === 0 ? (
        <p style={{ margin: 0, color: "var(--codigo-tenue)" }}>{vacio}</p>
      ) : (
        <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {lineas.map((linea) => (
            <li
              key={linea.id}
              style={{ display: "flex", gap: 10, alignItems: "baseline" }}
            >
              <span
                style={{
                  color: "var(--codigo-tenue)",
                  width: 20,
                  flexShrink: 0,
                  textAlign: "right",
                }}
              >
                {linea.orden}
              </span>
              <span style={{ color: COLORES[linea.tipo] ?? "var(--codigo-texto)" }}>
                {linea.texto}
              </span>
              {linea.ms != null && (
                <span
                  style={{
                    marginLeft: "auto",
                    paddingLeft: 10,
                    color: "var(--codigo-tenue)",
                    flexShrink: 0,
                  }}
                >
                  {linea.ms} ms
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/** Estado del registro: la lista, una función para anotar y otra para vaciar. */
export function useRegistro() {
  const [lineas, setLineas] = useState([]);

  const anotar = useCallback((texto, tipo, ms) => {
    setLineas((actuales) => {
      const orden = actuales.length + 1;
      return [...actuales, { id: orden, orden, texto, tipo, ms: ms ?? null }];
    });
  }, []);

  const limpiar = useCallback(() => setLineas([]), []);

  return { lineas, anotar, limpiar };
}
