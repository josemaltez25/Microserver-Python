import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Productos, { ProductoCreate, ProductoDetails } from './productos';
import Navbar from './navbar';
import ProductoEdit from './productos/edit';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container mt-3">
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/productos" exact component={Productos} />
          <Route path="/productos/create" exact component={ProductoCreate} />
          <Route path="/productos/details/:id" exact component={ProductoDetails} />
          <Route path="/productos/edit/:id" exact component={ProductoEdit} />
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
