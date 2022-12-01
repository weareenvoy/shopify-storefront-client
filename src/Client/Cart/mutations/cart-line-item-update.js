import { cartDetailsFragment } from '../fragments';

function createCartLineItemUpdateMutation(fragment = cartDetailsFragment) {
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
          ...cartDetails
        }
      }
    }

    ${fragment}
  `;

  return query;
}

export default createCartLineItemUpdateMutation;
