// Dependancies
const { GraphQLServer } = require('graphql-yoga');

//GraphQL Schema, (!) defines a required field {Cannot be null}
const typeDefs = `
type Query {
    info: String!
}
`

// GraphQL implementation
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`
    }
}

// bundle schema and resolvers into GraphQL server
const server = new GraphQLServer ({
    typeDefs,
    resolvers,
});


// start the server, callback a console log
server.start(()=> console.log(`Server is running on http://localhost:4000`));