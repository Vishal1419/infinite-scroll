import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './loader.scss';

const InlineLoader = ({
  containerClassName, containerStyle, className, style, color, ringColor, thickness, size,
}) => (
  <div
    className={classNames('IS-default-loader-container', containerClassName)}
    style={containerStyle}
  >
    <div
      className={classNames('IS-default-loader', className)}
      style={{
        borderColor: ringColor,
        borderWidth: thickness,
        borderTopColor: color,
        height: size,
        width: size,
        ...style,
      }}
    />
  </div>
);

InlineLoader.propTypes = {
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  color: PropTypes.string,
  ringColor: PropTypes.string,
  thickness: PropTypes.number,
  size: PropTypes.number,
};

InlineLoader.defaultProps = {
  containerClassName: '',
  containerStyle: {},
  className: '',
  style: {},
  color: '#222',
  ringColor: 'rgba(0, 0, 0, 0.2)',
  thickness: 2,
  size: 30,
};

export default InlineLoader;
