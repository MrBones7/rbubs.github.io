import React from 'react';
import PropTypes from 'prop-types';
import {row} from './Row.styles.less';

const Row = ({alignItems, children}) => (
    <div className={row} style={{alignItems}}>{children}</div>
);

Row.propTypes = {
    alignItems: PropTypes.string,
    children: PropTypes.any.isRequired,
};

export default Row;