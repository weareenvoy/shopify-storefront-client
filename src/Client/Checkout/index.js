/* eslint-disable import/extensions */
import {
  formatCheckoutResponse,
  unwrapObjectFromNode,
} from './helpers.js';
import LineItems from './LineItems/index.js';
import FragmentCheckoutFields from './graphQLFragment.js';

class Checkout {
  constructor(Client) {
    this.Client = Client;
    this.send = this.Client.Request.send.bind(this.Client.Request);
    this.LineItems = new LineItems(this);
    this.fragment = FragmentCheckoutFields;
  }

  useFragment(fragment = this.fragment) {
    this.fragment = fragment;
    return this;
  }

  create() {
    const query = `
      ${this.fragment}
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            ... FragmentCheckoutFields
          }
          checkoutUserErrors {
            code
            field
            message
          }
          queueToken
        }
      }
    `.trim();

    const variables = {
      input: {},
    };
    return this.send({ query, variables })
      .then((responseJson) => responseJson.checkoutCreate.checkout)
      .then(formatCheckoutResponse);
  }

  fetch(checkoutId) {
    const query = `
      ${this.fragment}
      {
        node(id: "${checkoutId}") {
          ... FragmentCheckoutFields
        }
      }
    `.trim();

    const variables = null;

    return this.send({ query, variables })
      .then(unwrapObjectFromNode)
      .then(formatCheckoutResponse);
  }
}

export default Checkout;
