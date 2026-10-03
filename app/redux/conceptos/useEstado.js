"use client";

import { useSyncExternalStore } from "react";

/**
 * El puente entre un store de afuera y React.
 *
 * useSyncExternalStore es el hook que React trae justo para esto: un dato que
 * vive afuera del árbol y que avisa cuando cambia. Le pasás tres cosas:
 *
 *   1. cómo suscribirse (le da una función y espera la de desuscribir)
 *   2. cómo leer el valor de ahora, en el cliente
 *   3. cómo leerlo en el servidor, para el primer HTML
 *
 * React se suscribe solo al montar, se desuscribe al desmontar, y vuelve a
 * dibujar cuando el valor que devuelve getState deja de ser === al anterior.
 * Por eso importa tanto que el reducer no mute: si devolviera siempre el mismo
 * objeto, React no se enteraría nunca.
 */
export function useEstado(store) {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}
