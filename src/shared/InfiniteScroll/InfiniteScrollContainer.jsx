import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

import './infinite-scroll.scss';
import InfiniteScroll from './InfiniteScroll';
import {
  noop, debounce, scrollToIndex, getElementDimensions, isInViewport,
  getElementWidth, getElementHeight, throttle,
} from '../../utils';
import { usePrevious } from '../../utils/hooks';

const InfiniteScrollContainer = ({
  children, classes, styles, noData,
  getItems, getItemsSource, flushItems, items,
  pageNo, pageSize, total,
  loading, hasError, didMount,
  loaderProps: {
    blockInitialCall, blocker, loader, showBlocker,
    loadMoreContent, floatingLoader, disableSensor,
  },
  isVirtualized, header, footer,
  isPaginated, orientation, viewType,
  scrollProps: {
    showScrollButtons, scrollButtonsPosition,
    previousButtonContent, nextButtonContent,
    itemsToScrollAtATime, showPartiallyVisibleItem, hideScrollbar,
  },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [previousButtonRef, setPreviousButtonRef] = useState(null);
  const [isPreviousButtonEnabled, setIsPreviousButtonEnabled] = useState(false);
  const [nextButtonRef, setNextButtonRef] = useState(null);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const previousPageSize = usePrevious(pageSize) || pageSize;
  const infiniteScrollRef = useRef(null);

  let itemsMargin = 0;

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

  const toggleScrollButtonEnabledState = (scrollStart) => {
    let _scrollStart = scrollStart;
    const infiniteScroll = infiniteScrollRef && infiniteScrollRef.current;
    if (isNaN(_scrollStart)) { // eslint-disable-line
      _scrollStart = orientation === 'horizontal' ? infiniteScroll.scrollLeft : infiniteScroll.scrollTop;
    }
    if (_scrollStart === 0) setIsPreviousButtonEnabled(false);
    else setIsPreviousButtonEnabled(true);
    const _itemsMargin = _scrollStart === 0 ? 0 : itemsMargin;
    if (
      orientation === 'horizontal'
        ? infiniteScroll.scrollWidth - _scrollStart - _itemsMargin <= getElementWidth(infiniteScroll)
        : infiniteScroll.scrollHeight - _scrollStart - _itemsMargin <= getElementHeight(infiniteScroll)
    ) {
      setIsNextButtonEnabled(false);
    } else setIsNextButtonEnabled(true);
  };

  useEffect(() => {
    if (!isVirtualized && !isPaginated && viewType === 'list' && showScrollButtons) { // limitation
      let scrollStart;
      if (itemsToScrollAtATime) {
        const infiniteScrollItems = document.getElementsByClassName('IS-item-container');
        const infiniteScroll = infiniteScrollRef && infiniteScrollRef.current;
        scrollStart = scrollToIndex(
          infiniteScroll, infiniteScrollItems, currentIndex, orientation,
        );
      }
      toggleScrollButtonEnabledState(scrollStart);
    }
  }, [currentIndex, items]);

  const handlePreviousButtonClick = () => {
    if (itemsToScrollAtATime) {
      throttle(() => {
        setCurrentIndex((prevIndex) => prevIndex - itemsToScrollAtATime);
      }, 500);
    } else {
      const infiniteScroll = infiniteScrollRef && infiniteScrollRef.current;
      if (orientation === 'horizontal') {
        infiniteScroll.scrollLeft -= (getElementWidth(infiniteScroll) / 2);
      } else {
        infiniteScroll.scrollTop -= (getElementHeight(infiniteScroll) / 2);
      }
    }
  };

  const handleNextButtonClick = () => {
    if (itemsToScrollAtATime) {
      throttle(() => {
        setCurrentIndex((prevIndex) => prevIndex + itemsToScrollAtATime);
      }, 500);
    } else {
      const infiniteScroll = infiniteScrollRef && infiniteScrollRef.current;
      if (orientation === 'horizontal') {
        infiniteScroll.scrollLeft += (getElementWidth(infiniteScroll) / 2);
      } else {
        infiniteScroll.scrollTop += (getElementHeight(infiniteScroll) / 2);
      }
    }
  };

  const handleScroll = () => {
    if (!isVirtualized && !isPaginated && viewType === 'list' && showScrollButtons) { // limitation
      debounce(() => {
        if (itemsToScrollAtATime) {
          const infiniteScrollItems = document.getElementsByClassName('IS-item-container');
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
        } else {
          toggleScrollButtonEnabledState();
        }
      }, 200);
    }
  };

  const itemsMarginChanged = (margin) => {
    itemsMargin = margin;
  };

  return (
    <InfiniteScroll
      classes={classes}
      styles={styles}
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
      showScrollButtons={viewType === 'list' && !isVirtualized && !isPaginated && showScrollButtons} // limitation
      scrollButtonsPosition={
        showScrollButtons === 'hover' // eslint-disable-line
          ? 'inside'
          : orientation === 'horizontal' && viewType === 'grid' // limitation
            ? 'inside'
            : scrollButtonsPosition
      }
      previousButtonRef={previousButtonRef}
      setPreviousButtonRef={setPreviousButtonRef}
      previousButtonContent={previousButtonContent}
      isPreviousButtonEnabled={isPreviousButtonEnabled}
      handlePreviousButtonClick={handlePreviousButtonClick}
      nextButtonRef={nextButtonRef}
      setNextButtonRef={setNextButtonRef}
      nextButtonContent={nextButtonContent}
      isNextButtonEnabled={isNextButtonEnabled}
      handleNextButtonClick={handleNextButtonClick}
      handleScroll={handleScroll}
      currentIndex={currentIndex}
      showPartiallyVisibleItem={
        orientation === 'horizontal' && viewType === 'list' && !isPaginated && itemsToScrollAtATime > 0
          ? showPartiallyVisibleItem
          : true
      } // limitation
      hideScrollbar={hideScrollbar}
      itemsMarginChanged={itemsMarginChanged}
    >
      {children}
    </InfiniteScroll>
  );
};

InfiniteScrollContainer.propTypes = {
  children: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string,
    main: PropTypes.string,
    contentContainer: PropTypes.string,
    content: PropTypes.string,
    itemsContainer: PropTypes.string,
    items: PropTypes.string,
    itemContainer: PropTypes.string,
    headerContainer: PropTypes.string,
    footerContainer: PropTypes.string,
    noDataContainer: PropTypes.string,
    blockerContainer: PropTypes.string,
    loaderContainer: PropTypes.string,
    sensorContainer: PropTypes.string,
    loadMoreButtonContainer: PropTypes.string,
    loadMoreButton: PropTypes.string,
    defaultLoaderContainer: PropTypes.string,
    defaultLoader: PropTypes.string,
    scrollButtonContainer: PropTypes.string,
    scrollButton: PropTypes.string,
    previousButtonContainer: PropTypes.string,
    previousButton: PropTypes.string,
    nextButtonContainer: PropTypes.string,
    nextButton: PropTypes.string,
    paginationContainer: PropTypes.string,
    paginationPreviousButton: PropTypes.string,
    paginationNextButton: PropTypes.string,
    paginationActiveButton: PropTypes.string,
    paginationButton: PropTypes.string,
    morePagesLabel: PropTypes.string,
  }),
  styles: PropTypes.shape({
    container: PropTypes.instanceOf(Object),
    main: PropTypes.instanceOf(Object),
    contentContainer: PropTypes.instanceOf(Object),
    content: PropTypes.instanceOf(Object),
    itemsContainer: PropTypes.instanceOf(Object),
    items: PropTypes.instanceOf(Object),
    itemContainer: PropTypes.instanceOf(Object),
    headerContainer: PropTypes.instanceOf(Object),
    footerContainer: PropTypes.instanceOf(Object),
    noDataContainer: PropTypes.instanceOf(Object),
    blockerContainer: PropTypes.instanceOf(Object),
    loaderContainer: PropTypes.instanceOf(Object),
    sensorContainer: PropTypes.instanceOf(Object),
    loadMoreButtonContainer: PropTypes.instanceOf(Object),
    loadMoreButton: PropTypes.instanceOf(Object),
    defaultLoaderContainer: PropTypes.instanceOf(Object),
    defaultLoader: PropTypes.instanceOf(Object),
    scrollButtonContainer: PropTypes.instanceOf(Object),
    scrollButton: PropTypes.instanceOf(Object),
    previousButtonContainer: PropTypes.instanceOf(Object),
    previousButton: PropTypes.instanceOf(Object),
    nextButtonContainer: PropTypes.instanceOf(Object),
    nextButton: PropTypes.instanceOf(Object),
    paginationContainer: PropTypes.instanceOf(Object),
    paginationPreviousButton: PropTypes.instanceOf(Object),
    paginationNextButton: PropTypes.instanceOf(Object),
    paginationActiveButton: PropTypes.instanceOf(Object),
    paginationButton: PropTypes.instanceOf(Object),
    morePagesLabel: PropTypes.instanceOf(Object),
  }),
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
  loaderProps: PropTypes.shape({
    blockInitialCall: PropTypes.bool,
    blocker: PropTypes.node,
    loader: PropTypes.node,
    showBlocker: PropTypes.bool,
    loadMoreContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    floatingLoader: PropTypes.bool,
    disableSensor: PropTypes.bool,
  }),
  isVirtualized: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
  isPaginated: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
  scrollProps: PropTypes.shape({
    showScrollButtons: PropTypes.oneOf([true, false, 'hover']),
    scrollButtonsPosition: PropTypes.oneOf(['inside', 'outside']),
    previousButtonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    nextButtonContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    itemsToScrollAtATime: PropTypes.number,
    showPartiallyVisibleItem: PropTypes.bool,
    hideScrollbar: PropTypes.bool,
  }),
};

