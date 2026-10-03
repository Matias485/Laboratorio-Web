// ===========================================================================
// El store de la demo principal. Dos áreas de estado (un contador y una lista
// de tareas) más una tercera que lleva estadísticas escuchando las mismas
// acciones que la lista.
//
// Fijate que acá no aparece React por ningún lado: esto es JavaScript suelto y
// se podría correr en Node sin un navegador.
// ===========================================================================

import { crearStore, combinarReducers } from "./redux-casero";

// ---------------------------------------------------------------- acciones ---
// Los nombres son hechos que PASARON, en pasado, con el área adelante.
// Guardarlos en constantes evita que un typo en un string arruine la tarde.

export const PUNTO_SUMADO = "contador/puntoSumado";
export const PUNTO_RESTADO = "contador/puntoRestado";
export const TAREA_AGREGADA = "tareas/tareaAgregada";
export const TAREA_ALTERNADA = "tareas/tareaAlternada";
export const TAREA_BORRADA = "tareas/tareaBorrada";
export const DEMO_REINICIADA = "demo/reiniciada";

// ------------------------------------------------- creadores de acciones ---
// Una función por acción. Devuelven el objeto plano y nada más.

export const puntoSumado = () => ({ type: PUNTO_SUMADO });
export const puntoRestado = () => ({ type: PUNTO_RESTADO });
export const tareaAlternada = (id) => ({ type: TAREA_ALTERNADA, payload: id });
export const tareaBorrada = (id) => ({ type: TAREA_BORRADA, payload: id });
export const demoReiniciada = () => ({ type: DEMO_REINICIADA });

// El id se genera acá, en el creador, y no adentro del reducer. El reducer
// tiene que ser puro: con las mismas entradas, la misma salida. Un contador
// que sube solo, o un Date.now(), lo dejarían de ser.
let siguienteId = 100;

export const tareaAgregada = (texto) => ({
  type: TAREA_AGREGADA,
  payload: { id: siguienteId++, texto, hecha: false },
});

// ---------------------------------------------------------------- reducers ---

function reducirContador(estado = 0, accion) {
  switch (accion.type) {
    case PUNTO_SUMADO:
      return estado + 1;
    case PUNTO_RESTADO:
      return estado - 1;
    case DEMO_REINICIADA:
      return 0;
    default:
      return estado;
  }
}

const TAREAS_INICIALES = [
  { id: 1, texto: "Leer Por qué existe Redux", hecha: true },
  { id: 2, texto: "Escribir un reducer a mano", hecha: false },
];

function reducirTareas(estado = TAREAS_INICIALES, accion) {
  switch (accion.type) {
    case TAREA_AGREGADA:
      // Arreglo nuevo con lo de antes más la tarea. Nunca push.
      return [...estado, accion.payload];
    case TAREA_ALTERNADA:
      return estado.map((tarea) =>
        tarea.id === accion.payload ? { ...tarea, hecha: !tarea.hecha } : tarea,
      );
    case TAREA_BORRADA:
      return estado.filter((tarea) => tarea.id !== accion.payload);
    case DEMO_REINICIADA:
      return TAREAS_INICIALES;
    default:
      return estado;
  }
}

// Este reducer escucha las MISMAS acciones que el de arriba. Ninguno de los
// dos sabe que el otro existe, y la vista que despacha tampoco.
function reducirEstadisticas(estado = { agregadas: 0, borradas: 0 }, accion) {
  switch (accion.type) {
    case TAREA_AGREGADA:
      return { ...estado, agregadas: estado.agregadas + 1 };
    case TAREA_BORRADA:
      return { ...estado, borradas: estado.borradas + 1 };
    case DEMO_REINICIADA:
      return { agregadas: 0, borradas: 0 };
    default:
      return estado;
  }
}

// ------------------------------------------------------------------- store ---

export const reducerRaiz = combinarReducers({
  contador: reducirContador,
  tareas: reducirTareas,
  estadisticas: reducirEstadisticas,
});

export const store = crearStore(reducerRaiz);
