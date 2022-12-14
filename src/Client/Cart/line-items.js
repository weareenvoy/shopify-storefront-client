import { cartFragment } from './fragments';
import {
  createCartLineItemAddMutation,
  createCartLineItemRemoveMutation,
  createCartLineItemUpdateMutation,
} from './mutations';
import { unwrapCartPayload } from './helpers';

class LineItems {
  constructor(client) {
    this.client = client;
    this.send = this.client.request.send.bind(this.client.request);
    this.useFragment(cartFragment);
  }

  useFragment(fragment = cartFragment) {
    this.lineItemsAddMutation = createCartLineItemAddMutation(fragment);
    this.lineItemsRemoveMutation = createCartLineItemRemoveMutation(fragment);
    this.lineItemsUpdateMutation = createCartLineItemUpdateMutation(fragment);
    return this;
  }

  async add(cartId, lineItems = [], vars = {}) {
    const query = this.lineItemsAddMutation;
    const variables = { cartId, lineItems, ...vars };
    const { cartLinesAdd } = await this.send({ query, variables });
    return unwrapCartPayload(cartLinesAdd);
  }

  async remove(cartId, lineItemIds = [], vars = {}) {
    const query = this.lineItemsRemoveMutation;
    const variables = { cartId, lineItemIds, ...vars };
    const { cartLinesRemove } = await this.send({ query, variables });
    return unwrapCartPayload(cartLinesRemove);
  }

  async update(cartId, lineItems = [], vars = {}) {
    const query = this.lineItemsUpdateMutation;
    const variables = { cartId, lineItems, ...vars };
    const { cartLinesUpdate } = await this.send({ query, variables });
    return unwrapCartPayload(cartLinesUpdate);
  }
}

export default LineItems;