InfiniteScrollContainer.defaultProps = {
  classes: {
    container: '',
    main: '',
    contentContainer: '',
    content: '',
    itemsContainer: '',
    items: '',
    itemContainer: '',
    headerContainer: '',
    footerContainer: '',
    noDataContainer: '',
    blockerContainer: '',
    loaderContainer: '',
    sensorContainer: '',
    loadMoreButtonContainer: '',
    loadMoreButton: '',
    defaultLoaderContainer: '',
    defaultLoader: '',
    scrollButtonContainer: '',
    scrollButton: '',
    previousButtonContainer: '',
    previousButton: '',
    nextButtonContainer: '',
    nextButton: '',
    paginationContainer: '',
    paginationPreviousButton: '',
    paginationNextButton: '',
    paginationActiveButton: '',
    paginationButton: '',
    morePagesLabel: '',
  },
  styles: {
    container: {},
    main: {},
    contentContainer: {},
    content: {},
    itemsContainer: {},
    items: {},
    itemContainer: {},
    headerContainer: {},
    footerContainer: {},
    noDataContainer: {},
    blockerContainer: {},
    loaderContainer: {},
    sensorContainer: {},
    loadMoreButtonContainer: {},
    loadMoreButton: {},
    defaultLoaderContainer: {},
    defaultLoader: {},
    scrollButtonContainer: {},
    scrollButton: {},
    previousButtonContainer: {},
    previousButton: {},
    nextButtonContainer: {},
    nextButton: {},
    paginationContainer: {},
    paginationPreviousButton: {},
    paginationNextButton: {},
    paginationActiveButton: {},
    paginationButton: {},
    morePagesLabel: {},
  },
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
  loaderProps: {
    blockInitialCall: false,
    blocker: null,
    loader: null,
    showBlocker: true,
    loadMoreContent: 'Load More',
    floatingLoader: false,
    disableSensor: false,
  },
  isVirtualized: true,
  header: null,
  footer: null,
  isPaginated: false,
  orientation: 'vertical',
  viewType: 'list',
  scrollProps: {
    showScrollButtons: false,
    scrollButtonsPosition: 'inside',
    previousButtonContent: 'Previous',
    nextButtonContent: 'Next',
    itemsToScrollAtATime: 0,
    showPartiallyVisibleItem: false,
    hideScrollbar: false,
  },
};

export default InfiniteScrollContainer;
