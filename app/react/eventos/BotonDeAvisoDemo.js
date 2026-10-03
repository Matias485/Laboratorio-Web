"use client";

import { useState } from "react";
import PanelRegistro from "./PanelRegistro";

let proximoId = 1;

// El mismo BotonDeAviso de la diapositiva. El botón no sabe qué mensaje le
// toca: se lo dice el padre por props. La función flecha "cierra" sobre
// mensaje, así que cuando se ejecute va a saber cuál era el suyo.
// (En la diapositiva avisar era alert; acá lo recibimos por props para
// escribir en el panel en vez de frenar la página con un cartel.)
function BotonDeAviso({ mensaje, avisar, children }) {
  return (
    <button
      type="button"
      className="boton boton-suave"
      onClick={() => avisar(mensaje)}
    >
      {children}
    </button>
  );
}

// Convención de nombres: la función manejadora se llama manejarAlgo y la prop
// por la que llega una función desde el padre se llama onAlgo.
function BotonPedido({ plato, onPedir }) {
  function manejarClick() {
    onPedir(plato);
  }

  return (
    <button type="button" className="boton" onClick={manejarClick}>
      Pedir {plato}
    </button>
  );
}

export default function BotonDeAvisoDemo() {
  const [registro, setRegistro] = useState([]);

  function avisar(texto) {
    const id = proximoId++;
    setRegistro((anteriores) => [...anteriores, { id, texto }].slice(-6));
  }

  function manejarPedido(plato) {
    avisar(`Pedido anotado: ${plato}`);
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <BotonDeAviso mensaje="¡Reproduciendo!" avisar={avisar}>
          Reproducir película
        </BotonDeAviso>
        <BotonDeAviso mensaje="¡Subiendo imagen!" avisar={avisar}>
          Subir imagen
        </BotonDeAviso>
      </div>

      <div className="fila" style={{ marginBottom: 14 }}>
        <BotonPedido plato="milanesa" onPedir={manejarPedido} />
        <BotonPedido plato="tarta" onPedir={manejarPedido} />
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setRegistro([])}
        >
          Limpiar
        </button>
      </div>

      <PanelRegistro
        lineas={registro}
        vacio="Los cuatro botones son el mismo componente con props distintas."
      />
    </div>
  );
}
