"use client";

import { useState } from "react";

function Perfil() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
      style={{ width: 88, height: 88, borderRadius: 10, objectFit: "cover" }}
    />
  );
}

export default function MayusculaDemo() {
  const [mayuscula, setMayuscula] = useState(true);

  return (
    <div>
      <div className="fila" style={{ marginBottom: 14 }}>
        <button
          type="button"
          className={mayuscula ? "boton" : "boton boton-suave"}
          onClick={() => setMayuscula(true)}
        >
          Usar &lt;Perfil /&gt;
        </button>
        <button
          type="button"
          className={mayuscula ? "boton boton-suave" : "boton"}
          onClick={() => setMayuscula(false)}
        >
          Usar &lt;perfil /&gt;
        </button>
      </div>

      <div
        style={{
          border: "1px dashed var(--borde)",
          borderRadius: 10,
          padding: 16,
          minHeight: 122,
        }}
      >
        {mayuscula ? (
          <div className="fila">
            <Perfil />
            <Perfil />
            <Perfil />
          </div>
        ) : (
          <div className="fila">
            {/* Con minúscula React no busca tu componente: cree que "perfil"
                es una etiqueta HTML que él no conoce, y no dibuja nada. */}
            <perfil />
            <perfil />
            <perfil />
          </div>
        )}
      </div>

      <p className="tenue" style={{ marginBottom: 0, marginTop: 10 }}>
        {mayuscula
          ? "Mayúscula: React busca tu componente Perfil y lo ejecuta tres veces."
          : "Minúscula: el recuadro quedó vacío. React puso tres etiquetas <perfil></perfil> en el HTML y avisó por consola. Para ver el aviso, abrí la consola con F12 y recargá la página: React lo escribe una sola vez por etiqueta."}
      </p>
    </div>
  );
}
