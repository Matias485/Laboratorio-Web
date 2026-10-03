"use client";

// Apagamos la regla del linter en este archivo A PROPÓSITO: todo el demo
// consiste en hacer justo lo que la regla prohíbe, para que veas qué se rompe.
// En código de verdad nunca la apagues.
/* eslint-disable react-hooks/static-components */

import { useState } from "react";
import Comparacion, { Columna } from "@/components/Comparacion";

// Definido en el nivel de arriba del archivo. React lo ve siempre como el
// MISMO componente, así que su estado sobrevive a los redibujos del padre.
function ContadorDeAfuera() {
  const [clicks, setClicks] = useState(0);
  return (
    <button
      type="button"
      className="boton boton-suave"
      onClick={() => setClicks(clicks + 1)}
    >
      Clicks: {clicks}
    </button>
  );
}

export default function DondeSeDefineDemo() {
  const [redibujos, setRedibujos] = useState(0);

  // MAL. Esta función se vuelve a crear en CADA render de DondeSeDefineDemo.
  // Para React es un componente distinto cada vez: lo desmonta, lo monta de
  // cero y el estado que tenía adentro se pierde.
  function ContadorDeAdentro() {
    const [clicks, setClicks] = useState(0);
    return (
      <button
        type="button"
        className="boton boton-suave"
        onClick={() => setClicks(clicks + 1)}
      >
        Clicks: {clicks}
      </button>
    );
  }

  return (
    <div>
      <p className="tenue" style={{ marginTop: 0 }}>
        Subí los dos contadores hasta 3, y recién ahí apretá “Redibujar”.
      </p>

      <Comparacion>
        <Columna tono="mal" titulo="Definido adentro">
          <ContadorDeAdentro />
        </Columna>
        <Columna tono="bien" titulo="Definido afuera">
          <ContadorDeAfuera />
        </Columna>
      </Comparacion>

      <button
        type="button"
        className="boton"
        onClick={() => setRedibujos(redibujos + 1)}
      >
        Redibujar el demo ({redibujos})
      </button>
    </div>
  );
}
