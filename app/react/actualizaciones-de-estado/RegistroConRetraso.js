"use client";

import { useState } from "react";

// Un id que crece solo, para que cada línea del registro tenga una key estable.
let siguienteId = 1;

export default function RegistroConRetraso() {
  const [numero, setNumero] = useState(0);
  const [registro, setRegistro] = useState([]);

  function anotar(texto) {
    // El id se calcula acá afuera a propósito: la función actualizadora tiene
    // que ser pura, así que adentro no ponemos nada que cambie una variable.
    const id = siguienteId++;
    setRegistro((anterior) => [...anterior, { id, texto }]);
  }

  function manejarClick() {
    setNumero(numero + 5);
    anotar(`Click: numero valía ${numero}, así que pedí ${numero} + 5 = ${numero + 5}.`);

    setTimeout(() => {
      // Esta función nació en aquel render y se llevó puesta su instantánea:
      // numero adentro del setTimeout sigue siendo el valor de ese momento.
      anotar(`3 segundos después: adentro del setTimeout, numero todavía vale ${numero}.`);
    }, 3000);
  }

  return (
    <div>
      <p className="marcador">{numero}</p>
      <div className="fila">
        <button type="button" className="boton" onClick={manejarClick}>
          +5 y avisame en 3 segundos
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => {
            setNumero(0);
            setRegistro([]);
          }}
        >
          Reiniciar
        </button>
      </div>

      <p className="tenue" style={{ marginTop: 14 }}>
        Registro (apretá el botón dos o tres veces seguidas y mirá qué anota):
      </p>
      {registro.length === 0 ? (
        <p className="tenue">— todavía no pasó nada —</p>
      ) : (
        <ul style={{ paddingLeft: 22, margin: 0, fontSize: "0.88rem" }}>
          {registro.map((linea) => (
            <li key={linea.id}>{linea.texto}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
