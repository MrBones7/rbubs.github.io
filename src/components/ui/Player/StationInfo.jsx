import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import SongReaction from './SongReaction';
// import { playerInfo, artistLink, trackLink } from './Player.styles.less';
import "./Player.styles.css";
import { title as siteTitle } from '../../../../settings';

const StationInfo = ({ currentStation = 'Synthwave' }) => {
  if (!currentStation) return null;

  return (
    <div className="playerInfo">
      <p className="artistLink">Select Station</p>
      <p className="trackLink">Now playing: {currentStation}</p>
    </div>
  );
};

StationInfo.propTypes = {
  currentStation: PropTypes.string,
};

export default StationInfo;
