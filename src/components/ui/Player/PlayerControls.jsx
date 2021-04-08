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

const TogglePlayButton = ({ onClick, isPlaying }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={isPlaying ? faPause : faPlay}
    className={cx(togglePlay, primaryColor, hoverable)}
  />
);

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
      <VolumeSlider onChange={setVolume} initialVolume={initialVolume} />
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
