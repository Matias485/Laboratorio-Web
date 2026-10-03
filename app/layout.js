import "./globals.css";
import BarraLateral from "@/components/BarraLateral";

export const metadata = {
  title: {
    default: "Laboratorio web",
    template: "%s · Laboratorio web",
  },
  description:
    "Laboratorio interactivo de desarrollo web: HTML, CSS, JavaScript, TypeScript, React y Redux.",
};

// Este es el layout raíz: lo que está acá envuelve a TODAS las páginas.
// Es un Server Component (no tiene "use client" arriba), así que se ejecuta
// solamente en el servidor. Por eso la barra lateral, que necesita saber en qué
// página estamos, vive en su propio archivo marcado como componente de cliente.
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="layout">
          <BarraLateral />
          <main className="contenido">
            <div className="contenido-interno">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
