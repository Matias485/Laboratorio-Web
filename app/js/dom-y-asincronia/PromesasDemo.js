"use client";

import { useState } from "react";
import Registro, { useRegistro } from "./Registro";

const USUARIOS = {
  7: { id: 7, nombre: "Ana Pereyra" },
  8: { id: 8, nombre: "Bruno Sosa" },
};
const PEDIDOS = { 7: { id: 331, total: 12400 } };
const ENVIOS = { 331: { id: 901, empresa: "Correo Central" } };
const SEGUIMIENTOS = { 901: { estado: "en camino", llega: "el martes" } };

// Las mismas cuatro búsquedas de antes, pero ahora no reciben callback:
// devuelven una promesa. Así es como se fabrica una a mano cuando lo que tenés
// abajo es una API vieja basada en callbacks o temporizadores.
function buscar(tabla, clave, mensaje, demora = 350) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dato = tabla[clave];
      if (dato) resolve(dato);
      else reject(new Error(mensaje));
    }, demora);
  });
}

const buscarUsuario = (id) => buscar(USUARIOS, id, "no existe el usuario " + id);
const buscarPedido = (id) => buscar(PEDIDOS, id, "el usuario " + id + " no tiene pedidos");
const buscarEnvio = (id) => buscar(ENVIOS, id, "el pedido " + id + " no tiene envío");
const buscarSeguimiento = (id) => buscar(SEGUIMIENTOS, id, "sin seguimiento para " + id);

export default function PromesasDemo() {
  const { lineas, anotar, limpiar } = useRegistro();
  const [estado, setEstado] = useState("en reposo");

  function correr(idUsuario) {
    limpiar();
    setEstado("pendiente");
    const t0 = performance.now();
    const desde = () => Math.round(performance.now() - t0);

    // La cadena: cada .then devuelve la promesa siguiente, así que el .then de
    // abajo espera a esa. Cuatro pasos, un solo nivel de indentación.
    buscarUsuario(idUsuario)
      .then((usuario) => {
        anotar("usuario: " + usuario.nombre, "ok", desde());
        return buscarPedido(usuario.id);
      })
      .then((pedido) => {
        anotar("pedido #" + pedido.id + " por $" + pedido.total, "ok", desde());
        return buscarEnvio(pedido.id);
      })
      .then((envio) => {
        anotar("envío #" + envio.id + " por " + envio.empresa, "ok", desde());
        return buscarSeguimiento(envio.id);
      })
      .then((seguimiento) => {
        anotar("seguimiento: " + seguimiento.estado, "ok", desde());
        setEstado("cumplida");
      })
      // Un solo catch al final atrapa el error de cualquiera de los cuatro pasos.
      .catch((error) => {
        anotar("✗ " + error.message, "error", desde());
        setEstado("rechazada");
      })
      // finally corre siempre, salga bien o mal. Sirve para apagar el "cargando".
      .finally(() => {
        anotar("finally: corre igual, salga bien o mal", "sincronico", desde());
      });

    anotar("y esta línea corre antes que todas las de arriba", "sincronico", desde());
  }

  function correrSinReturn() {
    limpiar();
    setEstado("pendiente");

    buscarUsuario(7)
      .then((usuario) => {
        anotar("usuario: " + usuario.nombre, "ok");
        // ✗ Falta el return. La promesa se crea y se ejecuta, pero la cadena
        // no la espera: este .then devuelve undefined y sigue de largo.
        buscarPedido(usuario.id);
      })
      .then((pedido) => {
        anotar("el .then siguiente recibió: " + pedido, "error");
        setEstado("cumplida");
      });
  }

  const color =
    estado === "cumplida"
      ? "var(--verde)"
      : estado === "rechazada"
        ? "var(--rojo)"
        : "var(--texto-suave)";

  return (
    <div>
      <div className="fila" style={{ marginBottom: 12 }}>
        <button type="button" className="boton" onClick={() => correr(7)}>
          Usuario 7 · se cumple
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={() => correr(8)}
        >
          Usuario 8 · se rechaza en el paso 2
        </button>
        <button
          type="button"
          className="boton boton-suave"
          onClick={correrSinReturn}
        >
          Sin return · el bug clásico
        </button>
      </div>

      <p style={{ marginTop: 0 }}>
        Estado de la cadena:{" "}
        <strong style={{ color, fontFamily: "var(--fuente-mono)" }}>
          {estado}
        </strong>
      </p>

      <Registro lineas={lineas} alto={140} />
    </div>
  );
}
