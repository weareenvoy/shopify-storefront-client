import LineItems from './line-items';
import { cartDetailsFragment } from './fragments';
import { createGetCartQuery } from './queries';
import {
	createCartCreateMutation,
	createCartDiscountCodesUpdateMutation,
} from './mutations';
import { normalizeCart } from './helpers';

class Cart {
	constructor(Client) {
		this.Client = Client;
		this.LineItems = new LineItems(Client);
		this.send = this.Client.Request.send.bind(this.Client.Request);
		this.useFragment(cartDetailsFragment);
	}

	useFragment(fragment = cartDetailsFragment) {
		this.getCartQuery = createGetCartQuery(fragment);
		this.cartCreateMutation = createCartCreateMutation(fragment);
		this.cartDiscountCodesUpdateMutation =
			createCartDiscountCodesUpdateMutation(fragment);
		this.LineItems.useFragment(fragment);

		return this;
	}

	async create() {
		const query = this.cartCreateMutation;
		const variables = {};
		const res = await this.send({ query, variables })
		const { cartCreate } = await this.send({ query, variables });
		const normalizedCart = normalizeCart(cartCreate);

		return normalizedCart;
	}

	async fetch(cartId) {
		const query = this.getCartQuery;
		const variables = { cartId };
		const { cart } = await this.send({ query, variables });
		const normalizedCart = normalizeCart(cart);

		return normalizedCart;
	}

	async updateDiscountCodes(cartId, discountCodes) {
		const query = this.cartDiscountCodesUpdateMutation;
		const variables = { cartId, discountCodes };
		const { cartDiscountCodesUpdate } = await this.send({ query, variables });
		const normalizedCart = normalizeCart(cartDiscountCodesUpdate);

		return normalizedCart;
	}
}

export default Cart;
