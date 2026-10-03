"use client";

import { useState } from "react";

// Este Panel se quedó sin useState. Le avisan si está abierto (prop `abierto`)
// y él avisa hacia arriba cuando lo quieren abrir (prop `alMostrar`).
function Panel({ titulo, abierto, alMostrar, children }) {
  return (
    <div className="tarjeta" style={{ marginBottom: 10 }}>
      <h3 style={{ margin: 0 }}>{titulo}</h3>
      {abierto ? (
        <p style={{ margin: "8px 0 0" }}>{children}</p>
      ) : (
        <button
          type="button"
          className="boton boton-suave"
          style={{ marginTop: 8 }}
          onClick={alMostrar}
        >
          Mostrar
        </button>
      )}
    </div>
  );
}

export default function AcordeonLevantadoDemo() {
  // El único dueño del dato es el padre: 0 = está abierto el primero,
  // 1 = está abierto el segundo.
  const [indiceActivo, setIndiceActivo] = useState(0);

  return (
    <div>
      <Panel
        titulo="Almaty, Kazajistán"
        abierto={indiceActivo === 0}
        alMostrar={() => setIndiceActivo(0)}
      >
        Con unos dos millones de habitantes es la ciudad más grande del país.
        Fue la capital hasta 1997.
      </Panel>
      <Panel
        titulo="Bariloche, Argentina"
        abierto={indiceActivo === 1}
        alMostrar={() => setIndiceActivo(1)}
      >
        Está sobre el lago Nahuel Huapi, en Río Negro. Poco más de 130 mil
        habitantes y mucha nieve.
      </Panel>
      <p className="tenue" style={{ margin: 0 }}>
        Estado del padre: <code>indiceActivo = {indiceActivo}</code>. Abrir uno
        cierra el otro, y los paneles nunca se hablaron entre sí.
      </p>
    </div>
  );
}
