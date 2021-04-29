import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { playerControls, togglePlay, slider, volumeSlider } from './Player.styles.less';
import { hoverable, primaryColor } from '../../../styles.less';

const StyledSlider = withStyles({
  root: {
    color: '#ddd',
    width: 100,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: '#eee',
    marginTop: -4,
    '&:focus, &:hover, &$active': {
      boxShadow: 'none',
    },
  },
  track: {
    height: 4,
    borderRadius: 4,
    margin: '0 30',
  },
  rail: {
    height: 4,
    borderRadius: 4,
    margin: '0 30',
  },
})(Slider);

const VolumeSlider = React.memo(({ onChange, initialVolume }) => {
  const [value, setValue] = React.useState(initialVolume * 100.0);

  const handleChange = (event, newValue) => {
    const numVolSteps = 20;
    const volume = newValue / 100.0 * numVolSteps;
    const normalizedVolume = Math.floor(volume) / Number.parseFloat(numVolSteps);

    onChange(normalizedVolume); // must be a value between 0 and 1, inclusive
    setValue(newValue);
  };

  return (
    <div className={ volumeSlider }>
      <FontAwesomeIcon icon={faVolumeDown} className={cx(primaryColor, hoverable)} onClick={() => handleChange(null, 0.0)} />
      <StyledSlider value={value} className={slider} onChange={handleChange} aria-labelledby="continuous-slider" />
      <FontAwesomeIcon icon={faVolumeUp} className={cx(primaryColor, hoverable)} onClick={() => handleChange(null, 100.0)} />
    </div>
  );
}, () => {return true;});

VolumeSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialVolume: PropTypes.number.isRequired,
};

const TogglePlayButton = ({ onClick, isPlaying }) => {
  if (isPlaying) {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={ onClick }>
        <path d="M16 0C7.16129 0 0 7.16129 0 16C0 24.8387 7.16129 32 16 32C24.8387 32 32 24.8387 32 16C32 7.16129 24.8387 0 16 0ZM14.9677 21.1613C14.9677 21.729 14.5032 22.1935 13.9355 22.1935H10.8387C10.271 22.1935 9.80645 21.729 9.80645 21.1613V10.8387C9.80645 10.271 10.271 9.80645 10.8387 9.80645H13.9355C14.5032 9.80645 14.9677 10.271 14.9677 10.8387V21.1613ZM22.1935 21.1613C22.1935 21.729 21.729 22.1935 21.1613 22.1935H18.0645C17.4968 22.1935 17.0323 21.729 17.0323 21.1613V10.8387C17.0323 10.271 17.4968 9.80645 18.0645 9.80645H21.1613C21.729 9.80645 22.1935 10.271 22.1935 10.8387V21.1613Z" fill="white"/>
      </svg>
    );
  } else {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={ onClick }>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM12.4287 8.00341C12.6729 8.02089 12.9075 8.10524 13.1069 8.2472L22.4412 14.9146C22.614 15.0379 22.7549 15.2008 22.8521 15.3896C22.9494 15.5784 23.0001 15.7876 23.0001 16C23.0001 16.2124 22.9494 16.4216 22.8521 16.6104C22.7549 16.7992 22.614 16.9621 22.4412 17.0854L13.1069 23.7528C12.9075 23.8948 12.6729 23.9791 12.4287 23.9966C12.1846 24.0141 11.9403 23.964 11.7228 23.8519C11.5052 23.7398 11.3226 23.57 11.1952 23.3611C11.0677 23.1521 11.0002 22.9121 11 22.6674V9.33265C11.0002 9.08788 11.0677 8.84788 11.1952 8.63894C11.3226 8.42999 11.5052 8.26017 11.7228 8.14807C11.9403 8.03597 12.1846 7.98592 12.4287 8.00341Z" fill="white"/>
      </svg>
    );
  }
};

TogglePlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const PlayerControls = ({
  canPlay,
  onPlay,
  onPause,
  setVolume,
  initialVolume = 0.6,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!canPlay) return null;

  const togglePlayHandler = () => {
    if (isPlaying) {
      onPause();
      setIsPlaying(false);
    } else {
      onPlay();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const eventType = 'keydown';
    const eventHandler = ({ key }) => key === ' ' && togglePlayHandler();

    window.addEventListener(eventType, eventHandler);
    return () => window.removeEventListener(eventType, eventHandler);
  });

  return (
    <div className={playerControls}>
      <TogglePlayButton onClick={togglePlayHandler} isPlaying={isPlaying} />
      { /*<VolumeSlider onChange={setVolume} initialVolume={initialVolume} />*/ }
    </div>
  );
};

PlayerControls.propTypes = {
  canPlay: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  initialVolume: PropTypes.number,
};

export default PlayerControls;
