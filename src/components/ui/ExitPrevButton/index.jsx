import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { icon, exitPrevButton } from './styles.less';

const ExitPrevButton = ({ handler, showExit }) => {
  return showExit && (
    <a className={cx(exitPrevButton)} target="_blank" rel="noopener noreferrer" onClick={(e) => handler('prev')}>Previous</a>
  )
}

ExitPrevButton.propTypes = {
  handler: PropTypes.func.isRequired,
  showExit: PropTypes.bool.isRequired
};

export default ExitPrevButton;
