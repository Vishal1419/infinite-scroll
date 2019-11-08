export const noop = () => {};

export const getScrollParent = (node) => {
  if (node == null) return null;
  if (node.scrollHeight > node.clientHeight) return node;
  return getScrollParent(node.parentNode);
};

export const scrollToIndex = (element, items, index, orientation = 'horizontal') => {
  if (element) {
    const _element = element;
    const currentItem = items[index];

    if (orientation === 'horizontal') {
      const scrollLeft = index === 0
        ? 0
        : currentItem && currentItem.offsetLeft - element.offsetLeft;
      _element.scrollLeft = scrollLeft;
      return scrollLeft;
    }

    const scrollTop = index === 0
      ? 0
      : currentItem && currentItem.offsetTop - element.offsetTop;
    _element.scrollTop = scrollTop;
    return scrollTop;
  }
  return 0;
};

const getTotalValue = (list, element) => list
  .map((prop) => parseInt(window.getComputedStyle(element)[prop], 10))
  .reduce((prev, cur) => prev + +cur, 0);

export const getElementHeight = (element) => {
  const list = [
    'border-top-width', 'border-bottom-width',
    'margin-top', 'margin-bottom',
    'padding-top', 'padding-bottom',
    'height',
  ];
  return getTotalValue(list, element);
};

export const getElementWidth = (element) => {
  const list = [
    'border-left-width', 'border-right-width',
    'margin-left', 'margin-right',
    'padding-left', 'padding-right',
    'width',
  ];
  return getTotalValue(list, element);
};

export const getElementDimensions = (element) => {
  if (!element) {
    return {
      top: 0, bottom: 0, left: 0, right: 0, height: 0, width: 0,
    };
  }
  const top = element.scrollTop;
  const height = getElementHeight(element);
  const bottom = top + height;
  const left = element.scrollLeft;
  const width = getElementWidth(element);
  const right = left + width;
  const { offsetLeft, offsetTop } = element;
  return {
    top, bottom, left, right, height, width, offsetLeft, offsetTop,
  };
};

export const isInViewport = (viewportDimensions, element, orientation = 'horizontal', delta = 1) => {
  if (!element) return false;

  const {
    top, bottom, left, right, offsetLeft, offsetTop,
  } = viewportDimensions;

  const elementStart = orientation === 'horizontal' ? (element.offsetLeft - offsetLeft) : (element.offsetTop - offsetTop);
  const elementSize = orientation === 'horizontal' ? getElementWidth(element) : getElementHeight(element);
  const elementEnd = elementStart + elementSize;

  const deltaStart = Math.min(1, (elementEnd - (orientation === 'horizontal' ? left : top)) / elementSize);
  const deltaEnd = Math.min(1, ((orientation === 'horizontal' ? right : bottom) - elementStart) / elementSize);

  return deltaStart * deltaEnd >= delta;
};

let timerId;
export const debounce = (fn, delay) => { // eslint-disable-line
  return ((...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  })();
};

let wait = false; // Initially, we're not waiting
export const throttle = (fn, limit) => ((...args) => { // We return a throttled function
  if (!wait) { // If we're not waiting
    fn(...args); // Execute users function
    wait = true; // Prevent future invocations
    setTimeout(() => { // After a period of time
      wait = false; // And allow future invocations
    }, limit);
  }
})();
