"use client";

import { useState } from "react";
import PanelRegistro from "./PanelRegistro";

let proximoId = 1;

export default function ObjetoDelEventoDemo() {
  const [registro, setRegistro] = useState([]);
  const [texto, setTexto] = useState("");

  function anotar(texto) {
    const id = proximoId++;
    setRegistro((anteriores) => [...anteriores, { id, texto }].slice(-5));
  }

  // React le pasa a todo manejador un objeto con los datos del evento.
  // Por convención lo llamamos e (de "event").
  function manejarClickEnLaCaja(e) {
    // e.target: el elemento exacto que tocaste.
    // e.currentTarget: el elemento que tiene puesto este onClick.
    const donde = `e.target = <${e.target.tagName.toLowerCase()}>`;
    const quien = `e.currentTarget = <${e.currentTarget.tagName.toLowerCase()}>`;
    anotar(`${donde}   ·   ${quien}`);
  }

  // En un input, lo que escribiste vive en e.target.value.
  function manejarCambio(e) {
    setTexto(e.target.value);
  }

  return (
    <div>
      {/* Este div entero tiene el onClick, pero adentro hay cosas distintas. */}
      <div
        onClick={manejarClickEnLaCaja}
        style={{
          border: "1px dashed var(--azul-300)",
          borderRadius: 10,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <p className="tenue" style={{ margin: "0 0 10px" }}>
          El onClick está en esta caja punteada. Tocá cualquier cosa de adentro:
        </p>
        <div className="fila">
          <button type="button" className="boton">
            un botón
          </button>
          <strong>un texto</strong>
          <img
            src="https://i.imgur.com/MK3eW3As.jpg"
            alt="Katherine Johnson"
            width={44}
            height={44}
            style={{ borderRadius: 8 }}
          />
        </div>
      </div>

      <PanelRegistro
        lineas={registro}
        vacio="currentTarget es siempre el div (el que tiene el onClick). target es lo que tocaste."
      />

      <div style={{ marginTop: 18 }}>
        <label htmlFor="eventos-nombre" style={{ display: "block" }}>
          Escribí algo y mirá <code>e.target.value</code>:
        </label>
        <div className="fila" style={{ marginTop: 6 }}>
          <input
            id="eventos-nombre"
            className="entrada"
            value={texto}
            onChange={manejarCambio}
            placeholder="tu nombre"
          />
          <span className="tenue">
            e.target.value → &quot;{texto}&quot; ({texto.length} caracteres)
          </span>
        </div>
      </div>
    </div>
  );
}
