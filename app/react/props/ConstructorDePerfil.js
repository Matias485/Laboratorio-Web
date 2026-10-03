"use client";

import { useState } from "react";
import Codigo from "@/components/Codigo";
import TarjetaPerfil from "./TarjetaPerfil";

const COLORES = [
  { valor: "#2f6fb5", nombre: "Azul" },
  { valor: "#0f7a52", nombre: "Verde" },
  { valor: "#b4243a", nombre: "Rojo" },
  { valor: "#92600a", nombre: "Ámbar" },
];

export default function ConstructorDePerfil() {
  const [nombre, setNombre] = useState("Ada Lovelace");
  const [rol, setRol] = useState("Estudiante");
  const [color, setColor] = useState("#2f6fb5");
  const [experiencia, setExperiencia] = useState(2);
  const [mostrarAvatar, setMostrarAvatar] = useState(true);

  // Armamos, con texto, la misma etiqueta JSX que se está renderizando abajo.
  const etiqueta = [
    "<TarjetaPerfil",
    '  nombre="' + nombre + '"',
    '  rol="' + rol + '"',
    '  color="' + color + '"',
    "  experiencia={" + experiencia + "}",
    "  mostrarAvatar={" + mostrarAvatar + "}",
    "/>",
  ].join("\n");

  return (
    <div>
      <div className="fila" style={{ marginBottom: 10 }}>
        <label htmlFor="perfil-nombre">Nombre</label>
        <input
          id="perfil-nombre"
          className="entrada"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
        />

        <label htmlFor="perfil-rol">Rol</label>
        <select
          id="perfil-rol"
          className="entrada"
          value={rol}
          onChange={(evento) => setRol(evento.target.value)}
        >
          <option value="Estudiante">Estudiante</option>
          <option value="Ayudante">Ayudante</option>
          <option value="Profesora">Profesora</option>
        </select>
      </div>

      <div className="fila" style={{ marginBottom: 18 }}>
        <label htmlFor="perfil-color">Color</label>
        <select
          id="perfil-color"
          className="entrada"
          value={color}
          onChange={(evento) => setColor(evento.target.value)}
        >
          {COLORES.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="perfil-experiencia">Años</label>
        <input
          id="perfil-experiencia"
          className="entrada"
          type="number"
          min="0"
          max="50"
          style={{ width: 80 }}
          value={experiencia}
          onChange={(evento) => setExperiencia(Number(evento.target.value) || 0)}
        />

        <label>
          <input
            type="checkbox"
            checked={mostrarAvatar}
            onChange={(evento) => setMostrarAvatar(evento.target.checked)}
          />{" "}
          Mostrar avatar
        </label>
      </div>

      <TarjetaPerfil
        nombre={nombre}
        rol={rol}
        color={color}
        experiencia={experiencia}
        mostrarAvatar={mostrarAvatar}
      />

      <p className="tenue" style={{ marginBottom: 6, marginTop: 18 }}>
        Con esas props se está dibujando la tarjeta de arriba:
      </p>
      <Codigo archivo="lo que React está renderizando ahora" codigo={etiqueta} />
    </div>
  );
}
