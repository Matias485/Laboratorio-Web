import Link from "next/link";

// not-found.js se dibuja cuando alguien llama a notFound() en esta rama, y
// también cuando la URL no coincide con ninguna ruta de acá abajo.
export default function NoEncontrado() {
  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 4px" }}>
        Laboratorio de rutas · app/react/routing/demo/not-found.js
      </p>
      <h1>404 · Esa ficha no existe</h1>
      <p>
        Las fichas de este laboratorio son solamente números. Pediste algo que
        no lo es, así que <code>app/react/routing/demo/[id]/page.js</code> llamó
        a <code>notFound()</code> y el renderizado se cortó ahí.
      </p>
      <p className="tenue">
        Este archivo es el 404 <strong>de esta rama</strong>: si estuviera en{" "}
        <code>app/not-found.js</code> sería el de todo el sitio.
      </p>

      <p>
        <Link className="boton" href="/react/routing/demo/42">
          Probá con la ficha 42
        </Link>{" "}
        <Link className="boton boton-suave" href="/react/routing">
          ← Volver a la lección de Routing
        </Link>
      </p>
    </div>
  );
}
