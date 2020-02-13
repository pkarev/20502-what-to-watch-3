import React from 'react';
import Main from '../main/main.jsx';

// eslint-disable-next-line react/prop-types
const App = ({currentMovie, movies}) => <Main currentMovie={currentMovie} movies={movies}/>;

export default App;
