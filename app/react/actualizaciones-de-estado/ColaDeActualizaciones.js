"use client";

import { useState } from "react";

// Las cuatro llamadas que podés poner en la cola.
//   reemplaza: true  -> mete un VALOR ya calculado con la instantánea
//   reemplaza: false -> mete una FUNCIÓN, que recibe el último valor de la cola
const ACCIONES = {
  valor1: {
    etiqueta: "setNumero(numero + 1)",
    reemplaza: true,
    calcular: (anterior, instantanea) => instantanea + 1,
  },
  valor5: {
    etiqueta: "setNumero(numero + 5)",
    reemplaza: true,
    calcular: (anterior, instantanea) => instantanea + 5,
  },
  sumar1: {
    etiqueta: "setNumero(n => n + 1)",
    reemplaza: false,
    calcular: (anterior) => anterior + 1,
  },
  doblar: {
    etiqueta: "setNumero(n => n * 2)",
    reemplaza: false,
    calcular: (anterior) => anterior * 2,
  },
};

const TIPOS = Object.keys(ACCIONES);

// Un id que crece solo, para que cada renglón de la cola tenga una key estable.
let siguienteId = 1;

// Simulamos lo que hace React cuando termina el manejador: arranca del valor de
// la instantánea y va aplicando la cola en orden, una llamada atrás de la otra.
// El resultado de una es la entrada de la siguiente.
function procesarCola(instantanea, cola) {
  const pasos = [];
  let valor = instantanea;

  for (const item of cola) {
    const accion = ACCIONES[item.tipo];
    const anterior = valor;
    valor = accion.calcular(anterior, instantanea);
    pasos.push({ id: item.id, accion, anterior, resultado: valor });
  }

  return { pasos, valor };
}

export default function ColaDeActualizaciones() {
  const [instantanea, setInstantanea] = useState(0);
  const [cola, setCola] = useState([]);

  function agregar(tipo) {
    // La cola nueva se calcula a partir de la anterior, así que predicamos con
    // el ejemplo y usamos una función actualizadora. El id se calcula afuera
    // porque la función actualizadora tiene que ser pura.
    const id = siguienteId++;
    setCola((anterior) => [...anterior, { id, tipo }]);
  }

  const { pasos, valor } = procesarCola(instantanea, cola);

  // Pie del demo, cuidando el singular y el plural.
  let resumen;
  if (cola.length === 0) {
    resumen = "Sin llamadas en la cola, el estado se queda como estaba.";
  } else if (cola.length === 1) {
    resumen = "React aplicó la única llamada de la cola y renderizó una sola vez.";
  } else {
    resumen = `React aplicó las ${cola.length} llamadas en orden, una atrás de la otra, y recién ahí renderizó una sola vez.`;
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <label htmlFor="cola-instantanea">
          Al empezar el render, <code>numero</code> vale
        </label>
        <input
          id="cola-instantanea"
          className="entrada"
          type="number"
          style={{ width: 90 }}
          value={instantanea}
          onChange={(evento) => setInstantanea(Number(evento.target.value) || 0)}
        />
      </div>

      <p className="tenue">Agregá llamadas al manejador:</p>
      <div className="fila" style={{ marginBottom: 14 }}>
        {TIPOS.map((tipo) => (
          <button
            key={tipo}
            type="button"
            className="boton boton-suave"
            onClick={() => agregar(tipo)}
          >
            + {ACCIONES[tipo].etiqueta}
          </button>
        ))}
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setCola([])}
          disabled={cola.length === 0}
        >
          Vaciar
        </button>
      </div>

      {cola.length === 0 ? (
        <p className="tenue">
          La cola está vacía: React no tiene nada que hacer y no vuelve a
          renderizar.
        </p>
      ) : (
        <ol style={{ paddingLeft: 22, margin: "0 0 12px" }}>
          {pasos.map((paso) => (
            <li key={paso.id} style={{ fontFamily: "var(--fuente-mono)", fontSize: "0.86rem" }}>
              {paso.accion.etiqueta}{" "}
              <span className="tenue">
                {paso.accion.reemplaza
                  ? `→ reemplaza: no mira el ${paso.anterior} que traía la cola, ya venía calculado con la instantánea → ${paso.resultado}`
                  : `→ actualiza: recibe el ${paso.anterior} que dejó la anterior → ${paso.resultado}`}
              </span>
            </li>
          ))}
        </ol>
      )}

      <p className="marcador">{valor}</p>
      <p className="tenue">
        Valor con el que arrancaría el próximo render. {resumen}
      </p>
    </div>
  );
}
