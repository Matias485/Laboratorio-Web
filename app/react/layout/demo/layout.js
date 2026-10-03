import Link from "next/link";
import MarcadorDelLayout from "./MarcadorDelLayout";

// Este archivo es un layout: envuelve a TODO lo que cuelga de
// app/react/layout/demo/. No tiene URL propia. Su children es la página que
// corresponda a la dirección que estés mirando.
//
// A su vez, este layout está adentro de app/layout.js, el layout raíz del
// sitio: por eso la barra lateral de la izquierda sigue estando acá.

const MARCO = {
  border: "2px dashed var(--azul-300)",
  borderRadius: 12,
  padding: "16px 18px",
  background: "var(--superficie-2)",
};

const HUECO = {
  border: "1px solid var(--borde)",
  borderRadius: 10,
  padding: "16px 18px",
  background: "var(--superficie)",
  marginTop: 14,
};

const PAGINAS = [
  { href: "/react/layout/demo", texto: "Página uno" },
  { href: "/react/layout/demo/otra", texto: "Página dos" },
  { href: "/react/layout/demo/lenta", texto: "Página lenta" },
  { href: "/react/layout/demo/rota", texto: "Página rota" },
];

export const metadata = {
  title: {
    default: "Laboratorio de layouts",
    template: "%s · Laboratorio de layouts",
  },
};

export default function LayoutDelLaboratorio({ children }) {
  return (
    <div>
      <p className="tenue" style={{ margin: "0 0 10px" }}>
        Laboratorio de layouts · no es una lección
      </p>

      <div style={MARCO}>
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--texto-suave)",
          }}
        >
          app/react/layout/demo/layout.js · el marco
        </p>

        <MarcadorDelLayout />

        <nav className="fila" style={{ marginTop: 12 }}>
          {PAGINAS.map((pagina) => (
            <Link key={pagina.href} className="boton boton-suave" href={pagina.href}>
              {pagina.texto}
            </Link>
          ))}
        </nav>

        {/* Acá adentro va la página. El marco de afuera queda quieto. */}
        <div style={HUECO}>{children}</div>
      </div>

      <p style={{ marginTop: 20 }}>
        <Link className="boton" href="/react/layout">
          ← Volver a la lección de Layouts
        </Link>
      </p>
    </div>
  );
}
