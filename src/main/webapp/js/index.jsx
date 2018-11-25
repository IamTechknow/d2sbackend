import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

// Components
import Form from './form';

import './app.scss';
import './app.css';

// Render the Form component on the site index
ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={Form} />
  </BrowserRouter>
), document.getElementById('react'));
