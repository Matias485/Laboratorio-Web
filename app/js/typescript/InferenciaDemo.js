"use client";

import { useState } from "react";

// En esta página no hay un compilador de TypeScript corriendo: no se puede.
// Así que los tipos inferidos de abajo están escritos a mano, uno por uno,
// copiados de lo que muestra el editor al pasar el mouse por encima.
const CASOS = [
  {
    id: "const-texto",
    codigo: 'const nombre = "Ana";',
    tipo: '"Ana"',
    porque:
      "Es const: el valor no se puede reasignar nunca. Entonces TypeScript le da el tipo más chico que existe, el literal exacto.",
    consejo: "No anotes nada. Anotar :string acá sería perder información.",
  },
  {
    id: "let-texto",
    codigo: 'let nombre = "Ana";',
    tipo: "string",
    porque:
      "Con let el valor puede cambiar más adelante, así que el tipo tiene que dejar entrar cualquier otro texto.",
    consejo: "No anotes nada.",
  },
  {
    id: "arreglo",
    codigo: "const numeros = [1, 2, 3];",
    tipo: "number[]",
    porque:
      "Todos los elementos son números, así que el arreglo es de números. El literal se pierde porque un arreglo sí se puede modificar.",
    consejo: "No anotes nada.",
  },
  {
    id: "mezcla",
    codigo: 'const mezcla = [1, "dos", 3];',
    tipo: "(string | number)[]",
    porque:
      "TypeScript junta los tipos que encontró en una unión. Fijate que no dice any: sigue sabiendo exactamente qué puede haber adentro.",
    consejo:
      "No anotes nada, pero preguntate si el arreglo mezclado es lo que querías.",
  },
  {
    id: "objeto",
    codigo: 'const usuario = { nombre: "Ana", edad: 20 };',
    tipo: "{ nombre: string; edad: number; }",
    porque:
      "Arma la forma del objeto propiedad por propiedad. Ojo: los valores quedan como string y number, no como literales, porque las propiedades se pueden reasignar.",
    consejo:
      "No anotes nada acá. Sí conviene declarar un type cuando ese objeto viaja entre archivos.",
  },
  {
    id: "funcion",
    codigo: "function doble(n: number) {\n  return n * 2;\n}",
    tipo: "(n: number) => number",
    porque:
      "El parámetro lo anotaste vos (sin eso sería un error). El retorno lo deduce solo: un número por dos es un número.",
    consejo:
      "El parámetro SÍ va anotado. El retorno es opcional; en funciones exportadas conviene ponerlo igual.",
  },
  {
    id: "filter",
    codigo: "const pares = [1, 2, 3, 4].filter((n) => n % 2 === 0);",
    tipo: "number[]",
    porque:
      "La n de la flecha ya viene tipada como number porque el arreglo era de números. Esto se llama tipado contextual y es lo que hace que casi nunca tengas que anotar callbacks.",
    consejo: "No anotes la n. El editor ya sabe qué es.",
  },
  {
    id: "json",
    codigo: "const datos = JSON.parse(textoDelServidor);",
    tipo: "any",
    porque:
      "Acá la inferencia se rinde, y con razón: nadie puede saber qué hay adentro de un texto JSON antes de leerlo. any apaga todos los controles sobre datos.",
    consejo:
      "Este es de los pocos lugares donde tenés que intervenir vos: anotá el tipo que esperás, o mejor, validá los datos antes de usarlos.",
  },
];

export default function InferenciaDemo() {
  const [elegido, setElegido] = useState(0);
  const caso = CASOS[elegido];

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 8px" }}>
        Elegí una declaración y mirá qué tipo le pone TypeScript sin que vos
        escribas nada:
      </p>

      <div className="fila" style={{ gap: 6, marginBottom: 18 }}>
        {CASOS.map((item, indice) => (
          <button
            key={item.id}
            type="button"
            className={indice === elegido ? "boton" : "boton boton-suave"}
            aria-pressed={indice === elegido}
            style={{
              fontFamily: "var(--fuente-mono)",
              fontSize: "0.76rem",
              padding: "5px 10px",
            }}
            onClick={() => setElegido(indice)}
          >
            {item.codigo.split("\n")[0].slice(0, 34)}
          </button>
        ))}
      </div>

      <pre
        style={{
          margin: "0 0 14px",
          padding: "12px 14px",
          borderRadius: 8,
          background: "var(--codigo-fondo)",
          color: "var(--codigo-texto)",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.82rem",
          overflowX: "auto",
        }}
      >
        {caso.codigo}
      </pre>

      <p style={{ margin: "0 0 4px" }}>
        <span className="tenue">TypeScript infiere: </span>
      </p>
      <p
        className="marcador"
        style={{ fontSize: "1.2rem", margin: "0 0 12px", wordBreak: "break-word" }}
      >
        {caso.tipo}
      </p>

      <p style={{ margin: "0 0 8px" }}>{caso.porque}</p>

      <p className="tenue" style={{ margin: 0 }}>
        <strong>¿Hace falta anotarlo?</strong> {caso.consejo}
      </p>
    </div>
  );
}
