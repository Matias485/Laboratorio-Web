export const metadata = { title: "Página uno" };

// La primera página del laboratorio. Vive en
// app/react/layout/demo/page.js → /react/layout/demo
export default function Pagina() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>Página uno</h1>
      <p style={{ margin: "0 0 10px" }}>
        Esto es <code>app/react/layout/demo/page.js</code>. Lo que estás leyendo
        llegó al layout de afuera como la prop <code>children</code>.
      </p>
      <p className="tenue" style={{ margin: 0 }}>
        Anotá el número del marco y andá a <strong>Página dos</strong>: el texto
        cambia, el número no se reinicia. Después apretá F5 y mirá qué pasa.
      </p>
    </div>
  );
}
