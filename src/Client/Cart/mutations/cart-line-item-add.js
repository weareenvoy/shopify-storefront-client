import { cartFragment } from '../fragments';

function createCartLineItemAddMutation(fragment = cartFragment) {
  const query = `
    mutation cartLinesAdd(
      $cartId: ID!
      $lineItems: [CartLineInput!]!
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cartLinesAdd(cartId: $cartId, lines: $lineItems) {
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

export default createCartLineItemAddMutation;
