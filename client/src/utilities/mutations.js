import { gql } from "@apollo/client"; 

export const LOGIN = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token,
            profile {
                _id,
                userLocation,
                industry,
            }
        }
    }
`;

export const CREATE_PROFILE = gql`
    mutation createNewProfile($profileInfo: CreateProfile!) {
        createProfile(profileInfo: $profileInfo) {
            token,
            profile {
                firstName,
                lastName,
                age,
                userLocation,
                experience,
                biography,
            }
        }
    }
`