import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = { title: "Ficha del laboratorio" };

// En Next.js 16 la prop params es una PROMESA. Por eso la función es async y
// hay que hacerle await antes de leer nada adentro.
export default async function Pagina({ params }) {
  const { id } = await params;

  // Regla inventada para este laboratorio: solo hay fichas con número.
  // notFound() corta el renderizado acá y dibuja demo/not-found.js.
  if (!/^\d+$/.test(id)) notFound();

  const numero = Number(id);

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 4px" }}>
        Laboratorio de rutas · app/react/routing/demo/[id]/page.js
      </p>
      <h1>Ficha número {id}</h1>

      <p className="marcador">{numero * 2}</p>
      <p className="tenue">
        El doble de {id}, calculado en el servidor con el valor que vino de la
        URL.
      </p>

      <p>
        Un solo archivo dibuja infinitas URLs. Cambiá el número en la barra de
        direcciones y volvé: es la misma función, con otro{" "}
        <code>params.id</code>.
      </p>

      <div className="fila" style={{ margin: "20px 0" }}>
        <Link className="boton boton-suave" href={`/react/routing/demo/${numero - 1}`}>
          ← Ficha {numero - 1}
        </Link>
        <Link className="boton boton-suave" href={`/react/routing/demo/${numero + 1}`}>
          Ficha {numero + 1} →
        </Link>
      </div>

      <p>
        <Link className="boton" href="/react/routing">
          ← Volver a la lección de Routing
        </Link>{" "}
        <Link className="boton boton-suave" href="/react/routing/demo">
          Índice del laboratorio
        </Link>
      </p>
    </div>
  );
}
