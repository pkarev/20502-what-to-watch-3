import React from 'react';
import PropTypes from 'prop-types';

const Player = ({movie: {trailer, posterBig}, onPlayerExitClick}) => (
  <div className="player">
    <video src={trailer} className="player__video" poster={posterBig} controls={true}></video>

    <button type="button" className="player__exit" onClick={(evt) => {
      evt.preventDefault();
      onPlayerExitClick();
    }}>Exit</button>
  </div>
);

Player.propTypes = {
  movie: PropTypes.shape({
    trailer: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
  }).isRequired,
  onPlayerExitClick: PropTypes.func.isRequired,
};

export default Player;
