import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BlockUI from 'react-block-ui';

import ScrollButton from './components/ScrollButton/ScrollButtonContainer';
import Items from './components/Items/Items';
import Loader from './components/Loader/Loader';
import LoadMoreItems from './components/LoadMoreItems/LoadMoreItems';
import Pagination from './components/Pagination/PaginationContainer';
import { noop, getElementHeight, getElementWidth } from '../../utils';

const InfiniteScroll = ({
  children, classes, styles, noData,
  onPageNoChange, items,
  pageNo, pageSize, total,
  loading, hasError,
  blocker, loader, showBlocker, loadMoreContent,
  isVirtualized, header, footer, disableSensor,
  isPaginated, orientation, viewType, floatingLoader,
  infiniteScrollRef,
  showScrollButtons, scrollButtonsPosition,
  previousButtonRef, setPreviousButtonRef, isPreviousButtonEnabled, handlePreviousButtonClick,
  nextButtonRef, setNextButtonRef, isNextButtonEnabled, handleNextButtonClick,
  handleScroll, currentIndex, showPartiallyVisibleItem, hideScrollbar, itemsMarginChanged,
}) => {
  const _showScrollButtons = showScrollButtons
  && !(
    infiniteScrollRef && infiniteScrollRef.current
    && (orientation === 'horizontal'
      ? (infiniteScrollRef.current.offsetWidth === infiniteScrollRef.current.scrollWidth)
      : (infiniteScrollRef.current.offsetHeight === infiniteScrollRef.current.scrollHeight))
  );
  const previousButtonSize = (
    previousButtonRef && (orientation === 'vertical'
      ? getElementHeight(previousButtonRef)
      : getElementWidth(previousButtonRef))
  ) || 0;
  const nextButtonSize = (
    nextButtonRef && (orientation === 'vertical'
      ? getElementHeight(nextButtonRef)
      : getElementWidth(nextButtonRef))
  ) || 0;
  const infiniteScrollStyle = {};
  if (_showScrollButtons) {
    infiniteScrollStyle.overflow = hideScrollbar ? 'hidden' : 'auto';
  }
  if (_showScrollButtons && scrollButtonsPosition === 'outside') {
    if (orientation === 'vertical') {
      infiniteScrollStyle.height = `calc(100% - (${previousButtonSize}px + ${nextButtonSize}px))`;
    } else {
      infiniteScrollStyle.width = `calc(100% - (${previousButtonSize}px + ${nextButtonSize}px))`;
    }
  }

  return (
    <div
      className={
        classNames(
          'IS-container',
          classes.container,
          `IS-INTERNAL-${orientation}`,
          { 'IS-INTERNAL-scroll-buttons-visible': showScrollButtons },
        )
      }
      style={styles.container}
    >
      {
        _showScrollButtons && (
          <ScrollButton
            setContainerRef={setPreviousButtonRef}
            containerClassName={
              classNames('IS-previous-button-container', classes.scrollButtonContainer, classes.previousButtonContainer)
            }
            containerStyle={{ ...(styles.scrollButtonContainer), ...(styles.previousButtonContainer) }}
            className={classNames('IS-previous-button', classes.scrollButton, classes.previousButton)}
            style={{ ...(styles.scrollButton), ...(styles.previousButton) }}
            disabled={!isPreviousButtonEnabled}
            onClick={handlePreviousButtonClick}
            showOnHover={showScrollButtons === 'hover'}
            orientation={orientation}
            position={scrollButtonsPosition}
          >
            Previous
          </ScrollButton>
        )
      }
      <div
        ref={infiniteScrollRef}
        className={classNames('IS-main', classes.main, { 'IS-INTERNAL-scroll-buttons-visible': showScrollButtons })}
        style={{ ...infiniteScrollStyle, ...(styles.main) }}
        onScroll={handleScroll}
      >
        <BlockUI
          tag="div"
          className={classNames('IS-blocker-container', classes.blockerContainer)}
          style={styles.blockerContainer}
          blocking={
            isPaginated ? loading : (showBlocker && (items && items.length === 0) && loading)
          }
          loader={
            blocker || (
              <Loader
                containerClassName={classes.defaultLoaderContainer}
                containerStyle={styles.defaultLoaderContainer}
                className={classes.defaultLoader}
                style={styles.defaultLoader}
              />
            )
          }
          renderChildren={isPaginated && items.length > 0}
        >
          {
            items.length === 0 && !loading
              ? (
                <div
                  className={(classNames('IS-no-data-container', classes.noDataContainer))}
                  style={styles.noDataContainer}
                >
                  {noData}
                </div>
              )
              : (
                <div
                  className={classNames('IS-content-container', classes.contentContainer, `IS-INTERNAL-${orientation}`)}
                  style={styles.contentContainer}
                >
                  <Items
                    classes={classes}
                    styles={styles}
                    items={items}
                    header={header}
                    footer={footer}
                    loadMore={(
                      <LoadMoreItems
                        classes={classes}
                        styles={styles}
                        onPageNoChange={onPageNoChange}
                        pageNo={pageNo}
                        pageSize={pageSize}
                        total={total}
                        noOfItems={(items && items.length) || 0}
                        loading={loading}
                        hasError={hasError}
                        loader={loader}
                        loadMoreContent={loadMoreContent}
                        disableSensor={disableSensor}
                        showBlocker={showBlocker}
                        isPaginated={isPaginated}
                      />
                    )}
                    pagination={isPaginated && (
                      <Pagination
                        classes={classes}
                        styles={styles}
                        activePage={pageNo}
                        onChangeActivePage={onPageNoChange}
                        pageSize={pageSize}
                        totalRecords={total}
                        pageNeighbours={2}
                      />
                    )}
                    isVirtualized={isVirtualized}
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
                  </Items>
                </div>
              )
          }
        </BlockUI>
      </div>
      {
        _showScrollButtons && (
          <ScrollButton
            setContainerRef={setNextButtonRef}
            containerClassName={
              classNames('IS-next-button-container', classes.scrollButtonContainer, classes.nextButtonContainer)
            }
            containerStyle={{ ...(styles.scrollButtonContainer), ...(styles.nextButtonContainer) }}
            className={classNames('IS-next-button', classes.scrollButton, classes.nextButton)}
            style={{ ...styles.scrollButton, ...(styles.nextButton) }}
            disabled={!isNextButtonEnabled}
            onClick={handleNextButtonClick}
            showOnHover={showScrollButtons === 'hover'}
            orientation={orientation}
            position={scrollButtonsPosition}
          >
            Next
          </ScrollButton>
        )
      }
    </div>
  );
};

