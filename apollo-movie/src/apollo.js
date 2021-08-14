import ApolloClient from "apollo-boost";
//Shin JoonYong
const client = new ApolloClient({
    uri :"http://localhost:4000/",
    resolvers:{
        Movie:{
            isLiked : () => false
        },
        Mutation:{
            toggleLikeMovie:(_,{id, isLiked},{cache})=>{
                console.log(id);
                cache.writeData({
                    id:`Movie:${id}`,
                    data:{isLiked:!isLiked}
                });
            },
        },

    }
});

export default client;