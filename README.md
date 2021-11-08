# Initialize
```
import Client from 'shopify-storefront-client';

const client = Client.fromSettings({
	shop: {
		myshopify_domain: 'yourshop.myshopify.com'
	},
	api: {
		token: 'somethirtytwocharacterstringhere',
		version: '2022-01'
	}
});
```
# Checkout
```
const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVsome1dC81ZmQ5ZWI1OGNkMGZlMcheckoutDgxZDU4OWE3MGidZD9rZXk9NmRjMmhereExNzlhM2NiOWUyODI5MTVjM2U1MjYxNjc=';

const lineItems = [
	{
		variantId: 'gid://shopify/ProductVariant/40813123456789',
		quantity: 2,
	},
	{
		variantId: 'gid://shopify/ProductVariant/12345678990721',
		quantity: 3,
		customAttributes: [
			{
				key: 'enscription',
				value: 'A nice thing to say.',
			},
		],
	},
	{
		variantId: 'gid://shopify/ProductVariant/12345678949409',
		quantity: 4,
		customAttributes: [
			{
				key: 'personalized_message',
				value: 'Wow great t-shirt!',
			},
		],
	},
];

const response = await client.Checkout.LineItems.add(checkoutId, lineItems);
```
# Checkout Methods

>   The arguments for these methods match the Shopify Storefront API documentation for the same mutations.\
>   All `Client.Checkout.*` methods return a Shopify `Checkout` object.

```
const response = await client.Checkout.create(;
const response = await client.Checkout.fetch(checkout_id);
const response = await client.Checkout.LineItems.add(checkoutId, lineItems);
const response = await client.Checkout.LineItems.remove(checkoutId, lineItemIds);
const response = await client.Checkout.LineItems.replace(checkoutId, lineItems);
const response = await client.Checkout.LineItems.update(checkoutId, lineItems);
const response = await client.Checkout.LineItems.clear(checkoutId);
```
# Override the fields queried for

### Example 1
```
client.Checkout.useFragment(`
fragment FragmentCheckoutFields on Checkout {
	id
	totalPriceV2 {
		amount
		currencyCode
	}
}
`);
```
### Example 2
```
client.Checkout.useFragment(`
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
				title
				quantity
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
}
`);
```