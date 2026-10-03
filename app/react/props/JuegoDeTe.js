// El ejemplo tal cual salió en la diapositiva de la clase 5.
// No lleva "use client" porque no hay nada interactivo: se dibuja en el servidor.

function Taza({ invitado }) {
  return <h2>Taza de té para el invitado #{invitado}</h2>;
}

export default function JuegoDeTe() {
  return (
    <>
      <Taza invitado={1} />
      <Taza invitado={2} />
      <Taza invitado={3} />
    </>
  );
}
