import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop, getElementHeight } from '../../../../../utils';

const NormalItems = ({
  items, children, loadMore, header, footer, pagination, orientation, viewType, floatingLoader,
  visibleItemsIndices, itemStyle, showPartiallyVisibleItem,
}) => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const [, forceUpdate] = useState(null);
  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <>
      {header && <div ref={headerRef} id="infinite-scroll-header" className="header">{header}</div>}
      <div
        className={classNames('infinite-scroll-items-wrapper', orientation, viewType)}
        style={{
          height: orientation === 'horizontal'
            ? `calc(100% - (${((headerRef && headerRef.current && getElementHeight(headerRef.current)) || 0) + ((footerRef && footerRef.current && getElementHeight(footerRef.current)) || 0)}px))`
            : 'unset',
        }}
      >
        <div className={classNames('infinite-scroll-items', orientation, viewType)}>
          {
            items.map((item, index) => {
              const isItemInViewport = visibleItemsIndices.includes(index);
              const _itemStyle = showPartiallyVisibleItem
                ? {}
                : {
                  [orientation === 'horizontal' ? 'marginLeft' : 'marginTop']: (
                    isItemInViewport && index !== visibleItemsIndices[0] && itemStyle.margin
                  ) || 0,
                  [orientation === 'horizontal' ? 'marginRight' : 'marginBottom']: (
                    isItemInViewport
                    && index !== visibleItemsIndices[visibleItemsIndices.length - 1]
                    && itemStyle.margin
                  ) || 0,
                };
              return (
                <div
                  key={children(item).props['data-key'] || index}
                  className="infinite-scroll-item"
                  style={_itemStyle}
                >
                  {children(item, index)}
                </div>
              );
            })
          }
          {floatingLoader && viewType === 'grid' && loadMore}
        </div>
        {!(floatingLoader && viewType === 'grid') && orientation === 'horizontal' && loadMore}
      </div>
      {footer && <div ref={footerRef} className="footer">{footer}</div>}
      {!(floatingLoader && viewType === 'grid') && orientation === 'vertical' && loadMore}
      {pagination}
    </>
  );
};

NormalItems.propTypes = {
  items: PropTypes.instanceOf(Array),
  children: PropTypes.func,
  loadMore: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  pagination: PropTypes.node,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  viewType: PropTypes.oneOf(['list', 'grid']),
  floatingLoader: PropTypes.bool,
  visibleItemsIndices: PropTypes.instanceOf(Array),
  itemStyle: PropTypes.instanceOf(Object),
  showPartiallyVisibleItem: PropTypes.bool,
};

NormalItems.defaultProps = {
  items: [],
  children: noop,
  loadMore: <div />,
  header: null,
  footer: null,
  pagination: null,
  orientation: 'vertical',
  viewType: 'list',
  floatingLoader: false,
  visibleItemsIndices: [],
  itemStyle: {},
  showPartiallyVisibleItem: false,
};

export default NormalItems;
