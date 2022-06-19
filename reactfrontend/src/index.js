import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from './App';



import {Provider} from 'react-redux'
import store from './store'
import {persistStore}from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      
    </Provider>
    
  </React.StrictMode>
);


