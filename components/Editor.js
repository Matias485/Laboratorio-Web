"use client";

import { useState } from "react";
import Vista from "./Vista";

/**
 * Editor en vivo: el alumno cambia el HTML o el CSS y ve el resultado al lado,
 * sin salir de la página. Es la herramienta principal de las lecciones de HTML
 * y CSS.
 *
 * Props:
 *   html      (string) HTML inicial
 *   css       (string) CSS inicial
 *   alto      (number) alto de la vista previa. Si no lo pasás, se ajusta solo.
 *   solapas   ("ambas" | "html" | "css") qué se puede editar. Por defecto ambas.
 *   consigna  (string) una línea corta sugiriendo qué probar.
 */
export default function Editor({
  html = "",
  css = "",
  alto,
  solapas = "ambas",
  consigna,
}) {
  const inicial = { html: recortar(html), css: recortar(css) };
  const [codigo, setCodigo] = useState(inicial);
  const [solapa, setSolapa] = useState(solapas === "css" ? "css" : "html");

  const editables =
    solapas === "ambas" ? ["html", "css"] : [solapas === "css" ? "css" : "html"];
  const tocado = codigo.html !== inicial.html || codigo.css !== inicial.css;

  return (
    <div className="editor">
      <div className="editor-columna">
        <div className="editor-barra">
          <div className="editor-solapas">
            {editables.map((nombre) => (
              <button
                key={nombre}
                type="button"
                className={
                  solapa === nombre
                    ? "editor-solapa editor-solapa-activa"
                    : "editor-solapa"
                }
                onClick={() => setSolapa(nombre)}
              >
                {nombre.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="editor-reiniciar"
            onClick={() => setCodigo(inicial)}
            disabled={!tocado}
          >
            reiniciar
          </button>
        </div>

        <textarea
          className="editor-texto"
          value={codigo[solapa]}
          spellCheck={false}
          onChange={(e) => setCodigo({ ...codigo, [solapa]: e.target.value })}
          aria-label={"Editar el " + solapa.toUpperCase()}
        />
      </div>

      <div className="editor-columna">
        <div className="editor-barra">
          <span className="editor-etiqueta">Resultado</span>
        </div>
        <Vista html={codigo.html} css={codigo.css} alto={alto} />
      </div>

      {consigna && <p className="editor-consigna">✏️ {consigna}</p>}
    </div>
  );
}

// Permite escribir el código indentado dentro del JSX sin que se vea corrido.
function recortar(texto) {
  const lineas = texto.replace(/\t/g, "  ").split("\n");
  while (lineas.length > 0 && lineas[0].trim() === "") lineas.shift();
  while (lineas.length > 0 && lineas[lineas.length - 1].trim() === "") {
    lineas.pop();
  }
  const sangrias = lineas
    .filter((l) => l.trim() !== "")
    .map((l) => l.match(/^ */)[0].length);
  const minima = sangrias.length > 0 ? Math.min(...sangrias) : 0;
  return lineas.map((l) => l.slice(minima)).join("\n");
}
