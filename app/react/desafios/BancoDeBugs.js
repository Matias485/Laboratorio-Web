"use client";

import { useState } from "react";
import Codigo from "@/components/Codigo";

// ---------------------------------------------------------------------------
// Bug 1: el componente escrito en minúscula.
// ---------------------------------------------------------------------------

// Esta función existe y está bien escrita, pero abajo se la usa como <tarjeta />.
// React nunca la llama: para React, <tarjeta /> es una etiqueta HTML desconocida,
// no esta función.
function tarjeta() {
  return <p style={{ margin: 0 }}>Soy una tarjeta.</p>;
}

function Tarjeta() {
  return <p style={{ margin: 0 }}>Soy una tarjeta.</p>;
}

function MinusculaRota() {
  return (
    <div>
      <p className="tenue" style={{ marginTop: 0 }}>
        Abajo de esta línea debería verse una tarjeta:
      </p>
      <tarjeta />
    </div>
  );
}

function MinusculaArreglada() {
  return (
    <div>
      <p className="tenue" style={{ marginTop: 0 }}>
        Abajo de esta línea debería verse una tarjeta:
      </p>
      <Tarjeta />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bug 2: el manejador que se ejecuta al renderizar.
// ---------------------------------------------------------------------------

function EventoRoto() {
  // Este objeto se crea de nuevo en cada renderizado. Sirve de testigo para
  // dejar constancia de si saludar() llegó a ejecutarse durante el render.
  const testigo = { seEjecuto: false };

  function saludar() {
    testigo.seEjecuto = true;
  }

  return (
    <div>
      {/* Los paréntesis LLAMAN a saludar acá mismo, al armar el botón */}
      <button type="button" className="boton" onClick={saludar()}>
        Saludar
      </button>
      <p style={{ marginBottom: 0 }}>
        {testigo.seEjecuto
          ? "¡Hola! Me ejecuté sola, mientras se dibujaba la pantalla."
          : "Nadie hizo click todavía."}
      </p>
      <p className="tenue" style={{ marginBottom: 0 }}>
        Probá hacer click: no pasa nada.
      </p>
    </div>
  );
}

function EventoArreglado() {
  const [mensaje, setMensaje] = useState("Nadie hizo click todavía.");

  function saludar() {
    setMensaje("¡Hola! Me ejecuté porque hiciste click.");
  }

  return (
    <div>
      <button type="button" className="boton" onClick={saludar}>
        Saludar
      </button>
      <p style={{ marginBottom: 0 }}>{mensaje}</p>
      <p className="tenue" style={{ marginBottom: 0 }}>
        Ahora sí: el mensaje cambia recién cuando hacés click.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bug 3: mutar el arreglo del estado.
// ---------------------------------------------------------------------------

function ListaRota() {
  const [items, setItems] = useState(["manzana"]);
  const [, setRedibujados] = useState(0);

  function agregar() {
    items.push("fruta " + (items.length + 1)); // muta el arreglo que ya estaba
    setItems(items); // ...y le pasa a React exactamente el mismo arreglo
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 10 }}>
        <button type="button" className="boton" onClick={agregar}>
          Agregar fruta
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setRedibujados((n) => n + 1)}
        >
          Forzar un redibujado
        </button>
      </div>
      <ul style={{ margin: 0 }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p className="tenue" style={{ marginBottom: 0 }}>
        Agregá tres frutas: no pasa nada. Ahora tocá “Forzar un redibujado”.
      </p>
    </div>
  );
}

function ListaArreglada() {
  const [items, setItems] = useState(["manzana"]);

  function agregar() {
    setItems([...items, "fruta " + (items.length + 1)]); // arreglo nuevo
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 10 }}>
        <button type="button" className="boton" onClick={agregar}>
          Agregar fruta
        </button>
      </div>
      <ul style={{ margin: 0 }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p className="tenue" style={{ marginBottom: 0 }}>
        Cada fruta aparece en el momento.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bug 4: el cero fantasma.
// ---------------------------------------------------------------------------

function CeroRoto() {
  const [cantidad, setCantidad] = useState(3);

  return (
    <div>
      <ControlDeCantidad cantidad={cantidad} alCambiar={setCantidad} />
      <div style={{ marginTop: 10 }}>
        {cantidad && <p style={{ margin: 0 }}>Tenés {cantidad} mensajes.</p>}
      </div>
    </div>
  );
}

function CeroArreglado() {
  const [cantidad, setCantidad] = useState(3);

  return (
    <div>
      <ControlDeCantidad cantidad={cantidad} alCambiar={setCantidad} />
      <div style={{ marginTop: 10 }}>
        {cantidad > 0 && <p style={{ margin: 0 }}>Tenés {cantidad} mensajes.</p>}
      </div>
    </div>
  );
}

function ControlDeCantidad({ cantidad, alCambiar }) {
  return (
    <div className="fila">
      <button
        type="button"
        className="boton boton-suave"
        onClick={() => alCambiar(Math.max(0, cantidad - 1))}
      >
        −
      </button>
      <span className="marcador" style={{ fontSize: "1.3rem" }}>
        {cantidad}
      </span>
      <button
        type="button"
        className="boton boton-suave"
        onClick={() => alCambiar(cantidad + 1)}
      >
        +
      </button>
      <span className="tenue">bajá hasta cero</span>
    </div>
  );
}

// ---------------------------------------------------------------------------

const BUGS = [
  {
    id: "minuscula",
    titulo: "No se ve nada",
    sintoma:
      "El componente está definido y está usado, pero en pantalla no aparece. Tampoco hay ningún error rojo.",
    Roto: MinusculaRota,
    Arreglado: MinusculaArreglada,
    codigo: `function tarjeta() {
  return <p>Soy una tarjeta.</p>;
}

export default function Pantalla() {
  return (
    <div>
      <p>Abajo de esta línea debería verse una tarjeta:</p>
      <tarjeta />
    </div>
  );
}`,
    lineaClave: 9,
    explicacion:
      "Los componentes tienen que empezar con mayúscula. Con minúscula React no busca tu función: cree que <tarjeta /> es una etiqueta HTML que no conoce y la dibuja vacía. Renombrá la función a Tarjeta y usala como <Tarjeta />.",
  },
  {
    id: "evento",
    titulo: "El botón se dispara solo",
    sintoma:
      "El mensaje aparece apenas se carga la pantalla, sin que nadie toque nada. Y después el botón no hace absolutamente nada.",
    Roto: EventoRoto,
    Arreglado: EventoArreglado,
    codigo: `<button onClick={saludar()}>
  Saludar
</button>`,
    lineaClave: 1,
    explicacion:
      "Con los paréntesis estás LLAMANDO a saludar mientras se arma el JSX, y a onClick le llega el resultado de esa llamada (undefined). Hay que pasar la función sin llamarla: onClick={saludar}. Si necesitás pasarle argumentos, envolvela en una flecha: onClick={() => saludar(algo)}.",
  },
  {
    id: "mutacion",
    titulo: "El estado cambia pero la pantalla no",
    sintoma:
      "Agregás frutas y la lista no se mueve. Pero el arreglo por dentro sí creció: tocá “Forzar un redibujado” y van a aparecer todas juntas.",
    Roto: ListaRota,
    Arreglado: ListaArreglada,
    codigo: `function agregar() {
  items.push("fruta");
  setItems(items);
}`,
    lineaClave: 2,
    explicacion:
      "push modifica el mismo arreglo que ya estaba guardado en el estado. Cuando después se lo pasás a setItems, React compara el valor nuevo con el viejo, ve que es exactamente el mismo objeto y concluye que no hay nada que redibujar. Por eso el dato cambió y la pantalla no. La solución es crear un arreglo nuevo: setItems([...items, \"fruta\"]).",
  },
  {
    id: "cero",
    titulo: "Aparece un 0 de la nada",
    sintoma:
      "Cuando la cantidad llega a cero, en vez de no mostrarse nada aparece un 0 suelto en la pantalla.",
    Roto: CeroRoto,
    Arreglado: CeroArreglado,
    codigo: `{cantidad && <p>Tenés {cantidad} mensajes.</p>}`,
    lineaClave: 1,
    explicacion:
      "El operador && devuelve el valor de la izquierda cuando ese valor es falso, así que devuelve el número 0... y React sabe dibujar números. Con false, null o undefined no dibuja nada, pero con 0 sí. La solución es que la condición sea un booleano de verdad: cantidad > 0 && ...",
  },
];

export default function BancoDeBugs() {
  return (
    <div>
      {BUGS.map((bug) => (
        <TarjetaDeBug key={bug.id} bug={bug} />
      ))}
    </div>
  );
}

function TarjetaDeBug({ bug }) {
  const [arreglado, setArreglado] = useState(false);
  const [verExplicacion, setVerExplicacion] = useState(false);
  const Componente = arreglado ? bug.Arreglado : bug.Roto;

  return (
    <div className="demo" style={{ marginBottom: 20 }}>
      <div className="demo-barra">
        <span
          className="demo-punto"
          style={
            arreglado
              ? undefined
              : {
                  background: "var(--rojo)",
                  boxShadow: "0 0 0 3px var(--rojo-fondo)",
                }
          }
          aria-hidden="true"
        />
        {bug.titulo}
      </div>
      <div className="demo-cuerpo">
        <p style={{ marginTop: 0 }}>{bug.sintoma}</p>

        <Codigo
          archivo={arreglado ? "así se arregla" : "el código con el bug"}
          codigo={arreglado ? arreglar(bug) : bug.codigo}
          resaltar={[bug.lineaClave]}
        />

        <div
          style={{
            border: "1px solid var(--borde)",
            borderRadius: 8,
            padding: 14,
            marginBottom: 14,
            background: "var(--superficie-2)",
          }}
        >
          {/* La key fuerza a React a montar un componente nuevo al cambiar de
              versión, así no se arrastra el estado de la versión anterior. */}
          <Componente key={arreglado ? "ok" : "bug"} />
        </div>

        <div className="fila">
          <button
            type="button"
            className="boton"
            onClick={() => setArreglado(!arreglado)}
          >
            {arreglado ? "Volver al código roto" : "Ver la versión arreglada"}
          </button>
          <button
            type="button"
            className="boton boton-suave"
            onClick={() => setVerExplicacion(!verExplicacion)}
          >
            {verExplicacion ? "Ocultar explicación" : "¿Por qué pasa?"}
          </button>
        </div>

        {verExplicacion && (
          <p style={{ marginBottom: 0, marginTop: 14 }}>{bug.explicacion}</p>
        )}
      </div>
    </div>
  );
}

// Versión corregida del fragmento de código de cada bug.
const ARREGLOS = {
  minuscula: `function Tarjeta() {
  return <p>Soy una tarjeta.</p>;
}

export default function Pantalla() {
  return (
    <div>
      <p>Abajo de esta línea debería verse una tarjeta:</p>
      <Tarjeta />
    </div>
  );
}`,
  evento: `<button onClick={saludar}>
  Saludar
</button>`,
  mutacion: `function agregar() {
  setItems([...items, "fruta"]);
}`,
  cero: `{cantidad > 0 && <p>Tenés {cantidad} mensajes.</p>}`,
};

function arreglar(bug) {
  return ARREGLOS[bug.id] ?? bug.codigo;
}
