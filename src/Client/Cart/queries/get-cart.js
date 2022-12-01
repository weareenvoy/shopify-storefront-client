import { cartDetailsFragment } from '../fragments';

function createGetCartQuery(fragment = cartDetailsFragment) {
  const query = `
    query getCart(
      $cartId: ID!
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      cart(id: $cartId) {
        ...cartDetails
      }
    }
    ${fragment}
  `;

  return query;
}

export default createGetCartQuery;
