import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movie from './mocks/movie.js';
import movies from './mocks/movies.js';

ReactDOM.render(
    <App currentMovie={movie} movies={movies}/>,
    document.getElementById(`root`)
);
