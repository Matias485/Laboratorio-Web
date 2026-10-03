"use client";

import { useState } from "react";

// Cada entrada guarda la expresión tal cual se escribe y una función que la
// evalúa. El valor va adentro de una función para que los objetos y los
// arreglos se creen nuevos en cada clic, igual que pasaría en tu código.
const VALORES = [
  { expresion: '"hola"', crear: () => "hola" },
  { expresion: '""', crear: () => "" },
  { expresion: '"0"', crear: () => "0" },
  { expresion: "42", crear: () => 42 },
  { expresion: "0", crear: () => 0 },
  { expresion: "NaN", crear: () => NaN },
  { expresion: "true", crear: () => true },
  { expresion: "false", crear: () => false },
  { expresion: "null", crear: () => null },
  { expresion: "undefined", crear: () => undefined },
  { expresion: "[1, 2, 3]", crear: () => [1, 2, 3] },
  { expresion: "[]", crear: () => [] },
  { expresion: '{ nombre: "Ada" }', crear: () => ({ nombre: "Ada" }) },
  { expresion: "function saludar() {}", crear: () => function saludar() {} },
];

// Cómo mostramos un valor cualquiera en el panel. JSON.stringify no alcanza:
// se come el undefined y convierte NaN en null, que son justo los casos que
// queremos enseñar.
function mostrar(valor) {
  if (valor === undefined) return "undefined";
  if (typeof valor === "function") return "ƒ (una función)";
  if (typeof valor === "number" && Number.isNaN(valor)) return "NaN";
  if (typeof valor === "string") return `"${valor}"`;
  return JSON.stringify(valor);
}

export default function InspectorDeTipos() {
  const [elegido, setElegido] = useState(0);

  const caso = VALORES[elegido];
  const valor = caso.crear();

  const tipo = typeof valor;
  // El if de verdad: así se comporta el valor en un if, en un && o en un ?:
  const esVerdadero = valor ? true : false;

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 8px" }}>
        Elegí una expresión:
      </p>

      <div className="fila" style={{ gap: 6, marginBottom: 18 }}>
        {VALORES.map((item, indice) => (
          <button
            key={item.expresion}
            type="button"
            className={indice === elegido ? "boton" : "boton boton-suave"}
            aria-pressed={indice === elegido}
            style={{
              fontFamily: "var(--fuente-mono)",
              fontSize: "0.78rem",
              padding: "5px 10px",
            }}
            onClick={() => setElegido(indice)}
          >
            {item.expresion}
          </button>
        ))}
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}
      >
        <tbody>
          <Fila etiqueta="El valor" valor={mostrar(valor)} />
          <Fila etiqueta="typeof" valor={`"${tipo}"`} destacada />
          <Fila
            etiqueta="Array.isArray()"
            valor={String(Array.isArray(valor))}
          />
          <Fila
            etiqueta="En un if entra?"
            valor={esVerdadero ? "sí, es truthy" : "no, es falsy"}
            destacada
          />
        </tbody>
      </table>

      {valor === null && (
        <p className="tenue" style={{ marginBottom: 0 }}>
          <code>typeof null</code> dice <code>&quot;object&quot;</code>, pero{" "}
          <code>null</code> no es un objeto: es el bug más viejo del lenguaje y
          ya no lo pueden arreglar.
        </p>
      )}
      {Array.isArray(valor) && (
        <p className="tenue" style={{ marginBottom: 0 }}>
          <code>typeof</code> dice <code>&quot;object&quot;</code> y tiene razón:
          un arreglo <em>es</em> un objeto. Por eso existe{" "}
          <code>Array.isArray</code>. Y ojo: hasta el arreglo vacío es truthy.
        </p>
      )}
    </div>
  );
}

function Fila({ etiqueta, valor, destacada = false }) {
  return (
    <tr style={{ borderTop: "1px solid var(--borde)" }}>
      <th
        scope="row"
        style={{
          textAlign: "left",
          fontWeight: 600,
          padding: "7px 10px 7px 0",
          whiteSpace: "nowrap",
          color: "var(--texto-suave)",
        }}
      >
        {etiqueta}
      </th>
      <td
        style={{
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.85rem",
          padding: "7px 0",
          color: destacada ? "var(--pista, var(--azul-700))" : "inherit",
          fontWeight: destacada ? 700 : 400,
          wordBreak: "break-all",
        }}
      >
        {valor}
      </td>
    </tr>
  );
}
