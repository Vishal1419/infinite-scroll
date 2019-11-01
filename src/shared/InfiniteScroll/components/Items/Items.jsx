import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './items.scss';
import VirtualizedItems from './VirtualizedItems';
import NormalItems from './NormalItems';
import { noop } from '../../../../utils';

const Items = ({
  items, loadMore, children, isVirtualized, footer, pagination, orientation, viewType,
  headerHeight,
}) => (
  <div className={classNames('infinite-scroll-items-container', orientation, viewType)} style={{ height: `calc(100% - ${headerHeight}px)` }}>
    {
      isVirtualized && orientation === 'vertical' && viewType === 'list' // limiting to use virtualized list only for vertical orientation
        ? (
          <VirtualizedItems
            items={items}
            footer={footer}
            loadMore={loadMore}
            pagination={pagination}
            orientation={orientation}
            viewType={viewType}
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
            orientation={orientation}
            viewType={viewType}
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
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
  headerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Items.defaultProps = {
  items: [],
  loadMore: <div />,
  children: noop,
  isVirtualized: true,
  footer: null,
  pagination: null,
  orientation: 'vertical',
  viewType: 'list',
  headerHeight: 0,
};

export default Items;
