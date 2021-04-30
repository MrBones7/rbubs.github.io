import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import PlayerControls from './PlayerControls';
import PlayerInfo from './PlayerInfo';
import { player, playerIcon } from './Player.styles.less';

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
        <PlayerControls
          onPause={onPause}
          onPlay={onPlay}
          setVolume={setVolume}
          currentTrack={ currentTrack }
          canPlay
          initialVolume={ this.state.volume }
        />
        <PlayerInfo currentTrack={currentTrack} />
        <div className={playerIcon}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM14.0281 16.8153C14.2078 17.2491 14.5257 17.6115 14.9323 17.8463V26.6667H17.0654V17.8463C17.4721 17.6115 17.7899 17.2491 17.9696 16.8153C18.1493 16.3814 18.1808 15.9004 18.0593 15.4469C17.9378 14.9933 17.67 14.5925 17.2974 14.3066C16.9249 14.0208 16.4684 13.8658 15.9989 13.8658C15.5293 13.8658 15.0729 14.0208 14.7003 14.3066C14.3278 14.5925 14.06 14.9933 13.9384 15.4469C13.8169 15.9004 13.8484 16.3814 14.0281 16.8153ZM19.0172 19.0195L20.5211 20.5233H20.5317C21.426 19.6281 22.0347 18.4878 22.2811 17.2467C22.5274 16.0055 22.4003 14.7192 21.9157 13.5503C21.4312 12.3814 20.6109 11.3824 19.5587 10.6795C18.5065 9.97666 17.2696 9.60152 16.0042 9.60152C14.7388 9.60152 13.5019 9.97666 12.4497 10.6795C11.3975 11.3824 10.5772 12.3814 10.0927 13.5503C9.60813 14.7192 9.48098 16.0055 9.72733 17.2467C9.97367 18.4878 10.5824 19.6281 11.4767 20.5233L12.9805 19.0195C12.3832 18.4228 11.9763 17.6624 11.8115 16.8344C11.6466 16.0064 11.7311 15.148 12.0542 14.3681C12.3774 13.5881 12.9247 12.9216 13.6269 12.4528C14.3291 11.9841 15.1546 11.7343 15.9989 11.7349C16.8454 11.7291 17.6745 11.9759 18.38 12.4438C19.0856 12.9116 19.6356 13.5793 19.9596 14.3614C20.2837 15.1435 20.3671 16.0045 20.1992 16.8342C20.0314 17.664 19.6198 18.4249 19.0172 19.0195ZM22.0356 22.0378L23.5394 23.5417C25.0313 22.0502 26.0474 20.1498 26.4592 18.0808C26.871 16.0118 26.66 13.8671 25.8528 11.9181C25.0457 9.96903 23.6787 8.30311 21.9247 7.13102C20.1706 5.95894 18.1084 5.33333 15.9989 5.33333C13.8893 5.33333 11.8271 5.95894 10.0731 7.13102C8.31908 8.30311 6.95205 9.96903 6.1449 11.9181C5.33775 13.8671 5.12672 16.0118 5.53851 18.0808C5.95031 20.1498 6.96642 22.0502 8.45834 23.5417L9.97285 22.0378C8.77901 20.8448 7.96582 19.3244 7.63614 17.6692C7.30646 16.0139 7.4751 14.298 8.12074 12.7386C8.76637 11.1792 9.85999 9.84626 11.2633 8.90846C12.6665 7.97065 14.3164 7.47009 16.0042 7.47009C17.692 7.47009 19.3419 7.97065 20.7451 8.90846C22.1484 9.84626 23.242 11.1792 23.8877 12.7386C24.5333 14.298 24.7019 16.0139 24.3723 17.6692C24.0426 19.3244 23.2294 20.8448 22.0356 22.0378Z" fill="white"/>
          </svg>
        </div>
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
