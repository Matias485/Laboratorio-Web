"use client";

import { useState } from "react";

let siguienteId = 4;

const INICIALES = [
  { id: 1, texto: "Amasar" },
  { id: 2, texto: "Hornear" },
  { id: 3, texto: "Comer" },
];

export default function InsertarEnMedio() {
  const [pasos, setPasos] = useState(INICIALES);
  const [texto, setTexto] = useState("Dejar levar");
  const [posicion, setPosicion] = useState(1);

  function insertar() {
    if (texto.trim() === "") return;
    // slice NO muta: devuelve copias. Con dos cortes y un spread armamos
    // el arreglo nuevo con el paso metido justo en el medio.
    const antes = pasos.slice(0, posicion); // copia del principio
    const despues = pasos.slice(posicion); // copia del resto
    setPasos([...antes, { id: siguienteId++, texto: texto.trim() }, ...despues]);
  }

  function reiniciar() {
    setPasos(INICIALES);
    setTexto("Dejar levar");
    setPosicion(1);
  }

  const antes = pasos.slice(0, posicion);
  const despues = pasos.slice(posicion);

  return (
    <div>
      <div className="fila">
        <label htmlFor="paso-texto">Paso</label>
        <input
          id="paso-texto"
          className="entrada"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <label htmlFor="paso-posicion">en la posición</label>
        <select
          id="paso-posicion"
          className="entrada"
          value={posicion}
          onChange={(e) => setPosicion(Number(e.target.value))}
        >
          {pasos.map((paso, i) => (
            <option key={paso.id} value={i}>
              {i}
            </option>
          ))}
          <option value={pasos.length}>{pasos.length}</option>
        </select>
        <button type="button" className="boton" onClick={insertar}>
          Insertar
        </button>
        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>

      <ol style={{ margin: "14px 0" }}>
        {pasos.map((paso) => (
          <li key={paso.id}>{paso.texto}</li>
        ))}
      </ol>

      <p className="tenue" style={{ margin: 0, fontFamily: "var(--fuente-mono)" }}>
        antes = [{antes.map((p) => p.texto).join(", ")}]
      </p>
      <p className="tenue" style={{ margin: 0, fontFamily: "var(--fuente-mono)" }}>
        después = [{despues.map((p) => p.texto).join(", ")}]
      </p>
      <p className="tenue" style={{ marginTop: 8, marginBottom: 0 }}>
        Los dos cortes se calculan en cada dibujo y el arreglo original sigue
        intacto: eso es lo que hace slice.
      </p>
    </div>
  );
}
