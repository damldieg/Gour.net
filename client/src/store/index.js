//import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/**const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );*/


  
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
));

export default store;