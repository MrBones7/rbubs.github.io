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
    this.state = {};
  }

  playerEl() {
    return this.playerRef && this.playerRef.audioEl.current;
  }

  componentDidMount() {
    const { stationId } = this.props;
    const statusUrl = `https://public.radio.co/stations/${stationId}/status`;

    const fetchData = () => {
      fetch(statusUrl)
        .then(response => response.json())
        .then(({ current_track }) => {
          this.setState(() => ({ currentTrack: current_track }));
        });
    };

    // fetchData();

    // const interval = setInterval(fetchData, 5000);

    // this.setState(() => ({ interval }));
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  render() {
    const { initialVolume, stationId } = this.props;
    const { currentTrack } = this.state;

    const radioSrc = `https://s4.radio.co/${stationId}/listen`;

    const onPlay = () => { this.playerEl() && this.playerEl().play(); };

    const onPause = () => { this.playerEl() && this.playerEl().pause(); };

    const setVolume = volume => { if (this.playerEl()) this.playerEl().volume = volume; };

    return (
      <div className={player}>
        <PlayerInfo currentTrack={currentTrack} />
        <PlayerControls
          onPause={onPause}
          onPlay={onPlay}
          setVolume={setVolume}
          currentTrack={currentTrack}
          canPlay
          initialVolume={initialVolume}
        />
        <ReactAudioPlayer
          src={radioSrc}
          controls
          volume={initialVolume}
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
