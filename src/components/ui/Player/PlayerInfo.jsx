import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import SongReaction from './SongReaction';
import { playerInfo, trackLink } from './Player.styles.less';
import { title as siteTitle } from '../../../../settings';

const TrackInfo = ({ title }) => {
  document.title = `${title} | ${siteTitle}`;

  const params = queryString.stringify({ search_query: title });
  const searchUrl = `https://www.youtube.com/results?${params}`;

  return (
    <div>
      <p><a className={trackLink} href={searchUrl} target="_blank" rel="noopener noreferrer">{title}</a></p>
    </div>
  );
};

TrackInfo.propTypes = {
  title: PropTypes.string,
};

const PlayerInfo = ({ currentTrack }) => {
  if (!currentTrack) return null;

  return (
    <div className={playerInfo}>
      <SongReaction currentTrack={currentTrack} />
      <TrackInfo {...currentTrack} />
    </div>
  );
};

PlayerInfo.propTypes = {
  currentTrack: PropTypes.object,
};

export default PlayerInfo;
