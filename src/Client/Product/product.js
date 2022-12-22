import { productFragment } from './fragments';
import { createGetProductQuery } from './queries';
import { normalizeProduct } from './helpers';

class Product {
  constructor(client) {
    this.client = client;
    this.send = this.client.request.send.bind(this.client.request);
    this.useFragment(productFragment);
  }

  useFragment(fragment = productFragment) {
    this.getProductQuery = createGetProductQuery(fragment);
    return this;
  }

  async fetch(productId, vars) {
    const query = this.getProductQuery;
    const variables = { productId, ...vars };
    const { product } = await this.send({ query, variables });
    return normalizeProduct(product);
  }
}

export default Product;
