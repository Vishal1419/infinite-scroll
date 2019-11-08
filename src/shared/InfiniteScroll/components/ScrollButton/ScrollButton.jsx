import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from '../../../../utils';

const ScrollButton = ({
  className, disabled, onClick, showOnHover, orientation, position, setContainerRef, children,
}) => (
  <div
    className={classNames('scroll-button-container', className, orientation, position, { 'show-on-hover': showOnHover })}
    ref={(ref) => setContainerRef(ref)}
  >
    <button
      type="button"
      className={`scroll-button ${orientation} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  </div>
);

ScrollButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  showOnHover: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  position: PropTypes.oneOf(['inside', 'outside']),
  setContainerRef: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

ScrollButton.defaultProps = {
  className: '',
  disabled: false,
  onClick: noop,
  showOnHover: false,
  orientation: 'vertical',
  position: 'inside',
  setContainerRef: noop,
  children: '',
};

export default ScrollButton;
