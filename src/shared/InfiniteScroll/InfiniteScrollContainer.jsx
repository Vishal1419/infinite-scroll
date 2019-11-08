import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

import './infinite-scroll.scss';
import InfiniteScroll from './InfiniteScroll';
import {
  noop, debounce, scrollToIndex, getElementDimensions, isInViewport,
  getElementWidth, getElementHeight,
} from '../../utils';
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
  showScrollButtons, scrollButtonsPosition, elementsToScrollAtATime,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [previousButtonRef, setPreviousButtonRef] = useState(null);
  const [isPreviousButtonEnabled, setIsPreviousButtonEnabled] = useState(false);
  const [nextButtonRef, setNextButtonRef] = useState(null);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const previousPageSize = usePrevious(pageSize) || pageSize;
  const infiniteScrollRef = useRef(null);

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
      setCurrentIndex(0);
    }
  }, [pageSize]);

  const onPageNoChange = (nextPage) => {
    if (isMounted) {
      getItems(nextPage, pageSize);
    }
  };

  useEffect(() => {
    if (!isVirtualized && viewType === 'list' && showScrollButtons && elementsToScrollAtATime) { // limitation
      const infiniteScrollItems = document.getElementsByClassName('infinite-scroll-item');
      const infiniteScroll = infiniteScrollRef && infiniteScrollRef.current;
      const scrollStart = scrollToIndex(
        infiniteScroll, infiniteScrollItems, currentIndex, orientation,
      );
      if (scrollStart === 0) setIsPreviousButtonEnabled(false);
      else setIsPreviousButtonEnabled(true);
      if (
        orientation === 'horizontal'
          ? infiniteScroll.scrollWidth - scrollStart <= getElementWidth(infiniteScroll)
          : infiniteScroll.scrollHeight - scrollStart <= getElementHeight(infiniteScroll)
      ) {
        setIsNextButtonEnabled(false);
      } else setIsNextButtonEnabled(true);
    }
  }, [currentIndex, items]);

  const handlePreviousButtonClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - elementsToScrollAtATime);
  };

  const handleNextButtonClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + elementsToScrollAtATime);
  };

  const handleScroll = () => {
    if (!isVirtualized && viewType === 'list' && showScrollButtons && elementsToScrollAtATime) { // limitation
      debounce(() => {
        const infiniteScrollItems = document.getElementsByClassName('infinite-scroll-item');
        const infiniteScroll = infiniteScrollRef && infiniteScrollRef.current;
        const viewportDimensions = getElementDimensions(infiniteScroll, orientation);
        [...infiniteScrollItems].every((item, index, self) => {
          if (isInViewport(viewportDimensions, item, orientation, 0.5)) {
            setCurrentIndex(index);
            scrollToIndex(infiniteScroll, self, index, orientation);
            return false;
          }
          return true;
        });
      }, 200);
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
      infiniteScrollRef={infiniteScrollRef}
      showScrollButtons={viewType === 'list' && !isVirtualized && showScrollButtons} // limitation
      scrollButtonsPosition={
        showScrollButtons === 'hover' // eslint-disable-line
          ? 'inside'
          : orientation === 'horizontal' && viewType === 'grid' // limitation
            ? 'inside'
            : scrollButtonsPosition
      }
      previousButtonRef={previousButtonRef}
      setPreviousButtonRef={setPreviousButtonRef}
      isPreviousButtonEnabled={isPreviousButtonEnabled}
      handlePreviousButtonClick={handlePreviousButtonClick}
      nextButtonRef={nextButtonRef}
      setNextButtonRef={setNextButtonRef}
      isNextButtonEnabled={isNextButtonEnabled}
      handleNextButtonClick={handleNextButtonClick}
      handleScroll={handleScroll}
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
  showScrollButtons: PropTypes.oneOf([true, false, 'hover']),
  scrollButtonsPosition: PropTypes.oneOf(['inside', 'outside']),
  elementsToScrollAtATime: PropTypes.number,
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
  showScrollButtons: false,
  scrollButtonsPosition: 'inside',
  elementsToScrollAtATime: 0,
};

export default InfiniteScrollContainer;
