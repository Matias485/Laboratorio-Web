"use client";

import { useState } from "react";

// --------------------------------------------------------------------------
// La fábrica. `cuenta` es una variable común, declarada adentro de la función.
// Cuando crearContador() termina, esa variable debería morir... pero las dos
// funciones que devolvemos la siguen usando, así que sigue viva. Eso es un
// closure: la función se lleva puesto el lugar donde nació.
// --------------------------------------------------------------------------

function crearContador(inicial = 0) {
  let cuenta = inicial;

  return {
    sumar() {
      cuenta = cuenta + 1;
      return cuenta;
    },
    reiniciar() {
      cuenta = inicial;
      return cuenta;
    },
  };
}

export default function FabricaDeContadores() {
  // El inicializador perezoso de useState hace que la fábrica corra una sola
  // vez, no en cada render. Son dos contadores distintos.
  const [contadorA] = useState(() => crearContador(0));
  const [contadorB] = useState(() => crearContador(100));

  // `cuenta` vive adentro del closure, no en React: guardamos en estado lo que
  // cada método nos devuelve para poder dibujarlo.
  const [visibleA, setVisibleA] = useState(0);
  const [visibleB, setVisibleB] = useState(100);

  return (
    <div>
      <div className="fila" style={{ alignItems: "flex-start", gap: 24 }}>
        <Panel
          nombre="contadorA"
          creacion="crearContador(0)"
          valor={visibleA}
          onSumar={() => setVisibleA(contadorA.sumar())}
          onReiniciar={() => setVisibleA(contadorA.reiniciar())}
        />
        <Panel
          nombre="contadorB"
          creacion="crearContador(100)"
          valor={visibleB}
          onSumar={() => setVisibleB(contadorB.sumar())}
          onReiniciar={() => setVisibleB(contadorB.reiniciar())}
        />
      </div>

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Sumá en uno y mirá el otro: no se mueve. Cada llamada a{" "}
        <code>crearContador()</code> fabricó su propia <code>cuenta</code>, y
        desde afuera no hay forma de tocarla salvo por los dos métodos que la
        fábrica devolvió.
      </p>
    </div>
  );
}

function Panel({ nombre, creacion, valor, onSumar, onReiniciar }) {
  return (
    <div
      style={{
        border: "1px solid var(--borde)",
        borderRadius: 8,
        background: "var(--superficie-2)",
        padding: 14,
        minWidth: 190,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.8rem",
          color: "var(--texto-suave)",
        }}
      >
        {nombre} = {creacion}
      </p>
      <p className="marcador">{valor}</p>
      <div className="fila">
        <button type="button" className="boton" onClick={onSumar}>
          {nombre}.sumar()
        </button>
        <button type="button" className="boton boton-suave" onClick={onReiniciar}>
          reiniciar()
        </button>
      </div>
    </div>
  );
}
