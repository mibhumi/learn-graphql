const graphql = require('graphql');
const _= require('lodash');
const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt
} = graphql;

var books = [
    { name: 'Kai po chhe', genre: 'Fantasy', id: '1' },
    { name: 'The wing of Fir', genre: 'auto-bio', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

var authors = [
    { name: 'Chetan Bhagat', age: 44, id: '1' },
    { name: 'A P J Abdul Kalam', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                // console.log(typeof(args.id));
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID} },
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    }
});

// book(id: "2"){
//     name
//     genre
// }

module.exports = new GraphQLSchema({
    query: RootQuery
});