"use client";

import { useState } from "react";

export default function FormularioDemo() {
  const [enviado, setEnviado] = useState(null);
  const [dejarRecargar, setDejarRecargar] = useState(false);

  function manejarEnvio(e) {
    // Si no llamamos a preventDefault, el navegador hace lo suyo: manda el
    // formulario y RECARGA la página. Se pierde todo lo que había en pantalla.
    if (dejarRecargar) return;

    e.preventDefault();

    // En un submit, e.target es el <form>, así que podemos leerle los campos.
    const formulario = e.target;
    setEnviado({
      nombre: formulario.elements.nombre.value,
      materia: formulario.elements.materia.value,
    });
  }

  return (
    <div>
      <label className="fila" style={{ gap: 8, marginBottom: 14 }}>
        <input
          type="checkbox"
          checked={dejarRecargar}
          onChange={(e) => setDejarRecargar(e.target.checked)}
        />
        No llamar a <code>e.preventDefault()</code> (ojo: recarga la página)
      </label>

      <form onSubmit={manejarEnvio}>
        <div className="fila" style={{ marginBottom: 10 }}>
          <label htmlFor="eventos-alumno">Nombre</label>
          <input
            id="eventos-alumno"
            name="nombre"
            className="entrada"
            defaultValue="Ada"
          />
          <label htmlFor="eventos-materia">Materia</label>
          <input
            id="eventos-materia"
            name="materia"
            className="entrada"
            defaultValue="Taller de Programación II"
          />
        </div>
        <button type="submit" className="boton">
          Enviar
        </button>
      </form>

      <div style={{ marginTop: 14 }}>
        {enviado ? (
          <p
            style={{
              margin: 0,
              padding: "10px 12px",
              borderRadius: 8,
              background: "var(--verde-fondo)",
              color: "var(--verde)",
              fontFamily: "var(--fuente-mono)",
              fontSize: "0.85rem",
            }}
          >
            Recibido sin recargar → {enviado.nombre} · {enviado.materia}
          </p>
        ) : (
          <p className="tenue" style={{ margin: 0 }}>
            Apretá Enviar. Con preventDefault, lo enviado aparece acá abajo y la
            página ni se entera.
          </p>
        )}
      </div>
    </div>
  );
}
