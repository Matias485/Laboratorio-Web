"use client";

import { useState } from "react";

// Cada Panel tiene SU PROPIO useState. Ninguno de los dos sabe que el otro
// existe, así que no hay manera de que se pongan de acuerdo.
function Panel({ titulo, children }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="tarjeta" style={{ marginBottom: 10 }}>
      <h3 style={{ margin: 0 }}>{titulo}</h3>
      {abierto && <p style={{ margin: "8px 0 0" }}>{children}</p>}
      <button
        type="button"
        className="boton boton-suave"
        style={{ marginTop: 8 }}
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? "Ocultar" : "Mostrar"}
      </button>
    </div>
  );
}

export default function AcordeonSeparadoDemo() {
  return (
    <div>
      <Panel titulo="Almaty, Kazajistán">
        Con unos dos millones de habitantes es la ciudad más grande del país.
        Fue la capital hasta 1997.
      </Panel>
      <Panel titulo="Bariloche, Argentina">
        Está sobre el lago Nahuel Huapi, en Río Negro. Poco más de 130 mil
        habitantes y mucha nieve.
      </Panel>
      <p className="tenue" style={{ margin: 0 }}>
        Abrí los dos al mismo tiempo. Nada te lo impide: cada panel decide solo
        y no se entera de lo que hace el otro.
      </p>
    </div>
  );
}
