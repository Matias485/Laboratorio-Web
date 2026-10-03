"use client";

import { useEffect, useRef } from "react";

/**
 * Una lista de tareas hecha con DOM puro, sin estado de React.
 *
 * React acá aporta dos cosas: un <div> vacío y el aviso de que ya existe en la
 * página. De ahí para abajo todo es exactamente lo que escribirías en un
 * <script> suelto: querySelector, createElement, classList, remove y UN solo
 * addEventListener para toda la lista.
 */
export default function ListaDom() {
  const refCaja = useRef(null);

  useEffect(() => {
    const caja = refCaja.current;
    if (!caja) return;
    // montarLista devuelve su propia función de limpieza, y React la llama
    // cuando el componente se desmonta.
    return montarLista(caja);
  }, []);

  return <div ref={refCaja} />;
}

// El armazón fijo. Este HTML lo escribimos nosotros y no tiene ni un dato que
// venga de afuera, así que acá innerHTML es seguro. Para el texto que tipea
// alguien usamos textContent, más abajo.
const ARMAZON = `
<style>
  .ldom-lista { list-style: none; margin: 0 0 10px; padding: 0; }
  .ldom-item {
    display: flex; align-items: center; gap: 10px;
    padding: 6px 10px; margin-bottom: 6px;
    border: 1px solid var(--borde); border-radius: 8px;
    background: var(--superficie-2);
  }
  .ldom-nombre {
    flex: 1; min-width: 0; text-align: left; padding: 2px 0;
    background: transparent; border: 0; color: inherit; font: inherit;
    cursor: pointer;
  }
  .ldom-hecha .ldom-nombre {
    text-decoration: line-through; color: var(--texto-suave);
  }
</style>
<form class="fila" style="margin-bottom:12px">
  <label for="ldom-texto">Tarea nueva</label>
  <input id="ldom-texto" class="entrada" type="text" placeholder="Repasar el bucle de eventos">
  <button type="submit" class="boton">Agregar</button>
</form>
<ul class="ldom-lista"></ul>
<p class="tenue ldom-pie" style="margin:0"></p>
`;

function montarLista(caja) {
  caja.innerHTML = ARMAZON;

  // Seleccionar: los mismos selectores de CSS.
  const formulario = caja.querySelector("form");
  const entrada = caja.querySelector("#ldom-texto");
  const lista = caja.querySelector(".ldom-lista");
  const pie = caja.querySelector(".ldom-pie");

  // Crear: un <li> con un botón para marcarla y otro para borrarla.
  function agregar(texto) {
    const item = document.createElement("li");
    item.className = "ldom-item";

    const nombre = document.createElement("button");
    nombre.type = "button";
    nombre.className = "ldom-nombre";
    nombre.dataset.accion = "marcar";
    nombre.textContent = texto; // texto de afuera: SIEMPRE textContent

    const borrar = document.createElement("button");
    borrar.type = "button";
    borrar.className = "boton boton-suave";
    borrar.dataset.accion = "borrar";
    borrar.textContent = "borrar";

    item.append(nombre, borrar);
    lista.append(item);
  }

  // querySelectorAll devuelve todos los que coinciden, en el orden del documento.
  function contar() {
    const todas = lista.querySelectorAll(".ldom-item");
    const hechas = lista.querySelectorAll(".ldom-hecha");
    pie.textContent =
      todas.length +
      " tareas, " +
      hechas.length +
      " hechas · y un solo escuchador para todas";
  }

  function alEnviar(evento) {
    evento.preventDefault(); // sin esto el formulario recarga la página entera
    const texto = entrada.value.trim();
    if (texto === "") return;
    agregar(texto);
    entrada.value = "";
    contar();
  }

  // Delegación: UN escuchador en el <ul> atiende los clics de todos los <li>,
  // incluidos los que todavía no existen cuando se registra.
  function alHacerClic(evento) {
    const item = evento.target.closest(".ldom-item");
    if (!item) return; // clic en el hueco entre ítems: no hay nada que hacer

    if (evento.target.dataset.accion === "borrar") item.remove();
    else if (evento.target.dataset.accion === "marcar") {
      item.classList.toggle("ldom-hecha");
    }
    contar();
  }

  formulario.addEventListener("submit", alEnviar);
  lista.addEventListener("click", alHacerClic);

  ["Leer la consigna", "Escribir el código", "Probarlo"].forEach((t) =>
    agregar(t),
  );
  contar();

  return () => {
    formulario.removeEventListener("submit", alEnviar);
    lista.removeEventListener("click", alHacerClic);
    caja.replaceChildren();
  };
}
