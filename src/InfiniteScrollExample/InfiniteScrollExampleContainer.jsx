import React, { Component } from 'react';

import InfiniteScrollExample from './InfiniteScrollExample';

const isPaginated = false;

class InfiniteScrollExampleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loading: false,
    };
    this.items = new Array(100).fill().map((_, i) => i);
    this.getItems = this.getItems.bind(this);
    this.flushItems = this.flushItems.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  getItems(nextPageNo, pageSize) { // eslint-disable-line
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState(({ items }) => ({
        items: isPaginated
          ? [
            ...this.items.slice(
              (nextPageNo - 1) * pageSize,
              ((nextPageNo - 1) * pageSize) + pageSize,
            ),
          ]
          : [
            ...items,
            ...this.items.slice(
              (nextPageNo - 1) * pageSize,
              ((nextPageNo - 1) * pageSize) + pageSize,
            ),
          ],
        loading: false,
        pageNo: nextPageNo,
        total: this.items.length,
      }));
    }, 1000);
  }

  setPageSize(pageSize) {
    this.setState({
      pageSize,
    });
  }

  flushItems() {
    this.setState({
      items: [],
      pageNo: 1,
      total: 0,
      // loading: false,
    });
  }

  render() {
    const { getItems, flushItems, setPageSize } = this;
    const {
      items, pageNo, pageSize, total, loading,
    } = this.state;
    return (
      <InfiniteScrollExample
        getItems={getItems}
        flushItems={flushItems}
        items={items}
        pageNo={pageNo}
        pageSize={pageSize}
        total={total}
        loading={loading}
        setPageSize={setPageSize}
        isPaginated={isPaginated}
      />
    );
  }
}

export default InfiniteScrollExampleContainer;
