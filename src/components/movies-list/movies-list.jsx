import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this._captionHoverHandler = this._captionHoverHandler.bind(this);

    this.state = {
      activeCard: null,
    };
  }

  _captionHoverHandler(activeCard) {
    this.setState({activeCard});
  }

  render() {
    const {movies} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => (
          <SmallMovieCard movie={movie} key={`${index}-${movie.name}`} handleCaptionHover={this._captionHoverHandler}/>
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
};

export default MoviesList;
