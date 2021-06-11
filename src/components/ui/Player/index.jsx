import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import PlayerControls from './PlayerControls';
import PlayerInfo from './PlayerInfo';
import StationInfo from './StationInfo';
// import { player, playerIcon, playerCollapsed, playerExpanded, toggleOpen, toggleClosed, expandedTop, expandedControls } from './Player.styles.less';
import "./Player.styles.css";
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerRef;
    this.state = {
      currentTrack: {
        title: ''
      },
      volume: 0.6,
      isPlaying: false,
      expanded: false
    };
  }

  playerEl() {
    return this.playerRef && this.playerRef.audioEl.current;
  }
  checkType() {
    this.state.expanded = !this.state.expanded;
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
    const { initialVolume, stationId , display, handler} = this.props;
    const { currentTrack } = this.state;
    if (display === 'station' && !this.state.expanded) {
      this.checkType();
    }
  
    const radioSrc = `https://s4.radio.co/${stationId}/listen`;

    const onPlay = () => { 
      this.setState({
        isPlaying: true
      }, () => {
        this.playerEl() && this.playerEl().play(); 
      });
    };

    const onPause = () => { 
      this.setState({
        isPlaying: false
      }, () => {
        this.playerEl() && this.playerEl().pause(); 
      });
    };

    const setVolume = volume => { 
      if (this.playerEl()) { 
        this.playerEl().volume = volume 
      }; 
      this.setState({
        volume: volume
      })
    };
    
    const toggleExpanded = () => {
      this.setState({
        expanded: !this.state.expanded
      });
      if (!this.state.expanded) {
        handler('station');
      } else {
        handler('');
      }
    }

    let expandedClass = this.state.expanded ? 'toggleOpen' : 'toggleClosed';
    let collapsedClass = this.state.expanded ? 'toggleClosed' : 'toggleOpen';

    return (
      <>
        <div className={['player', 'playerCollapsed', 'width-auto' , collapsedClass].join(' ')}>
          <PlayerControls
            onPause={ onPause }
            onPlay={ onPlay }
            setVolume={ setVolume }
            currentTrack={ currentTrack }
            canPlay
            isPlaying={ this.state.isPlaying }
            initialVolume={ this.state.volume }
          />
          <PlayerInfo currentTrack={ currentTrack } />
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.11088 2.69649C9.74207 0.938384 12.8355 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 19.1645 31.0616 22.2579 29.3035 24.8891C27.5454 27.5203 25.0466 29.5711 22.1229 30.7821C19.1993 31.9931 15.9823 32.3099 12.8786 31.6926C9.77487 31.0752 6.92394 29.5513 4.6863 27.3137C2.44866 25.0761 0.924806 22.2251 0.307443 19.1214C-0.309921 16.0177 0.00693254 12.8007 1.21793 9.87706C2.42894 6.95345 4.4797 4.45459 7.11088 2.69649ZM17 23V24C17 24.2652 16.8946 24.5196 16.7071 24.7071C16.5196 24.8946 16.2652 25 16 25C15.7348 25 15.4804 24.8946 15.2929 24.7071C15.1054 24.5196 15 24.2652 15 24V23C14.1714 22.9988 13.3637 22.7403 12.6883 22.2602C12.013 21.7801 11.5034 21.1022 11.23 20.32C11.1451 20.068 11.1638 19.7927 11.282 19.5545C11.4001 19.3164 11.608 19.1349 11.86 19.05C12.112 18.9651 12.3873 18.9838 12.6255 19.102C12.8636 19.2201 13.0451 19.428 13.13 19.68C13.2692 20.0649 13.5231 20.3979 13.8575 20.634C14.1919 20.87 14.5907 20.9978 15 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17H15C13.9391 17 12.9217 16.5786 12.1716 15.8284C11.4214 15.0783 11 14.0609 11 13C11 11.9391 11.4214 10.9217 12.1716 10.1716C12.9217 9.42143 13.9391 9 15 9V8C15 7.73478 15.1054 7.48043 15.2929 7.29289C15.4804 7.10536 15.7348 7 16 7C16.2652 7 16.5196 7.10536 16.7071 7.29289C16.8946 7.48043 17 7.73478 17 8V9C17.8286 9.00123 18.6363 9.25974 19.3117 9.73981C19.987 10.2199 20.4966 10.8978 20.77 11.68C20.8549 11.932 20.8362 12.2073 20.718 12.4455C20.5999 12.6836 20.392 12.8651 20.14 12.95C19.888 13.0349 19.6127 13.0162 19.3745 12.898C19.1364 12.7799 18.9549 12.572 18.87 12.32C18.7308 11.9351 18.4769 11.6021 18.1425 11.366C17.8081 11.13 17.4093 11.0022 17 11H15C14.4696 11 13.9609 11.2107 13.5858 11.5858C13.2107 11.9609 13 12.4696 13 13C13 13.5304 13.2107 14.0391 13.5858 14.4142C13.9609 14.7893 14.4696 15 15 15H17C18.0609 15 19.0783 15.4214 19.8284 16.1716C20.5786 16.9217 21 17.9391 21 19C21 20.0609 20.5786 21.0783 19.8284 21.8284C19.0783 22.5786 18.0609 23 17 23Z" fill="white"/>
            </svg>
          </div>
          <div className='playerIcon cursor-pointer' onClick={ toggleExpanded }>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM14.0281 16.8153C14.2078 17.2491 14.5257 17.6115 14.9323 17.8463V26.6667H17.0654V17.8463C17.4721 17.6115 17.7899 17.2491 17.9696 16.8153C18.1493 16.3814 18.1808 15.9004 18.0593 15.4469C17.9378 14.9933 17.67 14.5925 17.2974 14.3066C16.9249 14.0208 16.4684 13.8658 15.9989 13.8658C15.5293 13.8658 15.0729 14.0208 14.7003 14.3066C14.3278 14.5925 14.06 14.9933 13.9384 15.4469C13.8169 15.9004 13.8484 16.3814 14.0281 16.8153ZM19.0172 19.0195L20.5211 20.5233H20.5317C21.426 19.6281 22.0347 18.4878 22.2811 17.2467C22.5274 16.0055 22.4003 14.7192 21.9157 13.5503C21.4312 12.3814 20.6109 11.3824 19.5587 10.6795C18.5065 9.97666 17.2696 9.60152 16.0042 9.60152C14.7388 9.60152 13.5019 9.97666 12.4497 10.6795C11.3975 11.3824 10.5772 12.3814 10.0927 13.5503C9.60813 14.7192 9.48098 16.0055 9.72733 17.2467C9.97367 18.4878 10.5824 19.6281 11.4767 20.5233L12.9805 19.0195C12.3832 18.4228 11.9763 17.6624 11.8115 16.8344C11.6466 16.0064 11.7311 15.148 12.0542 14.3681C12.3774 13.5881 12.9247 12.9216 13.6269 12.4528C14.3291 11.9841 15.1546 11.7343 15.9989 11.7349C16.8454 11.7291 17.6745 11.9759 18.38 12.4438C19.0856 12.9116 19.6356 13.5793 19.9596 14.3614C20.2837 15.1435 20.3671 16.0045 20.1992 16.8342C20.0314 17.664 19.6198 18.4249 19.0172 19.0195ZM22.0356 22.0378L23.5394 23.5417C25.0313 22.0502 26.0474 20.1498 26.4592 18.0808C26.871 16.0118 26.66 13.8671 25.8528 11.9181C25.0457 9.96903 23.6787 8.30311 21.9247 7.13102C20.1706 5.95894 18.1084 5.33333 15.9989 5.33333C13.8893 5.33333 11.8271 5.95894 10.0731 7.13102C8.31908 8.30311 6.95205 9.96903 6.1449 11.9181C5.33775 13.8671 5.12672 16.0118 5.53851 18.0808C5.95031 20.1498 6.96642 22.0502 8.45834 23.5417L9.97285 22.0378C8.77901 20.8448 7.96582 19.3244 7.63614 17.6692C7.30646 16.0139 7.4751 14.298 8.12074 12.7386C8.76637 11.1792 9.85999 9.84626 11.2633 8.90846C12.6665 7.97065 14.3164 7.47009 16.0042 7.47009C17.692 7.47009 19.3419 7.97065 20.7451 8.90846C22.1484 9.84626 23.242 11.1792 23.8877 12.7386C24.5333 14.298 24.7019 16.0139 24.3723 17.6692C24.0426 19.3244 23.2294 20.8448 22.0356 22.0378Z" fill="white"/>
            </svg>
          </div>
        </div>


        <div className={ ['player', 'playerExpanded', expandedClass].join(' ') }>
          <div className="expandedTop cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM14.0281 16.8153C14.2078 17.2491 14.5257 17.6115 14.9323 17.8463V26.6667H17.0654V17.8463C17.4721 17.6115 17.7899 17.2491 17.9696 16.8153C18.1493 16.3814 18.1808 15.9004 18.0593 15.4469C17.9378 14.9933 17.67 14.5925 17.2974 14.3066C16.9249 14.0208 16.4684 13.8658 15.9989 13.8658C15.5293 13.8658 15.0729 14.0208 14.7003 14.3066C14.3278 14.5925 14.06 14.9933 13.9384 15.4469C13.8169 15.9004 13.8484 16.3814 14.0281 16.8153ZM19.0172 19.0195L20.5211 20.5233H20.5317C21.426 19.6281 22.0347 18.4878 22.2811 17.2467C22.5274 16.0055 22.4003 14.7192 21.9157 13.5503C21.4312 12.3814 20.6109 11.3824 19.5587 10.6795C18.5065 9.97666 17.2696 9.60152 16.0042 9.60152C14.7388 9.60152 13.5019 9.97666 12.4497 10.6795C11.3975 11.3824 10.5772 12.3814 10.0927 13.5503C9.60813 14.7192 9.48098 16.0055 9.72733 17.2467C9.97367 18.4878 10.5824 19.6281 11.4767 20.5233L12.9805 19.0195C12.3832 18.4228 11.9763 17.6624 11.8115 16.8344C11.6466 16.0064 11.7311 15.148 12.0542 14.3681C12.3774 13.5881 12.9247 12.9216 13.6269 12.4528C14.3291 11.9841 15.1546 11.7343 15.9989 11.7349C16.8454 11.7291 17.6745 11.9759 18.38 12.4438C19.0856 12.9116 19.6356 13.5793 19.9596 14.3614C20.2837 15.1435 20.3671 16.0045 20.1992 16.8342C20.0314 17.664 19.6198 18.4249 19.0172 19.0195ZM22.0356 22.0378L23.5394 23.5417C25.0313 22.0502 26.0474 20.1498 26.4592 18.0808C26.871 16.0118 26.66 13.8671 25.8528 11.9181C25.0457 9.96903 23.6787 8.30311 21.9247 7.13102C20.1706 5.95894 18.1084 5.33333 15.9989 5.33333C13.8893 5.33333 11.8271 5.95894 10.0731 7.13102C8.31908 8.30311 6.95205 9.96903 6.1449 11.9181C5.33775 13.8671 5.12672 16.0118 5.53851 18.0808C5.95031 20.1498 6.96642 22.0502 8.45834 23.5417L9.97285 22.0378C8.77901 20.8448 7.96582 19.3244 7.63614 17.6692C7.30646 16.0139 7.4751 14.298 8.12074 12.7386C8.76637 11.1792 9.85999 9.84626 11.2633 8.90846C12.6665 7.97065 14.3164 7.47009 16.0042 7.47009C17.692 7.47009 19.3419 7.97065 20.7451 8.90846C22.1484 9.84626 23.242 11.1792 23.8877 12.7386C24.5333 14.298 24.7019 16.0139 24.3723 17.6692C24.0426 19.3244 23.2294 20.8448 22.0356 22.0378Z" fill="white"/>
            </svg>
            <StationInfo currentTrack={ currentTrack } />
            <div className='playerIcon cursor-pointer' onClick={ toggleExpanded }>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C12.8355 0 9.74207 0.938383 7.11088 2.69649C4.4797 4.45459 2.42894 6.95344 1.21793 9.87706C0.00693254 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5513 9.77487 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C32 13.8988 31.5861 11.8183 30.7821 9.87706C29.978 7.93585 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0ZM20.336 18.064C20.486 18.2127 20.605 18.3897 20.6862 18.5847C20.7675 18.7796 20.8093 18.9888 20.8093 19.2C20.8093 19.4112 20.7675 19.6203 20.6862 19.8153C20.605 20.0103 20.486 20.1873 20.336 20.336C20.1873 20.486 20.0103 20.605 19.8153 20.6862C19.6204 20.7675 19.4112 20.8093 19.2 20.8093C18.9888 20.8093 18.7797 20.7675 18.5847 20.6862C18.3897 20.605 18.2127 20.486 18.064 20.336L16 18.256L13.936 20.336C13.7873 20.486 13.6103 20.605 13.4153 20.6862C13.2204 20.7675 13.0112 20.8093 12.8 20.8093C12.5888 20.8093 12.3797 20.7675 12.1847 20.6862C11.9897 20.605 11.8127 20.486 11.664 20.336C11.514 20.1873 11.395 20.0103 11.3138 19.8153C11.2325 19.6203 11.1907 19.4112 11.1907 19.2C11.1907 18.9888 11.2325 18.7796 11.3138 18.5847C11.395 18.3897 11.514 18.2127 11.664 18.064L13.744 16L11.664 13.936C11.3627 13.6347 11.1935 13.2261 11.1935 12.8C11.1935 12.3739 11.3627 11.9653 11.664 11.664C11.9653 11.3627 12.3739 11.1935 12.8 11.1935C13.2261 11.1935 13.6347 11.3627 13.936 11.664L16 13.744L18.064 11.664C18.3653 11.3627 18.7739 11.1935 19.2 11.1935C19.6261 11.1935 20.0347 11.3627 20.336 11.664C20.6373 11.9653 20.8065 12.3739 20.8065 12.8C20.8065 13.2261 20.6373 13.6347 20.336 13.936L18.256 16L20.336 18.064Z" fill="white"/>
              </svg>
            </div>
          </div>

          <div className="stationForm">
            <div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16Z" fill="white"/>
              </svg>
              <div className="playerInfo ml-2">
                {/* <p className="trackLink">Now playing:</p> */}
                <p className="artistLink fnt-16">Synthwave</p>
              </div>
            </div>
            {/* <div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14.5" stroke="white" strokeWidth="3"/>
              </svg>
              <p className="artistLink fnt-16">Lo-fi</p>
            </div> */}
            <div>
              <svg onClick={onPause} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14.5" stroke="white" strokeWidth="3"/>
              </svg>
              <p className="artistLink fnt-16">Turn off</p>
            </div>
          </div>


          <div className="expandedControls">
            <PlayerControls
              onPause={ onPause }
              onPlay={ onPlay }
              setVolume={ setVolume }
              currentTrack={ currentTrack }
              canPlay
              isPlaying={ this.state.isPlaying }            
              initialVolume={ this.state.volume }
            />
            <PlayerInfo currentTrack={ currentTrack } />
          </div>
        </div>
        
        <ReactAudioPlayer
            src={ radioSrc }
            controls
            volume={ this.state.volume }
            style={{ display: 'none' }}
            ref={(el) => { this.playerRef = el; }}
          />
      </>
    );
  }
}

Player.propTypes = {
  initialVolume: PropTypes.number.isRequired,
  stationId: PropTypes.string.isRequired,
  display: PropTypes.string,
};

export default Player;
