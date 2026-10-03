"use client";

import { useState } from "react";

// Dos maneras de "no mostrar":
//   1. salir temprano con un if y otro return
//   2. devolver null, que para React significa "no dibujes nada"

function Bienvenida({ usuario }) {
  // Salida temprana: si no hay usuario, el resto de la función ni se ejecuta.
  if (usuario === null) {
    return <p style={{ margin: 0 }}>Todavía no iniciaste sesión.</p>;
  }

  return (
    <p style={{ margin: 0 }}>
      Hola de nuevo, <strong>{usuario.nombre}</strong>. Tenés{" "}
      {usuario.mensajes} mensajes sin leer.
    </p>
  );
}

function AvisoDeMantenimiento({ activo }) {
  // null no es un string vacío ni un div escondido: no llega nada al HTML.
  if (!activo) return null;

  return (
    <p style={{ margin: 0, color: "var(--ambar)", fontWeight: 600 }}>
      El sistema se actualiza hoy a las 23:00.
    </p>
  );
}

export default function SalidaTempranaDemo() {
  const [usuario, setUsuario] = useState(null);
  const [aviso, setAviso] = useState(false);

  const recuadro = {
    border: "1px dashed var(--borde)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  };

  return (
    <div>
      <div className="fila" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className="boton"
          onClick={() =>
            setUsuario(
              usuario === null ? { nombre: "Ada", mensajes: 3 } : null,
            )
          }
        >
          {usuario === null ? "Iniciar sesión" : "Cerrar sesión"}
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => setAviso(!aviso)}
        >
          {aviso ? "Sacar el aviso" : "Poner el aviso"}
        </button>
      </div>

      <div style={recuadro}>
        <Bienvenida usuario={usuario} />
      </div>

      <div style={recuadro}>
        <AvisoDeMantenimiento activo={aviso} />
      </div>

      {/* La explicación va FUERA del recuadro, así el recuadro queda de
          verdad vacío y se puede revisar con el inspector. */}
      <p className="tenue" style={{ margin: 0 }}>
        {aviso
          ? "AvisoDeMantenimiento devolvió su párrafo, así que ahora el recuadro de arriba lo muestra."
          : "El recuadro de arriba está aplastado porque quedó completamente vacío: AvisoDeMantenimiento devolvió null y React no dejó nada adentro. Abrilo con el inspector del navegador y vas a ver el div sin un solo hijo."}
      </p>
    </div>
  );
}
