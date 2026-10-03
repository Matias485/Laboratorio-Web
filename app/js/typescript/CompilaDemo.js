"use client";

import { useState } from "react";

// Los veredictos están escritos a mano, igual que los mensajes de error: son
// los que tira tsc de verdad, con el modo strict prendido. Acá no compila
// nadie, así que la responsabilidad de que estén bien es de quien los escribió.
const CASOS = [
  {
    id: "edad",
    codigo: 'const edad: number = "20";',
    compila: false,
    error: "Type 'string' is not assignable to type 'number'. ts(2322)",
    explicacion:
      "El caso más simple de todos. Anotaste number y pusiste texto. El 2322 es el error que más vas a ver en tu vida.",
  },
  {
    id: "suma",
    codigo: 'const total = 10 + "5";',
    compila: true,
    error: null,
    explicacion:
      'Compila, y el tipo de total es string: vale "105". TypeScript acepta número más texto porque JavaScript lo acepta. No está para arreglar el lenguaje, está para describirlo.',
  },
  {
    id: "union",
    codigo: 'let estado: "on" | "off" = "on";\nestado = "ON";',
    compila: false,
    error: "Type '\"ON\"' is not assignable to type '\"on\" | \"off\"'. ts(2322)",
    explicacion:
      "Las mayúsculas importan. Una unión de literales solo deja entrar esos textos exactos, y por eso atrapa los errores de tipeo que en JavaScript te enterás tres días después.",
  },
  {
    id: "push",
    codigo: "const lista: string[] = [];\nlista.push(42);",
    compila: false,
    error:
      "Argument of type 'number' is not assignable to parameter of type 'string'. ts(2345)",
    explicacion:
      "El arreglo es de textos, así que push solo acepta textos. Fijate que el mensaje habla de un parámetro: el 2345 aparece siempre que le pasás a una función algo que no corresponde.",
  },
  {
    id: "any",
    codigo: 'const valor: any = "hola";\nvalor.metodoQueNoExiste();',
    compila: true,
    error: null,
    explicacion:
      "Compila perfecto, y explota en ejecución con TypeError: valor.metodoQueNoExiste is not a function. Eso es any: le pediste a TypeScript que mire para otro lado.",
  },
  {
    id: "unknown",
    codigo: 'const valor: unknown = "hola";\nvalor.toUpperCase();',
    compila: false,
    error: "'valor' is of type 'unknown'. ts(18046)",
    explicacion:
      "Mismo código que el anterior, cambiando any por unknown. unknown también significa que no sabés qué hay, pero te obliga a averiguarlo antes de tocarlo. Esta es la diferencia entre los dos.",
  },
  {
    id: "extra",
    codigo:
      "interface Punto { x: number; y: number }\nconst p: Punto = { x: 1, y: 2, z: 3 };",
    compila: false,
    error:
      "Type '{ x: number; y: number; z: number; }' is not assignable to type 'Punto'.\n  Object literal may only specify known properties, and 'z' does not exist in type 'Punto'. ts(2353)",
    explicacion:
      "Sobra una propiedad. TypeScript es especialmente estricto con los objetos escritos ahí mismo, porque una propiedad de más casi siempre es un nombre mal escrito.",
  },
  {
    id: "fetch",
    codigo:
      "const respuesta = await fetch(url);\nconst datos = await respuesta.json();\nconsole.log(datos.loQueSeTeOcurra.deVerdad);",
    compila: true,
    error: null,
    explicacion:
      "Compila sin una queja. respuesta.json() devuelve any, así que a partir de ahí TypeScript no controla nada. Si el servidor te manda otra cosa, te enterás en ejecución. Este es el agujero más importante de todos.",
  },
];

export default function CompilaDemo() {
  const [indice, setIndice] = useState(0);
  const [apuesta, setApuesta] = useState(null);
  const [aciertos, setAciertos] = useState(0);
  const [respondidos, setRespondidos] = useState(0);

  const caso = CASOS[indice];
  const revelado = apuesta !== null;
  const acerto = apuesta === caso.compila;

  function apostar(valor) {
    if (revelado) return;
    setApuesta(valor);
    setRespondidos(respondidos + 1);
    if (valor === caso.compila) setAciertos(aciertos + 1);
  }

  function siguiente() {
    setApuesta(null);
    setIndice((indice + 1) % CASOS.length);
  }

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 10px" }}>
        Caso {indice + 1} de {CASOS.length} · aciertos: {aciertos} de{" "}
        {respondidos}
      </p>

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

      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          disabled={revelado}
          onClick={() => apostar(true)}
        >
          Compila
        </button>
        <button
          type="button"
          className="boton boton-suave"
          disabled={revelado}
          onClick={() => apostar(false)}
        >
          No compila
        </button>
        {revelado && (
          <button type="button" className="boton boton-suave" onClick={siguiente}>
            Siguiente caso →
          </button>
        )}
      </div>

      {revelado && (
        <div>
          <p
            style={{
              margin: "0 0 10px",
              fontWeight: 700,
              color: acerto ? "var(--verde)" : "var(--rojo)",
            }}
          >
            {acerto ? "✓ Bien. " : "✗ No. "}
            {caso.compila
              ? "Esto compila."
              : "Esto no compila: tsc corta acá."}
          </p>

          {caso.error && (
            <pre
              style={{
                margin: "0 0 10px",
                padding: "10px 12px",
                borderRadius: 8,
                borderLeft: "4px solid var(--rojo)",
                background: "var(--rojo-fondo)",
                color: "var(--texto)",
                fontFamily: "var(--fuente-mono)",
                fontSize: "0.78rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {caso.error}
            </pre>
          )}

          <p style={{ margin: 0 }}>{caso.explicacion}</p>
        </div>
      )}

      {!revelado && (
        <p className="tenue" style={{ margin: 0 }}>
          Apostá antes de mirar. Equivocarte acá es gratis.
        </p>
      )}
    </div>
  );
}
