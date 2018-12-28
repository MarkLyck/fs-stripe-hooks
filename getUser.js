const graphQLClient = require("./client");

const ALL_USERS = `
  query UserQuery($customerId: String) {
    allUsers(filter: { stripeCustomer: $customerId }) {
      id
    }
  }
`;

async function getUserByStripeCustomer(customerId) {
  try {
    const response = await graphQLClient.request(ALL_USERS, { customerId });
    return response.allUsers[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = getUserByStripeCustomer;
