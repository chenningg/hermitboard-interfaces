import React, { useEffect, useMemo } from "react";
import { Box, NativeBaseProvider, Text } from "native-base";
import { MainFooterTabNav } from "./components/MainFooterTabNav/MainFooterTabNav";
import { NavigationContainer } from "@react-navigation/native";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  Provider,
} from "urql";
import { useAuthStore } from "./store/auth";
import { authExchange, AuthConfig } from "@urql/exchange-auth";
import { API_URL } from "@env";
import { AuthState } from "./types/urql-auth-state";
import { CombinedError } from "urql";
import shallow from "zustand/shallow";
import { makeOperation, Operation } from "@urql/core";

export function App() {
  // Initialize authentication store.
  const { sessionToken, isLoggedIn, hasHydrated } = useAuthStore(
    (state) => ({
      sessionToken: state.sessionToken,
      isLoggedIn: state.isLoggedIn,
      hasHydrated: state._hasHydrated,
    }),
    shallow
  );

  // Define exchanges for Urql client.
  const getAuth: AuthConfig<AuthState>["getAuth"] = async ({ authState }) => {
    if (!authState) {
      // If authState does not exist then attempt to retrieve it from the store.
      if (isLoggedIn && sessionToken) {
        return {
          sessionToken,
        };
      }

      return null;
    }

    //TODO: Logout the user

    return null;
  };

  const addAuthToOperation: AuthConfig<AuthState>["addAuthToOperation"] = ({
    authState,
    operation,
  }) => {
    if (!authState || !authState.sessionToken) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: authState.sessionToken
            ? `Bearer ${authState.sessionToken}`
            : "",
        },
        credentials: "include",
      },
    });
  };

  const willAuthError: AuthConfig<AuthState>["willAuthError"] = ({
    operation,
    authState,
  }) => {
    if (!authState) {
      // Detect our login mutation and let this operation through (return false):
      return !(
        operation.kind === "mutation" &&
        // Here we find any mutation definition with the "login" field
        operation.query.definitions.some((definition) => {
          return (
            definition.kind === "OperationDefinition" &&
            definition.selectionSet.selections.some((node) => {
              // Allow signups and login to pass through auth gate.
              // Note that createStaffAccount is not here as you need to be logged in to create a staff account.
              return (
                node.kind === "Field" &&
                (node.name.value === "createAccount" ||
                  node.name.value === "loginToAccount" ||
                  node.name.value === "loginToStaffAccount")
              );
            })
          );
        })
      );
    }

    // We have an auth state, but we need to check if the authState is legit.
    if (authState.sessionToken && authState.sessionToken.length === 40) {
      return false;
    }

    // Will result in authentication error since we are not authenticated.
    return true;
  };

  const onError = (
    { graphQLErrors, networkError }: CombinedError,
    _operation: Operation
  ) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        return console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);

    // Check whether an auth error fell through, and log the user out if that's the case.
    const isAuthError = graphQLErrors.some(
      (e) =>
        e.extensions?.code === "UNAUTHENTICATED" ||
        e.extensions?.responseStatus === 401
    );

    // If there is an auth error then we logout the user.
    if (isAuthError) {
      //TODO: Logout the user
    }
  };

  // Create Urql client for GraphQL API requests.
  const client = useMemo(() => {
    return createClient({
      url: API_URL,
      exchanges: [
        dedupExchange,
        cacheExchange,
        errorExchange({
          onError: onError,
        }),
        authExchange({
          getAuth,
          addAuthToOperation,
          willAuthError,
        }),
        fetchExchange,
      ],
    });
  }, [isLoggedIn, hasHydrated]);

  return (
    <Provider value={client}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Box safeArea>
            {!hasHydrated ? (
              <Text>Loading screen...</Text>
            ) : isLoggedIn ? (
              <MainFooterTabNav></MainFooterTabNav>
            ) : (
              <Text>Not logged in</Text>
            )}
          </Box>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
