import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Movie = {
  GENRE: `Drama`,
  RELEASE_DATE: `2014`
};

ReactDOM.render(
    <App genre={Movie.GENRE} releaseDate={Movie.RELEASE_DATE}/>,
    document.getElementById(`root`)
);
