import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import NormalItems from './NormalItems';
import {
  noop, getElementDimensions, getElementMainAxisSize,
} from '../../../../../utils';

const getFullyVisibleItemMargin = (
  infiniteScrollItems, currentIndex, viewportDimensions, orientation, loading,
) => {
  const visibleItemsIndices = [];
  const viewportMainAxisSize = orientation === 'horizontal' ? viewportDimensions.width : viewportDimensions.height;
  const mainAxisMarginProps = orientation === 'horizontal'
    ? ['margin-left', 'margin-right']
    : ['margin-top', 'margin-bottom'];
  const visibleItemsMainAxisSize = infiniteScrollItems
    .reduce((acc, item, index) => {
      const nextMainAxisSize = (
        acc + getElementMainAxisSize(item, mainAxisMarginProps, orientation)
      );
      if (index >= currentIndex && nextMainAxisSize < viewportMainAxisSize) {
        visibleItemsIndices.push(index);
        return nextMainAxisSize;
      }
      return acc;
    }, 0);
  let partiallyVisibleItemMainAxisSize = viewportMainAxisSize - visibleItemsMainAxisSize;
  // const lastItem = infiniteScrollItems[infiniteScrollItems.length - 1];
  // const lastItemMainAxisSize = (
  //   lastItem && getElementMainAxisSize(lastItem, mainAxisMarginProps, orientation)
  // ) || 0;
  if (loading) partiallyVisibleItemMainAxisSize -= 40;
  const fullyVisibleItemMargin = (
    partiallyVisibleItemMainAxisSize / ((visibleItemsIndices.length - 1) * 2)
  );
  // const newMargin = lastItemMainAxisSize / ((visibleItemsIndices.length - 1) * 2);
  // TODO:- needs to change in future as calculation is not correct.
  // if (loading && fullyVisibleItemMargin > newMargin) fullyVisibleItemMargin = newMargin;
  return { visibleItemsIndices, fullyVisibleItemMargin };
};

const NormalItemsContainer = ({
  classes, styles, items, children, loadMore, header, footer, pagination,
  orientation, viewType, floatingLoader, infiniteScrollRef, currentIndex, loading,
  showPartiallyVisibleItem, itemsMarginChanged,
}) => {
  const [infiniteScrollItems, setInfiniteScrollItems] = useState([]);

  useEffect(() => {
    const _infiniteScrollItems = document.getElementsByClassName('IS-item-container');
    setInfiniteScrollItems([..._infiniteScrollItems]);
  }, []);

  useEffect(() => {
    const _infiniteScrollItems = document.getElementsByClassName('IS-item-container');
    setInfiniteScrollItems([..._infiniteScrollItems]);
  }, [items]);

  const infiniteScroll = infiniteScrollRef && infiniteScrollRef.current;
  const viewportDimensions = getElementDimensions(infiniteScroll, orientation);
  const { visibleItemsIndices = [], fullyVisibleItemMargin = 0 } = !showPartiallyVisibleItem
    ? getFullyVisibleItemMargin(
      infiniteScrollItems, currentIndex, viewportDimensions, orientation, loading,
    )
    : {};
  itemsMarginChanged(fullyVisibleItemMargin * (visibleItemsIndices.length - 1));

  return (
    <NormalItems
      classes={classes}
      styles={styles}
      items={items}
      header={header}
      footer={footer}
      loadMore={loadMore}
      floatingLoader={floatingLoader}
      pagination={pagination}
      orientation={orientation}
      viewType={viewType}
      visibleItemsIndices={visibleItemsIndices}
      itemStyle={{ margin: fullyVisibleItemMargin }}
      showPartiallyVisibleItem={showPartiallyVisibleItem}
    >
      {children}
    </NormalItems>
  );
};

NormalItemsContainer.propTypes = {
  classes: PropTypes.instanceOf(Object),
  styles: PropTypes.instanceOf(Object),
  items: PropTypes.instanceOf(Array),
  children: PropTypes.func,
  loadMore: PropTypes.node,
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

NormalItemsContainer.defaultProps = {
  classes: {},
  styles: {},
  items: [],
  children: noop,
  loadMore: <div />,
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

export default NormalItemsContainer;
