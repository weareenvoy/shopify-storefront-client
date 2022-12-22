# Shopify Storefront Client

## Initialize

```javascript
import Client from 'shopify-storefront-client';

const client = Client.fromSettings({
  shop: {
    myshopify_domain: 'yourshop.myshopify.com',
    language_code: 'EN',
    country_code: 'US',
  },
  api: {
    token: 'somethirtytwocharacterstringhere',
    version: '2022-01',
  },
});
```

## Checkout

```javascript
const checkoutId =
  'Z2lkOi8vc2hvcGlmeS9DaGVsome1dC81ZmQ5ZWI1OGNkMGZlMcheckoutDgxZDU4OWE3MGidZD9rZXk9NmRjMmhereExNzlhM2NiOWUyODI5MTVjM2U1MjYxNjc=';

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

const response = await client.checkout.lineItems.add(checkoutId, lineItems);
```

## Checkout Methods

> The arguments for these methods match the Shopify Storefront API documentation for the same mutations.\
> All `Client.Checkout.*` methods return a Shopify `Checkout` object.

```javascript
const response = await client.checkout.create();
const response = await client.checkout.fetch(checkout_id);
const response = await client.checkout.lineItems.add(checkoutId, lineItems);
const response = await client.checkout.lineItems.remove(checkoutId, lineItemIds);
const response = await client.checkout.lineItems.replace(checkoutId, lineItems);
const response = await client.checkout.lineItems.update(checkoutId, lineItems);
const response = await client.checkout.lineItems.clear(checkoutId);
```

## Cart

```javascript
const cartId = 'gid://shopify/Cart/e4638abd66c6f7bc2c3be0ece4f2d494'

const lineItems = [
  {
    merchandiseId: 'gid://shopify/ProductVariant/40813123456789',
    quantity: 2,
  },
  {
    merchandiseId: 'gid://shopify/ProductVariant/12345678990721',
    quantity: 3,
    attributes: [
      {
        key: 'enscription',
        value: 'A nice thing to say.',
      },
    ],
  },
  {
    merchandiseId: 'gid://shopify/ProductVariant/12345678949409',
    quantity: 4,
    sellingPlanId: 'gid://shopify/SellingPlan/00000000'
    attributes: [
      {
        key: 'personalized_message',
        value: 'Wow great t-shirt!',
      },
    ],
  },
];

const response = await client.cart.lineItems.add(cartId, lineItems);
```

## Cart Methods

```javascript
const response = await client.cart.create();
const response = await client.cart.fetch(cartId);
const response = await client.cart.lineItems.add(cartId, lineItems);
const response = await client.cart.lineItems.remove(cartId, lineItemIds);
const response = await client.cart.lineItems.update(cartId, lineItems);
```

## Override the fields queried for

### Example 1

```javascript
client.checkout.useFragment(`
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

```javascript
client.checkout.useFragment(`
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
