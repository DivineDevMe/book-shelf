import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddlewire from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Routes from './routes';
import reducers from './reducers'

const createStoreMiddlewire = applyMiddleware(promiseMiddlewire,ReduxThunk)(createStore);


ReactDOM.render(
  <Provider store={createStoreMiddlewire(reducers)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


