"use client";

import { useState } from "react";

// La galería de la diapositiva: un solo estado, el índice del elemento que se
// está mostrando. Los datos son constantes, no cambian nunca, así que viven
// afuera del componente y no necesitan estado.
const CIENTIFICOS = [
  {
    id: "curie",
    nombre: "Maria Skłodowska-Curie",
    campo: "Física y química",
    dato: "Es la única persona premiada con el Nobel en dos ciencias distintas.",
  },
  {
    id: "johnson",
    nombre: "Katherine Johnson",
    campo: "Matemática",
    dato: "Calculó a mano las trayectorias de las misiones Mercury y del Apolo 11.",
  },
  {
    id: "zara",
    nombre: "Gregorio Y. Zara",
    campo: "Ingeniería aeronáutica",
    dato: "Patentó el primer videoteléfono del mundo en 1955.",
  },
  {
    id: "chandrasekhar",
    nombre: "Subrahmanyan Chandrasekhar",
    campo: "Astrofísica",
    dato: "Calculó la masa máxima que puede sostener una estrella enana blanca.",
  },
];

export default function GaleriaDemo() {
  const [indice, setIndice] = useState(0);

  // Esto NO es estado: se puede calcular a partir del índice en cada
  // renderizado, así que alcanza con una constante común.
  const cientifico = CIENTIFICOS[indice];

  function siguiente() {
    setIndice((indice + 1) % CIENTIFICOS.length);
  }

  function anterior() {
    setIndice((indice - 1 + CIENTIFICOS.length) % CIENTIFICOS.length);
  }

  return (
    <div>
      <div className="tarjeta" style={{ marginBottom: 12 }}>
        <h3>{cientifico.nombre}</h3>
        <p>{cientifico.campo}</p>
        <p style={{ marginTop: 8 }}>{cientifico.dato}</p>
      </div>

      <div className="fila">
        <button type="button" className="boton boton-suave" onClick={anterior}>
          ← Anterior
        </button>
        <button type="button" className="boton" onClick={siguiente}>
          Siguiente →
        </button>
        <span className="tenue">
          {indice + 1} de {CIENTIFICOS.length}
        </span>
      </div>

      <div className="fila" style={{ marginTop: 12 }}>
        <span className="tenue">Ir directo a:</span>
        {CIENTIFICOS.map((persona, posicion) => (
          <button
            key={persona.id}
            type="button"
            className={posicion === indice ? "boton" : "boton boton-suave"}
            onClick={() => setIndice(posicion)}
            aria-pressed={posicion === indice}
          >
            {posicion + 1}
          </button>
        ))}
      </div>

      <p className="tenue" style={{ margin: "12px 0 0" }}>
        Un único dato en el estado —el índice— y toda la tarjeta se arma a
        partir de él.
      </p>
    </div>
  );
}
