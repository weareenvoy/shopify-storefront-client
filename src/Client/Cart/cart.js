import LineItems from './line-items';
import { cartFragment } from './fragments';
import { createGetCartQuery } from './queries';
import {
  createCartCreateMutation,
  createCartDiscountCodesUpdateMutation,
  createCartAttributesUpdateMutation,
} from './mutations';
import { unwrapCartPayload } from './helpers';

class Cart {
  constructor(client) {
    this.client = client;
    this.lineItems = new LineItems(client);

    // TODO: Deprecate: pascal case should be reserved for constructor functions that must be used with the 'new' prefix
    this.LineItems = this.lineItems;

    this.send = this.client.request.send.bind(this.client.request);
    this.useFragment(cartFragment);
  }

  useFragment(fragment = cartFragment) {
    this.getCartQuery = createGetCartQuery(fragment);
    this.cartCreateMutation = createCartCreateMutation(fragment);
    this.cartDiscountCodesUpdateMutation =
      createCartDiscountCodesUpdateMutation(fragment);
    this.cartAttributesUpdateMutation =
      createCartAttributesUpdateMutation(fragment);
    this.LineItems.useFragment(fragment);
    return this;
  }

  async create(vars = {}) {
    const query = this.cartCreateMutation;
    const variables = { ...vars };
    const { cartCreate } = await this.send({ query, variables });
    return unwrapCartPayload(cartCreate);
  }

  async fetch(cartId, vars = {}) {
    const query = this.getCartQuery;
    const variables = { cartId, ...vars };
    const { cart } = await this.send({ query, variables });
    return unwrapCartPayload({ cart });
  }

  async updateDiscountCodes(cartId, discountCodes, vars = {}) {
    const query = this.cartDiscountCodesUpdateMutation;
    const variables = { cartId, discountCodes, ...vars };
    const { cartDiscountCodesUpdate } = await this.send({ query, variables });
    return unwrapCartPayload(cartDiscountCodesUpdate);
  }

  async updateAttributes(cartId, attributes, vars = {}) {
    const query = cartAttributesUpdateMutation;
    const variables = { cartId, attributes, ...vars };
    const { cartAttributesUpdate } = await this.send({ query, variables });
    return unwrapCartPayload(cartAttributesUpdate);
  }
}

export default Cart;
