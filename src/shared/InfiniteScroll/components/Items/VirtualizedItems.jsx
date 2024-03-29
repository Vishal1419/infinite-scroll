import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  List, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';
import 'react-virtualized/styles.css';

import { noop, getScrollParent } from '../../../../utils';
import { usePrevious } from '../../../../utils/hooks';

let cache;

const VirtualizedItems = ({
  classes, styles, items, loadMore, children, header, footer, pagination, orientation, viewType,
}) => {
  const previousItemsLength = usePrevious(items.length) || 0;
  const [scrollOffset, setScrollOffset] = useState(0);
  const windowScrollerRef = useRef(null);

  useEffect(() => {
    cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
    return () => {
      cache = null;
    };
  }, []);

  useEffect(() => {
    if (previousItemsLength !== items.length) setScrollOffset(16);
  }, [items.length]);

  return (
    <WindowScroller
      ref={windowScrollerRef}
      scrollElement={
        (windowScrollerRef && windowScrollerRef.current
        && getScrollParent(windowScrollerRef.current))
        || window
      }
    >
      {
        ({
          height, isScrolling, registerChild, onChildScroll, scrollTop,
        }) => {
          const _onScroll = (values) => {
            onChildScroll({
              ...values,
              scrollTop: values.scrollTop - scrollOffset,
            });
            setScrollOffset(0);
          };
          return (
            <AutoSizer disableHeight>
              {
                ({ width }) => (
                  <div
                    className={classNames(
                      'IS-items', classes.items,
                      `IS-INTERNAL-${orientation}`, `IS-INTERNAL-${viewType}`,
                    )}
                    style={{ ...(styles.items), width }}
                  >
                    {
                      header && (
                        <div
                          className={classNames('IS-header-container', classes.headerContainer)}
                          style={styles.headerContainer}
                        >
                          {header}
                        </div>
                      )
                    }
                    <List
                      ref={registerChild}
                      width={width}
                      height={height}
                      autoHeight
                      isScrolling={isScrolling}
                      onScroll={_onScroll}
                      scrollTop={scrollTop}
                      deferredMeasurementCache={cache}
                      rowHeight={(cache && cache.rowHeight) || 100}
                      rowCount={items.length}
                      rowRenderer={({
                        index, key, style, parent,
                      }) => (
                        <CellMeasurer
                          key={key}
                          cache={cache}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          <div
                            className={classNames('IS-item-container', classes.itemContainer)}
                            style={{ ...(styles.itemContainer), ...style }}
                          >
                            {children(items[index], index)}
                          </div>
                        </CellMeasurer>
                      )}
                    />
                    {
                      footer && (
                        <div
                          className={classNames('IS-footer-container', classes.footerContainer)}
                          style={styles.footerContainer}
                        >
                          {footer}
                        </div>
                      )
                    }
                    {pagination}
                    {loadMore}
                  </div>
                )
              }
            </AutoSizer>
          );
        }
      }
    </WindowScroller>
  );
};

VirtualizedItems.propTypes = {
  classes: PropTypes.instanceOf(Object),
  styles: PropTypes.instanceOf(Object),
  items: PropTypes.instanceOf(Array),
  loadMore: PropTypes.node,
  children: PropTypes.func,
  header: PropTypes.node,
  footer: PropTypes.node,
  pagination: PropTypes.node,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
};

VirtualizedItems.defaultProps = {
  classes: {},
  styles: {},
  items: [],
  loadMore: <div />,
  children: noop,
  header: null,
  footer: null,
  pagination: null,
  orientation: 'vertical',
  viewType: 'list',
};

export default VirtualizedItems;
