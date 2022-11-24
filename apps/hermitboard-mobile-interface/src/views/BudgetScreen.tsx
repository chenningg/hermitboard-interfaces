import {
  Box,
  Center,
  Container,
  StatusBar,
  Text,
  Image,
  VStack,
  HStack,
  Pressable,
  Icon,
  Flex,
  Spacer,
  Heading,
  Avatar,
  ScrollView,
  Progress,
} from "native-base";
import React from "react";
import { useAppSettingsStore } from "../store/app-settings";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export function BudgetScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.800"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>

      <ScrollView
        w="100%"
        h="100%"
        flex={1}
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
      >
        <Box
          w="100%"
          h="100%"
          backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.800"}
          safeArea
        >
          <Box w="100%">
            <Center w="100%">
              <Container w="100%" py={4}>
                <HStack
                  width="100%"
                  mb={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spacer flex={1} />
                  <HStack justifyContent="center" alignItems="center" flex={1}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="contactless-payment-circle-outline"
                      size="md"
                      color="darkText"
                      mr={1}
                    />
                    <Text>Tap to pay</Text>
                  </HStack>
                  <Pressable
                    flex={1}
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    <Icon
                      as={MaterialCommunityIcons}
                      name="qrcode-scan"
                      size="md"
                      color="darkText"
                    />
                  </Pressable>
                </HStack>

                <Center width="100%" mb={3} shadow="3">
                  <Image
                    width="100%"
                    height="56"
                    resizeMode="contain"
                    source={{
                      uri: "https://i.imgur.com/reZw3lE.png",
                    }}
                    alt="Credit card"
                  />
                </Center>
                <Center width="100%" mb={4}>
                  <HStack space={1.5}>
                    <Box
                      borderRadius={"full"}
                      height="2"
                      width="2"
                      backgroundColor="primary.500"
                    ></Box>
                    <Box
                      borderRadius={"full"}
                      height="2"
                      width="2"
                      backgroundColor="muted.200"
                    ></Box>
                    <Box
                      borderRadius={"full"}
                      height="2"
                      width="2"
                      backgroundColor="muted.200"
                    ></Box>
                  </HStack>
                </Center>

                <Center w="100%" mb={4}>
                  <VStack justifyContent="center" alignItems="center">
                    <Text
                      color="darkText"
                      opacity={0.6}
                      letterSpacing="lg"
                      fontWeight="medium"
                      fontSize="sm"
                    >
                      Balance
                    </Text>
                    <Text fontSize={20} fontWeight="bold">
                      $5600.42
                    </Text>
                  </VStack>
                </Center>

                <Center
                  w="100%"
                  mb={4}
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="coolGray.200"
                  p={4}
                >
                  <VStack
                    w="100%"
                    justifyContent="center"
                    alignItems="flex-start"
                    mt={-1}
                  >
                    <HStack
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Text fontWeight="medium">Daily budget</Text>
                      <Pressable>
                        <Icon
                          as={Feather}
                          name="edit"
                          size="sm"
                          color="darkText"
                        />
                      </Pressable>
                    </HStack>
                    <HStack
                      w="100%"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Center
                        h={6}
                        w={6}
                        borderRadius="full"
                        backgroundColor="emerald.600"
                        mr={3}
                      >
                        <Icon
                          as={MaterialCommunityIcons}
                          name="food"
                          color="lightText"
                          size="sm"
                        />
                      </Center>
                      <Progress
                        flex={1}
                        size="sm"
                        value={45}
                        colorScheme="emerald"
                      />
                    </HStack>
                  </VStack>
                </Center>

                <Center
                  w="100%"
                  mb={4}
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="coolGray.200"
                  p={4}
                >
                  <VStack
                    w="100%"
                    justifyContent="center"
                    alignItems="flex-start"
                    mt={-1}
                  >
                    <HStack
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Text fontWeight="medium">Monthly budget</Text>
                      <Pressable>
                        <Icon
                          as={Feather}
                          name="edit"
                          size="sm"
                          color="darkText"
                        />
                      </Pressable>
                    </HStack>
                    <HStack
                      w="100%"
                      justifyContent="flex-start"
                      alignItems="center"
                      mb={1}
                    >
                      <Center
                        h={6}
                        w={6}
                        borderRadius="full"
                        backgroundColor="orange.500"
                        mr={3}
                      >
                        <Icon
                          as={MaterialIcons}
                          name="local-grocery-store"
                          color="lightText"
                          size="sm"
                        />
                      </Center>
                      <Progress
                        flex={1}
                        size="sm"
                        value={100}
                        colorScheme="red"
                      />
                    </HStack>

                    <HStack
                      w="100%"
                      justifyContent="flex-start"
                      alignItems="center"
                      mb={1}
                    >
                      <Center
                        h={6}
                        w={6}
                        borderRadius="full"
                        backgroundColor="emerald.600"
                        mr={3}
                      >
                        <Icon
                          as={MaterialCommunityIcons}
                          name="food"
                          color="lightText"
                          size="sm"
                        />
                      </Center>
                      <Progress
                        flex={1}
                        size="sm"
                        value={65}
                        colorScheme="emerald"
                      />
                    </HStack>

                    <HStack
                      w="100%"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Center
                        h={6}
                        w={6}
                        borderRadius="full"
                        backgroundColor="rose.500"
                        mr={3}
                      >
                        <Icon
                          as={Ionicons}
                          name="ios-game-controller"
                          color="lightText"
                          size="sm"
                        />
                      </Center>
                      <Progress
                        flex={1}
                        size="sm"
                        value={25}
                        colorScheme="emerald"
                      />
                    </HStack>
                  </VStack>
                </Center>

                <Heading size={"md"} mb={4}>
                  Contacts
                </Heading>

                <Center
                  w="100%"
                  borderRadius={"md"}
                  borderColor="coolGray.200"
                  borderWidth={1}
                  p={4}
                  mb={5}
                >
                  <HStack
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    flexWrap="wrap"
                    space={4}
                    mb={4}
                  >
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                    <Avatar
                      bg="cyan.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      }}
                    >
                      TE
                    </Avatar>
                    <Avatar
                      bg="indigo.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      JB
                    </Avatar>
                    <Avatar
                      bg="amber.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      }}
                    >
                      TS
                    </Avatar>
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                  </HStack>
                  <HStack
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    flexWrap="wrap"
                    space={4}
                    mb={4}
                  >
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                    <Avatar
                      bg="cyan.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      }}
                    >
                      TE
                    </Avatar>
                    <Avatar
                      bg="indigo.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      JB
                    </Avatar>
                    <Avatar
                      bg="amber.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      }}
                    >
                      TS
                    </Avatar>
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                  </HStack>
                  <HStack justifyContent="center" alignItems="center">
                    <Text color="textDark" mr={1}>
                      More contacts
                    </Text>
                    <Icon
                      as={Entypo}
                      name="chevron-right"
                      size="sm"
                      color="textDark"
                      mt={1}
                    />
                  </HStack>
                </Center>

                <Heading size={"md"} mb={4}>
                  Transactions
                </Heading>

                <Center
                  w="100%"
                  borderRadius={"md"}
                  borderColor="coolGray.200"
                  borderWidth={1}
                >
                  <VStack
                    w="100%"
                    borderRadius={"md"}
                    borderColor="coolGray.200"
                    borderWidth={1}
                  >
                    <Pressable
                      w="100%"
                      px={4}
                      py={2}
                      h={12}
                      borderBottomWidth={1}
                      borderBottomColor="coolGray.200"
                      justifyContent="center"
                      alignItems="center"
                      _pressed={{
                        bgColor: "coolGray.200",
                      }}
                    >
                      <HStack
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <HStack justifyContent="center" alignItems="center">
                          <Center
                            h={6}
                            w={6}
                            borderRadius="full"
                            backgroundColor="blueGray.500"
                            mr={2}
                          >
                            <Icon
                              as={MaterialIcons}
                              name="local-grocery-store"
                              color="lightText"
                              size="sm"
                            />
                          </Center>

                          <Text color="darkText">Sheng Siong Supermar...</Text>
                        </HStack>
                        <Text color="red.600">-$34.25</Text>
                      </HStack>
                    </Pressable>
                    <Pressable
                      w="100%"
                      px={4}
                      py={2}
                      h={12}
                      borderBottomWidth={1}
                      borderBottomColor="coolGray.200"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <HStack
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <HStack justifyContent="center" alignItems="center">
                          <Center
                            h={6}
                            w={6}
                            borderRadius="full"
                            backgroundColor="blueGray.500"
                            mr={2}
                          >
                            <Icon
                              as={MaterialCommunityIcons}
                              name="cash-fast"
                              color="lightText"
                              size="sm"
                            />
                          </Center>

                          <Text color="darkText">
                            Transfer from <Text underline>Xueyi</Text>
                          </Text>
                        </HStack>

                        <HStack>
                          <Text color="green.600">+$42.00</Text>
                        </HStack>
                      </HStack>
                    </Pressable>
                  </VStack>
                </Center>
              </Container>
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
