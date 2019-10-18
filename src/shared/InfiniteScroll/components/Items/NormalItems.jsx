import React from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../../../utils';

const NormalItems = ({
  items, children, loadMore, footer,
}) => (
  <>
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
    {footer && <div className="footer">{footer}</div>}
    {loadMore}
  </>
);

NormalItems.propTypes = {
  items: PropTypes.instanceOf(Array),
  children: PropTypes.func,
  loadMore: PropTypes.node,
  footer: PropTypes.node,
};

NormalItems.defaultProps = {
  items: [],
  children: noop,
  loadMore: <div />,
  footer: null,
};

export default NormalItems;