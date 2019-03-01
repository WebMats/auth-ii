const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const usersDB = require('./data/dbConfig');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    context: ({ req }) => {
        const authHeader = req.get('Authorization');
        if (!authHeader) return;
        const token = authHeader.split(' ')[1];
        if (!token || token === '' || token === 'null') return ;
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        }catch(err) {
            req.falsifiedToken = true;
            throw new Error('Please do not mutate your token')
        }
        if (!decodedToken) return;
        return usersDB('users').where({username: decodedToken.username}).first().then(fetchedUser => {
            if (!fetchedUser) return;
            return {userId: decodedToken.userId, department: fetchedUser.department}
        }).catch((err) => {
            throw err
        });
    },
    typeDefs,
    rootValue: resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});