import fetch from 'isomorphic-fetch';

export default class {
	constructor(Client) {
		this.Client = Client;
		this.headers	=	this.getRequestHeaders();
		this.endpoint	=	this.getRequestEndpoint();
	}

	getRequestHeaders() {
		return {
			Accept:	'application/json',
			'Content-Type':	'application/json',
			'X-Shopify-Storefront-Access-Token':	this.Client.getSettings().api.token,
		};
	}

	getRequestEndpoint() {
		const settings = this.Client.getSettings();
		return `https://${ settings.shop.myshopify_domain }/api/${ settings.api.version }/graphql.json`;
	}

	send({query, variables}) {
		return fetch(this.endpoint, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({query, variables}),
		})
			.then(response => { return response.json(); })
			.then(({data, extensions, errors}) => {
				if (errors) {
					console.error(errors);
					throw new Error('🚨 Shopify GraphQL response reported an error. Check the console.');
				}
				return data;
			});
	}
}
