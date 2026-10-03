"use client";

import { useEffect, useState } from "react";

function nombreDelTamano(ancho) {
  if (ancho < 600) return "teléfono";
  if (ancho < 1000) return "tablet";
  return "escritorio";
}

export default function AnchoVentanaDemo() {
  // Arranca en null porque el primer HTML lo arma el servidor, donde no existe
  // window. Si pusiéramos window.innerWidth acá, la página reventaría al
  // construirse.
  const [ancho, setAncho] = useState(null);
  const [escuchando, setEscuchando] = useState(true);
  const [avisos, setAvisos] = useState(0);

  useEffect(() => {
    if (!escuchando) return undefined;

    // Medición inicial. El linter avisa cuando se llama a un setEstado
    // sincrónicamente dentro de un efecto, porque casi siempre significa que el
    // efecto sobra. Este es uno de los casos en los que sí corresponde: el
    // ancho de la ventana es un dato del navegador, no se puede calcular
    // durante el render y no existe mientras el HTML se arma en el servidor.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ver el comentario de arriba
    setAncho(window.innerWidth);

    function alRedimensionar() {
      setAncho(window.innerWidth);
      setAvisos((anterior) => anterior + 1);
    }

    window.addEventListener("resize", alRedimensionar);

    // Sin esto, cada vez que el efecto se vuelve a ejecutar quedaría un
    // oyente más escuchando el mismo evento.
    return () => window.removeEventListener("resize", alRedimensionar);
  }, [escuchando]);

  return (
    <div>
      <div
        className="tarjeta"
        style={{ boxShadow: "none", textAlign: "center", marginBottom: 14 }}
      >
        <p className="tenue" style={{ margin: 0 }}>
          window.innerWidth
        </p>
        <p className="marcador">{ancho === null ? "…" : ancho + " px"}</p>
        <p style={{ margin: 0 }}>
          {ancho === null
            ? "todavía no se midió: el servidor no tiene ventana"
            : "estás en tamaño " + nombreDelTamano(ancho)}
        </p>
      </div>

      <div className="fila">
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setEscuchando(!escuchando)}
        >
          {escuchando ? "Dejar de escuchar" : "Volver a escuchar"}
        </button>
        <span className="tenue">
          eventos de resize recibidos: <strong>{avisos}</strong>
        </span>
      </div>

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Agarrá el borde de la ventana del navegador y movelo: el número cambia en
        vivo. Después tocá “Dejar de escuchar”: la limpieza saca el oyente y el
        contador se congela aunque sigas moviendo la ventana.
      </p>
    </div>
  );
}
