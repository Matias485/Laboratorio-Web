"use client";

// Una frontera de error TIENE que ser componente de cliente: por debajo es un
// error boundary de React, y eso solo existe del lado del navegador.

import Link from "next/link";
import { useEffect } from "react";

// Recibe dos props que pone Next:
//   error  el Error que se lanzó, con un .digest para cruzarlo con el log
//   retry  una función que vuelve a pedir y a dibujar lo que falló
export default function ErrorDelLaboratorio({ error, retry }) {
  useEffect(() => {
    // En una aplicación de verdad acá mandarías el error a tu servicio de
    // monitoreo. Para el laboratorio alcanza con la consola.
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>
        Algo se rompió acá adentro
      </h1>
      <p style={{ margin: "0 0 10px" }}>
        Esto es <code>app/react/layout/demo/error.js</code>. La página lanzó un{" "}
        <code>Error</code> y el renderizado se cortó en esta frontera. Mirá lo
        que NO pasó: el marco de afuera sigue entero y la barra lateral del sitio
        también.
      </p>

      <p className="tenue" style={{ margin: "0 0 14px" }}>
        Mensaje: <code>{error?.message ?? "sin mensaje"}</code>
        {error?.digest ? (
          <>
            {" "}
            · digest: <code>{error.digest}</code>
          </>
        ) : null}
      </p>

      <p className="fila" style={{ margin: 0 }}>
        <button type="button" className="boton" onClick={() => retry()}>
          Reintentar
        </button>
        <Link className="boton boton-suave" href="/react/layout/demo">
          Volver a la página uno
        </Link>
        <Link className="boton boton-suave" href="/react/layout">
          ← Volver a la lección
        </Link>
      </p>

      <p className="tenue" style={{ marginTop: 12, marginBottom: 0 }}>
        El botón de reintentar vuelve a dibujar lo que falló. Como esta página
        falla siempre, va a volver a fallar: sirve cuando el error era pasajero,
        por ejemplo una consulta que no respondió.
      </p>
    </div>
  );
}
