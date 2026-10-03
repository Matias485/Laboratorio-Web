import Link from "next/link";
import { vecinas, pistaDe } from "@/app/lecciones";

/**
 * Marco de una lección: título, resumen y los enlaces de anterior / siguiente.
 *
 * Props:
 *   slug     (string) la ruta de esta lección, ej. "/props"
 *   titulo   (string)
 *   resumen  (string)
 *   children el contenido, normalmente varios <Seccion>
 */
export default function Leccion({ slug, titulo, resumen, children }) {
  const { anterior, siguiente } = vecinas(slug);
  const pista = pistaDe(slug);

  return (
    <article data-pista={pista ? pista.id : undefined}>
      <header className="leccion-encabezado">
        {pista && <p className="leccion-etiqueta">{pista.nombre}</p>}
        <h1>{titulo}</h1>
        {resumen && <p className="resumen">{resumen}</p>}
      </header>

      {children}

      <nav className="navegacion-lecciones">
        {anterior ? (
          <Link href={anterior.slug}>
            <span>Anterior</span>← {anterior.titulo}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link href={siguiente.slug} style={{ textAlign: "right" }}>
            <span>Siguiente</span>
            {siguiente.titulo} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
