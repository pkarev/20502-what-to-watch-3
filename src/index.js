import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movies from './mocks/movies.js';

ReactDOM.render(
    <App movies={movies}/>,
    document.getElementById(`root`)
);
