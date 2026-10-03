"use client";

// La grilla de productos. Lee dos cosas del store y despacha una sola acción.
// Ese es el tamaño que tiene que tener un componente conectado.

import { useSelector, useDispatch } from "react-redux";
import { productoAgregado } from "./carritoSlice";
import { elegirProductos } from "./selectores";
import { AvisoCatalogo, TARJETA, MONO, pesos } from "./piezas";

export default function Catalogo() {
  const productos = useSelector(elegirProductos);
  // estado.carrito.porId es un objeto que ya está en el store: devolverlo tal
  // cual no crea nada nuevo, así que no hace falta memorizar nada.
  const enCarrito = useSelector((estado) => estado.carrito.porId);
  const despachar = useDispatch();

  return (
    <div>
      <AvisoCatalogo />

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: 8,
        }}
      >
        {productos.map((producto) => {
          const linea = enCarrito[producto.id];
          const puestos = linea ? linea.cantidad : 0;
          const agotado = producto.stock === 0;
          const enElTope = puestos >= producto.stock;

          return (
            <li key={producto.id} style={TARJETA}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>
                {producto.nombre}
              </p>
              <p
                className="tenue"
                style={{ margin: "2px 0 8px", fontSize: "0.78rem" }}
              >
                {producto.categoria} ·{" "}
                {agotado ? "sin stock" : `quedan ${producto.stock}`}
                {puestos > 0 && ` · ${puestos} en el carrito`}
              </p>

              <div className="fila" style={{ justifyContent: "space-between" }}>
                <span style={MONO}>{pesos(producto.precio)}</span>
                <button
                  type="button"
                  className="boton"
                  style={{ padding: "4px 12px", fontSize: "0.82rem" }}
                  disabled={agotado || enElTope}
                  // El nombre visible dice "Agregar" ocho veces. Para quien
                  // escucha la página, aria-label dice cuál.
                  aria-label={`Agregar ${producto.nombre} al carrito`}
                  onClick={() => despachar(productoAgregado(producto))}
                >
                  {agotado ? "Sin stock" : enElTope ? "En el tope" : "Agregar"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
