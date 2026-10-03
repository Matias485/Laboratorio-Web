// ===========================================================================
// El store de la tienda.
//
// Fijate lo corto que es: cada feature trae su reducer ya armado y acá solo
// se eligen los nombres de las ramas del estado. Esos nombres son los que vas
// a escribir mil veces en los selectores (estado.carrito, estado.catalogo),
// así que conviene pensarlos una vez.
//
// configureStore enchufa las DevTools de Redux solo y agrega el middleware
// por defecto, que en desarrollo avisa si mutaste el estado fuera de un
// reducer o si metiste algo que no se puede serializar.
// ===========================================================================

import { configureStore } from "@reduxjs/toolkit";
import catalogo from "./catalogoSlice";
import carrito from "./carritoSlice";
import registro from "./registroSlice";

export const almacen = configureStore({
  reducer: { catalogo, carrito, registro },
});
