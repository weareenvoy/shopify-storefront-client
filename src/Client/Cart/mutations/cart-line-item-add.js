import { cartDetailsFragment } from '../fragments';

function createCartLineItemAddMutation(fragment = cartDetailsFragment) {
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
          ...cartDetails
        }
      }
    }

    ${fragment}
  `;

  return query;
}

export default createCartLineItemAddMutation;
