import { gql } from "@apollo/client";

export const GET_USER = gql`
query Get_User($id: String){
    user(id: $id){
        _id,username,email,createdAt
    }
}
`


export const UPDATE_USER = gql`
mutation Up_User($userId: String,$username: String,$email: String){
    updateUser(userId: $userId,username: $username,email: $email){
        _id,username
    }
}
`