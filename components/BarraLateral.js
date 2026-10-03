"use client";

// "use client" convierte a este archivo en un componente de cliente: se ejecuta
// en el navegador. Lo necesitamos porque usa usePathname() y useState, y los
// hooks solo funcionan del lado del cliente.

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PISTAS, pistaDe } from "@/app/lecciones";

export default function BarraLateral() {
  const rutaActual = usePathname();
  const pistaActiva = pistaDe(rutaActual);

  // Arrancan abiertas la pista en la que estás parado y la de "Empezar acá".
  const [abiertas, setAbiertas] = useState(() => ({
    empezar: true,
    [pistaActiva ? pistaActiva.id : "empezar"]: true,
  }));

  const [visible, setVisible] = useState(false);

  function alternar(id) {
    setAbiertas({ ...abiertas, [id]: !abiertas[id] });
  }

  return (
    <>
      <button
        type="button"
        className="barra-boton-menu"
        onClick={() => setVisible(!visible)}
        aria-expanded={visible}
      >
        {visible ? "✕" : "☰"} Lecciones
      </button>

      <nav
        className={visible ? "barra barra-visible" : "barra"}
        aria-label="Lecciones"
      >
        <Link href="/" className="barra-titulo">
          Laboratorio web
        </Link>
        <p className="barra-subtitulo">HTML · CSS · JS · React · Redux</p>

        {PISTAS.map((pista) => {
          const abierta = Boolean(abiertas[pista.id]);
          const contieneActual = pistaActiva && pistaActiva.id === pista.id;

          return (
            <div className="barra-grupo" key={pista.id} data-pista={pista.id}>
              <button
                type="button"
                className="barra-grupo-titulo"
                onClick={() => alternar(pista.id)}
                aria-expanded={abierta}
              >
                <span className="barra-flecha" aria-hidden="true">
                  {abierta ? "▾" : "▸"}
                </span>
                {pista.nombre}
                {!abierta && contieneActual && (
                  <span className="barra-punto" aria-hidden="true" />
                )}
              </button>

              {abierta && (
                <ul className="barra-lista">
                  {pista.lecciones.map((leccion) =>
                    leccion.pendiente ? (
                      <li key={leccion.slug}>
                        <span className="barra-link barra-link-pendiente">
                          {leccion.titulo}
                          <em>en preparación</em>
                        </span>
                      </li>
                    ) : (
                      <li key={leccion.slug}>
                        <Link
                          href={leccion.slug}
                          className="barra-link"
                          aria-current={
                            rutaActual === leccion.slug ? "page" : undefined
                          }
                          onClick={() => setVisible(false)}
                        >
                          {leccion.titulo}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
