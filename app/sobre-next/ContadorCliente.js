"use client";

import { useState } from "react";

// Este archivo arranca con "use client", así que su código viaja al navegador.
// Por eso puede usar useState y reaccionar a un click.
export default function ContadorCliente() {
  const [clicks, setClicks] = useState(0);

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 4px" }}>
        Componente de cliente
      </p>
      <p className="marcador">{clicks}</p>
      <div className="fila">
        <button
          type="button"
          className="boton"
          onClick={() => setClicks(clicks + 1)}
        >
          Sumar uno
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setClicks(0)}
        >
          Reiniciar
        </button>
      </div>
      <p className="tenue" style={{ marginBottom: 0 }}>
        Cambia con cada click, sin recargar nada.
      </p>
    </div>
  );
}
