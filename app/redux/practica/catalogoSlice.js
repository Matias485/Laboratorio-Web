// ===========================================================================
// El slice del catálogo.
//
// Guarda los productos que vienen del servidor y, además, en qué situación
// está el pedido: inicial, cargando, listo o error. Esas cuatro palabras son
// todo el manejo de carga de la aplicación.
//
// Los productos se guardan NORMALIZADOS: un objeto indexado por id y un
// arreglo con el orden. La misma forma que usa el carrito, por las mismas
// razones.
// ===========================================================================

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pedirCatalogo } from "./catalogoApi";

// El estado inicial lo devuelve una función, no una constante compartida.
// Así, cada vez que alguien reinicia, recibe objetos nuevos y no hay manera de
// mutar sin querer el molde original.
function estadoInicial() {
  return { situacion: "inicial", porId: {}, orden: [], error: null };
}

// createAsyncThunk no es un reducer: es la parte sucia. Llama a la función que
// tarda y despacha tres acciones por cada llamada —pending, fulfilled y
// rejected— que sí llegan a reducers puros.
export const catalogoPedido = createAsyncThunk(
  "catalogo/pedido",
  async (modo = "ok") => {
    const productos = await pedirCatalogo(modo);
    return productos; // esto termina siendo accion.payload de fulfilled
  },
);

const catalogoSlice = createSlice({
  name: "catalogo",
  initialState: estadoInicial(),
  reducers: {
    // Solo para el demo: vuelve al estado inicial y deja volver a mirar la
    // secuencia completa de carga.
    catalogoOlvidado: () => estadoInicial(),
  },
  // Los casos de un thunk no son acciones nuestras: las generó
  // createAsyncThunk. Por eso van en extraReducers y no en reducers.
  extraReducers: (constructor) => {
    constructor
      .addCase(catalogoPedido.pending, (estado) => {
        estado.situacion = "cargando";
        estado.error = null;
      })
      .addCase(catalogoPedido.fulfilled, (estado, accion) => {
        estado.situacion = "listo";
        estado.porId = {};
        estado.orden = [];
        for (const producto of accion.payload) {
          estado.porId[producto.id] = producto;
          estado.orden.push(producto.id);
        }
      })
      .addCase(catalogoPedido.rejected, (estado, accion) => {
        estado.situacion = "error";
        // Ojo: cuando el thunk falla, el mensaje NO viene en payload.
        // Viene en accion.error.
        estado.error = accion.error.message;
      });
  },
});

export const { catalogoOlvidado } = catalogoSlice.actions;
export default catalogoSlice.reducer;
