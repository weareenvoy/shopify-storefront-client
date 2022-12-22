import { cartFragment } from '../fragments';

function createGetCartQuery(fragment = cartFragment) {
  const query = `
    query getCart(
      $cartId: ID!
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${fragment}
  `;

  return query;
}

export default createGetCartQuery;
