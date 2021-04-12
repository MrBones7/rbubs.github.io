import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import PlayerControls from './PlayerControls';
import PlayerInfo from './PlayerInfo';
import { player } from './Player.styles.less';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerRef;
    this.state = {
      currentTrack: {
        title: ''
      },
      volume: 0.6
    };
  }

  playerEl() {
    return this.playerRef && this.playerRef.audioEl.current;
  }

  fetchData = () => {
    const { stationId } = this.props;
    const statusUrl = `https://public.radio.co/stations/${stationId}/status`;

    fetch(statusUrl)
    .then(response => response.json())
    .then(({ current_track }) => {
      this.setState({ currentTrack: current_track });
    });
  }

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  
  render() {
    const { initialVolume, stationId } = this.props;
    const { currentTrack } = this.state;

    const radioSrc = `https://s4.radio.co/${stationId}/listen`;

    const onPlay = () => { this.playerEl() && this.playerEl().play(); };

    const onPause = () => { this.playerEl() && this.playerEl().pause(); };

    const setVolume = volume => { 
      if (this.playerEl()) { 
        this.playerEl().volume = volume 
      }; 
      this.setState({
        volume: volume
      })
    };

    return (
      <div className={player}>
        <PlayerInfo currentTrack={currentTrack} />
        <PlayerControls
          onPause={onPause}
          onPlay={onPlay}
          setVolume={setVolume}
          currentTrack={ currentTrack }
          canPlay
          initialVolume={ this.state.volume }
        />
        <ReactAudioPlayer
          src={radioSrc}
          controls
          volume={ this.state.volume }
          style={{ display: 'none' }}
          ref={(el) => { this.playerRef = el; }}
        />
      </div>
    );
  }
}

Player.propTypes = {
  initialVolume: PropTypes.number.isRequired,
  stationId: PropTypes.string.isRequired,
};

export default Player;
