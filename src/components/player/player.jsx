import React from 'react';
import PropTypes from 'prop-types';
import withVideo from '../../hocs/with-video/with-video.jsx';

const Player = ({
  movie,
  onPlayerExitClick,
  renderVideo,
  isPlaying,
  isLoading,
  timeLeft,
  progress,
  onTogglePlay,
}) => {
  const {video: src, posterBig: poster} = movie;

  const toggleFullScreen = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="player" onClick={(evt) => {
      evt.preventDefault();
      onTogglePlay();
    }}>
      {renderVideo({
        src,
        poster,
        className: `player__video`,
        autoplay: true,
      })}

      <button type="button" className="player__exit" onClick={(evt) => {
        evt.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        onPlayerExitClick();
      }}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={`${progress}`} max="100"/>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={(evt) => {
              evt.stopPropagation();
              onTogglePlay();
            }}
          >
            {isPlaying ?
              <React.Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Play</span>
              </React.Fragment> :
              <React.Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Pause</span>
              </React.Fragment>
            }
          </button>
          {isLoading ?
            <div className="player__name">Transpotting</div> :
            null
          }
          <button type="button" className="player__full-screen" onClick={toggleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  progress: PropTypes.number,
  timeLeft: PropTypes.string,
  movie: PropTypes.shape({
    video: PropTypes.string.isRequired,
    posterBig: PropTypes.string.isRequired,
  }).isRequired,
  onPlayerExitClick: PropTypes.func.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleFullScreen: PropTypes.func.isRequired,
  renderVideo: PropTypes.func.isRequired,
};

export default withVideo(React.memo(Player));
