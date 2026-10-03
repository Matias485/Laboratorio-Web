"use client";

import { useState } from "react";

/**
 * Bloque de código con números de línea, colores y botón para copiar.
 *
 * Props:
 *   codigo    (string, obligatorio) el código a mostrar
 *   archivo   (string) nombre que se muestra arriba a la izquierda, ej. "App.js"
 *   resaltar  (array de números) líneas a marcar con fondo azul, ej. [3, 4]
 *
 * Ejemplo de uso:
 *   <Codigo archivo="Contador.js" resaltar={[2]} codigo={`...`} />
 */
export default function Codigo({ codigo = "", archivo, resaltar = [] }) {
  const [copiado, setCopiado] = useState(false);
  const fuente = quitarSangria(codigo);
  const lineas = aLineas(fuente);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(fuente);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch {
      // Si el navegador bloquea el portapapeles no hacemos nada: el código
      // igual se puede seleccionar a mano.
    }
  }

  return (
    <div className="codigo-caja">
      <div className="codigo-barra">
        <span>{archivo ?? "jsx"}</span>
        <button type="button" className="codigo-copiar" onClick={copiar}>
          {copiado ? "¡copiado!" : "copiar"}
        </button>
      </div>
      <pre>
        <code>
          {lineas.map((tokens, i) => {
            const numero = i + 1;
            const marcada = resaltar.includes(numero);
            return (
              <span
                key={numero}
                className={
                  marcada ? "codigo-linea codigo-linea-resaltada" : "codigo-linea"
                }
              >
                <span className="codigo-numero">{numero}</span>
                {tokens.map((token, j) => (
                  <span key={j} className={token.clase}>
                    {token.texto}
                  </span>
                ))}
                {"\n"}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

// --------------------------------------------------------------------------
// Coloreado. No usamos ninguna librería: una sola expresión regular reconoce
// comentarios, cadenas, palabras clave, números, etiquetas JSX y llamadas a
// funciones. Cada grupo de captura corresponde a una clase de color del CSS.
// --------------------------------------------------------------------------

const PALABRAS_CLAVE = [
  "import", "from", "export", "default", "function", "return", "const", "let",
  "var", "if", "else", "for", "while", "new", "class", "extends", "typeof",
  "instanceof", "await", "async", "try", "catch", "finally", "throw", "switch",
  "case", "break", "continue", "delete", "in", "of", "do", "null", "undefined",
  "true", "false", "this",
];

const PATRON = new RegExp(
  [
    // 1. comentarios de una línea y de varias
    "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)",
    // 2. cadenas: plantillas, comillas dobles y comillas simples
    "(`(?:\\\\.|[^`\\\\])*`|\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*')",
    // 3. palabras clave del lenguaje
    "(\\b(?:" + PALABRAS_CLAVE.join("|") + ")\\b)",
    // 4. números
    "(\\b\\d+(?:\\.\\d+)?\\b)",
    // 5. apertura y cierre de etiquetas JSX: <div, </div, <Perfil
    "(<\\/?[A-Za-z][\\w.-]*)",
    // 6. nombre seguido de paréntesis, o sea una llamada a función
    "(\\b[A-Za-z_$][\\w$]*(?=\\s*\\())",
  ].join("|"),
  "g",
);

const CLASES = [
  "t-comentario",
  "t-cadena",
  "t-clave",
  "t-numero",
  "t-etiqueta",
  "t-funcion",
];

// Recorre el código y devuelve una lista de { texto, clase }.
function aTokens(fuente) {
  const tokens = [];
  let ultimo = 0;
  let coincidencia;

  PATRON.lastIndex = 0;
  while ((coincidencia = PATRON.exec(fuente)) !== null) {
    if (coincidencia.index > ultimo) {
      tokens.push({ texto: fuente.slice(ultimo, coincidencia.index), clase: "" });
    }
    // Averiguamos qué grupo de captura fue el que coincidió.
    const grupo = CLASES.findIndex((_, i) => coincidencia[i + 1] !== undefined);
    tokens.push({ texto: coincidencia[0], clase: CLASES[grupo] ?? "" });
    ultimo = coincidencia.index + coincidencia[0].length;
  }

  if (ultimo < fuente.length) {
    tokens.push({ texto: fuente.slice(ultimo), clase: "" });
  }
  return tokens;
}

// Los tokens pueden contener saltos de línea (un comentario /* */ por ejemplo),
// así que los partimos para poder dibujar una línea por renglón.
function aLineas(fuente) {
  const lineas = [[]];
  for (const token of aTokens(fuente)) {
    const partes = token.texto.split("\n");
    partes.forEach((parte, i) => {
      if (i > 0) lineas.push([]);
      if (parte !== "") {
        lineas[lineas.length - 1].push({ texto: parte, clase: token.clase });
      }
    });
  }
  return lineas;
}

// Permite escribir el código indentado dentro del JSX sin que se vea corrido.
function quitarSangria(texto) {
  const lineas = texto.replace(/\t/g, "  ").split("\n");
  while (lineas.length > 0 && lineas[0].trim() === "") lineas.shift();
  while (lineas.length > 0 && lineas[lineas.length - 1].trim() === "") lineas.pop();

  const sangrias = lineas
    .filter((linea) => linea.trim() !== "")
    .map((linea) => linea.match(/^ */)[0].length);
  const minima = sangrias.length > 0 ? Math.min(...sangrias) : 0;

  return lineas.map((linea) => linea.slice(minima)).join("\n");
}
