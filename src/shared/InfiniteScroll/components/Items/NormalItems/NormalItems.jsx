import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { noop, getElementHeight } from '../../../../../utils';

const NormalItems = ({
  classes, styles, items, children, loadMore, header, footer, pagination, orientation, viewType, floatingLoader,
  visibleItemsIndices, itemStyle, showPartiallyVisibleItem,
}) => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const paginationRef = useRef(null);

  const [, forceUpdate] = useState(null);
  useEffect(() => {
    forceUpdate();
  }, []);

  let headerHeight = 0;
  let footerHeight = 0;
  let paginationHeight = 0;

  if (orientation === 'horizontal') {
    headerHeight = (headerRef && headerRef.current && getElementHeight(headerRef.current)) || 0;
    footerHeight = (footerRef && footerRef.current && getElementHeight(footerRef.current)) || 0;
    paginationHeight = (paginationRef && paginationRef.current && getElementHeight(paginationRef.current)) || 0;
  }

  return (
    <>
      {
        header && (
          <div
            ref={headerRef}
            className={classNames('IS-header-container', classes.headerContainer)}
            style={styles.headerContainer}
          >
            {header}
          </div>
        )
      }
      <div
        className={classNames(
          'IS-items-container', classes.itemsContainer,
          `IS-INTERNAL-${orientation}`, `IS-INTERNAL-${viewType}`,
        )}
        style={{
          ...(styles.itemsContainer),
          height: orientation === 'horizontal'
            ? `calc(100% - (${headerHeight + footerHeight + paginationHeight}px))`
            : 'unset',
        }}
      >
        <div
          className={classNames(
            'IS-items', classes.items,
            `IS-INTERNAL-${orientation}`, `IS-INTERNAL-${viewType}`,
          )}
          style={styles.items}
        >
          {
            items.map((item, index) => {
              const isItemInViewport = visibleItemsIndices.includes(index);
              const _itemContainerStyle = showPartiallyVisibleItem
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
                  className={classNames('IS-item-container', classes.itemContainer)}
                  style={{ ...(styles.itemContainer), ..._itemContainerStyle }}
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
      {
        footer && (
          <div
            ref={footerRef}
            className={classNames('IS-footer-container', classes.footerContainer)}
            style={styles.footerContainer}
          >
            {footer}
          </div>
        )
      }
      {!(floatingLoader && viewType === 'grid') && orientation === 'vertical' && loadMore}
      {pagination && React.cloneElement(pagination, { containerRef: paginationRef })}
    </>
  );
};

NormalItems.propTypes = {
  classes: PropTypes.instanceOf(Object),
  styles: PropTypes.instanceOf(Object),
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
  classes: {},
  styles: {},
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
