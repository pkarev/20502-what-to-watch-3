import React, {PureComponent} from "react";

const defaultStyle = {
  objectFit: `cover`,
  width: `100%`,
};

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        isPlaying: false,
      };

      this._videoRef = React.createRef();
    }

    componentDidMount() {
      const video = this._videoRef.current;

      video.muted = true;
      video.oncanplaythrough = () => this.setState({isLoading: false});
      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});
      video.onended = () => this.setState({isPlaying: false});
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.pause();
      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.onended = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
        return;
      }

      setTimeout(() => video.load(), 0);
    }

    render() {
      const {isMuted, isPlaying} = this.state;
      let playerTimeout;

      return (
        <Component
          {...this.props}
          renderVideo={(trailer, poster, className) => (
            <video
              ref={this._videoRef}
              style={Object.assign({}, defaultStyle)}
              className={className}
              poster={poster}
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
              <source src={trailer}/>
            </video>
          )}
        />
      );
    }
  }

  return WithVideo;
};

export default withVideo;
