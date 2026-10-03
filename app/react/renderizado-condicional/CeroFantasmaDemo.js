"use client";

import { useState } from "react";

// La trampa del cero: && NO devuelve true/false. Devuelve el valor de la
// izquierda cuando ese valor es falso, y React dibuja los números en pantalla.

export default function CeroFantasmaDemo() {
  const [texto, setTexto] = useState("3");

  // El value de un input siempre es texto; si quedó vacío lo tomamos como 0.
  const cantidad = texto === "" ? 0 : Number(texto);

  const cuerpo = { minHeight: 26 };

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <label htmlFor="rc-cantidad">Productos en el carrito</label>
        <input
          id="rc-cantidad"
          className="entrada"
          type="number"
          min="0"
          max="99"
          style={{ width: 90 }}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setTexto("0")}
        >
          Poné 0 y mirá
        </button>
      </div>

      <div className="comparacion">
        <div className="columna columna-mal">
          <h3 className="columna-titulo">{"{ cantidad && ... }"}</h3>
          <div className="columna-cuerpo" style={cuerpo}>
            {cantidad && <p style={{ margin: 0 }}>Tenés {cantidad} productos.</p>}
          </div>
        </div>

        <div className="columna columna-bien">
          <h3 className="columna-titulo">{"{ cantidad > 0 && ... }"}</h3>
          <div className="columna-cuerpo" style={cuerpo}>
            {cantidad > 0 && (
              <p style={{ margin: 0 }}>Tenés {cantidad} productos.</p>
            )}
          </div>
        </div>
      </div>

      <p className="tenue" style={{ marginBottom: 0 }}>
        {cantidad === 0
          ? "Con cantidad = 0 la expresión de la izquierda vale 0, y React dibuja los números: ese 0 suelto de la columna roja es el cero fantasma. La columna verde, en cambio, quedó vacía."
          : "Con cantidad distinta de 0 las dos columnas muestran exactamente lo mismo. Poné 0 para ver la diferencia."}
      </p>
    </div>
  );
}
