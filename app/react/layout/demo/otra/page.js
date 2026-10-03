export const metadata = { title: "Página dos" };

// La segunda página. Vive en una carpeta distinta, pero debajo de la misma
// carpeta demo/, así que la envuelve el mismo layout.
export default function Pagina() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>Página dos</h1>
      <p style={{ margin: "0 0 10px" }}>
        Esto es <code>app/react/layout/demo/otra/page.js</code>. Otro archivo,
        otra URL, el mismo marco de afuera.
      </p>
      <p className="tenue" style={{ margin: 0 }}>
        El número de arriba siguió corriendo mientras cambiabas de página. React
        no volvió a montar el layout: solo reemplazó este pedazo.
      </p>
    </div>
  );
}
