import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './items.scss';
import VirtualizedItems from './VirtualizedItems';
import NormalItems from './NormalItems';
import { noop } from '../../../../utils';

const Items = ({
  items, loadMore, children, isVirtualized, header, footer, pagination, orientation, viewType,
  floatingLoader,
}) => (
  <div className={classNames('infinite-scroll-items-container', orientation, viewType)}>
    {
      isVirtualized
        ? (
          <VirtualizedItems
            items={items}
            header={header}
            footer={footer}
            loadMore={loadMore}
            pagination={pagination}
            orientation={orientation}
            viewType={viewType}
          >
            {children}
          </VirtualizedItems>
        )
        : (
          <NormalItems
            items={items}
            header={header}
            footer={footer}
            loadMore={loadMore}
            pagination={pagination}
            orientation={orientation}
            viewType={viewType}
            floatingLoader={floatingLoader}
          >
            {children}
          </NormalItems>
        )
    }
  </div>
);

Items.propTypes = {
  items: PropTypes.instanceOf(Array),
  loadMore: PropTypes.node,
  children: PropTypes.func,
  isVirtualized: PropTypes.bool,
  header: PropTypes.node,
  footer: PropTypes.node,
  pagination: PropTypes.node,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
  floatingLoader: PropTypes.bool,
};

Items.defaultProps = {
  items: [],
  loadMore: <div />,
  children: noop,
  isVirtualized: true,
  header: null,
  footer: null,
  pagination: null,
  orientation: 'vertical',
  viewType: 'list',
  floatingLoader: false,
};

export default Items;
