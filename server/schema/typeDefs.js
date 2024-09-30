const { gql } = require('@apollo/client');

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

module.exports = typeDefs;