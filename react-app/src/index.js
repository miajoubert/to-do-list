import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';
import './index.css';
import { ModalProvider } from './context/Modal';
import { FormProvider } from './context/Form';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
