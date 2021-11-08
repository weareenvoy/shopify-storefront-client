/* eslint-disable import/extensions */
import {
	formatCheckoutResponse,
	unwrapObjectFromNode
} from '../helpers.js';

class LineItems {
	constructor(Checkout) {
		this.Checkout = Checkout;
		this.send = Checkout.Client.Request.send.bind(Checkout.Client.Request);
	}

	add(checkoutId, lineItems = []) {
		const query = `
			${ this.Checkout.fragment }
			mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
				checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
					checkout {
						... FragmentCheckoutFields
					}
					checkoutUserErrors {
						code
						field
						message
					}
				}
			}
		`.trim();

		const variables = {
			checkoutId,
			lineItems,
		};

		return this.send({query, variables})
			.then(responseJson => { return responseJson.checkoutLineItemsAdd.checkout; })
			.then(formatCheckoutResponse);
	}

	remove(checkoutId, lineItemIds = []) {
		const query = `
			${ this.Checkout.fragment }
			mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
				checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
					checkout {
						... FragmentCheckoutFields
					}
					checkoutUserErrors {
						code
						field
						message
					}
				}
			}
		`.trim();

		const variables = {
			checkoutId,
			lineItemIds,
		};

		return this.send({query, variables})
			.then(responseJson => { return responseJson.checkoutLineItemsRemove.checkout; })
			.then(formatCheckoutResponse);
	}

	replace(checkoutId, lineItems = []) {
		const query = `
			${ this.Checkout.fragment }
			mutation checkoutLineItemsReplace($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
				checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
					checkout {
						... FragmentCheckoutFields
					}
					userErrors {
						code
						field
						message
					}
				}
			}
		`.trim();

		const variables = {
			checkoutId,
			lineItems,
		};

		return this.send({query, variables})
			.then(responseJson => { return responseJson.checkoutLineItemsReplace.checkout; })
			.then(formatCheckoutResponse);
	}

	update(checkoutId, lineItems = []) {
		const query = `
			${ this.Checkout.fragment }
			mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
				checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
					checkout {
						... FragmentCheckoutFields
					}
					checkoutUserErrors {
						code
						field
						message
					}
				}
			}
		`.trim();

		const variables = {
			checkoutId,
			lineItems,
		};

		return this.send({query, variables})
			.then(responseJson => { return responseJson.checkoutLineItemsUpdate.checkout; })
			.then(formatCheckoutResponse);
	}

	clear(checkoutId) {
		const query = `
		{
			node(id: "${ checkoutId }") {
				... on Checkout {
					lineItems(first: 250) {
						edges {
							node {
								id
							}
						}
					}
				}
			}
		}
		`.trim();
		const variables = null;

		return this.send({
			query,
			variables,
		}).then(response => {
			const lineItemIds = response.node.lineItems.edges.map(edge => { return edge.node.id; });
			return lineItemIds;
		}).then(lineItemIds => {
			return this.remove(checkoutId, lineItemIds);
		});
	}
}

export default LineItems;
