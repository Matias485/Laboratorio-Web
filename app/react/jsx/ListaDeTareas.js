// Este es el ejemplo de la diapositiva "Uso de JSX", en un archivo de verdad.
// No lleva "use client" porque no tiene estado ni eventos: es un componente
// que solo devuelve marcado.

const persona = {
  nombre: "Gregorio Y. Zara",
  tema: {
    backgroundColor: "black",
    color: "pink",
    padding: 16,
    borderRadius: 10,
  },
};

export default function ListaDeTareas() {
  return (
    <div style={persona.tema}>
      <h1>Tareas de {persona.nombre}</h1>
      <img
        width={90}
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Mejorar el videoteléfono</li>
        <li>Preparar las clases de aeronáutica</li>
        <li>Trabajar en el motor a alcohol</li>
      </ul>
    </div>
  );
}
