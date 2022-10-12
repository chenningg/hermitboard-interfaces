import {
  Box,
  Button,
  Center,
  Container,
  ScrollView,
  StatusBar,
  Text,
  useToast,
} from "native-base";
import React from "react";
import { useMutation } from "urql";
import { CustomToast } from "../components/CustomToast";
import { LogoutDocument } from "../graphql/generated/index";
import { useAppSettingsStore } from "../store/app-settings";
import { useAuthStore } from "../store/auth";

export function SettingsScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const resetAuthStore = useAuthStore((state) => state.reset);
  const logoutToast = useToast();

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
            <ScrollView>
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
