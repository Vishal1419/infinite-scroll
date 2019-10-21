import React from 'react';
import PropTypes from 'prop-types';

import './items.scss';
import VirtualizedItems from './VirtualizedItems';
import NormalItems from './NormalItems';
import { noop } from '../../../../utils';

const Items = ({
  items, loadMore, children, isVirtualized, footer, pagination,
}) => (
  <div className="infinite-scroll-items">
    {
      isVirtualized
        ? (
          <VirtualizedItems
            items={items}
            footer={footer}
            loadMore={loadMore}
            pagination={pagination}
          >
            {children}
          </VirtualizedItems>
        )
        : (
          <NormalItems
            items={items}
            footer={footer}
            loadMore={loadMore}
            pagination={pagination}
          >
            {children}
          </NormalItems>
        )
    }
  </div>
);

Items.propTypes = {
  items: PropTypes.instanceOf(Array),
  loadMore: PropTypes.node,
  children: PropTypes.func,
  isVirtualized: PropTypes.bool,
  footer: PropTypes.node,
  pagination: PropTypes.node,
};

Items.defaultProps = {
  items: [],
  loadMore: <div />,
  children: noop,
  isVirtualized: true,
  footer: null,
  pagination: null,
};

export default Items;
