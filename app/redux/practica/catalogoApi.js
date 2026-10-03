// ===========================================================================
// El "servidor" de la librería del campus.
//
// No existe: es una tabla fija y un setTimeout. Toda esta lección anda sin
// internet, igual que la anterior, así que el demo funciona siempre y el
// único retraso es el que decidimos nosotros.
//
// Este archivo no sabe nada de Redux ni de React. Es la frontera con el mundo
// de afuera, y por eso vive aparte: el día que sea un fetch de verdad, cambia
// solo este archivo.
// ===========================================================================

export const CATALOGO = [
  {
    id: "tanenbaum",
    nombre: "Sistemas Operativos Modernos — Tanenbaum",
    categoria: "Libros",
    precio: 68900,
    stock: 4,
  },
  {
    id: "cormen",
    nombre: "Introduction to Algorithms — Cormen",
    categoria: "Libros",
    precio: 112500,
    stock: 2,
  },
  {
    id: "clean-code",
    nombre: "Clean Code — Robert C. Martin",
    categoria: "Libros",
    precio: 54300,
    stock: 6,
  },
  {
    id: "apunte-redes",
    nombre: "Apunte anillado de Redes de Datos",
    categoria: "Apuntes",
    precio: 9800,
    stock: 15,
  },
  {
    id: "casio-fx82",
    nombre: "Calculadora científica Casio fx-82",
    categoria: "Insumos",
    precio: 38900,
    stock: 7,
  },
  {
    id: "pendrive-64",
    nombre: "Pendrive 64 GB USB 3.0",
    categoria: "Insumos",
    precio: 11200,
    stock: 12,
  },
  {
    id: "cuaderno-a4",
    nombre: "Cuaderno A4 cuadriculado 84 hojas",
    categoria: "Insumos",
    precio: 4800,
    stock: 20,
  },
  {
    id: "auriculares",
    nombre: "Auriculares con micrófono USB",
    categoria: "Insumos",
    precio: 29900,
    stock: 0,
  },
];

// Devuelve una promesa que tarda casi un segundo, como tardaría una de verdad.
// Con modo === "falla" rechaza, para poder mirar el camino del error sin
// desenchufar el wifi.
export function pedirCatalogo(modo = "ok") {
  return new Promise((entregar, fallar) => {
    setTimeout(() => {
      if (modo === "falla") {
        fallar(new Error("La librería devolvió 500: el catálogo no está."));
      } else {
        entregar(CATALOGO);
      }
    }, 900);
  });
}
