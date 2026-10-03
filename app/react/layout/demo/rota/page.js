export const metadata = { title: "Página rota" };

// Esta página se renderiza en cada pedido, no al compilar.
//
// Sin esta línea, `npm run build` intenta prerenderizar la página, se encuentra
// con el error de abajo —que es a propósito— y da por fallida la compilación
// entera. Con force-dynamic le decimos a Next que esta ruta se arma recién
// cuando alguien la pide, así el error ocurre en el navegador, que es donde lo
// queremos ver.
export const dynamic = "force-dynamic";

// Esta página falla a propósito. El error sube hasta la frontera más cercana,
// que es app/react/layout/demo/error.js, y ahí se corta: el resto del sitio
// —la barra lateral, el layout del laboratorio— no se entera.
export default function Pagina() {
  throw new Error("Rompí esta página a propósito para ver el error.js");
}
