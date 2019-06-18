// Dependancies
const { GraphQLServer } = require('graphql-yoga');
const _ = require('lodash');


//dummy data

let links =[{
    id: 'link-0',
    url: 'www.howtographql',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

// GraphQL implementation
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },

    Mutation:{
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            var ind = _.findIndex(links, {id: args.id});

            links[ind].url = args.url !== undefined ? args.url : links[ind].url;
            links[ind].description = args.description !== undefined ? args.description : links[ind].description;
            
            return links[ind];
        }
       
    }
}

// bundle schema and resolvers into GraphQL server
const server = new GraphQLServer ({
    typeDefs : './src/schema.graphql',
    resolvers,
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