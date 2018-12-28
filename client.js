const { GraphQLClient } = require("graphql-request");

const graphCoolEndpoint =
  "https://api.graph.cool/simple/v1/cj5p24f2bblwp0122hin6ek1u";
const graphQLAccessToken = process.env.GRAPH_COOL_TOKEN;
const graphQLClient = new GraphQLClient(graphCoolEndpoint, {
  headers: {
    authorization: `Bearer ${graphQLAccessToken}`
  }
});

module.exports = graphQLClient;
