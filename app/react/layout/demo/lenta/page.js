export const metadata = { title: "Página lenta" };

// Esta página tarda a propósito. Como es un Server Component puede ser async y
// hacerle await a cualquier cosa; acá esperamos dos segundos con una promesa.
// Mientras tanto, Next muestra el loading.js de la carpeta de arriba.
function esperar(milisegundos) {
  return new Promise((listo) => setTimeout(listo, milisegundos));
}

export default async function Pagina() {
  await esperar(2000);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>
        Llegó, después de dos segundos
      </h1>
      <p style={{ margin: "0 0 10px" }}>
        Esta página hace <code>await</code> de una promesa que tarda dos
        segundos. Mientras tanto viste{" "}
        <code>app/react/layout/demo/loading.js</code>.
      </p>
      <p className="tenue" style={{ margin: 0 }}>
        Fijate que el marco de afuera nunca desapareció, y que los botones
        siguieron funcionando mientras cargaba: el <code>loading.js</code>{" "}
        reemplaza solo la página, no el layout.
      </p>
    </div>
  );
}
