const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`

    type Book {
        title: String
        author: String
    }
    type Author {
        name: String
    }
    type Common {
        number: Int
    }
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        common: Common
        books: [Book]
        authors: [Author]
    }
`

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => {
            console.log("books")
            return books
        },
        common: () => { 
            console.log("common")
            return {number:3}
        },
        authors: () => {
            console.log("authors")
            return [{name: "Paul Auster"},{name: "Kate Chopin"}]
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});