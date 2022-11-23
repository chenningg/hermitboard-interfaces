import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useToast,
} from "native-base";
import React from "react";
import { useMutation, useQuery } from "urql";
import { CustomToast } from "../components/CustomToast";
import {
  GetAccountByIdDocument,
  LogoutDocument,
} from "../graphql/generated/index";
import { useAppSettingsStore } from "../store/app-settings";
import { useAuthStore } from "../store/auth";
import { FontAwesome } from "@expo/vector-icons";

export function SettingsScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const userID = useAuthStore((state) => state.session?.userID);
  const resetAuthStore = useAuthStore((state) => state.reset);
  const logoutToast = useToast();

  // Get logged in account.
  const [getAccountByIDResult, getAccountByID] = useQuery({
    query: GetAccountByIdDocument,
    variables: {
      id: userID ?? "",
    },
  });

  // Logout mutation.
  const [logoutResult, logout] = useMutation(LogoutDocument);

  const handleLogout = () => {
    logout({}).then((result) => {
      console.log(result);
      if (result.error) {
        logoutToast.show({
          duration: 3000,
          placement: "top",
          render: () => {
            return <CustomToast status="error" title={result.error?.message} />;
          },
        });
      }

      if (!result.error) {
        // If no error, then logout succeeded, we need to clear AuthState.
        resetAuthStore();
      }
    });
  };

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.800"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>

      <Box
        w="100%"
        h="100%"
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
      >
        <Center>
          <Container w="100%" h="100%" safeArea>
            <ScrollView w="100%" py={4}>
              <HStack
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                py={4}
              >
                <HStack alignItems="center">
                  <Avatar
                    bg="primary.800"
                    mr="4"
                    size="md"
                    source={{
                      uri: getAccountByIDResult.data?.accounts.edges
                        ? getAccountByIDResult.data?.accounts.edges[0]
                          ? getAccountByIDResult.data?.accounts.edges[0].node
                              ?.profilePictureURL ?? undefined
                          : undefined
                        : undefined,
                    }}
                  >
                    {getAccountByIDResult.data?.accounts.edges
                      ? getAccountByIDResult.data?.accounts.edges[0]
                        ? getAccountByIDResult.data?.accounts.edges[0].node?.nickname
                            .slice(0, 2)
                            .toUpperCase()
                        : "HB"
                      : "HB"}
                  </Avatar>
                  <Heading fontWeight="bold" fontSize="lg">
                    User
                  </Heading>
                </HStack>
                <Icon
                  as={FontAwesome}
                  name="angle-right"
                  size="sm"
                  color="muted.500"
                />
              </HStack>

              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth={1}
                borderBottomColor="coolGray.300"
                py={4}
              >
                <Text>Portfolios</Text>
                <Icon
                  as={FontAwesome}
                  name="angle-right"
                  size="sm"
                  color="muted.500"
                />
              </HStack>

              <Pressable
                _pressed={{
                  bgColor: "coolGray.200",
                }}
              >
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottomWidth={1}
                  borderBottomColor="coolGray.300"
                  py={4}
                >
                  <Text>Connections</Text>
                  <Icon
                    as={FontAwesome}
                    name="angle-right"
                    size="sm"
                    color="muted.500"
                  />
                </HStack>
              </Pressable>

              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                borderBottomWidth={1}
                borderBottomColor="coolGray.300"
                py={4}
                mb="6"
              >
                <Text>Notifications</Text>
                <Icon
                  as={FontAwesome}
                  name="angle-right"
                  size="sm"
                  color="muted.500"
                />
              </HStack>

              <Button
                disabled={logoutResult.fetching}
                isLoading={logoutResult.fetching}
                isLoadingText="Logging out"
                spinnerPlacement="start"
                bg="red.600"
                _pressed={{ bg: "red.700" }}
                borderRadius="lg"
                onPress={handleLogout}
              >
                Logout
              </Button>
            </ScrollView>
          </Container>
        </Center>
      </Box>
    </>
  );
}
