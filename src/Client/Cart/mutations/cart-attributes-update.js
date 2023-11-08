import { cartFragment } from '../fragments';

function createCartAttributesUpdateMutation(fragment = cartFragment) {
  const query = `
    mutation cartAttributesUpdate(
      $attributes: [AttributeInput!]!
      $cartId: ID!
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
        userErrors {
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

export default createCartAttributesUpdateMutation;
