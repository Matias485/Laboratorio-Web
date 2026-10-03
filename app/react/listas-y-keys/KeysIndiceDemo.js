"use client";

import { useState } from "react";

const INICIALES = [
  { id: 101, nombre: "Ana" },
  { id: 102, nombre: "Bruno" },
  { id: 103, nombre: "Carla" },
];

export default function KeysIndiceDemo() {
  const [personas, setPersonas] = useState(INICIALES);

  function insertarAlPrincipio() {
    setPersonas((actuales) => {
      // El id se genera acá, una sola vez, cuando nace el dato. Nunca en el
      // render: si lo generáramos ahí, cambiaría en cada renderizado.
      const id = Math.max(...actuales.map((persona) => persona.id)) + 1;
      return [{ id, nombre: "Nuevo " + id }, ...actuales];
    });
  }

  function darVuelta() {
    // Copiamos antes de invertir: reverse() muta el arreglo original.
    setPersonas((actuales) => [...actuales].reverse());
  }

  function reiniciar() {
    setPersonas(INICIALES);
  }

  return (
    <div>
      <p style={{ marginTop: 0 }}>
        <strong>1.</strong> Escribí algo distinto en cada casillero de las dos
        columnas (por ejemplo el nombre que tiene al lado).{" "}
        <strong>2.</strong> Recién después tocá uno de los botones.
      </p>

      <div className="fila" style={{ marginBottom: 16 }}>
        <button type="button" className="boton" onClick={insertarAlPrincipio}>
          Insertar al principio
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={darVuelta}
        >
          Dar vuelta
        </button>
        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>

      <div className="comparacion">
        <div className="columna columna-mal">
          <h3 className="columna-titulo">✗ key = indice</h3>
          <div className="columna-cuerpo">
            {personas.map((persona, indice) => (
              <Fila key={indice} persona={persona} />
            ))}
          </div>
        </div>

        <div className="columna columna-bien">
          <h3 className="columna-titulo">✓ key = persona.id</h3>
          <div className="columna-cuerpo">
            {personas.map((persona) => (
              <Fila key={persona.id} persona={persona} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// El input NO está controlado: su texto no vive en ningún useState nuestro,
// vive adentro del nodo del DOM. Por eso sirve para espiar qué nodos reusa
// React: si el texto se queda quieto mientras el nombre se mueve, es que React
// reusó ese mismo input para otra persona.
function Fila({ persona }) {
  return (
    <label className="fila" style={{ marginBottom: 8, flexWrap: "nowrap" }}>
      <span style={{ width: 82, flexShrink: 0, fontWeight: 600 }}>
        {persona.nombre}
      </span>
      <input
        className="entrada"
        type="text"
        placeholder="escribí algo"
        style={{ flex: 1 }}
      />
    </label>
  );
}
