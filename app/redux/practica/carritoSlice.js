// ===========================================================================
// El slice del carrito.
//
// Lo único que guarda de cada línea es { id, cantidad }. El nombre y el
// precio NO se copian acá: ya están en el catálogo. Guardar el mismo dato en
// dos lugares es la receta para que un día no coincidan.
//
// Y no guarda ningún total. El subtotal, el descuento y el total se calculan
// en selectores.js.
// ===========================================================================

import { createSlice } from "@reduxjs/toolkit";

// Los cupones del cuatrimestre. Son datos fijos del negocio, no estado: nunca
// cambian mientras la aplicación corre, así que no tienen por qué vivir en el
// store.
export const CUPONES = {
  ESTUDIANTE10: {
    porcentaje: 10,
    minimo: 0,
    texto: "10% para alumnos regulares.",
  },
  FINALES25: {
    porcentaje: 25,
    minimo: 50000,
    texto: "25% en compras de $50.000 o más.",
  },
};

function estadoInicial() {
  return {
    // Indexado por id: encontrar y actualizar una línea es directo.
    porId: {},
    // El orden en que se fueron agregando, que el objeto de arriba no guarda.
    orden: [],
    // El código que escribió la persona, tal cual. Si sirve o no, se calcula.
    cupon: null,
  };
}

const carritoSlice = createSlice({
  name: "carrito",
  initialState: estadoInicial(),
  reducers: {
    // Un reducer solo ve SU pedazo del estado: desde acá no se puede mirar el
    // catálogo. Por eso el stock entra en el payload, y prepare se encarga de
    // extraerlo del producto para que quien despacha no tenga que pensarlo.
    productoAgregado: {
      reducer(estado, accion) {
        const { id, stock } = accion.payload;
        if (stock <= 0) return; // agotado: la acción no cambia nada

        const linea = estado.porId[id];
        if (linea) {
          linea.cantidad = Math.min(linea.cantidad + 1, stock);
        } else {
          estado.porId[id] = { id, cantidad: 1 };
          estado.orden.push(id);
        }
      },
      prepare(producto) {
        return { payload: { id: producto.id, stock: producto.stock } };
      },
    },

    cantidadCambiada(estado, accion) {
      const { id, cantidad, stock } = accion.payload;
      const linea = estado.porId[id];
      if (!linea) return;
      // Un input vacío llega como NaN. Si no lo frenamos acá, el carrito
      // termina con cantidad NaN y todos los totales se vuelven NaN.
      if (!Number.isFinite(cantidad)) return;
      // Nunca menos de 1 —para eso está quitar— ni más de lo que hay.
      linea.cantidad = Math.max(1, Math.min(Math.trunc(cantidad), stock));
    },

    productoQuitado(estado, accion) {
      const id = accion.payload;
      if (!estado.porId[id]) return;
      delete estado.porId[id];
      estado.orden = estado.orden.filter((otro) => otro !== id);
    },

    carritoVaciado: () => estadoInicial(),

    // El código se normaliza en prepare: sin espacios y en mayúsculas. Así el
    // reducer recibe siempre lo mismo y no tiene que limpiar nada.
    cuponAplicado: {
      reducer(estado, accion) {
        estado.cupon = accion.payload;
      },
      prepare(texto) {
        return { payload: String(texto).trim().toUpperCase() };
      },
    },

    cuponQuitado(estado) {
      estado.cupon = null;
    },
  },
});

export const {
  productoAgregado,
  cantidadCambiada,
  productoQuitado,
  carritoVaciado,
  cuponAplicado,
  cuponQuitado,
} = carritoSlice.actions;

export default carritoSlice.reducer;
