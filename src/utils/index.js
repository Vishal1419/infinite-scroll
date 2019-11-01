export const noop = () => {};

export const getScrollParent = (node) => {
  if (node == null) return null;
  if (node.scrollHeight > node.clientHeight) return node;
  return getScrollParent(node.parentNode);
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
