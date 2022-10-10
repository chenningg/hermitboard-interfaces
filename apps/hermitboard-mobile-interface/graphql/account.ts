// Query to get logged in account details.
export const getAccountQuery = `
  query ($id: ID!) {
    accounts (where: {
      id: $id
    }) {
      edges {
        node {
          id
          email
          emailConfirmed
          passwordUpdatedAt
          authType {
            id
            value
            description
          }
          authRoles {
            edges {
              node {
                id
                value
                description
              }
            }
          }
          friends {
            edges {
              node {
                id
                nickname
              }
            }
				  }
          portfolios {
            edges {
              node {
                id
                name
              }
            }
          }
          connections {
            edges {
              node {
                name
                accessToken
              }
            }
          }
        }
      }
    }
  }
`;
