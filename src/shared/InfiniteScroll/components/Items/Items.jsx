import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './items.scss';
import VirtualizedItems from './VirtualizedItems';
import NormalItems from './NormalItems/NormalItemsContainer';
import { noop } from '../../../../utils';

const Items = ({
  items, loadMore, children, isVirtualized, header, footer, pagination, orientation, viewType,
  floatingLoader, infiniteScrollRef, currentIndex, loading, showPartiallyVisibleItem,
}) => (
  <div className={classNames('infinite-scroll-items-container', orientation, viewType)}>
    {
      isVirtualized
        ? (
          <VirtualizedItems
            items={items}
            header={header}
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
            header={header}
            footer={footer}
            loadMore={loadMore}
            pagination={pagination}
            orientation={orientation}
            viewType={viewType}
            floatingLoader={floatingLoader}
            infiniteScrollRef={infiniteScrollRef}
            currentIndex={currentIndex}
            loading={loading}
            showPartiallyVisibleItem={showPartiallyVisibleItem}
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
  header: PropTypes.node,
  footer: PropTypes.node,
  pagination: PropTypes.node,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
  floatingLoader: PropTypes.bool,
  infiniteScrollRef: PropTypes.instanceOf(Object),
  currentIndex: PropTypes.number,
  loading: PropTypes.bool,
  showPartiallyVisibleItem: PropTypes.bool,
};

Items.defaultProps = {
  items: [],
  loadMore: <div />,
  children: noop,
  isVirtualized: true,
  header: null,
  footer: null,
  pagination: null,
  orientation: 'vertical',
  viewType: 'list',
  floatingLoader: false,
  infiniteScrollRef: {},
  currentIndex: 0,
  loading: false,
  showPartiallyVisibleItem: false,
};

export default Items;
