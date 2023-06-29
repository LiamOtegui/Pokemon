import { legacy_createStore as createStore } from 'redux';
import { applyMiddleware, compose } from "redux"; // el createStore estaba aca, pero me aparecia que estaba deprecated si no lo importaba como en la primer linea.
// El "applyMiddleware" permite aplicar un middleware (en este caso, thunk) y el "compose" sirve para hacer la conexion con la extension del navegador (Redux dev tools).
import thunk from 'redux-thunk'; // Con el thunk podemos hacer peticiones a la API
import reducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

// El STORE contiene al estado global, el cual puede utilizar cualquiera de los COMPONENTS.

// 1- Las ACTIONS traen la info de la API o realizan funciones específicas, estas ACTIONS luego pasan al REDUCER.
// 2- El REDUCER es una funcion gigante que utiliza a las ACTIONS para actualizar el estado/state global de la APP.
// 3- Los COMPONENTS utilizan y renderizan las funciones y el estado proporcionados por el REDUCER.

// El thunk middleware permite la creación de acciones asíncronas en Redux.