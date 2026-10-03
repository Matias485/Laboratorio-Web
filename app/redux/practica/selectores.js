// ===========================================================================
// Los selectores derivados.
//
// Acá vive TODO lo que se calcula: la lista del catálogo en orden, las líneas
// del carrito con su nombre y su precio puestos, el subtotal, el descuento y
// el total. Nada de esto está guardado en ningún slice.
//
// La regla: si se puede calcular a partir de otra cosa que ya está en el
// store, no se guarda. Un dato guardado dos veces es un dato que algún día va
// a estar mal.
// ===========================================================================

import { createSelector } from "@reduxjs/toolkit";
import { CUPONES } from "./carritoSlice";

// --------------------------------------------------- selectores de entrada ---
// Baratos: devuelven algo que ya está en el estado, sin crear nada nuevo.
// No hace falta memorizarlos.

export const elegirSituacion = (estado) => estado.catalogo.situacion;
export const elegirErrorDelCatalogo = (estado) => estado.catalogo.error;
export const elegirCupon = (estado) => estado.carrito.cupon;

const elegirProductosPorId = (estado) => estado.catalogo.porId;
const elegirOrdenDelCatalogo = (estado) => estado.catalogo.orden;
const elegirLineasPorId = (estado) => estado.carrito.porId;
const elegirOrdenDelCarrito = (estado) => estado.carrito.orden;

// ------------------------------------------------------ selectores armados ---
// Estos sí crean un arreglo nuevo cada vez que corren. Sin createSelector,
// useSelector compararía el arreglo viejo con el nuevo, nunca serían ===, y
// el componente se volvería a dibujar con CADA acción despachada en toda la
// aplicación. Memorizados, solo recalculan cuando sus entradas cambian.

export const elegirProductos = createSelector(
  [elegirProductosPorId, elegirOrdenDelCatalogo],
  (porId, orden) => orden.map((id) => porId[id]),
);

// El "join" del carrito: el carrito guarda id y cantidad, el catálogo guarda
// nombre y precio, y acá se juntan. Es el selector más importante de la
// aplicación.
export const elegirLineas = createSelector(
  [elegirLineasPorId, elegirOrdenDelCarrito, elegirProductosPorId],
  (lineas, orden, productos) =>
    orden.map((id) => {
      const producto = productos[id];
      const cantidad = lineas[id].cantidad;
      const precio = producto ? producto.precio : 0;
      return {
        id,
        cantidad,
        precio,
        nombre: producto ? producto.nombre : "Producto que ya no está",
        stock: producto ? producto.stock : 0,
        subtotal: precio * cantidad,
      };
    }),
);

export const elegirCantidadDeItems = createSelector([elegirLineas], (lineas) =>
  lineas.reduce((suma, linea) => suma + linea.cantidad, 0),
);

export const elegirSubtotal = createSelector([elegirLineas], (lineas) =>
  lineas.reduce((suma, linea) => suma + linea.subtotal, 0),
);

// --------------------------------------------------------------- el cupón ---
// El store guarda el texto que escribió la persona. Si ese texto corresponde a
// un cupón que existe, y si la compra llega al mínimo, se decide acá. Dos
// razones: el mínimo depende del subtotal, que también es derivado, y porque
// el día que cambien los porcentajes no hay que migrar ningún estado viejo.

export const elegirEstadoDelCupon = createSelector(
  [elegirCupon, elegirSubtotal],
  (codigo, subtotal) => {
    if (!codigo) {
      return { codigo: null, estado: "sin-cupon", porcentaje: 0, faltan: 0 };
    }
    const cupon = CUPONES[codigo];
    if (!cupon) {
      return { codigo, estado: "desconocido", porcentaje: 0, faltan: 0 };
    }
    if (subtotal < cupon.minimo) {
      return {
        codigo,
        estado: "no-alcanza",
        porcentaje: 0,
        faltan: cupon.minimo - subtotal,
      };
    }
    return {
      codigo,
      estado: "aplicado",
      porcentaje: cupon.porcentaje,
      faltan: 0,
    };
  },
);

// Un selector puede recibir otros selectores como entrada, no solo pedazos del
// estado. Eso arma una cadena: si el subtotal no cambió, el descuento ni se
// vuelve a calcular.
export const elegirDescuento = createSelector(
  [elegirSubtotal, elegirEstadoDelCupon],
  (subtotal, cupon) => Math.round((subtotal * cupon.porcentaje) / 100),
);

export const elegirTotal = createSelector(
  [elegirSubtotal, elegirDescuento],
  (subtotal, descuento) => subtotal - descuento,
);
