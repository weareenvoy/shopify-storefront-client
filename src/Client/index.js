/* eslint-disable import/extensions */
import Checkout from './Checkout/index.js';
import Request from './Request/index.js';
import Cart from './Cart/index.js';

class Client {
	#settings = {
		shop: {
			myshopify_domain: '',
		},
		api: {
			token: '',
			version: '2023-01',
		},
	};

	constructor(settings = {}) {
		this.#settings	=	settings;
		this.Request	=	new Request(this);
		this.Checkout	=	new Checkout(this);
		this.Cart = new Cart(this);
	}

	static fromSettings(settings = {}) {
		return new Client(settings);
	}

	getSettings() {
		return this.#settings;
	}
}

export default Client;
