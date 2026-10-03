"use client";

import { useState } from "react";

// ❌ La versión rota: agrega con push y le devuelve a React el MISMO arreglo.
export default function ListaQueMuta() {
  const [lista, setLista] = useState(["Palta", "Pan"]);
  const [redibujos, setRedibujos] = useState(0);

  function agregar() {
    // push MUTA el arreglo que ya estaba en el estado.
    lista.push("Ítem " + (lista.length + 1));
    // Le devolvemos a React el mismo arreglo: no ve ninguna diferencia.
    setLista(lista);
  }

  // Cambiar CUALQUIER otro estado obliga al componente a dibujarse de nuevo,
  // y recién ahí se ve todo lo que el push había metido a escondidas.
  function forzarRedibujo() {
    setRedibujos(redibujos + 1);
  }

  function reiniciar() {
    setLista(["Palta", "Pan"]);
    setRedibujos(0);
  }

  return (
    <div>
      <div className="fila">
        <button type="button" className="boton" onClick={agregar}>
          Agregar con push
        </button>
        <button type="button" className="boton boton-suave" onClick={forzarRedibujo}>
          Forzar un re-dibujo
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
        Largo del arreglo en pantalla: <strong>{lista.length}</strong> · re-dibujos
        forzados: <strong>{redibujos}</strong>
      </p>
      <p className="tenue" style={{ marginTop: 8, marginBottom: 0 }}>
        Tocá "Agregar con push" tres veces: no pasa nada. Ahora tocá "Forzar un
        re-dibujo" y mirá cómo aparecen los tres de golpe. El arreglo había
        crecido todo ese tiempo; la pantalla no se enteró.
      </p>
    </div>
  );
}
