// El hijo. No tiene estado y no sabe de dónde salen los datos:
// sólo dibuja lo que le llega por props.

export default function TarjetaPerfil({
  nombre,
  rol,
  color,
  experiencia,
  mostrarAvatar,
}) {
  return (
    <div
      className="tarjeta"
      style={{ borderTop: "4px solid " + color, maxWidth: 340 }}
    >
      <div className="fila">
        {mostrarAvatar && (
          <img
            src="https://i.imgur.com/1bX5QH6.jpg"
            alt={"Foto de " + nombre}
            width={56}
            height={56}
            style={{ borderRadius: "50%" }}
          />
        )}
        <div>
          <h3 style={{ color: color, margin: 0 }}>{nombre}</h3>
          <p>{rol}</p>
        </div>
      </div>
      <p style={{ marginTop: 10 }}>
        {experiencia} {experiencia === 1 ? "año" : "años"} de experiencia
      </p>
    </div>
  );
}
