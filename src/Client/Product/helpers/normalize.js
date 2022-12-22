export function unwrapNode(model) {
  const keys = Object.keys(model);
  const unwrappedNode = keys.reduce((acc, cur) => {
    const value = model[cur];
    acc[cur] = value?.edges
      ? value.edges.map(({ node }) => unwrapNode(node))
      : value;

    return acc;
  }, {});

  return unwrappedNode;
}

export function normalizeProduct(product) {
  return unwrapNode(product);
}
