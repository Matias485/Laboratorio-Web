"use client";

import { useState } from "react";

// Contador roto a propósito: "numero" es una variable común, no es estado.
//
// El registro que se ve abajo sí es estado, y está solo para espiar la
// variable: gracias a él React vuelve a renderizar en cada click, y así se
// nota que "numero" vuelve a nacer en 0 en cada renderizado.
//
// El linter detecta este error solo y lo marca en rojo ("Cannot reassign
// numero after render completes"). Acá lo apagamos porque el código roto es
// justamente lo que queremos mostrar. En tu código, si ves ese aviso, la
// respuesta es pasar la variable a useState.
/* eslint-disable react-hooks/immutability */

export default function ContadorConVariable() {
  let numero = 0;
  const [registro, setRegistro] = useState([]);

  function manejarClick() {
    numero = numero + 1; // la variable sí cambia...
    setRegistro([...registro, { id: registro.length + 1, valor: numero }]);
  }

  return (
    <div>
      <p className="tenue" style={{ margin: 0 }}>
        En pantalla
      </p>
      <p className="marcador">{numero}</p>

      <div className="fila">
        <button type="button" className="boton" onClick={manejarClick}>
          Sumar uno
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setRegistro([])}
          disabled={registro.length === 0}
        >
          Borrar registro
        </button>
      </div>

      <p className="tenue" style={{ margin: "14px 0 4px" }}>
        Cuánto vale la variable justo después de cada click:
      </p>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          maxHeight: 132,
          overflowY: "auto",
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.85rem",
        }}
      >
        {registro.length === 0 ? (
          <li className="tenue">(todavía no tocaste el botón)</li>
        ) : (
          registro.map((entrada) => (
            <li key={entrada.id}>
              click {entrada.id} → numero = {entrada.valor}
            </li>
          ))
        )}
      </ul>

      {registro.length >= 3 && (
        <p className="tenue" style={{ margin: "10px 0 0" }}>
          Nunca pasa de 1: en cada renderizado la variable vuelve a nacer en 0.
        </p>
      )}
    </div>
  );
}
