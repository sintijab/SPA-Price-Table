import styles from './styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './js/containers/View';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './js/reducers';

//window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
