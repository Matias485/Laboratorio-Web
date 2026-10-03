"use client";

import { useState } from "react";
import Codigo from "@/components/Codigo";

// Cuatro pedazos de HTML de los que aparecen todo el tiempo, con su traducción
// a JSX al lado. Cada uno rompe alguna de las tres reglas.

const FRAGMENTOS = [
  {
    id: "titulo",
    nombre: "Un título y un párrafo",
    html: `<h1 class="titulo">Tareas</h1>
<p class="resumen">Tres cosas para hoy</p>`,
    jsx: `<>
  <h1 className="titulo">Tareas</h1>
  <p className="resumen">Tres cosas para hoy</p>
</>`,
    resaltar: [1, 4],
    cambios: [
      "Son dos elementos sueltos y un componente devuelve uno solo: los envolvimos en un Fragment, esa etiqueta vacía <> … </>.",
      "class pasa a className en los dos: en el DOM la propiedad siempre se llamó elemento.className, porque class es palabra reservada de JavaScript.",
    ],
  },
  {
    id: "imagen",
    nombre: "Una imagen y un salto de línea",
    html: `<img src="https://i.imgur.com/7vQD0fPs.jpg" alt="Gregorio Y. Zara">
<br>`,
    jsx: `<>
  <img src="https://i.imgur.com/7vQD0fPs.jpg" alt="Gregorio Y. Zara" />
  <br />
</>`,
    resaltar: [2, 3],
    cambios: [
      "En HTML <img> y <br> nunca se cierran; en JSX se autocierran sí o sí con />.",
      "Otra vez son dos elementos, así que hace falta el Fragment.",
    ],
  },
  {
    id: "campo",
    nombre: "Un campo con su etiqueta",
    html: `<label for="mail">Tu mail</label>
<input id="mail" type="email" maxlength="40" tabindex="1">`,
    jsx: `<>
  <label htmlFor="mail">Tu mail</label>
  <input id="mail" type="email" maxLength={40} tabIndex={1} />
</>`,
    resaltar: [2, 3],
    cambios: [
      "for pasa a htmlFor, que es como se llama la propiedad en el DOM (for es palabra reservada, la del for de toda la vida).",
      "maxlength y tabindex pasan a camelCase: maxLength y tabIndex.",
      "40 y 1 son números, así que van entre llaves y no entre comillas.",
    ],
  },
  {
    id: "boton",
    nombre: "Un botón con estilo y onclick",
    html: `<button onclick="saludar()" style="background-color: black; color: pink">
  Saludar
</button>`,
    jsx: `<button
  type="button"
  onClick={saludar}
  style={{ backgroundColor: "black", color: "pink" }}
>
  Saludar
</button>`,
    resaltar: [3, 4],
    cambios: [
      "onclick pasa a onClick, y no recibe un texto: recibe la función de verdad, sin paréntesis.",
      "style deja de ser un texto y pasa a ser un objeto de JavaScript: por eso hay dos llaves.",
      "Adentro del objeto, background-color pasa a backgroundColor.",
    ],
  },
];

export default function TraductorHtmlJsxDemo() {
  const [id, setId] = useState(FRAGMENTOS[0].id);
  const fragmento = FRAGMENTOS.find((f) => f.id === id);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <label htmlFor="jsx-fragmento">Pedazo de HTML</label>
        <select
          id="jsx-fragmento"
          className="entrada"
          value={id}
          onChange={(e) => setId(e.target.value)}
        >
          {FRAGMENTOS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nombre}
            </option>
          ))}
        </select>
      </div>

      <Codigo archivo="pagina.html" codigo={fragmento.html} />
      <Codigo
        archivo="Componente.js"
        codigo={fragmento.jsx}
        resaltar={fragmento.resaltar}
      />

      <p style={{ margin: "0 0 6px", fontWeight: 600 }}>Qué cambió</p>
      <ul style={{ margin: 0, paddingLeft: 22 }}>
        {fragmento.cambios.map((cambio) => (
          <li key={cambio} className="tenue">
            {cambio}
          </li>
        ))}
      </ul>
    </div>
  );
}
