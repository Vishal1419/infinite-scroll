import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop, getElementHeight } from '../../../../utils';

const NormalItems = ({
  items, children, loadMore, footer, pagination, orientation, viewType,
}) => {
  const footerRef = useRef(null);
  return (
    <>
      <div
        className={classNames('infinite-scroll-items-wrapper', orientation, viewType)}
        style={{
          height: orientation === 'horizontal'
            ? `calc(100% - ${(footerRef && footerRef.current && getElementHeight(footerRef.current)) || 0}px)`
            : 'unset',
        }}
      >
        <div className={classNames('infinite-scroll-items', orientation, viewType)}>
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
        </div>
        {orientation === 'horizontal' && loadMore}
      </div>
      {footer && <div ref={footerRef} className="footer">{footer}</div>}
      {orientation === 'vertical' && loadMore}
      {pagination}
    </>
  );
};

NormalItems.propTypes = {
  items: PropTypes.instanceOf(Array),
  children: PropTypes.func,
  loadMore: PropTypes.node,
  footer: PropTypes.node,
  pagination: PropTypes.node,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
};

NormalItems.defaultProps = {
  items: [],
  children: noop,
  loadMore: <div />,
  footer: null,
  pagination: null,
  orientation: 'vertical',
  viewType: 'list',
};

export default NormalItems;
