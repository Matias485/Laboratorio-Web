"use client";

// Las líneas del carrito. Lee elegirLineas, que es el selector que junta el
// carrito con el catálogo, y despacha las tres acciones de edición.

import { useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cantidadCambiada,
  productoQuitado,
  carritoVaciado,
} from "./carritoSlice";
import { elegirLineas, elegirCantidadDeItems } from "./selectores";
import { SOLO_LECTORES, MONO, CHICO, pesos } from "./piezas";

export default function LineasDelCarrito() {
  const lineas = useSelector(elegirLineas);
  const items = useSelector(elegirCantidadDeItems);
  const despachar = useDispatch();
  // Esta página muestra el carrito dos veces, y dos inputs no pueden tener el
  // mismo id: el label apuntaría siempre al primero. useId le da a cada copia
  // del componente un prefijo propio, igual en el servidor y en el navegador.
  const prefijo = useId();

  if (lineas.length === 0) {
    return (
      <p className="tenue" style={{ margin: 0, fontSize: "0.88rem" }}>
        El carrito está vacío. Agregá algo del catálogo.
      </p>
    );
  }

  return (
    <div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {lineas.map((linea) => (
          <li
            key={linea.id}
            style={{ padding: "8px 0", borderTop: "1px solid var(--borde)" }}
          >
            <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600 }}>
              {linea.nombre}
            </p>

            <div
              className="fila"
              style={{ gap: 6, marginTop: 6, justifyContent: "space-between" }}
            >
              <div className="fila" style={{ gap: 4 }}>
                <button
                  type="button"
                  className="boton boton-suave"
                  style={CHICO}
                  disabled={linea.cantidad <= 1}
                  aria-label={`Restar uno de ${linea.nombre}`}
                  onClick={() =>
                    despachar(
                      cantidadCambiada({
                        id: linea.id,
                        cantidad: linea.cantidad - 1,
                        stock: linea.stock,
                      }),
                    )
                  }
                >
                  −
                </button>

                {/* La etiqueta existe en el documento aunque no se vea: el
                    nombre del producto ya está arriba y repetirlo ensuciaría
                    la pantalla, pero un lector de pantalla necesita saber de
                    qué es este campo. */}
                <label htmlFor={`${prefijo}-${linea.id}`} style={SOLO_LECTORES}>
                  Cantidad de {linea.nombre}
                </label>
                <input
                  id={`${prefijo}-${linea.id}`}
                  className="entrada"
                  type="number"
                  min={1}
                  max={linea.stock}
                  style={{ width: 68, padding: "4px 8px", textAlign: "center" }}
                  value={linea.cantidad}
                  onChange={(evento) =>
                    despachar(
                      cantidadCambiada({
                        id: linea.id,
                        cantidad: Number(evento.target.value),
                        stock: linea.stock,
                      }),
                    )
                  }
                />

                <button
                  type="button"
                  className="boton boton-suave"
                  style={CHICO}
                  disabled={linea.cantidad >= linea.stock}
                  aria-label={`Sumar uno de ${linea.nombre}`}
                  onClick={() =>
                    despachar(
                      cantidadCambiada({
                        id: linea.id,
                        cantidad: linea.cantidad + 1,
                        stock: linea.stock,
                      }),
                    )
                  }
                >
                  +
                </button>
              </div>

              <div className="fila" style={{ gap: 8 }}>
                <span style={MONO}>{pesos(linea.subtotal)}</span>
                <button
                  type="button"
                  className="boton boton-suave"
                  style={CHICO}
                  aria-label={`Quitar ${linea.nombre} del carrito`}
                  onClick={() => despachar(productoQuitado(linea.id))}
                >
                  Quitar
                </button>
              </div>
            </div>

            <p
              className="tenue"
              style={{ margin: "4px 0 0", fontSize: "0.76rem" }}
            >
              {linea.cantidad} × {pesos(linea.precio)} · stock {linea.stock}
            </p>
          </li>
        ))}
      </ul>

      <div
        className="fila"
        style={{
          justifyContent: "space-between",
          marginTop: 12,
          borderTop: "1px solid var(--borde)",
          paddingTop: 10,
        }}
      >
        <span className="tenue" style={{ fontSize: "0.82rem" }}>
          {items} {items === 1 ? "unidad" : "unidades"} en {lineas.length}{" "}
          {lineas.length === 1 ? "producto" : "productos"}
        </span>
        <button
          type="button"
          className="boton boton-suave"
          style={CHICO}
          onClick={() => despachar(carritoVaciado())}
        >
          Vaciar el carrito
        </button>
      </div>
    </div>
  );
}
