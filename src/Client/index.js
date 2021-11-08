/* eslint-disable import/extensions */
import Checkout from './Checkout/index.js';
import Request from './Request/index.js';

class Client {
	#settings = {
		shop: {
			myshopify_domain: '',
		},
		api: {
			token: '',
			version: '2022-01',
		},
	};

	constructor(settings = {}) {
		this.#settings	=	settings;
		this.Request	=	new Request(this);
		this.Checkout	=	new Checkout(this);
	}

	static fromSettings(settings = {}) {
		return new Client(settings);
	}

	getSettings() {
		return this.#settings;
	}
}

export default Client;
