import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import Movie from './mock/movie.js';

ReactDOM.render(
    <App movie={Movie}/>,
    document.getElementById(`root`)
);
