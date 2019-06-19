// dependancies

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');


async function signup(parent, args, context, info){
    // use the bcrypt lib to hash the password given, using a salt of 10
    const password = await bcrypt.hash(args.password, 10);

    // use createUser from prisma's lib taking the args and the hashed password
    const user = await context.prisma.createUser({...args, password });

    // create a jwt token signed with the user's id
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    //return an object with the generated token and user variables
    return {
        token,
        user
    }
}

async function login (parent, args, context, info){

    //fetch an existing user, find by email
    const user = await context.prisma.user({ email: args.email });
    if (!user){
        throw new Error ('No such user found')
    }


    // compare the user password and the one hashed and stored
    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid){
        throw new Error("Invalid password")
    }


    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    //return an object with token ad user variable
    return{
        token,
        user
    }

}

function post (parent,args, context, info){
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: {connect: {id: userId} },
    });
};

async function vote(parent, args, context,info){

    //get the user id
    const userId = getUserId(context);

    //check if the link hasnt been voted for before by the same user
    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId}, 
        link: { id: args.linkId },
    });
    if (linkExists){
        throw new Error(`Already voted for link: ${args.linkId}`)
    }

    return context.prisma.createVote({
        user: {connect: {id: userId}},
        link: {connect: {id: args.linkId}}
    });

}

// Export the module

module.exports = {
    signup,
    login,
    post,
    vote
}