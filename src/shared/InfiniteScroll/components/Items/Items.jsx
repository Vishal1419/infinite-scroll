import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './items.scss';
import VirtualizedItems from './VirtualizedItems';
import NormalItems from './NormalItems/NormalItemsContainer';
import { noop } from '../../../../utils';

const Items = ({
  classes, styles, items, loadMore, children, isVirtualized, header, footer, pagination,
  orientation, viewType, floatingLoader, infiniteScrollRef, currentIndex, loading,
  showPartiallyVisibleItem, itemsMarginChanged,
}) => (
  <div
    className={classNames(
      'IS-content', classes.content,
      `IS-INTERNAL-${orientation}`, `IS-INTERNAL-${viewType}`,
    )}
    style={styles.content}
  >
    {
      isVirtualized
        ? (
          <VirtualizedItems
            classes={classes}
            styles={styles}
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
            classes={classes}
            styles={styles}
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
            itemsMarginChanged={itemsMarginChanged}
          >
            {children}
          </NormalItems>
        )
    }
  </div>
);

Items.propTypes = {
  classes: PropTypes.instanceOf(Object),
  styles: PropTypes.instanceOf(Object),
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
  itemsMarginChanged: PropTypes.func,
};

Items.defaultProps = {
  classes: {},
  styles: {},
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
  itemsMarginChanged: noop,
};

export default Items;
