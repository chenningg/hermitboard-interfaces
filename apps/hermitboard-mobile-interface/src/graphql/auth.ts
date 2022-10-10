import gql from "graphql-tag";
import { graphql } from "./generated";

export const loginToAccountMutationDocument = graphql(/* GraphQL */ `
  mutation loginToAccountMutation($username: String!, $password: String!) {
    loginToAccount(input: { username: $username, password: $password }) {
      account {
        id
        email
        emailConfirmed
        passwordUpdatedAt
        authType {
          id
          value
        }
      }
      session {
        token
        userID
        authRoles
      }
    }
  }
`);
