import React from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from '../shared/InfiniteScroll/InfiniteScrollContainer';

const noop = () => {};

const InfiniteScrollExample = ({
  getItems, flushItems, items,
  pageNo, pageSize, total, loading, setPageSize,
}) => (
  <>
    <InfiniteScroll
      getItems={getItems}
      flushItems={flushItems}
      items={items}
      pageNo={pageNo}
      pageSize={pageSize}
      total={total}
      loading={loading}
      noData="No Data to show"
      didMount={() => {
        console.log('inside settimeout');
      }}
      blocker="ball-clip-rotate"
      loader="ball-clip-rotate"
      showBlocker
      loadMoreContent="Load More Data"
    >
      {
        (item) => (
          <div data-key={item} className="abc" style={{ padding: '20px 100px', border: '1px solid #ddd', margin: 0 }}>{item}</div>
        )
      }
    </InfiniteScroll>
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
      }}
    >
      <button type="button" onClick={() => setPageSize(2)}>2</button>
      <button type="button" onClick={() => setPageSize(5)}>5</button>
      <button type="button" onClick={() => setPageSize(10)}>10</button>
    </div>
  </>
);

InfiniteScrollExample.propTypes = {
  getItems: PropTypes.func,
  flushItems: PropTypes.func,
  items: PropTypes.instanceOf(Array),
  pageNo: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  setPageSize: PropTypes.func,
};

InfiniteScrollExample.defaultProps = {
  getItems: noop,
  flushItems: noop,
  items: [],
  pageNo: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  setPageSize: noop,
};

export default InfiniteScrollExample;
