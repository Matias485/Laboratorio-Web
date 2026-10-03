"use client";

// El <Provider> de react-redux usa contexto, y el contexto solo existe del
// lado del cliente. Como el layout raíz de este sitio es un componente de
// servidor, no podemos envolver la aplicación entera ahí: armamos este
// componente de cliente y envolvemos solo los demos de la lección.
//
// Es el mismo archivo que en /redux/toolkit. En una aplicación de verdad hay
// uno solo, arriba de todo, y no se vuelve a tocar nunca más.

import { Provider } from "react-redux";
import { almacen } from "./almacen";

export default function Proveedor({ children }) {
  return <Provider store={almacen}>{children}</Provider>;
}
