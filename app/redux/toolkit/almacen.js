// ===========================================================================
// El store de esta lección, armado con Redux Toolkit.
//
// Compará este archivo con app/redux/conceptos/store.js: hace más cosas y
// ocupa menos. Acá no hay constantes de texto, ni creadores de acciones
// escritos a mano, ni un solo switch.
//
// No lleva "use client". No lo necesita: es JavaScript suelto, sin hooks. Lo
// importan componentes de cliente, así que termina en el paquete del
// navegador igual.
// ===========================================================================

import {
  configureStore,
  createSlice,
  createAsyncThunk,
  createSelector,
  nanoid,
} from "@reduxjs/toolkit";

// ------------------------------------------------------------- contador ---
// Un slice declara tres cosas: cómo se llama el área, con qué arranca y qué
// le puede pasar. A cambio devuelve el reducer, los creadores de acciones y
// los strings de type, todo generado.

const contadorSlice = createSlice({
  name: "contador",
  initialState: { valor: 0, paso: 1 },
  reducers: {
    // Ojo con esto: "estado" NO es el estado real, es un borrador de Immer.
    // Mutarlo es la forma correcta de escribir un reducer de RTK, y la
    // excepción vale SOLO acá adentro. En el resto de React la regla de no
    // mutar sigue valiendo igual que siempre.
    incrementado(estado) {
      estado.valor += estado.paso;
    },
    decrementado(estado) {
      estado.valor -= estado.paso;
    },
    pasoCambiado(estado, accion) {
      estado.paso = accion.payload;
    },
    // Este no muta: devuelve un objeto nuevo. También vale. Lo que no se puede
    // es hacer las dos cosas en el mismo reducer.
    reiniciado() {
      return { valor: 0, paso: 1 };
    },
  },
});

export const { incrementado, decrementado, pasoCambiado, reiniciado } =
  contadorSlice.actions;

// --------------------------------------------------------------- tareas ---

const TAREAS_INICIALES = [
  { id: "t1", texto: "Instalar @reduxjs/toolkit", hecha: true },
  { id: "t2", texto: "Escribir un slice", hecha: false },
  { id: "t3", texto: "Borrar el switch viejo", hecha: false },
];

const tareasSlice = createSlice({
  name: "tareas",
  initialState: TAREAS_INICIALES,
  reducers: {
    // Cuando el payload necesita prepararse —un id, una fecha— se escribe el
    // reducer y el prepare por separado. prepare corre ANTES, afuera del
    // reducer, así que puede usar nanoid() sin ensuciar nada.
    tareaAgregada: {
      reducer(estado, accion) {
        estado.push(accion.payload);
      },
      prepare(texto) {
        return { payload: { id: nanoid(), texto, hecha: false } };
      },
    },
    tareaAlternada(estado, accion) {
      const tarea = estado.find((otra) => otra.id === accion.payload);
      if (tarea) tarea.hecha = !tarea.hecha;
    },
    // Acá devolvemos un arreglo nuevo en vez de mutar, porque filter ya lo da
    // hecho. Las dos formas conviven en el mismo slice sin problema.
    tareaBorrada(estado, accion) {
      return estado.filter((tarea) => tarea.id !== accion.payload);
    },
  },
});

export const { tareaAgregada, tareaAlternada, tareaBorrada } =
  tareasSlice.actions;

// ------------------------------------------------------------ cotización ---
// Una petición falsa. NO sale a internet: es un setTimeout con una tabla fija,
// para que la demo ande siempre igual y sin conexión.

const TABLA = { dolar: 1340, euro: 1455, real: 248 };

function pedirCotizacion(moneda) {
  return new Promise((entregar, fallar) => {
    setTimeout(() => {
      if (moneda === "cripto") {
        fallar(new Error("El servidor devolvió 503"));
      } else {
        entregar({ moneda, valor: TABLA[moneda] });
      }
    }, 1200);
  });
}

// createAsyncThunk recibe un prefijo y una función async. Despacha solo tres
// acciones por cada llamada: pedida/pending, pedida/fulfilled y
// pedida/rejected. El reducer sigue siendo puro; lo sucio pasa acá.
export const cotizacionPedida = createAsyncThunk(
  "cotizacion/pedida",
  async (moneda) => {
    const respuesta = await pedirCotizacion(moneda);
    return respuesta; // esto termina siendo el payload de fulfilled
  },
);

const cotizacionSlice = createSlice({
  name: "cotizacion",
  initialState: { situacion: "inicial", moneda: null, valor: null, error: null },
  reducers: {},
  extraReducers: (constructor) => {
    constructor
      .addCase(cotizacionPedida.pending, (estado, accion) => {
        estado.situacion = "cargando";
        estado.moneda = accion.meta.arg; // el argumento con el que se llamó
        estado.valor = null;
        estado.error = null;
      })
      .addCase(cotizacionPedida.fulfilled, (estado, accion) => {
        estado.situacion = "listo";
        estado.valor = accion.payload.valor;
      })
      .addCase(cotizacionPedida.rejected, (estado, accion) => {
        estado.situacion = "error";
        // El error NO viene en payload: viene en accion.error.
        estado.error = accion.error.message;
      });
  },
});

// -------------------------------------------------------------- registro ---
// Un slice que no declara ninguna acción propia y escucha TODAS las demás,
// para que las demos puedan mostrar lo que se fue despachando. Es la misma
// idea de la lección anterior: un hecho, varios reducers interesados.

const registroSlice = createSlice({
  name: "registro",
  initialState: [],
  reducers: {
    registroLimpiado: () => [],
  },
  extraReducers: (constructor) => {
    constructor.addMatcher(
      (accion) =>
        !accion.type.startsWith("registro/") && !accion.type.startsWith("@@"),
      (estado, accion) => {
        estado.unshift({
          id: nanoid(),
          type: accion.type,
          payload: accion.payload,
        });
        if (estado.length > 30) estado.pop();
      },
    );
  },
});

export const { registroLimpiado } = registroSlice.actions;

// -------------------------------------------------- selectores derivados ---
// Un selector es una función que recibe el estado entero y devuelve un pedazo.
// Los baratos se escriben sueltos; los caros se memorizan con createSelector.

export const elegirValor = (estado) => estado.contador.valor;
export const elegirPaso = (estado) => estado.contador.paso;

export const elegirPendientes = createSelector(
  [(estado) => estado.tareas],
  (tareas) => tareas.filter((tarea) => !tarea.hecha),
);

// ----------------------------------------------------------------- store ---
// configureStore junta los reducers, enchufa las DevTools y agrega el
// middleware por defecto. En desarrollo eso incluye el chequeo de mutaciones
// accidentales y el de valores no serializables.

export const almacen = configureStore({
  reducer: {
    contador: contadorSlice.reducer,
    tareas: tareasSlice.reducer,
    cotizacion: cotizacionSlice.reducer,
    registro: registroSlice.reducer,
  },
});
