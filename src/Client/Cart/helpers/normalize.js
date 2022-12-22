export function normalizeLineItem(lineItem) {
	const { node } = lineItem;
	const { merchandise: variant, ...rest } = node;
	return { variant, ...rest };
}

export function normalizeCart(cart = {}) {
	const { lines, ...rest } = cart;
	return {
		...rest,
		checkoutId: cart?.checkoutUrl?.split('/').pop() || '',
		lineItems: lines?.edges.map(normalizeLineItem) || [],
	};
}
