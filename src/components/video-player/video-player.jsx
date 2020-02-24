import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

const defaultStyle = {
  objectFit: `cover`,
  width: `100%`,
};

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPlaying: false,
    };

    this._videoRef = React.createRef();
    this._videoSourceRef = React.createRef();
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;
    const source = this._videoSourceRef.current;

    video.muted = true;
    source.src = src;
    video.oncanplaythrough = () => this.setState({isLoading: false});
    video.onplay = () => this.setState({isPlaying: true});
    video.onpause = () => this.setState({isPlaying: false});
    video.onended = () => this.setState({isPlaying: false});
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    const source = this._videoSourceRef.current;

    source.src = ``;
    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.onended = null;
    video.ontimeupdate = null;
  }

  render() {
    const {poster, className, style} = this.props;
    const {isMuted, isPlaying} = this.state;
    let playerTimeout;

    return (
      <video
        ref={this._videoRef}
        className={className}
        style={Object.assign({}, defaultStyle, style)}
        poster={poster}
        controls={isPlaying}
        muted={isMuted}
        onMouseEnter={() => {
          playerTimeout = setTimeout(() => {
            this.setState({isPlaying: true});
          }, 1000);
        }}
        onMouseLeave={() => {
          clearTimeout(playerTimeout);

          if (!isPlaying) {
            return;
          }

          this.setState({isPlaying: false});
          this._videoRef.current.currentTime = 0;
        }}
      >
        <source ref={this._videoSourceRef}/>
      </video>
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
      return;
    }

    setTimeout(() => video.load(), 0);
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default VideoPlayer;
