"use client";

// El demo de la sección del catálogo: los tres estados de un pedido, en vivo.
// Todavía no hay carrito acá: solo se ve lo que hace createAsyncThunk.

import { useSelector, useDispatch } from "react-redux";
import { catalogoPedido, catalogoOlvidado } from "./catalogoSlice";
import {
  elegirProductos,
  elegirSituacion,
  elegirErrorDelCatalogo,
} from "./selectores";
import { PANEL, TITULO_PANEL, MONO, pesos } from "./piezas";

const COLOR = {
  inicial: "var(--texto-suave)",
  cargando: "var(--ambar)",
  listo: "var(--verde)",
  error: "var(--rojo)",
};

const TEXTO = {
  inicial: "Nadie pidió nada todavía. El catálogo está vacío y está bien.",
  cargando: "Pidiendo. La respuesta falsa tarda 0,9 segundos.",
  listo: "Llegó el catálogo.",
  error: "El pedido falló. El catálogo quedó como estaba.",
};

export default function CatalogoDemo() {
  const situacion = useSelector(elegirSituacion);
  const error = useSelector(elegirErrorDelCatalogo);
  const productos = useSelector(elegirProductos);
  const despachar = useDispatch();

  const cargando = situacion === "cargando";

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          disabled={cargando}
          onClick={() => despachar(catalogoPedido())}
        >
          Pedir el catálogo
        </button>
        <button
          type="button"
          className="boton boton-suave"
          disabled={cargando}
          onClick={() => despachar(catalogoPedido("falla"))}
        >
          Pedir y que el servidor falle
        </button>
        <button
          type="button"
          className="boton boton-suave"
          disabled={cargando}
          onClick={() => despachar(catalogoOlvidado())}
        >
          Volver al estado inicial
        </button>
      </div>

      <div style={PANEL} aria-live="polite">
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
        {situacion === "error" && (
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "0.86rem",
              color: "var(--rojo)",
            }}
          >
            {error}
          </p>
        )}
      </div>

      {productos.length > 0 && (
        <div style={{ ...PANEL, marginTop: 12 }}>
          <p style={TITULO_PANEL}>
            estado.catalogo · {productos.length} productos
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {productos.map((producto) => (
              <li
                key={producto.id}
                className="fila"
                style={{
                  justifyContent: "space-between",
                  gap: 10,
                  padding: "5px 0",
                  borderTop: "1px solid var(--borde)",
                  fontSize: "0.85rem",
                }}
              >
                <span style={{ flex: "1 1 160px" }}>{producto.nombre}</span>
                <span className="tenue" style={{ fontSize: "0.76rem" }}>
                  stock {producto.stock}
                </span>
                <span style={MONO}>{pesos(producto.precio)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
