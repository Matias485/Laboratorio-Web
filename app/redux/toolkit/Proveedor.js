"use client";

// El <Provider> de react-redux usa contexto, y el contexto solo existe del
// lado del cliente. Como el layout raíz de este sitio es un componente de
// servidor, no podemos envolver la aplicación entera ahí: armamos este
// componente de cliente y envolvemos solo lo que lo necesita.

import { Provider } from "react-redux";
import { almacen } from "./almacen";

export default function Proveedor({ children }) {
  return <Provider store={almacen}>{children}</Provider>;
}
