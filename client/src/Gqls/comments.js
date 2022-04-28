import { gql } from "@apollo/client"

export const GET_MOVIE_COMMENTS = gql`
query GetMovieComment($movieId: String) {
    comments(movieId: $movieId){
        _id,text,
        user{
            username
        }
    }
}`

export const ADD_MOVIE_COMMENT = gql`
    mutation AddComment($userId: String,$movieId: String,$text: String){
        addComment(movieId: $movieId,userId: $userId,text: $text){
            _id
            }
}`