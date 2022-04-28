import { gql } from "@apollo/client";


export const GET_MOVIE_DETAIL = gql`
query getMovieDetail($movieId: String,$userId: String) {
    movieAndReaction(movieId: $movieId,userId: $userId){
        _id,name,description,type,
        likeCount,dislikeCount,
        like(userId: $userId) ,dislike(userId: $userId),
        autor{
            username,
            _id
        }
    }
}
`

export const GET_MOVIE_POSTED_BY_USER = gql`
query Get_Movie_By_User($userId: String){
    moviesByUser(userId: $userId){
        _id,name,description,type,likeCount,dislikeCount
    }
}
`

export const ADD_MOVIE = gql`
mutation AddMovie($name: String,$description: String,$userId: String,$type: String) {
    addMovie(name: $name,description: $description,userId: $userId,type: $type){
        _id,
    name,
    }
}
`

export const UPDATE_MOVIE = gql`
mutation Up_Movie($movieId: String,$name: String,$description: String){
    updateMovie(movieId: $movieId,name: $name,description: $description){
        _id,name
    }
}
`;


export const DELETE_MOVIE = gql`
mutation Delete_Movie($movieId: String){
    deleteMovie(movieId: $movieId){
        _id
    }
}
`
