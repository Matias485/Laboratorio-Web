"use client";

import { useState } from "react";

/**
 * El ejemplo de la diapositiva: un objeto con otro objeto adentro.
 * Para cambiar algo de "obra" hay que copiar los DOS niveles.
 */
export default function FichaArtistaDemo() {
  const [persona, setPersona] = useState({
    nombre: "Niki de Saint Phalle",
    obra: {
      titulo: "Blue Nana",
      ciudad: "Hamburgo",
      imagen: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  function cambiarNombre(e) {
    // Un solo nivel: nombre está en la raíz del objeto.
    setPersona({ ...persona, nombre: e.target.value });
  }

  function cambiarTitulo(e) {
    // Dos niveles: copiamos persona y adentro copiamos persona.obra.
    setPersona({
      ...persona,
      obra: { ...persona.obra, titulo: e.target.value },
    });
  }

  function cambiarCiudad(e) {
    setPersona({
      ...persona,
      obra: { ...persona.obra, ciudad: e.target.value },
    });
  }

  function mudarObra() {
    setPersona({
      ...persona,               // copia el nivel 1: nombre y obra
      obra: {
        ...persona.obra,        // copia el nivel 2: titulo, ciudad e imagen
        ciudad: "Nueva Delhi",  // y recién ahora pisamos la ciudad
      },
    });
  }

  return (
    <>
      <label style={estiloEtiqueta}>
        <span className="tenue">Nombre de la artista</span>
        <input
          className="entrada"
          style={estiloEntrada}
          value={persona.nombre}
          onChange={cambiarNombre}
        />
      </label>

      <label style={estiloEtiqueta}>
        <span className="tenue">Título de la obra</span>
        <input
          className="entrada"
          style={estiloEntrada}
          value={persona.obra.titulo}
          onChange={cambiarTitulo}
        />
      </label>

      <label style={estiloEtiqueta}>
        <span className="tenue">Ciudad</span>
        <input
          className="entrada"
          style={estiloEntrada}
          value={persona.obra.ciudad}
          onChange={cambiarCiudad}
        />
      </label>

      <button
        type="button"
        className="boton boton-suave"
        onClick={mudarObra}
      >
        Mudar la obra a Nueva Delhi
      </button>

      <p style={{ margin: "16px 0 6px" }}>
        <strong>{persona.obra.titulo}</strong>, de {persona.nombre} — está en{" "}
        {persona.obra.ciudad}.
      </p>
      <img
        src={persona.obra.imagen}
        alt={persona.obra.titulo}
        width={160}
        style={{ borderRadius: 8, display: "block" }}
      />

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        El objeto que hay en el estado ahora mismo:
      </p>
      <pre style={estiloJson}>{JSON.stringify(persona, null, 2)}</pre>
    </>
  );
}

const estiloEtiqueta = { display: "block", marginBottom: 10 };
const estiloEntrada = { display: "block", width: "100%", maxWidth: 340 };

const estiloJson = {
  margin: "6px 0 0",
  padding: "10px 12px",
  background: "var(--superficie-2)",
  border: "1px solid var(--borde)",
  borderRadius: 8,
  fontFamily: "var(--fuente-mono)",
  fontSize: "0.82rem",
  overflowX: "auto",
};
