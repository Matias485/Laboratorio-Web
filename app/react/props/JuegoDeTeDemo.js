"use client";

import { useState } from "react";

// El mismo Taza de la diapositiva: recibe una sola prop, "invitado".
function Taza({ invitado }) {
  return (
    <h2 style={{ margin: "6px 0" }}>Taza de té para el invitado #{invitado}</h2>
  );
}

export default function JuegoDeTeDemo() {
  const [invitados, setInvitados] = useState(3);

  function cambiarCantidad(evento) {
    const numero = Number(evento.target.value);
    // Nos quedamos entre 0 y 12 para no dibujar mil tazas.
    setInvitados(Number.isNaN(numero) ? 0 : Math.min(12, Math.max(0, numero)));
  }

  // Un arreglo [1, 2, 3, ...] con un número por invitado.
  const numeros = Array.from({ length: invitados }, (_, i) => i + 1);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        <label htmlFor="cantidad-invitados">¿Cuántos invitados hay?</label>
        <input
          id="cantidad-invitados"
          className="entrada"
          type="number"
          min="0"
          max="12"
          value={invitados}
          onChange={cambiarCantidad}
          style={{ width: 90 }}
        />
      </div>

      {numeros.map((numero) => (
        <Taza key={numero} invitado={numero} />
      ))}

      {invitados === 0 && (
        <p className="tenue">Sin invitados no se renderiza ninguna Taza.</p>
      )}
    </div>
  );
}
