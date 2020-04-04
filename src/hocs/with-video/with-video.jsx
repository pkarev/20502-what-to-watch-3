import React, {PureComponent} from "react";

const formatTime = (sec) => {
  return sec ? new Date(sec * 1000).toISOString().slice(11, -5) : null;
};

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        isPlaying: false,
        isFullScreen: false,
        timeLeft: `--:--`,
        currentTime: 0,
        progress: 0,
      };

      this._videoRef = React.createRef();

      this._handleTogglePlay = this._handleTogglePlay.bind(this);
      this._handleToggleFullscreen = this._handleToggleFullscreen.bind(this);
      this._handleResetVideo = this._handleResetVideo.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;

      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});
      video.onended = () => this.setState({isPlaying: false});
      video.oncanplaythrough = () => this.setState({isLoading: false});

      video.ontimeupdate = () => {
        this.setState({
          currentTime: Math.floor(video.currentTime / 1000),
          progress: Number((video.currentTime / video.duration * 100).toFixed(1)),
          timeLeft: formatTime(video.duration - video.currentTime),
        });
      };
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.load();
      }

      video.onplay = null;
      video.onpause = null;
      video.onended = null;
      video.ontimeupdate = null;
      video.oncanplaythrough = null;
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    _handleResetVideo() {
      const video = this._videoRef.current;
      video.load();
    }

    _handleTogglePlay() {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying,
      }));
    }

    _handleToggleFullscreen() {
      const video = this._videoRef.current;

      if (this.state.isFullScreen) {
        video.exitFullscreen();
      } else {
        video.requestFullscreen();
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          onTogglePlay={this._handleTogglePlay}
          onResetVideo={this._handleResetVideo}
          onToggleFullScreen={this._handleToggleFullscreen}
          isPlaying={this.state.isPlaying}
          isLoading={this.state.isLoading}
          isFullscreen={this.state.isFullScreen}
          progress={this.state.progress}
          timeLeft={this.state.timeLeft}
          renderVideo={({src, poster, controls = false, muted = false, autoplay = false}) => (
            <video
              ref={this._videoRef}
              poster={poster}
              controls={controls}
              muted={muted}
              autoPlay={autoplay}
              style={{
                width: `100%`,
                height: `100%`,
                objectFit: `cover`,
                objectPosition: `center center`,
              }}
            >
              <source src={src}/>
            </video>
          )}
        />
      );
    }
  }

  return WithVideo;
};

export default withVideo;
