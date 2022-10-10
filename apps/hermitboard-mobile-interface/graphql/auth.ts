// Mutation for login.
export const loginToAccountMutation = `
  mutation ($username: String!, $password: String!) {
  loginToAccount(input: {username: $username, password: $password}) {
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
`;
