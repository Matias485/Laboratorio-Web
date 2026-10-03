"use client";

import { useState } from "react";
import Link from "next/link";

// Los dos enlaces llevan a esta misma página. El del <Link> se lleva además el
// ancla de esta sección, para volver acá abajo.
//
// El del <a> NO la lleva a propósito: si dos direcciones se diferencian solo en
// el "#", el navegador no recarga nada, salta al ancla y listo. Justo lo que no
// queremos mostrar acá.
const CON_LINK = "/react/routing#enlaces";
const CON_A = "/react/routing";

export default function EnlacesDemo() {
  const [clicks, setClicks] = useState(0);
  const [nota, setNota] = useState("");

  return (
    <div>
      <p className="tenue" style={{ marginTop: 0 }}>
        Primero ensuciá el estado: subí el contador y escribí algo.
      </p>

      <div className="fila" style={{ marginBottom: 14 }}>
        <p className="marcador" style={{ minWidth: 56 }}>
          {clicks}
        </p>
        <button
          type="button"
          className="boton"
          onClick={() => setClicks(clicks + 1)}
        >
          Sumar uno
        </button>
        <label htmlFor="nota-enlaces" className="tenue">
          Nota
        </label>
        <input
          id="nota-enlaces"
          className="entrada"
          value={nota}
          placeholder="escribí cualquier cosa"
          onChange={(evento) => setNota(evento.target.value)}
        />
      </div>

      <div className="fila" style={{ alignItems: "stretch", gap: 14 }}>
        <section className="tarjeta" style={{ flex: "1 1 240px" }}>
          <h3>Con &lt;Link&gt;</h3>
          <p className="tenue">
            Navegación del lado del cliente. React no se vuelve a arrancar.
          </p>
          <Link className="boton" href={CON_LINK}>
            Ir con Link
          </Link>
          <p className="tenue" style={{ marginBottom: 0 }}>
            Volvés a esta sección y el contador y la nota siguen como los
            dejaste.
          </p>
        </section>

        <section className="tarjeta" style={{ flex: "1 1 240px" }}>
          <h3>Con &lt;a&gt;</h3>
          <p className="tenue">
            Recarga completa: el navegador pide todo de nuevo.
          </p>
          {/* Este <a> está a propósito: es la mitad del ejemplo. */}
          <a className="boton" href={CON_A}>
            Ir con a
          </a>
          <p className="tenue" style={{ marginBottom: 0 }}>
            Caés arriba de todo: bajá de nuevo hasta acá. El contador vuelve a 0
            y la nota se borra.
          </p>
        </section>
      </div>

      <p className="tenue" style={{ margin: "14px 0 0" }}>
        Mirá también el botón de recargar del navegador: con{" "}
        <code>&lt;a&gt;</code> parpadea toda la pantalla, con{" "}
        <code>&lt;Link&gt;</code> no pasa nada.
      </p>
    </div>
  );
}
