"use client";

import { useState } from "react";

// La función de verdad, en JavaScript común: el resultado que ves abajo lo
// calcula esta función, no está escrito a mano. Los tipos de la tabla sí están
// escritos a mano, porque acá no hay compilador.
function describir(valor) {
  if (valor === null) return "no llegó nada";
  if (typeof valor === "number") return valor.toFixed(2);
  return valor.toUpperCase();
}

const ENTRADAS = [
  { id: "texto", etiqueta: '"hola"', valor: "hola", rama: "texto" },
  { id: "numero", etiqueta: "42", valor: 42, rama: "numero" },
  { id: "nulo", etiqueta: "null", valor: null, rama: "nulo" },
];

// Para cada línea: el código, el tipo que tiene `valor` en ese punto, y en qué
// ramas se ejecuta esa línea.
const LINEAS = [
  {
    codigo: "function describir(valor: string | number | null) {",
    tipo: "string | number | null",
    corre: ["texto", "numero", "nulo"],
  },
  {
    codigo: "  if (valor === null) {",
    tipo: "string | number | null",
    corre: ["texto", "numero", "nulo"],
  },
  {
    codigo: '    return "no llegó nada";',
    tipo: "null",
    corre: ["nulo"],
  },
  { codigo: "  }", tipo: "string | number", corre: ["texto", "numero"] },
  {
    codigo: '  if (typeof valor === "number") {',
    tipo: "string | number",
    corre: ["texto", "numero"],
  },
  {
    codigo: "    return valor.toFixed(2);",
    tipo: "number",
    corre: ["numero"],
  },
  { codigo: "  }", tipo: "string", corre: ["texto"] },
  { codigo: "  return valor.toUpperCase();", tipo: "string", corre: ["texto"] },
  { codigo: "}", tipo: "—", corre: [] },
];

export default function EstrechamientoDemo() {
  const [elegida, setElegida] = useState(0);
  const entrada = ENTRADAS[elegida];

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 8px" }}>
        Elegí qué le llega a la función:
      </p>

      <div className="fila" style={{ gap: 6, marginBottom: 16 }}>
        {ENTRADAS.map((item, indice) => (
          <button
            key={item.id}
            type="button"
            className={indice === elegida ? "boton" : "boton boton-suave"}
            aria-pressed={indice === elegida}
            style={{ fontFamily: "var(--fuente-mono)", fontSize: "0.82rem" }}
            onClick={() => setElegida(indice)}
          >
            describir({item.etiqueta})
          </button>
        ))}
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.82rem",
          marginBottom: 12,
        }}
      >
        <thead>
          <tr>
            <th
              scope="col"
              style={{
                textAlign: "left",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--texto-suave)",
                padding: "6px 8px",
                borderBottom: "2px solid var(--borde)",
              }}
            >
              Código
            </th>
            <th
              scope="col"
              style={{
                textAlign: "left",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--texto-suave)",
                padding: "6px 8px",
                borderBottom: "2px solid var(--borde)",
                whiteSpace: "nowrap",
              }}
            >
              Tipo de valor acá
            </th>
          </tr>
        </thead>
        <tbody>
          {LINEAS.map((linea, indice) => {
            const activa = linea.corre.includes(entrada.rama);
            return (
              <tr key={indice}>
                <td
                  style={{
                    fontFamily: "var(--fuente-mono)",
                    whiteSpace: "pre",
                    padding: "5px 8px",
                    borderBottom: "1px solid var(--borde)",
                    opacity: activa ? 1 : 0.35,
                    background: activa ? "var(--azul-100)" : "transparent",
                  }}
                >
                  {linea.codigo}
                </td>
                <td
                  style={{
                    fontFamily: "var(--fuente-mono)",
                    padding: "5px 8px",
                    borderBottom: "1px solid var(--borde)",
                    opacity: activa ? 1 : 0.35,
                    fontWeight: activa ? 700 : 400,
                    color: activa
                      ? "var(--pista, var(--azul-700))"
                      : "var(--texto-suave)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {linea.tipo}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p style={{ margin: "0 0 6px" }}>
        <span className="tenue">Devuelve: </span>
        <code>{JSON.stringify(describir(entrada.valor))}</code>
      </p>

      <p className="tenue" style={{ margin: 0 }}>
        Nadie anotó ningún tipo adentro de la función. TypeScript los va
        achicando solo, leyendo los <code>if</code> igual que los leés vos.
      </p>
    </div>
  );
}
