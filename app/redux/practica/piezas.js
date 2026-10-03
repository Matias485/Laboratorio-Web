"use client";

// ===========================================================================
// Piezas compartidas por los demos: los estilos en línea, el formateador de
// precios y el aviso que aparece mientras el catálogo no llegó.
//
// Nada de esto es Redux. Está separado para que los componentes de la tienda
// se lean enteros sin tener que saltear cuarenta líneas de estilos.
// ===========================================================================

import { useSelector, useDispatch } from "react-redux";
import { catalogoPedido } from "./catalogoSlice";
import { elegirSituacion, elegirErrorDelCatalogo } from "./selectores";

// --------------------------------------------------------------- formato ---

// 68900 -> "$68.900". Está escrito a mano a propósito: toLocaleString()
// depende de la base de datos de idiomas del entorno, que en Node y en el
// navegador puede no ser la misma. Cuando difieren, el servidor dibuja
// "$68,900", el navegador dibuja "$68.900" y React avisa de un error de
// hidratación. Con una función nuestra, el resultado es el mismo en los dos.
export function pesos(monto) {
  const entero = Math.round(monto);
  const signo = entero < 0 ? "−" : "";
  const digitos = String(Math.abs(entero));
  const conPuntos = digitos.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return signo + "$" + conPuntos;
}

// El payload del catálogo son ocho productos enteros. En el registro de
// acciones eso ocupa media pantalla, así que lo cortamos.
export function resumirPayload(payload) {
  if (payload === undefined) return null;
  const texto = JSON.stringify(payload);
  if (texto === undefined) return null;
  return texto.length > 80 ? texto.slice(0, 80) + "…" : texto;
}

// --------------------------------------------------------------- estilos ---

export const PANEL = {
  border: "1px solid var(--borde)",
  borderRadius: 10,
  background: "var(--superficie-2)",
  padding: "10px 12px",
};

export const TITULO_PANEL = {
  margin: "0 0 8px",
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--texto-suave)",
};

export const TARJETA = {
  border: "1px solid var(--borde)",
  borderRadius: 8,
  background: "var(--superficie)",
  padding: "10px 12px",
};

export const PRE = {
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

export const MONO = {
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.82rem",
  fontWeight: 700,
};

export const CHICO = {
  padding: "3px 10px",
  fontSize: "0.78rem",
};

// Para etiquetas que tienen que existir para un lector de pantalla pero que
// en pantalla sobrarían, porque el nombre del producto está al lado. Es el
// truco de /html/accesibilidad: sacarlo de la vista sin sacarlo del
// documento. display: none NO sirve, porque también lo saca del árbol.
export const SOLO_LECTORES = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  border: 0,
};

// ----------------------------------------------------------------- aviso ---

// Los cuatro demos comparten un solo store, así que si el catálogo todavía no
// se pidió no hay nada que comprar. Este componente lo dice y ofrece el botón.
export function AvisoCatalogo() {
  const situacion = useSelector(elegirSituacion);
  const error = useSelector(elegirErrorDelCatalogo);
  const despachar = useDispatch();

  if (situacion === "listo") return null;

  return (
    <div
      style={{ ...PANEL, borderStyle: "dashed", marginBottom: 12 }}
      aria-live="polite"
    >
      <p style={{ margin: "0 0 8px", fontSize: "0.88rem" }}>
        {situacion === "cargando" && "Pidiendo el catálogo a la librería…"}
        {situacion === "inicial" &&
          "El catálogo todavía no se pidió. Sin productos no hay nada que agregar."}
        {situacion === "error" && error}
      </p>
      <button
        type="button"
        className="boton"
        disabled={situacion === "cargando"}
        onClick={() => despachar(catalogoPedido())}
      >
        {situacion === "error" ? "Reintentar" : "Cargar el catálogo"}
      </button>
    </div>
  );
}
