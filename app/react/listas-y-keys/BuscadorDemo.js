"use client";

import { useState } from "react";

const PELICULAS = [
  { id: "mat", titulo: "Matrix", anio: 1999 },
  { id: "int", titulo: "Interestelar", anio: 2014 },
  { id: "ori", titulo: "El origen", anio: 2010 },
  { id: "pad", titulo: "El padrino", anio: 1972 },
  { id: "par", titulo: "Parasite", anio: 2019 },
  { id: "esp", titulo: "El viaje de Chihiro", anio: 2001 },
];

export default function BuscadorDemo() {
  const [texto, setTexto] = useState("");

  // Primero filtramos los datos, después mapeamos lo que quedó.
  // Los dos pasos son sobre arreglos comunes: filter devuelve un arreglo nuevo.
  const busqueda = texto.trim().toLowerCase();
  const encontradas = PELICULAS.filter((pelicula) =>
    pelicula.titulo.toLowerCase().includes(busqueda),
  );

  return (
    <div>
      <label htmlFor="buscador-peliculas" style={{ display: "block" }}>
        Buscar por título
      </label>
      <input
        id="buscador-peliculas"
        className="entrada"
        type="search"
        value={texto}
        placeholder="probá con: el"
        onChange={(evento) => setTexto(evento.target.value)}
        style={{ width: "100%", maxWidth: 320, marginTop: 4 }}
      />

      <p className="tenue">
        {encontradas.length} de {PELICULAS.length} películas
      </p>

      {encontradas.length === 0 ? (
        <p>
          No hay ninguna película que contenga <strong>{texto}</strong>. Probá
          con otra cosa.
        </p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 22 }}>
          {encontradas.map((pelicula) => (
            <li key={pelicula.id}>
              {pelicula.titulo} <span className="tenue">({pelicula.anio})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
