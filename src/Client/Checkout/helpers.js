function unwrapObjectFromNode(object) {
	return object.node;
}
function formatCheckoutResponse(checkout) {
	//	Un-nest edges[].node from lineItems
	if( checkout.lineItems ) {
		//	eslint-disable-next-line no-param-reassign
		checkout.lineItems = checkout.lineItems.edges.map(unwrapObjectFromNode);
	}

	return checkout;
}

export {
	formatCheckoutResponse,
	unwrapObjectFromNode
};
