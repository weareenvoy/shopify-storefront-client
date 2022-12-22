import { productFragment } from '../fragments';

function createGetProductQuery(fragment = productFragment) {
  const query = `
    query getProduct(
      $productId: ID
      $country: CountryCode = US
      $language: LanguageCode = EN
    ) @inContext(country: $country, language: $language) {
      product(id: $productId) {
        ...ProductFragment
      }
    }

    ${fragment}
  `;

  return query;
}

export default createGetProductQuery;
