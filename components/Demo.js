/**
 * Recuadro que enmarca un ejemplo que se puede tocar.
 *
 * Props:
 *   titulo (string) texto de la barra superior. Por defecto "Demo en vivo".
 */
export default function Demo({ titulo = "Demo en vivo", children }) {
  return (
    <div className="demo">
      <div className="demo-barra">
        <span className="demo-punto" aria-hidden="true" />
        {titulo}
      </div>
      <div className="demo-cuerpo">{children}</div>
    </div>
  );
}
