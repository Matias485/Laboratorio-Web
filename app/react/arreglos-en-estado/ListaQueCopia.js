"use client";

import { useState } from "react";

// ✅ La misma lista, pero armando un arreglo NUEVO con spread.
export default function ListaQueCopia() {
  const [lista, setLista] = useState(["Palta", "Pan"]);

  function agregar() {
    // [...lista, algo] no toca el viejo: devuelve un arreglo nuevo.
    setLista([...lista, "Ítem " + (lista.length + 1)]);
  }

  function reiniciar() {
    setLista(["Palta", "Pan"]);
  }

  return (
    <div>
      <div className="fila">
        <button type="button" className="boton" onClick={agregar}>
          Agregar con spread
        </button>
        <button type="button" className="boton boton-suave" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>

      <ul style={{ margin: "14px 0 6px" }}>
        {lista.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <p className="tenue" style={{ margin: 0 }}>
        Largo del arreglo en pantalla: <strong>{lista.length}</strong>
      </p>
      <p className="tenue" style={{ marginTop: 8, marginBottom: 0 }}>
        Acá cada click se ve en el momento, sin trucos: el arreglo es otro, y eso
        es lo único que React mira.
      </p>
    </div>
  );
}
