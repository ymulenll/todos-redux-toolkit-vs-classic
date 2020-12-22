// import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducer from './';
// import thunk from 'redux-thunk';
// import todos from './todo.reducer';

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

import todosReducer from './todo.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { todos: todosReducer },
});

export default store;
