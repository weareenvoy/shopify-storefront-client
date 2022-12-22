import { formatCheckoutResponse } from '../helpers';

class LineItems {
  constructor(checkout) {
    this.checkout = checkout;
    this.send = checkout.client.request.send.bind(checkout.client.request);
  }

  add(checkoutId, lineItems = []) {
    const query = `
      ${this.checkout.fragment}
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

    return this.send({ query, variables })
      .then((responseJson) => responseJson.checkoutLineItemsAdd.checkout)
      .then(formatCheckoutResponse);
  }

  remove(checkoutId, lineItemIds = []) {
    const query = `
      ${this.checkout.fragment}
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

    return this.send({ query, variables })
      .then((responseJson) => responseJson.checkoutLineItemsRemove.checkout)
      .then(formatCheckoutResponse);
  }

  replace(checkoutId, lineItems = []) {
    const query = `
      ${this.checkout.fragment}
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

    return this.send({ query, variables })
      .then((responseJson) => responseJson.checkoutLineItemsReplace.checkout)
      .then(formatCheckoutResponse);
  }

  update(checkoutId, lineItems = []) {
    const query = `
      ${this.checkout.fragment}
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

    return this.send({ query, variables })
      .then((responseJson) => responseJson.checkoutLineItemsUpdate.checkout)
      .then(formatCheckoutResponse);
  }

  clear(checkoutId) {
    const query = `
    {
      node(id: "${checkoutId}") {
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
    })
      .then((response) => {
        const lineItemIds = response.node.lineItems.edges.map(
          (edge) => edge.node.id
        );
        return lineItemIds;
      })
      .then((lineItemIds) => this.remove(checkoutId, lineItemIds));
  }
}

export default LineItems;
