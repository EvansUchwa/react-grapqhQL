import { gql } from "@apollo/client"

export const ADD_MOVIE_LIKE = gql`
    mutation Add_Like($userId: String,$movieId: String){
        addLike(movieId: $movieId,userId: $userId){
            _id
            }
}`

export const ADD_MOVIE_DISLIKE = gql`
    mutation Add_Dislike($userId: String,$movieId: String){
        addDislike(movieId: $movieId,userId: $userId){
            _id
            }
}`