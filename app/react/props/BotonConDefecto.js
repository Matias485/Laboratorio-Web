"use client";

import { useState } from "react";

// Si el padre no manda la prop "texto", se usa "Aceptar".
function BotonAmable({ texto = "Aceptar" }) {
  return (
    <button type="button" className="boton">
      {texto}
    </button>
  );
}

export default function BotonConDefecto() {
  const [texto, setTexto] = useState("Guardar cambios");
  const [pasarProp, setPasarProp] = useState(true);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={pasarProp}
            onChange={(evento) => setPasarProp(evento.target.checked)}
          />{" "}
          Pasarle la prop <code>texto</code>
        </label>
      </div>

      <div className="fila" style={{ marginBottom: 18 }}>
        <label htmlFor="texto-del-boton">Texto</label>
        <input
          id="texto-del-boton"
          className="entrada"
          value={texto}
          disabled={!pasarProp}
          onChange={(evento) => setTexto(evento.target.value)}
        />
      </div>

      {pasarProp ? <BotonAmable texto={texto} /> : <BotonAmable />}

      <p className="tenue" style={{ marginBottom: 0, marginTop: 14 }}>
        Se está renderizando{" "}
        <code>
          {pasarProp ? '<BotonAmable texto="' + texto + '" />' : "<BotonAmable />"}
        </code>
      </p>
    </div>
  );
}
