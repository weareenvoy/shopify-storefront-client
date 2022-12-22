import variantFragment from './variant';
import sellingPlanGroupConnectionFragment from './selling-plan-group';

const fragment = `
  fragment ProductFragment on Product {
    id
    availableForSale
    createdAt
    updatedAt
    descriptionHtml
    description
    handle
    productType
    title
    vendor
    publishedAt
    onlineStoreUrl
    options {
      name
      values
    }
    images(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          src: url
          altText
          width
          height
        }
      }
    }
    variants(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          ...VariantFragment
        }
      }
    }
    sellingPlanGroups(first: 250) {
      ...SellingPlanGroupConnectionFragment
    }
  }

  ${variantFragment}
  ${sellingPlanGroupConnectionFragment}
`;

export default fragment;
