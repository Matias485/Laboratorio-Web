// ===========================================================================
// Redux a mano.
//
// Este archivo no importa nada. Es JavaScript común: un objeto, una función y
// un arreglo de avisados. Lo que hay acá adentro es, en esencia, lo mismo que
// hace la librería redux de verdad, con otros nombres y con muchas más
// validaciones encima.
// ===========================================================================

// Crea un store: guarda un estado, deja despachar acciones y avisa a quien se
// haya suscrito. Esto es todo lo que un store es.
export function crearStore(reducer, estadoInicial) {
  let estado = estadoInicial;
  let oyentes = [];

  // Leer el estado de ahora. Devuelve la referencia, no una copia.
  function getState() {
    return estado;
  }

  // La única forma de cambiarlo: pasar una acción por el reducer y avisar.
  function dispatch(accion) {
    estado = reducer(estado, accion);
    for (const oyente of oyentes) oyente();
    return accion;
  }

  // Anotarse para que te avisen. Devuelve la función para desanotarte.
  function subscribe(oyente) {
    oyentes = [...oyentes, oyente];
    return function desuscribir() {
      oyentes = oyentes.filter((otro) => otro !== oyente);
    };
  }

  // Una acción que ningún reducer conoce: cada uno cae en su default y
  // devuelve su estado inicial, así el store arranca armado.
  dispatch({ type: "@@init" });

  return { getState, dispatch, subscribe };
}

// Parte el estado por área. Recibe { contador: reducirContador, tareas: ... }
// y devuelve UN solo reducer que llama a cada uno con su pedazo del estado.
export function combinarReducers(reducers) {
  const areas = Object.keys(reducers);

  return function reducerRaiz(estado = {}, accion) {
    let cambio = false;
    const siguiente = {};

    for (const area of areas) {
      siguiente[area] = reducers[area](estado[area], accion);
      if (siguiente[area] !== estado[area]) cambio = true;
    }

    // Si ningún área cambió devolvemos el objeto viejo, no uno nuevo igual.
    // Así quien compara con === sabe que no hay nada para redibujar.
    return cambio ? siguiente : estado;
  };
}
