import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movie from './mocks/movie.js';

ReactDOM.render(
    <App movie={movie}/>,
    document.getElementById(`root`)
);
