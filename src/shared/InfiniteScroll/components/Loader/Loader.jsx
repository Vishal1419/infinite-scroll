import React from 'react';
import PropTypes from 'prop-types';

import './loader.scss';

const InlineLoader = ({
  color, ringColor, thickness, size,
}) => (
  <div className="loader-container">
    <div
      className="loader"
      style={{
        borderColor: ringColor,
        borderWidth: thickness,
        borderTopColor: color,
        height: size,
        width: size,
      }}
    />
  </div>
);

InlineLoader.propTypes = {
  color: PropTypes.string,
  ringColor: PropTypes.string,
  thickness: PropTypes.number,
  size: PropTypes.number,
};

InlineLoader.defaultProps = {
  color: '#222',
  ringColor: 'rgba(0, 0, 0, 0.2)',
  thickness: 2,
  size: 30,
};

export default InlineLoader;
