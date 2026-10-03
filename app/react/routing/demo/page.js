import Link from "next/link";

export const metadata = { title: "Laboratorio de rutas" };

// Esta página NO es una lección: es una ruta de prueba que existe para que
// puedas navegar de verdad y mirar la barra de direcciones. Por eso no usa el
// componente <Leccion> ni figura en app/lecciones.js.

const EJEMPLOS = [
  {
    href: "/react/routing/demo/42",
    url: "/react/routing/demo/42",
    archivo: "app/react/routing/demo/[id]/page.js",
    que: "Ruta dinámica. El 42 llega como params.id.",
  },
  {
    href: "/react/routing/demo/7",
    url: "/react/routing/demo/7",
    archivo: "app/react/routing/demo/[id]/page.js",
    que: "Mismo archivo, otra URL, otro contenido.",
  },
  {
    href: "/react/routing/demo/atajo",
    url: "/react/routing/demo/atajo",
    archivo: "app/react/routing/demo/(vitrina)/atajo/page.js",
    que: "La carpeta (vitrina) no aparece en la URL.",
  },
  {
    href: "/react/routing/demo/norte/sur/este",
    url: "/react/routing/demo/norte/sur/este",
    archivo: "app/react/routing/demo/[...resto]/page.js",
    que: "Atrapa-todo. Tres segmentos, un solo archivo.",
  },
  {
    href: "/react/routing/demo/kiwi",
    url: "/react/routing/demo/kiwi",
    archivo: "app/react/routing/demo/not-found.js",
    que: "No es un número: la página llama a notFound().",
  },
];

export default function Pagina() {
  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 4px" }}>
        Laboratorio de rutas · no es una lección
      </p>
      <h1>Estás afuera de la lección</h1>
      <p>
        Mirá la barra de direcciones del navegador: dice{" "}
        <code>/react/routing/demo</code>. Esta página vive en{" "}
        <code>app/react/routing/demo/page.js</code> y no tiene más misterio que
        ese: la carpeta es la ruta.
      </p>

      <p>
        <Link className="boton" href="/react/routing">
          ← Volver a la lección de Routing
        </Link>
      </p>

      <h2 style={{ marginTop: 32 }}>Rutas para probar</h2>
      <p className="tenue">
        Entrá a cada una y compará la URL con el archivo que la dibuja.
      </p>

      <div className="tarjetas">
        {EJEMPLOS.map((ejemplo) => (
          <Link className="tarjeta" key={ejemplo.href} href={ejemplo.href}>
            <h3>{ejemplo.url}</h3>
            <p>{ejemplo.que}</p>
            <p style={{ marginTop: 8 }}>
              <code style={{ fontSize: "0.72rem" }}>{ejemplo.archivo}</code>
            </p>
          </Link>
        ))}
      </div>

      <h2>La carpeta entera</h2>
      <pre
        style={{
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.8rem",
          lineHeight: 1.7,
          margin: 0,
          padding: "14px 16px",
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          borderRadius: 10,
          overflowX: "auto",
        }}
      >
        {`app/react/routing/
├─ page.js                    → /react/routing   (la lección)
└─ demo/
   ├─ page.js                 → /react/routing/demo   (esta página)
   ├─ not-found.js            → el 404 de esta rama
   ├─ (vitrina)/atajo/page.js → /react/routing/demo/atajo
   ├─ [id]/page.js            → /react/routing/demo/CUALQUIER-COSA
   └─ [...resto]/page.js      → /react/routing/demo/varios/segmentos/más`}
      </pre>
    </div>
  );
}
