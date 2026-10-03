"use client";

import { useSelector, useDispatch } from "react-redux";
import { cotizacionPedida } from "./almacen";

const CAJA = {
  border: "1px solid var(--borde)",
  borderRadius: 10,
  background: "var(--superficie-2)",
  padding: "12px 14px",
};

const COLOR = {
  inicial: "var(--texto-suave)",
  cargando: "var(--ambar)",
  listo: "var(--verde)",
  error: "var(--rojo)",
};

const TEXTO = {
  inicial: "Sin pedir nada todavía.",
  cargando: "Pidiendo… (la respuesta falsa tarda 1,2 segundos)",
  listo: "Llegó.",
  error: "Falló.",
};

export default function CotizacionDemo() {
  const { situacion, moneda, valor, error } = useSelector(
    (estado) => estado.cotizacion,
  );
  // Ojo: el filtrado va ACÁ, no adentro del selector. Un selector que devuelve
  // un arreglo nuevo en cada llamada dispara un renderizado por cada acción
  // despachada en toda la aplicación.
  const todas = useSelector((estado) => estado.registro);
  const registro = todas.filter((entrada) =>
    entrada.type.startsWith("cotizacion/"),
  );
  const despachar = useDispatch();

  const cargando = situacion === "cargando";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 14,
        alignItems: "start",
      }}
    >
      <div style={{ display: "grid", gap: 14 }}>
        <div className="fila">
          <button
            type="button"
            className="boton"
            disabled={cargando}
            onClick={() => despachar(cotizacionPedida("dolar"))}
          >
            Pedir el dólar
          </button>
          <button
            type="button"
            className="boton boton-suave"
            disabled={cargando}
            onClick={() => despachar(cotizacionPedida("euro"))}
          >
            Pedir el euro
          </button>
          <button
            type="button"
            className="boton boton-suave"
            disabled={cargando}
            onClick={() => despachar(cotizacionPedida("cripto"))}
          >
            Pedir una que falla
          </button>
        </div>

        <div style={CAJA}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--fuente-mono)",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: COLOR[situacion],
            }}
          >
            situacion: &quot;{situacion}&quot;
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "0.88rem" }}>
            {TEXTO[situacion]}
          </p>

          {situacion === "listo" && (
            <p className="marcador" style={{ marginTop: 8 }}>
              {moneda} = ${valor}
            </p>
          )}
          {situacion === "error" && (
            <p
              style={{
                margin: "8px 0 0",
                fontSize: "0.88rem",
                color: "var(--rojo)",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>

      <div style={CAJA}>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--texto-suave)",
          }}
        >
          acciones del thunk
        </p>
        {registro.length === 0 ? (
          <p className="tenue" style={{ margin: 0, fontSize: "0.82rem" }}>
            Todavía ninguna.
          </p>
        ) : (
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            {registro.map((entrada) => (
              <li
                key={entrada.id}
                style={{
                  padding: "4px 8px",
                  marginBottom: 4,
                  borderRadius: 6,
                  border: "1px solid var(--borde)",
                  background: "var(--superficie)",
                  fontFamily: "var(--fuente-mono)",
                  fontSize: "0.72rem",
                  wordBreak: "break-all",
                }}
              >
                {entrada.type}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
