/**
 * Recuadro de aviso al costado del texto.
 *
 * Props:
 *   tipo   "info" (por defecto) | "atencion" | "error" | "ok"
 *   titulo (string, opcional)
 */
export default function Nota({ tipo = "info", titulo, children }) {
  return (
    <div className={`nota nota-${tipo}`}>
      {titulo && <p className="nota-titulo">{titulo}</p>}
      {children}
    </div>
  );
}
