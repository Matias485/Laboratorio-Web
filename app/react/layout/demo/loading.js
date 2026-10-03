// loading.js no recibe ninguna prop y se dibuja solo. Next envuelve a la página
// de esta carpeta en un <Suspense> y usa esto como fallback: lo ves mientras la
// página todavía no terminó de armarse.
export default function Cargando() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>Cargando…</h1>
      <p className="tenue" style={{ margin: 0 }}>
        Esto es <code>app/react/layout/demo/loading.js</code>. El marco de afuera
        sigue en su lugar: lo único que se reemplazó es este hueco.
      </p>
    </div>
  );
}
