"use client";

import { useState } from "react";

// Mismo componente que ListaDeTareas.js, pero con el tema atado al estado:
// así se ve que style recibe un objeto de JavaScript vivo, no un texto.

const TEMAS = [
  { nombre: "Noche", fondo: "#000000", texto: "#ffc0cb" },
  { nombre: "Pizarrón", fondo: "#0f4c3a", texto: "#f7f3e3" },
  { nombre: "Papel", fondo: "#fdf6e3", texto: "#4a3b1f" },
];

export default function ListaDeTareasDemo() {
  const [fondo, setFondo] = useState("#000000");
  const [texto, setTexto] = useState("#ffc0cb");

  // Este objeto se arma de nuevo en cada render, con los colores actuales.
  const persona = {
    nombre: "Gregorio Y. Zara",
    tema: {
      backgroundColor: fondo,
      color: texto,
      padding: 16,
      borderRadius: 10,
    },
  };

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        {TEMAS.map((tema) => (
          <button
            key={tema.nombre}
            type="button"
            className="boton boton-suave"
            onClick={() => {
              setFondo(tema.fondo);
              setTexto(tema.texto);
            }}
          >
            {tema.nombre}
          </button>
        ))}
      </div>

      <div className="fila" style={{ marginBottom: 16 }}>
        <label htmlFor="jsx-color-fondo">Fondo</label>
        <input
          id="jsx-color-fondo"
          className="entrada"
          type="color"
          value={fondo}
          onChange={(e) => setFondo(e.target.value)}
          style={{ width: 54, padding: 2 }}
        />
        <label htmlFor="jsx-color-texto">Texto</label>
        <input
          id="jsx-color-texto"
          className="entrada"
          type="color"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          style={{ width: 54, padding: 2 }}
        />
      </div>

      <div style={persona.tema}>
        <h1>Tareas de {persona.nombre}</h1>
        <img
          src="https://i.imgur.com/7vQD0fPs.jpg"
          alt="Gregorio Y. Zara"
          style={{ borderRadius: 8 }}
        />
        <ul>
          <li>Mejorar el videoteléfono</li>
          <li>Preparar las clases de aeronáutica</li>
          <li>Trabajar en el motor a alcohol</li>
        </ul>
      </div>

      <p className="tenue" style={{ fontFamily: "var(--fuente-mono)", marginTop: 12 }}>
        {`style={{ backgroundColor: "${fondo}", color: "${texto}" }}`}
      </p>
    </div>
  );
}
