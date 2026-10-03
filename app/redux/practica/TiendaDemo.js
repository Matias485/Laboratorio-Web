"use client";

// El demo final: la tienda entera, y al lado el estado del store y las
// acciones que se van despachando, en orden.
//
// Este componente no sabe comprar. Solo acomoda en pantalla los cuatro
// componentes que ya escribimos y lee el estado para mostrarlo. Esa división
// —uno que ordena, varios que hacen— es la que te va a dejar crecer la
// aplicación sin que ningún archivo pase de doscientas líneas.

import { useSelector, useDispatch } from "react-redux";
import { registroLimpiado } from "./registroSlice";
import {
  elegirSituacion,
  elegirSubtotal,
  elegirDescuento,
  elegirTotal,
  elegirCantidadDeItems,
} from "./selectores";
import Catalogo from "./Catalogo";
import LineasDelCarrito from "./LineasDelCarrito";
import Cupon from "./Cupon";
import Totales from "./Totales";
import { PANEL, TITULO_PANEL, PRE, CHICO, pesos, resumirPayload } from "./piezas";

export default function TiendaDemo() {
  // El carrito entero: es un objeto que ya vive en el store, así que
  // devolverlo tal cual no crea nada nuevo y no hace falta memorizar.
  const carrito = useSelector((estado) => estado.carrito);
  const situacion = useSelector(elegirSituacion);
  const cuantosProductos = useSelector((estado) => estado.catalogo.orden.length);
  const registro = useSelector((estado) => estado.registro);

  // Lo derivado, para ponerlo al lado del store y que se vea la diferencia.
  const items = useSelector(elegirCantidadDeItems);
  const subtotal = useSelector(elegirSubtotal);
  const descuento = useSelector(elegirDescuento);
  const total = useSelector(elegirTotal);

  const despachar = useDispatch();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: 14,
        alignItems: "start",
      }}
    >
      {/* ------------------------------------------------------ la tienda --- */}
      <div style={{ display: "grid", gap: 14 }}>
        <div style={PANEL}>
          <p style={TITULO_PANEL}>catálogo</p>
          <Catalogo />
        </div>

        <div style={PANEL}>
          <p style={TITULO_PANEL}>carrito</p>
          <LineasDelCarrito />
        </div>

        <div style={PANEL}>
          <p style={TITULO_PANEL}>cupón y totales</p>
          <Cupon />
          <div style={{ marginTop: 12 }}>
            <Totales />
          </div>
        </div>
      </div>

      {/* ------------------------------------- el store y lo que se derivó --- */}
      <div style={{ display: "grid", gap: 14 }}>
        <div style={PANEL}>
          <p style={TITULO_PANEL}>almacen.getState().carrito</p>
          <pre style={PRE}>{JSON.stringify(carrito, null, 2)}</pre>
          <p className="tenue" style={{ margin: "8px 0 0", fontSize: "0.76rem" }}>
            estado.catalogo: situacion &quot;{situacion}&quot;,{" "}
            {cuantosProductos} productos. Lo resumimos acá para que el carrito
            entre en pantalla.
          </p>
        </div>

        <div style={{ ...PANEL, borderStyle: "dashed" }}>
          <p style={TITULO_PANEL}>derivado · no está en el store</p>
          <pre style={PRE}>
            {JSON.stringify(
              { items, subtotal, descuento, total },
              null,
              2,
            )}
          </pre>
          <p className="tenue" style={{ margin: "8px 0 0", fontSize: "0.76rem" }}>
            {pesos(subtotal)} − {pesos(descuento)} = {pesos(total)}, recalculado
            en cada acción y guardado en ninguna parte.
          </p>
        </div>

        <div style={PANEL}>
          <div
            className="fila"
            style={{ justifyContent: "space-between", marginBottom: 8 }}
          >
            <p style={{ ...TITULO_PANEL, margin: 0 }}>
              acciones despachadas · {registro.length}
            </p>
            <button
              type="button"
              className="boton boton-suave"
              style={CHICO}
              onClick={() => despachar(registroLimpiado())}
            >
              Limpiar
            </button>
          </div>

          {registro.length === 0 ? (
            <p className="tenue" style={{ margin: 0, fontSize: "0.82rem" }}>
              Todavía ninguna. Comprá algo y mirá qué aparece.
            </p>
          ) : (
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                maxHeight: 280,
                overflowY: "auto",
              }}
            >
              {registro.map((entrada) => {
                const resumen = resumirPayload(entrada.payload);
                return (
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
                    {resumen && (
                      <span
                        style={{
                          display: "block",
                          color: "var(--texto-suave)",
                          wordBreak: "break-all",
                        }}
                      >
                        payload: {resumen}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
