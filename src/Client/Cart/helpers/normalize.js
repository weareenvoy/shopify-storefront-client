export function normalizeLineItem(lineItem) {
	const { node } = lineItem;
	const { merchandise: variant, ...rest } = node;
	return { variant, ...rest };
}

export function normalizeCart({ cart }) {
	return {
		...cart,
		checkoutId: cart.checkoutUrl.split('/').pop(),
		lineItems: cart.lines?.edges.map(normalizeLineItem),
	};
}
