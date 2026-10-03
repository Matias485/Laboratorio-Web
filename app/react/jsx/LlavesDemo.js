"use client";

import { useState } from "react";

// Las llaves son la puerta entre el marcado y JavaScript. Todo lo que ves
// cambiar acá abajo sale de expresiones metidas entre llaves.

const FOTO = "https://i.imgur.com/7vQD0fPs.jpg";

export default function LlavesDemo() {
  const [nombre, setNombre] = useState("Gregorio");
  const [tamano, setTamano] = useState(90);

  const persona = { nombre: nombre, foto: FOTO };

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <label htmlFor="jsx-nombre">Nombre</label>
        <input
          id="jsx-nombre"
          className="entrada"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="jsx-tamano">Foto</label>
        <input
          id="jsx-tamano"
          type="range"
          min="60"
          max="180"
          value={tamano}
          onChange={(e) => setTamano(Number(e.target.value))}
        />
        <span className="tenue">{tamano}px</span>
      </div>

      <h3>Hola, {persona.nombre}</h3>
      <img
        src={persona.foto}
        alt={`Foto de ${persona.nombre}`}
        width={tamano}
        style={{ borderRadius: 8 }}
      />
      <p className="tenue">
        Tu nombre tiene {persona.nombre.length} letras y al revés se escribe{" "}
        {persona.nombre.split("").reverse().join("")}.
      </p>
    </div>
  );
}
