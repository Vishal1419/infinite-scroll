import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import PropTypes from 'prop-types';

const InfiniteSensor = ({
  active, className, style, onReachedBottom,
}) => (
  <div className={className} style={style}>
    <VisibilitySensor
      active={active}
      partialVisibility
      onChange={(isVisible) => isVisible && onReachedBottom()}
    />
  </div>
);

InfiniteSensor.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  onReachedBottom: PropTypes.func.isRequired,
};

InfiniteSensor.defaultProps = {
  active: true,
  className: '',
  style: {},
};

export default InfiniteSensor;
