import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

import './infinite-scroll.scss';
import InfiniteScroll from './InfiniteScroll';
import { noop } from '../../utils';
import { usePrevious } from '../../utils/hooks';

const InfiniteScrollContainer = ({
  children, noData,
  getItems, getItemsSource, flushItems, items,
  pageNo, pageSize, total,
  loading, hasError,
  didMount, blockInitialCall,
  blocker, loader, showBlocker, loadMoreContent,
  isVirtualized, header, footer, disableSensor,
  isPaginated, orientation, viewType, floatingLoader,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const previousPageSize = usePrevious(pageSize) || pageSize;

  const [headerRef, setHeaderRef] = useState(null);

  useEffect(() => {
    (async () => {
      await didMount();
      if (!loading && !blockInitialCall) {
        flushItems();
        getItems(1, pageSize);
      }
      setIsMounted(true);
    })();

    return () => {
      if (getItemsSource && getItemsSource.cancel) getItemsSource.cancel();
    };
  }, []);

  useEffect(() => {
    if (previousPageSize !== pageSize) {
      flushItems();
      getItems(1, pageSize);
    }
  }, [pageSize]);

  const onPageNoChange = (nextPage) => {
    if (isMounted) {
      getItems(nextPage, pageSize);
    }
  };

  return (
    <InfiniteScroll
      onPageNoChange={onPageNoChange}
      items={items}
      pageNo={pageNo}
      pageSize={pageSize}
      total={total}
      loading={isMounted ? loading : true}
      hasError={hasError}
      noData={noData}
      blocker={blocker}
      loader={loader}
      showBlocker={showBlocker}
      loadMoreContent={loadMoreContent}
      isVirtualized={orientation === 'vertical' && viewType === 'list' ? isVirtualized : false} // limitation
      header={header}
      footer={footer}
      disableSensor={disableSensor}
      isPaginated={isPaginated}
      orientation={orientation}
      viewType={viewType}
      floatingLoader={orientation === 'horizontal' && viewType === 'grid' ? true : floatingLoader} // limitation
      headerRef={headerRef}
      setHeaderRef={setHeaderRef}
    >
      {children}
    </InfiniteScroll>
  );
};

InfiniteScrollContainer.propTypes = {
  children: PropTypes.func.isRequired,
  getItems: PropTypes.func,
  getItemsSource: PropTypes.instanceOf(Object),
  flushItems: PropTypes.func,
  items: PropTypes.instanceOf(Array),
  pageNo: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  noData: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  didMount: PropTypes.func,
  blockInitialCall: PropTypes.bool,
  blocker: PropTypes.node,
  loader: PropTypes.node,
  showBlocker: PropTypes.bool,
  loadMoreContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isVirtualized: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
  disableSensor: PropTypes.bool,
  isPaginated: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
  floatingLoader: PropTypes.bool,
};

InfiniteScrollContainer.defaultProps = {
  getItems: noop,
  getItemsSource: {},
  flushItems: noop,
  items: [],
  pageNo: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  hasError: false,
  noData: 'No Data',
  didMount: noop,
  blockInitialCall: false,
  blocker: null,
  loader: null,
  showBlocker: true,
  loadMoreContent: 'Load More',
  isVirtualized: true,
  header: null,
  footer: null,
  disableSensor: false,
  isPaginated: false,
  orientation: 'vertical',
  viewType: 'list',
  floatingLoader: false,
};

export default InfiniteScrollContainer;
