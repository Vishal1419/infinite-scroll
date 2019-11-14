import React from 'react';
import PropTypes from 'prop-types';

import './scroll-button.scss';
import ScrollButton from './ScrollButton';
import { noop } from '../../../../utils';

const ScrollButtonContainer = ({
  containerClassName, containerStyle, className, style, disabled, onClick, showOnHover,
  orientation, position, setContainerRef, children,
}) => (
  <ScrollButton
    containerClassName={containerClassName}
    containerStyle={containerStyle}
    className={className}
    style={style}
    disabled={disabled}
    onClick={onClick}
    showOnHover={showOnHover}
    orientation={orientation}
    position={position}
    setContainerRef={setContainerRef}
  >
    {children}
  </ScrollButton>
);

ScrollButtonContainer.propTypes = {
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

ScrollButtonContainer.defaultProps = {
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

export default ScrollButtonContainer;
