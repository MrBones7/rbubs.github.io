import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { icon, supportButton } from './styles.less';

const SupportButton = ({ link }) => (
  <a className={cx(supportButton)} target="_blank" rel="noopener noreferrer" href={link}>
    {/*<span className={animated}>{children}</span>*/}
    <FontAwesomeIcon icon={faHeart} className={icon} />
  </a>
);
SupportButton.propTypes = {
  link: PropTypes.string.isRequired,
  // children: PropTypes.any.isRequired,
};

export default SupportButton;
