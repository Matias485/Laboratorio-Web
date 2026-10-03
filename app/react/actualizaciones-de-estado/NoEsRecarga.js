"use client";

import { useState } from "react";

export default function NoEsRecarga() {
  const [veces, setVeces] = useState(0);

  return (
    <div>
      <p>
        <label htmlFor="nota-suelta">
          Escribí cualquier cosa acá (este input no está en el estado):
        </label>
      </p>
      <input
        id="nota-suelta"
        className="entrada"
        type="text"
        placeholder="hola, soy texto del navegador"
        style={{ width: "100%", maxWidth: 360 }}
      />

      <div className="fila" style={{ marginTop: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setVeces((v) => v + 1)}
        >
          Volver a renderizar
        </button>
        <span className="tenue">
          Le pedí a React que vuelva a renderizar {veces}{" "}
          {veces === 1 ? "vez" : "veces"}.
        </span>
      </div>

      <p className="tenue" style={{ marginTop: 14 }}>
        El texto que escribiste sigue ahí: React volvió a llamar a la función del
        componente y comparó el resultado con lo que ya había dibujado, pero no
        tiró el input a la basura. Ahora apretá F5 y compará: <em>eso</em> sí es
        recargar la página.
      </p>
    </div>
  );
}
