"use client";

import { useEffect, useRef, useState } from "react";

// Esta función se puede llamar desde cualquier lado —incluso desde código que
// va a correr en el servidor— porque pregunta antes de tocar nada.
function anchoDeLaVentana() {
  if (typeof window === "undefined") return null;
  return window.innerWidth;
}

export default function MedidorDeVentana() {
  const [ancho, setAncho] = useState(null);
  const [lineas, setLineas] = useState([]);
  const contador = useRef(0);

  useEffect(() => {
    // Cuando esta línea se ejecuta, el navegador ya existe: useEffect no corre
    // nunca en el servidor. Por eso acá window se puede usar sin preguntar.
    function medir() {
      setAncho(window.innerWidth);
    }

    medir();
    window.addEventListener("resize", medir);
    // Si no sacamos el listener, cada vez que este componente se monte de nuevo
    // queda uno viejo escuchando para siempre.
    return () => window.removeEventListener("resize", medir);
  }, []);

  function medirConGuard() {
    const valor = anchoDeLaVentana();
    contador.current += 1;
    setLineas((viejas) =>
      [
        ...viejas,
        {
          id: contador.current,
          texto:
            `typeof window → "${typeof window}"  ·  ` +
            (valor === null
              ? "no hay ventana, devolvió null"
              : `window.innerWidth → ${valor}px`),
        },
      ].slice(-5),
    );
  }

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 2px" }}>
        Ancho de tu ventana, medido dentro de un efecto
      </p>
      <p className="marcador" style={{ marginBottom: 4 }}>
        {ancho === null ? "—" : `${ancho}px`}
      </p>
      <p className="tenue" style={{ marginTop: 0 }}>
        {ancho === null
          ? "Todavía no se midió. Esto es exactamente lo que ve el servidor: una raya."
          : "Agarrá el borde de la ventana del navegador y cambiale el tamaño: el número se actualiza solo."}
      </p>

      <div className="fila" style={{ margin: "14px 0 10px" }}>
        <button type="button" className="boton" onClick={medirConGuard}>
          Medir con typeof window
        </button>
        <span className="tenue">
          Este botón llama a la función con el <code>if</code> adentro.
        </span>
      </div>

      {lineas.length > 0 && (
        <ol
          style={{
            margin: 0,
            paddingLeft: 26,
            fontFamily: "var(--fuente-mono)",
            fontSize: "0.8rem",
            lineHeight: 1.9,
          }}
        >
          {lineas.map((item) => (
            <li key={item.id}>{item.texto}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
