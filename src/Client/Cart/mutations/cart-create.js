import { cartDetailsFragment } from '../fragments';

function createCartCreateMutation(fragment = cartDetailsFragment) {
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
          ...cartDetails
        }
      }
    }

    ${fragment}
  `;

  return query;
}

export default createCartCreateMutation;
