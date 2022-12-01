import { cartDetailsFragment } from '../fragments';

function createLineItemRemoveMutation(fragment = cartDetailsFragment) {
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
          ...cartDetails
        }
      }
    }

    ${fragment}
  `;

  return query;
}

export default createLineItemRemoveMutation;
