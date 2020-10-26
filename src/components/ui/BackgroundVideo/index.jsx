import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-background-video-player';

class BackgroundVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: undefined,
      isMuted: undefined,
      progress: 0,
      currentTime: 0,
      duration: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  componentDidMount() {
    this.setState({
      isPlaying: !this.player.isPaused,
      isMuted: this.player.isMuted,
    });
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  handleOnPlay = () => {
    this.setState({ isPlaying: true });
  };

  handleOnPause = () => {
    this.setState({ isPlaying: false });
  };

  handleTimeUpdate = (currentTime, progress, duration) => {
    this.setState({
      progress,
      currentTime,
      duration,
    });
  };

  handleOnMute = () => {
    this.setState({ isMuted: true });
  };

  handleOnUnmute = () => {
    this.setState({ isMuted: false });
  };

  togglePlay = () => {
    this.player.togglePlay();
  };

  toggleMute = () => {
    this.player.toggleMute();
  };

  render() {
    const { src, poster } = this.props;

    return (
      <div style={{ position: 'absolute', width: ' 100%', height: '100%' }}>
        <VideoPlayer
          ref={p => { this.player = p; }}
          containerWidth={this.state.windowWidth}
          containerHeight={this.state.windowHeight}
          src={src}
          poster={poster}
          onPlay={this.handleOnPlay}
          onPause={this.handleOnPause}
          onMute={this.handleOnMute}
          onUnmute={this.handleOnUnmute}
          onTimeUpdate={this.handleTimeUpdate}
          loop
          autoPlay
          muted
        />
      </div>
    );
  }
}

BackgroundVideoPlayer.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  poster: PropTypes.string,
};

export default BackgroundVideoPlayer;
