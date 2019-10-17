import React from 'react';
import PropTypes from 'prop-types';

import VirtualizedItems from './VirtualizedItems';
import NormalItems from './NormalItems';
import { noop } from '../../../../utils';

const Items = ({
  items,
  loadMore,
  children,
  isVirtualized,
}) => (
  <div className="infinite-scroll-items">
    {
      isVirtualized
        ? <VirtualizedItems items={items} loadMore={loadMore}>{children}</VirtualizedItems>
        : <NormalItems items={items} loadMore={loadMore}>{children}</NormalItems>
    }
  </div>
);

Items.propTypes = {
  items: PropTypes.instanceOf(Array),
  loadMore: PropTypes.node,
  children: PropTypes.func,
  isVirtualized: PropTypes.bool,
};

Items.defaultProps = {
  items: [],
  loadMore: <div />,
  children: noop,
  isVirtualized: true,
};

export default Items;
