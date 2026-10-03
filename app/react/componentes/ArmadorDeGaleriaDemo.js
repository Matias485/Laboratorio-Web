"use client";

import { useState } from "react";

// Los datos de cada tarjeta. Las fotos son las mismas de la documentación
// oficial de React.
const CIENTIFICOS = [
  { nombre: "Aklilu Lemma", foto: "https://i.imgur.com/lICfvbD.jpg" },
  { nombre: "Alan L. Hart", foto: "https://i.imgur.com/QIrZWGIs.jpg" },
  { nombre: "Katsuko Saruhashi", foto: "https://i.imgur.com/YfeOqp2s.jpg" },
  { nombre: "Mario José Molina", foto: "https://i.imgur.com/mynHUSa.jpg" },
  { nombre: "Percy Lavon Julian", foto: "https://i.imgur.com/IOjWm71.jpg" },
  { nombre: "S. Chandrasekhar", foto: "https://i.imgur.com/lrWQx8l.jpg" },
];

// Un solo componente Perfil para todas las tarjetas. Lo que cambia de una a
// otra se lo pasamos entre llaves cuando lo usamos: eso son las props.
function Perfil({ nombre, foto }) {
  return (
    <figure style={{ margin: 0, width: 108, textAlign: "center" }}>
      <img
        src={foto}
        alt={nombre}
        style={{ width: 88, height: 88, borderRadius: 10, objectFit: "cover" }}
      />
      <figcaption className="tenue" style={{ fontSize: "0.78rem", lineHeight: 1.3 }}>
        {nombre}
      </figcaption>
    </figure>
  );
}

export default function ArmadorDeGaleriaDemo() {
  const [cantidad, setCantidad] = useState(3);
  const visibles = CIENTIFICOS.slice(0, cantidad);

  // El JSX que React está dibujando ahora mismo, armado como texto para que
  // veas cómo se repite el mismo componente. Cada tarjeta lleva las mismas dos
  // props que le pasamos más abajo: nombre y foto.
  const jsx = [
    "<section>",
    "  <h3>Científicos increíbles</h3>",
    ...visibles.map(
      (c) => '  <Perfil nombre="' + c.nombre + '" foto="' + c.foto + '" />',
    ),
    "</section>",
  ].join("\n");

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className="boton"
          onClick={() => setCantidad(cantidad + 1)}
          disabled={cantidad >= CIENTIFICOS.length}
        >
          Agregar un &lt;Perfil /&gt;
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setCantidad(cantidad - 1)}
          disabled={cantidad <= 0}
        >
          Sacar el último
        </button>
        <span className="tenue">
          {cantidad} de {CIENTIFICOS.length} tarjetas
        </span>
      </div>

      <section>
        <h3>Científicos increíbles</h3>
        <div className="fila" style={{ alignItems: "flex-start", minHeight: 122 }}>
          {visibles.map((cientifico) => (
            <Perfil
              key={cientifico.nombre}
              nombre={cientifico.nombre}
              foto={cientifico.foto}
            />
          ))}
          {cantidad === 0 && (
            <p className="tenue">La galería quedó vacía. Agregá una tarjeta.</p>
          )}
        </div>
      </section>

      <p className="tenue" style={{ marginBottom: 6 }}>
        El JSX que estás viendo funcionar, escrito a mano (en el archivo de
        verdad esas líneas las genera un map):
      </p>
      <pre
        style={{
          margin: 0,
          padding: "10px 12px",
          background: "var(--superficie-2)",
          border: "1px solid var(--borde)",
          borderRadius: 8,
          fontFamily: "var(--fuente-mono)",
          fontSize: "0.8rem",
          overflowX: "auto",
        }}
      >
        {jsx}
      </pre>
    </div>
  );
}
