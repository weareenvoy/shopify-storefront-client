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

	async create(vars) {
		const query = this.cartCreateMutation;
		const variables = { ...vars };
		const { cartCreate } = await this.send({ query, variables });
		const normalizedCart = normalizeCart(cartCreate.cart);

		return normalizedCart;
	}

	async fetch(cartId, vars) {
		const query = this.getCartQuery;
		const variables = { cartId, ...vars };
		const { cart } = await this.send({ query, variables });
		const normalizedCart = normalizeCart(cart);

		return normalizedCart;
	}

	async updateDiscountCodes(cartId, discountCodes, vars) {
		const query = this.cartDiscountCodesUpdateMutation;
		const variables = { cartId, discountCodes, ...vars };
		const { cartDiscountCodesUpdate } = await this.send({ query, variables });
		const normalizedCart = normalizeCart(cartDiscountCodesUpdate.cart);

		return normalizedCart;
	}
}

export default Cart;
