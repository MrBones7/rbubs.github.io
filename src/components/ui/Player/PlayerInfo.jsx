import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { playerInfo, trackLink } from './Player.styles.less';
import SongReaction from './SongReaction';
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
  title: PropTypes.string.isRequired,
};

const PlayerInfo = ({ statusUrl }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = (abortController) => {
      fetch(statusUrl, { signal: abortController.signal })
        .then(response => response.json())
        .then(({ current_track }) => setCurrentTrack(current_track));
    };

    fetchData(ac);
    const interval = setInterval(() => fetchData(ac), 5000);

    return () => {
      clearInterval(interval);
      ac.abort();
    };
  }, []);

  if (!currentTrack) return null;

  return (
    <div className={playerInfo}>
      <TrackInfo {...currentTrack} />
      <SongReaction {...currentTrack} />
    </div>
  );
};

PlayerInfo.propTypes = {
  statusUrl: PropTypes.string.isRequired,
};

export default PlayerInfo;
