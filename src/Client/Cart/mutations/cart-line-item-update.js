import { cartFragment } from '../fragments';

function createCartLineItemUpdateMutation(fragment = cartFragment) {
  const query = `
    mutation cartLinesUpdate(
      $cartId: ID!
      $lineItems: [CartLineUpdateInput!]!
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cartLinesUpdate(cartId: $cartId, lines: $lineItems) {
        userErrors {
          code
          field
          message
        }
        cart {
          ...CartFragment
        }
      }
    }

    ${fragment}
  `;

  return query;
}

export default createCartLineItemUpdateMutation;
