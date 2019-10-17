import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  List, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';
import 'react-virtualized/styles.css';

import { noop } from '../../../../utils';

let cache;

const VirtualizedItems = ({
  items,
  loadMore,
  children,
}) => {
  useEffect(() => {
    cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
    return () => {
      cache = null;
    };
  }, []);

  return (
    <WindowScroller
      scrollElement={window}
    >
      {
        ({
          height, isScrolling, registerChild, onChildScroll, scrollTop,
        }) => (
          <AutoSizer disableHeight>
            {
              ({ width }) => (
                <div ref={registerChild} style={{ width }}>
                  {console.log(scrollTop)}
                  <List
                    width={width}
                    height={height}
                    autoHeight
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
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
                          className="infinite-scroll-item"
                          style={style}
                        >
                          {children(items[index], index)}
                        </div>
                      </CellMeasurer>
                    )}
                  />
                  {loadMore}
                </div>
              )
            }
          </AutoSizer>
        )
      }
    </WindowScroller>
  );
};

VirtualizedItems.propTypes = {
  items: PropTypes.instanceOf(Array),
  loadMore: PropTypes.node,
  children: PropTypes.func,
};

VirtualizedItems.defaultProps = {
  items: [],
  loadMore: <div />,
  children: noop,
};

export default VirtualizedItems;
