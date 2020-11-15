import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import ApiClient from '../../../lib/ApiClient';
import { hoverable, primaryColor } from '../../../styles.less';

const SongReaction = ({ title }) => {
  const recordReaction = (direction) => {
    ApiClient.recordSongReaction(title, direction);
  };

  return (
    <span>
      &ensp;
      <FontAwesomeIcon icon={faThumbsUp} className={cx(hoverable, primaryColor)} onClick={() => recordReaction('up')} />
      &ensp;
      <FontAwesomeIcon icon={faThumbsDown} className={cx(hoverable, primaryColor)} onClick={() => recordReaction('down')} />
    </span>
  );
};

SongReaction.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SongReaction;
