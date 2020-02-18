import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movies from './mocks/movies.js';

ReactDOM.render(
    <App currentMovie={movies[0]} movies={movies}/>,
    document.getElementById(`root`)
);
