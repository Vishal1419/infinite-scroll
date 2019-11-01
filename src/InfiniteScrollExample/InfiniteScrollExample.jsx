import React from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from '../shared/InfiniteScroll/InfiniteScrollContainer';

const noop = () => {};

const InfiniteScrollExample = ({
  getItems, flushItems, items,
  pageNo, pageSize, total, loading, setPageSize, isPaginated,
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
      showBlocker
      loadMoreContent="Load More Data"
      // isVirtualized={false}
      header={(
        <div>
          <button type="button" onClick={() => setPageSize(2)}>2</button>
          <button type="button" onClick={() => setPageSize(5)}>5</button>
          <button type="button" onClick={() => setPageSize(10)}>10</button>
        </div>
      )}
      footer={`total ${total}`}
      isPaginated={isPaginated}
      orientation="horizontal"
      // viewType="grid"
      // disableSensor
      floatingLoader
    >
      {
        (item) => (
          <div data-key={item} className="abc" style={{ padding: '20px 100px', border: '1px solid #ddd', margin: 0 }}>{item}</div>
        )
      }
    </InfiniteScroll>
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
  isPaginated: PropTypes.bool,
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
  isPaginated: false,
};

export default InfiniteScrollExample;
