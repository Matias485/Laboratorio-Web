import Link from "next/link";

export const metadata = { title: "Grupo de rutas" };

// Este archivo está en app/react/routing/demo/(vitrina)/atajo/page.js.
// La carpeta (vitrina) va entre paréntesis, así que NO cuenta para la URL.
export default function Pagina() {
  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 4px" }}>
        Laboratorio de rutas · grupo de rutas
      </p>
      <h1>La carpeta (vitrina) se esfumó</h1>

      <p>
        El archivo está en{" "}
        <code>app/react/routing/demo/(vitrina)/atajo/page.js</code>, con{" "}
        <code>(vitrina)</code> entre paréntesis. Mirá la barra de direcciones:
        dice <code>/react/routing/demo/atajo</code>, sin la vitrina en el
        medio.
      </p>
      <p>
        Los paréntesis son para vos, no para el usuario: sirven para agrupar
        archivos que van juntos sin agregar un nivel a la dirección.
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
