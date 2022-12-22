import { cartFragment } from '../fragments';

function createCartCreateMutation(fragment = cartFragment) {
  const query = `
    mutation cartCreate(
      $input: CartInput = {}
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cartCreate(input: $input) {
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

export default createCartCreateMutation;
