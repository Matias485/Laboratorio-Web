"use client";

import { useState } from "react";

const CAMPOS = [
  { name: "nombre", etiqueta: "Nombre", tipo: "text" },
  { name: "email", etiqueta: "Email", tipo: "email" },
  { name: "ciudad", etiqueta: "Ciudad", tipo: "text" },
];

/**
 * Tres inputs, un solo manejador. La clave es el atributo name de cada input
 * más la sintaxis de propiedad calculada [e.target.name].
 */
export default function UnManejadorDemo() {
  const [formulario, setFormulario] = useState({
    nombre: "Camila",
    email: "camila@ejemplo.com",
    ciudad: "Rosario",
  });

  function alCambiar(e) {
    setFormulario({
      ...formulario,
      // Las llaves dicen: "usá el VALOR de e.target.name como nombre de la
      // propiedad". Si el input tiene name="ciudad", esto es ciudad: ...
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      {CAMPOS.map((campo) => (
        <label key={campo.name} style={{ display: "block", marginBottom: 10 }}>
          <span className="tenue">{campo.etiqueta}</span>
          <input
            className="entrada"
            style={{ display: "block", width: "100%", maxWidth: 340 }}
            type={campo.tipo}
            name={campo.name}
            value={formulario[campo.name]}
            onChange={alCambiar}
          />
        </label>
      ))}

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Un solo objeto de estado para los tres campos:
      </p>
      <pre style={estiloJson}>{JSON.stringify(formulario, null, 2)}</pre>
    </>
  );
}

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
