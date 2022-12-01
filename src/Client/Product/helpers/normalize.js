export function unwrapNode(model) {
  const keys = Object.keys(model);
  const node = keys.reduce((acc, cur) => {
    const value = model[cur];
    acc[cur] = value?.edges
      ? value.edges.map(({ node }) => unwrapNode(node))
      : value;

    return acc
  }, {});

  return node;
}

export function normalizeProduct(product) {
  return unwrapNode(product);
}
