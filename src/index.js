// Dependancies
const { GraphQLServer } = require('graphql-yoga');
const _ = require('lodash');
const { prisma } = require('./generated/prisma-client');


// //dummy data

// let links =[{
//     id: 'link-0',
//     url: 'www.howtographql',
//     description: 'Fullstack tutorial for GraphQL'
// }, {
//     id: 'link-1',
//     url: 'www.google.com',
//     description: 'Search Engine'
// }
// ];

// let idCount = links.length;

// GraphQL implementation
// The context argument is a plain JavaScript object that every resolver in the resolver chain can read from and write to - 
// it thus basically is a means for resolvers to communicate

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root,args, context, info) => {
            return context.prisma.links()
        },
       // link: (parent,args) => _.find(links, {id: args.id})
    },

    Mutation:{
        post: (root, args, context, info) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        // updateLink: (parent, args) => {
        //     var ind = _.findIndex(links, {id: args.id});

        //     links[ind].url = args.url !== undefined ? args.url : links[ind].url;
        //     links[ind].description = args.description !== undefined ? args.description : links[ind].description;

        //     return links[ind];
        // },
        // deleteLink: (parent,args) => {
        //     //var ind = _.findIndex(links, {id: args.id});
        //     //links = (links, {id: args.id});
        //     _.remove(links, {id: args.id});

        //     if(links.length == 0){
        //         return null;
        //     }else{
        //         return links;
        //     }
        // }
       
    }
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