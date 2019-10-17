import React from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../../../utils';

const NormalItems = ({
  items,
  children,
}) => (
  items.map((item, index) => (
    <div
      key={children(item).props['data-key'] || index}
      className="infinite-scroll-item"
    >
      {children(item, index)}
    </div>
  ))
);

NormalItems.propTypes = {
  items: PropTypes.instanceOf(Array),
  children: PropTypes.func,
};

NormalItems.defaultProps = {
  items: [],
  children: noop,
};

export default NormalItems;
