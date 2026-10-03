"use client";

import { useState } from "react";

// Componente controlado: no tiene estado propio. Muestra lo que le llega por
// `valor` y avisa cada tecla llamando a `alCambiar`.
function EntradaTemperatura({ id, etiqueta, valor, alCambiar }) {
  return (
    <div style={{ flex: "1 1 190px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: 4 }}>
        {etiqueta}
      </label>
      <input
        id={id}
        className="entrada"
        style={{ width: "100%" }}
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
      />
    </div>
  );
}

// Convierte el texto de un input con el convertidor que le pasemos. Si lo que
// escribieron no es un número devolvemos texto vacío en vez de "NaN".
function convertir(texto, convertidor) {
  const numero = parseFloat(texto);
  if (Number.isNaN(numero)) return "";
  return String(Math.round(convertidor(numero) * 10) / 10);
}

export default function ConversorDemo() {
  // Una sola fuente de verdad: UN valor y en qué escala lo escribieron.
  const [valor, setValor] = useState("20");
  const [escala, setEscala] = useState("c");

  // Los dos inputs salen de ese único dato: el que tocaste se muestra tal cual
  // y el otro se calcula. Por construcción no pueden desincronizarse.
  const celsius =
    escala === "c" ? valor : convertir(valor, (f) => ((f - 32) * 5) / 9);
  const fahrenheit =
    escala === "f" ? valor : convertir(valor, (c) => (c * 9) / 5 + 32);

  return (
    <div>
      <div className="fila" style={{ alignItems: "flex-end" }}>
        <EntradaTemperatura
          id="conversor-celsius"
          etiqueta="Grados Celsius"
          valor={celsius}
          alCambiar={(texto) => {
            setEscala("c");
            setValor(texto);
          }}
        />
        <EntradaTemperatura
          id="conversor-fahrenheit"
          etiqueta="Grados Fahrenheit"
          valor={fahrenheit}
          alCambiar={(texto) => {
            setEscala("f");
            setValor(texto);
          }}
        />
      </div>

      <p style={{ margin: "14px 0 0" }}>
        {parseFloat(celsius) >= 100
          ? "A esa temperatura el agua hierve."
          : "A esa temperatura el agua todavía no hierve."}
      </p>
      <p className="tenue" style={{ margin: "6px 0 0" }}>
        Lo único que hay guardado en el padre es{" "}
        <code>valor = {JSON.stringify(valor)}</code> y{" "}
        <code>escala = {JSON.stringify(escala)}</code>.
      </p>
    </div>
  );
}
