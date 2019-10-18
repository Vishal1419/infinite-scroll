export const noop = () => {};

export const getScrollParent = (node) => {
  if (node == null) return null;
  if (node.scrollHeight > node.clientHeight) return node;
  return getScrollParent(node.parentNode);
};
