import React from 'react';
import PropTypes from 'prop-types';

import './scroll-button.scss';
import ScrollButton from './ScrollButton';
import { noop } from '../../../../utils';

const ScrollButtonContainer = ({
  className, disabled, onClick, showOnHover, orientation, position, setContainerRef, children,
}) => (
  <ScrollButton
    className={className}
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  showOnHover: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  position: PropTypes.oneOf(['inside', 'outside']),
  setContainerRef: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

ScrollButtonContainer.defaultProps = {
  className: '',
  disabled: false,
  onClick: noop,
  showOnHover: false,
  orientation: 'vertical',
  position: 'inside',
  setContainerRef: noop,
  children: '',
};

export default ScrollButtonContainer;
