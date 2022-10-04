import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  cacheExchange,
} from "urql";

const client = createClient({
  url: "http://localhost:5050/api",
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});

export default function App() {
  return (
    <NativeBaseProvider>
      <Box bg="teal.400" rounded="xl" safeArea></Box>
    </NativeBaseProvider>
  );
}
