const fragment = `
  fragment SellingPlanGroupConnectionFragment on SellingPlanGroupConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        name
        options {
          name
          values
        }
        sellingPlans(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              name
              recurringDeliveries
              checkoutCharge {
                type
                value
              }
              options {
                name
                value
              }
              priceAdjustments {
                adjustmentValue
                orderCount
              }
            }
          }
        }
      }
    }
  }
`;

export default fragment;
