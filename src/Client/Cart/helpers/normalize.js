export function normalizeLineItem(lineItem) {
	const { node } = lineItem;
	const { merchandise: variant, ...rest } = node;
	return { variant, merchandise: variant, ...rest };
}

export function normalizeCart(cart) {
	const { lines, ...rest } = cart;
	return {
		...rest,
		checkoutId: cart?.checkoutUrl?.split('/').pop() || '',
		lines: lines?.edges.map(normalizeLineItem) || [],
		lineItems: lines?.edges.map(normalizeLineItem) || [],
	};
}
