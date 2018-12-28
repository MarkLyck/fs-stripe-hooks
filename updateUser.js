const graphQLClient = require("./client");

const query = `
    mutation updateUser($id: ID!, $stripeSubscription: Json, $type: String) {
        updateUser(id: $id, stripeSubscription: $stripeSubscription, type: $type) {
            id
        }
    }
`;

async function updateUser(id, stripeSubscription, type) {
  try {
    await graphQLClient.request(query, { id, stripeSubscription, type });
    console.log("user updated");
  } catch (err) {
    console.error(err);
  }
}

module.exports = updateUser;