InfiniteScroll.propTypes = {
  children: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object),
  styles: PropTypes.instanceOf(Object),
  onPageNoChange: PropTypes.func,
  items: PropTypes.instanceOf(Array),
  pageNo: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  noData: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
  infiniteScrollRef: PropTypes.instanceOf(Object),
  showScrollButtons: PropTypes.oneOf([true, false, 'hover']),
  scrollButtonsPosition: PropTypes.oneOf(['inside', 'outside']),
  previousButtonRef: PropTypes.instanceOf(Object),
  setPreviousButtonRef: PropTypes.func,
  isPreviousButtonEnabled: PropTypes.bool,
  handlePreviousButtonClick: PropTypes.func,
  nextButtonRef: PropTypes.instanceOf(Object),
  setNextButtonRef: PropTypes.func,
  isNextButtonEnabled: PropTypes.bool,
  handleNextButtonClick: PropTypes.func,
  handleScroll: PropTypes.func,
  currentIndex: PropTypes.number,
  showPartiallyVisibleItem: PropTypes.bool,
  hideScrollbar: PropTypes.bool,
  itemsMarginChanged: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  classes: {},
  styles: {},
  onPageNoChange: noop,
  items: [],
  pageNo: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  hasError: false,
  noData: 'No Data',
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
  infiniteScrollRef: {},
  showScrollButtons: false,
  scrollButtonsPosition: 'inside',
  previousButtonRef: {},
  setPreviousButtonRef: noop,
  isPreviousButtonEnabled: false,
  handlePreviousButtonClick: noop,
  nextButtonRef: {},
  setNextButtonRef: noop,
  isNextButtonEnabled: false,
  handleNextButtonClick: noop,
  handleScroll: noop,
  currentIndex: 0,
  showPartiallyVisibleItem: false,
  hideScrollbar: false,
  itemsMarginChanged: noop,
};

export default InfiniteScroll;
