"use client";

// Un componente es una función de JavaScript que devuelve JSX.
function Perfil() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
      style={{ width: 96, height: 96, borderRadius: 10, objectFit: "cover" }}
    />
  );
}

// Y otro componente lo usa tres veces, como si fuera una etiqueta HTML propia.
export default function GaleriaDemo() {
  return (
    <section>
      <h3>Científicos increíbles</h3>
      <div className="fila">
        <Perfil />
        <Perfil />
        <Perfil />
      </div>
    </section>
  );
}
