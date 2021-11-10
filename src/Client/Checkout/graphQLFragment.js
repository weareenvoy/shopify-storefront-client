export default `
fragment FragmentCheckoutFields on Checkout {
	id
	customAttributes {
		key
		value
	}
	lineItems(first: 250) {
		edges {
			node {
				id
				customAttributes {
					key
					value
				}
				quantity
				title
				variant {
					image {
						altText
						src
					}
					priceV2 {
						amount
						currencyCode
					}
					product {
						handle
						id
						productType
					}
					title
				}
			}
		}
	}
	note
	totalPriceV2 {
		amount
		currencyCode
	}
	webUrl
}
`;
