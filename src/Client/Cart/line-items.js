import { cartDetailsFragment } from './fragments';
import {
  createCartLineItemAddMutation,
  createCartLineItemRemoveMutation,
  createCartLineItemUpdateMutation,
} from './mutations';
import { normalizeCart } from './helpers';

class LineItems {
  constructor(Client) {
    this.Client = Client;
    this.send = this.Client.Request.send.bind(this.Client.Request);
    this.useFragment(cartDetailsFragment);
  }

  useFragment(fragment = cartDetailsFragment) {
    this.lineItemsAddMutation = createCartLineItemAddMutation(fragment);
    this.lineItemsRemoveMutation = createCartLineItemRemoveMutation(fragment);
    this.lineItemsUpdateMutation = createCartLineItemUpdateMutation(fragment);

    return this;
  }

  async add(cartId, lineItems = []) {
    const query = this.lineItemsAddMutation;
    const variables = { cartId, lineItems };
    const { cartLinesAdd } = await this.send({ query, variables });
    const normalizedCart = normalizeCart(cartLinesAdd);

    return normalizedCart;
  }

  async remove(cartId, lineItemIds = []) {
    const query = this.lineItemsRemoveMutation;
    const variables = { cartId, lineItemIds };
    const { cartLinesRemove } = await this.send({ query, variables });
    const normalizedCart = normalizeCart(cartLinesRemove);

    return normalizedCart;
  }

  async update(cartId, lineItems = []) {
    const query = this.lineItemsUpdateMutation;
    const variables = { cartId, lineItems };
    const { cartLinesUpdate } = await this.send({ query, variables });
    const normalizedCart = normalizeCart(cartLinesUpdate);

    return normalizedCart;
  }
}

export default LineItems;
