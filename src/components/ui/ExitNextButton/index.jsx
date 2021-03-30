import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { icon, exitNextButton } from './styles.less';

const ExitNextButton = ({ handler, showExit }) => {
  return showExit && (
    <a className={cx(exitNextButton)} target="_blank" rel="noopener noreferrer" onClick={(e) => handler('next')}>Next</a>
  )
}

ExitNextButton.propTypes = {
  handler: PropTypes.func.isRequired,
  showExit: PropTypes.bool.isRequired
};

export default ExitNextButton;
