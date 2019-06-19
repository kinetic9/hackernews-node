// Dependancies
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');


// GraphQL implementation
// The context argument is a plain JavaScript object that every resolver in the resolver chain can read from and write to - 
// it thus basically is a means for resolvers to communicate

const resolvers = {

    Query,
    Link,
    User,
    Mutation    
    
}

// bundle schema and resolvers into GraphQL server
const server = new GraphQLServer ({
    typeDefs : './src/schema.graphql',
    resolvers,
    context:  request => { 
        return {
        ...request,
        prisma
     }
    }
});


// start the server, callback a console log
server.start(()=> console.log(`Server is running on http://localhost:4000`));

// Every GraphQL schema has three special root types,
// these are called Query, Mutation and Subscription

/*
 * typeDefs: These are the type definitions from your application schema imported from src/schema.graphql.
 * resolvers: This is a JavaScript object that mirrors the Query, Mutation and Subscription types and their fields from your application schema. Each field in the application schema is represented by a function with the same name in that object.
 * context: This is an object that gets passed through the resolver chain and every resolver can read from or write to.
 *
 * Root fields define the available API operations
 * 
 * 
 */