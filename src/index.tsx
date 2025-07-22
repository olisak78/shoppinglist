import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import { store } from './app/store';
import ShoppingList from './components/ShoppingList';
import OrderForm from './components/OrderForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShoppingList />} />
          <Route path='/order' element={<OrderForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
