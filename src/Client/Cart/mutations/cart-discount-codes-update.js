import { cartFragment } from '../fragments';

function createCartDiscountCodesUpdate(fragment = cartFragment) {
  const query = `
    mutation cartDiscountCodesUpdate(
      $cartId: ID!
      $discountCodes: [String!]
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
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

export default createCartDiscountCodesUpdate;
