function feed (parent, args, context, info){
    return context.prisma.links();
}

modules.exports = {
    feed
}