import { productFragment } from '../fragments';

function createGetProductQuery(fragment = productFragment) {
  const query = /* GraphQL */ `
    query getProduct(
      $productId: ID
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      product(id: $productId) {
        ...ProductFragment
      }
    }

    ${productFragment}
  `;

  return query;
}

export default createGetProductQuery;
