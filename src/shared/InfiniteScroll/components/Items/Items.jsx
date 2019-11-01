import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './items.scss';
import VirtualizedItems from './VirtualizedItems';
import NormalItems from './NormalItems';
import { noop } from '../../../../utils';

const Items = ({
  items, loadMore, children, isVirtualized, footer, pagination, orientation, viewType,
  floatingLoader, headerHeight,
}) => (
  <div className={classNames('infinite-scroll-items-container', orientation, viewType)} style={{ height: `calc(100% - ${headerHeight}px)` }}>
    {
      isVirtualized
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
            floatingLoader={floatingLoader}
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
  floatingLoader: PropTypes.bool,
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
  floatingLoader: false,
};

export default Items;
