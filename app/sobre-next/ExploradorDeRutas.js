"use client";

import { useState } from "react";
import Link from "next/link";
import { LECCIONES } from "@/app/lecciones";

const EJEMPLOS = ["props", "estado", "sobre-next", "hola"];

export default function ExploradorDeRutas() {
  const [carpeta, setCarpeta] = useState("hola");

  // Los nombres de carpeta no llevan mayúsculas ni espacios: por eso pasamos
  // todo a minúsculas y cambiamos los espacios por guiones.
  const limpio = carpeta.trim().toLowerCase().replace(/\s+/g, "-");
  const archivo = limpio === "" ? "app/page.js" : `app/${limpio}/page.js`;
  const url = limpio === "" ? "/" : `/${limpio}`;
  const existente = LECCIONES.find((leccion) => leccion.slug === url);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        <label htmlFor="nombre-carpeta">Carpeta dentro de app/</label>
        <input
          id="nombre-carpeta"
          className="entrada"
          value={carpeta}
          onChange={(evento) => setCarpeta(evento.target.value)}
          placeholder="hola"
        />
      </div>

      <div className="fila" style={{ marginBottom: 16 }}>
        <span className="tenue">Probá con:</span>
        {EJEMPLOS.map((ejemplo) => (
          <button
            key={ejemplo}
            type="button"
            className="boton boton-suave"
            onClick={() => setCarpeta(ejemplo)}
          >
            {ejemplo}
          </button>
        ))}
      </div>

      <p style={{ margin: "0 0 6px" }}>
        Archivo que tenés que crear: <code>{archivo}</code>
      </p>
      <p style={{ margin: "0 0 12px" }}>
        URL que queda andando:{" "}
        <code>http://localhost:3000{url}</code>
      </p>

      {existente ? (
        <p className="tenue" style={{ marginBottom: 0 }}>
          Esa ruta ya existe en este sitio: es la lección{" "}
          <Link href={existente.slug}>{existente.titulo}</Link>.
        </p>
      ) : (
        <p className="tenue" style={{ marginBottom: 0 }}>
          Todavía no existe. Creá ese archivo con un componente adentro y la URL
          empieza a funcionar sola: no hay ningún lugar donde registrarla.
        </p>
      )}
    </div>
  );
}
