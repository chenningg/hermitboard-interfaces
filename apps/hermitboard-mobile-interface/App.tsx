import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  cacheExchange,
} from "urql";
import { MainFooterTabNav } from "./components/MainFooterTabNav/MainFooterTabNav";
import { NavigationContainer } from "@react-navigation/native";

const client = createClient({
  url: "http://localhost:5050/api",
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
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
