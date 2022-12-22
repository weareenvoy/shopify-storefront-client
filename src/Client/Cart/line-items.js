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

	async add(cartId, lineItems = [], vars) {
		const query = this.lineItemsAddMutation;
		const variables = { cartId, lineItems, ...vars };
		const { cartLinesAdd } = await this.send({ query, variables });
		const { userErrors } = cartLinesAdd;

		if (userErrors && userErrors.length) {
			throw new Error(userErrors[0].message);
		}

		const normalizedCart = normalizeCart(cartLinesAdd.cart);

		return normalizedCart;
	}

	async remove(cartId, lineItemIds = [], vars) {
		const query = this.lineItemsRemoveMutation;
		const variables = { cartId, lineItemIds, ...vars };
		const { cartLinesRemove } = await this.send({ query, variables });
		const { userErrors } = cartLinesRemove;

		if (userErrors && userErrors.length) {
			throw new Error(userErrors[0].message);
		}

		const normalizedCart = normalizeCart(cartLinesRemove.cart);

		return normalizedCart;
	}

	async update(cartId, lineItems = [], vars) {
		const query = this.lineItemsUpdateMutation;
		const variables = { cartId, lineItems, ...vars };
		const { cartLinesUpdate } = await this.send({ query, variables });
		const { userErrors } = cartLinesUpdate;

		if (userErrors && userErrors.length) {
			throw new Error(userErrors[0].message);
		}

		const normalizedCart = normalizeCart(cartLinesUpdate.cart);

		return normalizedCart;
	}
}

export default LineItems;
