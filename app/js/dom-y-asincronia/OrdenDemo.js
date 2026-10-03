"use client";

import Registro, { useRegistro } from "./Registro";

export default function OrdenDemo() {
  const { lineas, anotar, limpiar } = useRegistro();

  // Esta es la función que corre de verdad cuando tocás el botón. Está escrita
  // en un orden; el registro de abajo numera el orden en que el motor la
  // ejecuta, que es otro.
  function correr() {
    limpiar();

    anotar("arranca la función", "sincronico");

    setTimeout(() => {
      anotar("setTimeout(…, 0) — el primero", "tarea");
    }, 0);

    Promise.resolve().then(() => {
      anotar(".then() de una promesa ya cumplida", "microtarea");
      // Una microtarea puede encolar otra, y esa nueva se atiende igual antes
      // que el setTimeout que ya estaba esperando desde hace rato.
      queueMicrotask(() => {
        anotar("queueMicrotask encolada desde el .then", "microtarea");
      });
    });

    (async () => {
      anotar("lo que está ARRIBA del await corre ya mismo", "sincronico");
      await null;
      anotar("lo que está ABAJO del await es una microtarea", "microtarea");
    })();

    setTimeout(() => {
      anotar("setTimeout(…, 0) — el segundo", "tarea");
    }, 0);

    anotar("última línea de la función", "sincronico");
  }

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        <button type="button" className="boton" onClick={correr}>
          Correr
        </button>
        <button type="button" className="boton boton-suave" onClick={limpiar}>
          Limpiar
        </button>
      </div>

      <Registro lineas={lineas} alto={190} />

      <p className="tenue" style={{ marginBottom: 0, marginTop: 10 }}>
        Amarillo: sincrónico · violeta: microtarea · naranja: tarea.
      </p>
    </div>
  );
}
