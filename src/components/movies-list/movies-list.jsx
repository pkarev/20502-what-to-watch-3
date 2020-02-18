import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCaptionHover = this._handleCaptionHover.bind(this);

    this.state = {
      activeCard: null,
    };
  }

  _handleCaptionHover(activeCard) {
    const {onCardClick} = this.props;
    this.setState({activeCard});

    onCardClick({activeCard});
  }

  render() {
    const {movies} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard movie={movie} key={movie.id} onCardClick={this._handleCaptionHover}/>
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
  })),
  onCardClick: PropTypes.func,
};

export default MoviesList;
