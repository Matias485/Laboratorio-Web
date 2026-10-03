"use client";

import { Fragment, useState } from "react";

const TERMINOS = [
  {
    id: "jsx",
    palabra: "JSX",
    definicion: "La sintaxis que deja escribir marcado adentro de JavaScript.",
  },
  {
    id: "props",
    palabra: "props",
    definicion: "Los datos que un componente padre le pasa a un hijo.",
  },
  {
    id: "estado",
    palabra: "estado",
    definicion: "La memoria de un componente: sobrevive a cada re-render.",
  },
  {
    id: "key",
    palabra: "key",
    definicion: "La identidad de cada elemento adentro de una lista.",
  },
];

export default function GlosarioDemo() {
  const [cuantos, setCuantos] = useState(2);
  const visibles = TERMINOS.slice(0, cuantos);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setCuantos((n) => n + 1)}
          disabled={cuantos === TERMINOS.length}
        >
          Mostrar otro término
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setCuantos(2)}
          disabled={cuantos === 2}
        >
          Reiniciar
        </button>
      </div>

      <dl style={{ margin: 0 }}>
        {visibles.map((termino) => (
          // Cada término necesita dos etiquetas hermanas, <dt> y <dd>, y adentro
          // de un <dl> no podemos meterlas en un <div>. Envolverlas en un
          // Fragment con la forma larga es la única manera de ponerles la key.
          <Fragment key={termino.id}>
            <dt style={{ fontWeight: 700 }}>{termino.palabra}</dt>
            <dd style={{ margin: "0 0 12px" }}>{termino.definicion}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}
