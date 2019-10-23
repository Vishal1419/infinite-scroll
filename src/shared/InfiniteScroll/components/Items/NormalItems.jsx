import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop } from '../../../../utils';

const NormalItems = ({
  items, children, loadMore, footer, pagination, orientation,
}) => (
  <>
    <div className={classNames('infinite-scroll-items', orientation)}>
      {
        items.map((item, index) => (
          <div
            key={children(item).props['data-key'] || index}
            className="infinite-scroll-item"
          >
            {children(item, index)}
          </div>
        ))
      }
      {orientation === 'horizontal' && loadMore}
    </div>
    {footer && <div className="footer">{footer}</div>}
    {orientation === 'vertical' && loadMore}
    {pagination}
  </>
);

NormalItems.propTypes = {
  items: PropTypes.instanceOf(Array),
  children: PropTypes.func,
  loadMore: PropTypes.node,
  footer: PropTypes.node,
  pagination: PropTypes.node,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

NormalItems.defaultProps = {
  items: [],
  children: noop,
  loadMore: <div />,
  footer: null,
  pagination: null,
  orientation: 'vertical',
};

export default NormalItems;
