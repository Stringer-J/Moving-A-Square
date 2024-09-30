const mongoose = require('mongoose');

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello!';
        },
    },
};

module.exports = resolvers;