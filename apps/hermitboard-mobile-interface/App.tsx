import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  cacheExchange,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { MainFooterTabNav } from "./components/MainFooterTabNav/MainFooterTabNav";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore, AuthState } from "./store/auth";

// Get the auth state (session token of the account).
const authState = useAuthStore();

// Create Urql client for GraphQL API requests.
const client = createClient({
  url: "http://localhost:5050/api",
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth: getAuth(authState),
    }),
    fetchExchange,
  ],
});

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MainFooterTabNav></MainFooterTabNav>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

async function getAuth({ authState: AuthState, mutate }) {}
