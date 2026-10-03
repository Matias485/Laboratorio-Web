// El ejemplo de la clase, tal cual sale de la documentación de React.
// Lo único que le agregamos es el ancho, para que la foto no salga gigante.
export default function Perfil() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
      style={{ width: 120, borderRadius: 10 }}
    />
  );
}
