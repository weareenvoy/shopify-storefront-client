import { cartFragment } from '../fragments';

function createLineItemRemoveMutation(fragment = cartFragment) {
  const query = `
    mutation cartLinesRemove(
      $cartId: ID!
      $lineItemIds: [ID!]!
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineItemIds) {
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

export default createLineItemRemoveMutation;
