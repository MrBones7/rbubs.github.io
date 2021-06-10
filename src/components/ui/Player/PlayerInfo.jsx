import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import SongReaction from './SongReaction';
// import { playerInfo, artistLink, trackLink } from './Player.styles.less';
import "./Player.styles.css";
import { title as siteTitle } from '../../../../settings';

const TrackInfo = ({ title }) => {
  document.title = `${title} | ${siteTitle}`;

  // split current track into artist and track title
  const trackArray = title.split(' - ');
  
  const params = queryString.stringify({ search_query: title });
  const searchUrl = `https://www.youtube.com/results?${params}`;

  return (
    <>
      <p className="artistLink"><a href={searchUrl} target="_blank" rel="noopener noreferrer">{trackArray[1]}</a></p>
      <p className="trackLink"><a href={searchUrl} target="_blank" rel="noopener noreferrer">{trackArray[0]}</a></p>
    </>
  );
};

TrackInfo.propTypes = {
  title: PropTypes.string,
};

const PlayerInfo = ({ currentTrack }) => {
  if (!currentTrack) return null;

  return (
    <div className="playerInfo">
      { /*<SongReaction currentTrack={currentTrack} />*/}
      <TrackInfo {...currentTrack} />
    </div>
  );
};

PlayerInfo.propTypes = {
  currentTrack: PropTypes.object,
};

export default PlayerInfo;
