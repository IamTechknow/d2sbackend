import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

// Components
import Form from './form.jsx';

// Render the Form component on the site index
ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route path="/" component={Form} />
        </div>
    </BrowserRouter>
), document.getElementById('react'));
