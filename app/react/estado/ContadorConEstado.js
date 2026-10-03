"use client";

import { useState } from "react";

// El mismo contador, pero ahora "numero" es estado: React se lo acuerda entre
// renderizados y, cuando lo cambiás con setNumero, vuelve a renderizar.
export default function ContadorConEstado() {
  const [numero, setNumero] = useState(0);
  const [registro, setRegistro] = useState([]);

  function manejarClick() {
    const siguiente = numero + 1;
    setNumero(siguiente);
    setRegistro([...registro, { id: registro.length + 1, valor: siguiente }]);
  }

  function reiniciar() {
    setNumero(0);
    setRegistro([]);
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
          onClick={reiniciar}
          disabled={registro.length === 0}
        >
          Volver a cero
        </button>
      </div>

      <p className="tenue" style={{ margin: "14px 0 4px" }}>
        Cuánto vale el estado justo después de cada click:
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
          El registro y la pantalla dicen siempre lo mismo.
        </p>
      )}
    </div>
  );
}
