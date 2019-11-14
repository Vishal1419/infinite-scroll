import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from '../../../../utils';

const ScrollButton = ({
  containerClassName, containerStyle, className, style, disabled, onClick, showOnHover,
  orientation, position, setContainerRef, children,
}) => (
  <div
    className={
      classNames(
        'IS-scroll-button-container',
        containerClassName,
        `IS-INTERNAL-${orientation}`,
        `IS-INTERNAL-${position}`,
        { 'IS-INTERNAL-show-on-hover': showOnHover },
      )
    }
    style={containerStyle}
    ref={(ref) => setContainerRef(ref)}
  >
    <button
      type="button"
      className={classNames('IS-scroll-button', className, `IS-INTERNAL-${orientation}`)}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  </div>
);

ScrollButton.propTypes = {
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  showOnHover: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  position: PropTypes.oneOf(['inside', 'outside']),
  setContainerRef: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

ScrollButton.defaultProps = {
  containerClassName: '',
  containerStyle: {},
  className: '',
  style: {},
  disabled: false,
  onClick: noop,
  showOnHover: false,
  orientation: 'vertical',
  position: 'inside',
  setContainerRef: noop,
  children: '',
};

export default ScrollButton;
