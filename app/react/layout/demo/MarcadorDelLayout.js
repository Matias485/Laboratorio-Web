"use client";

import { useEffect, useState } from "react";

// Este componente vive adentro de app/react/layout/demo/layout.js y es toda la
// demostración: cuenta los segundos desde que se MONTÓ. Si al navegar entre las
// páginas del laboratorio el número sigue subiendo sin reiniciarse, es porque el
// layout nunca se desmontó. Con F5 arranca de cero, porque ahí sí se monta todo
// de nuevo.
export default function MarcadorDelLayout() {
  const [segundos, setSegundos] = useState(0);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fila" style={{ alignItems: "baseline", gap: 14 }}>
      <p className="marcador" style={{ fontSize: "1.8rem" }}>
        {segundos}s
      </p>
      <button
        type="button"
        className="boton boton-suave"
        onClick={() => setClicks((c) => c + 1)}
      >
        clicks: {clicks}
      </button>
      <p className="tenue" style={{ margin: 0 }}>
        los dos números viven en el marco, no en la página
      </p>
    </div>
  );
}
