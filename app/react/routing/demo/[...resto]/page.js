import Link from "next/link";

export const metadata = { title: "Atrapa-todo" };

// [...resto] atrapa todos los segmentos que sobren. params.resto NO es un
// string: es un arreglo con un elemento por segmento de la URL.
export default async function Pagina({ params }) {
  const { resto } = await params;

  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 4px" }}>
        Laboratorio de rutas · app/react/routing/demo/[...resto]/page.js
      </p>
      <h1>Atrapé {resto.length} segmentos</h1>

      <ul style={{ margin: 0, paddingLeft: 22 }}>
        {resto.map((segmento, i) => (
          <li key={`${i}-${segmento}`}>
            <code>resto[{i}]</code> → <strong>{segmento}</strong>
          </li>
        ))}
      </ul>

      <p>
        Agregale más pedazos a la dirección —{" "}
        <code>/react/routing/demo/uno/dos/tres/cuatro</code> — y esta misma
        página te los va a listar todos.
      </p>

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
