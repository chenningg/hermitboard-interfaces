import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  FlatList,
  Flex,
  HStack,
  Icon,
  Input,
  Pressable,
  Spacer,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useAppSettingsStore } from "../store/app-settings";
import { Ionicons } from "@expo/vector-icons";

export function CommunityContactsScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  const chatData = [
    {
      name: "AB",
      bgColor: "blue.500",
      fullName: "Abbey",
      timeStamp: "12:15 AM",
      message: "Got it! Thanks for the money!",
    },
    {
      name: "XY",
      bgColor: "green.500",
      fullName: "Xueyi",
      timeStamp: "12:05 AM",
      message: "Sent you $42.00",
    },
    {
      name: "CD",
      bgColor: "yellow.500",
      fullName: "Cairn Dean",
      timeStamp: "12:00 AM",
      message: "$34.25 paid to Sheng Siong Supermark...",
    },
    {
      name: "EF",
      bgColor: "orange.500",
      fullName: "Extreme Flusbustering",
      timeStamp: "11:30 PM",
      message: "Yea we could meet for KBBQ",
    },
    {
      name: "GH",
      bgColor: "violet.500",
      fullName: "Good Hames",
      timeStamp: "10:00 PM",
      message: "Lorem ipsum cos I can't think of new st...",
    },
    {
      name: "IJ",
      bgColor: "rose.500",
      fullName: "Ifrit Jount",
      timeStamp: "9:45 PM",
      message: "Sit domet cos I can't think of things",
    },
    {
      name: "KL",
      bgColor: "teal.500",
      fullName: "Kumar Larit",
      timeStamp: "8:36 PM",
      message: "Lol stuff cos I can't think of options",
    },
    {
      name: "MN",
      bgColor: "emerald.500",
      fullName: "Min Ngiam",
      timeStamp: "8:00 PM",
      message: "Cos I can't think of hmmmm",
    },
    {
      name: "OP",
      bgColor: "pink.500",
      fullName: "Original Poster",
      timeStamp: "7:00 PM",
      message: "Some typos here maybe?",
    },
    {
      name: "QR",
      bgColor: "purple.500",
      fullName: "Quincey Rowling",
      timeStamp: "7:48 PM",
      message: "Please no more",
    },
    {
      name: "ST",
      bgColor: "amber.500",
      fullName: "Skyler Thymes",
      timeStamp: "7:30 PM",
      message: "What should this message be?",
    },
    {
      name: "UV",
      bgColor: "violet.500",
      fullName: "Umber Vainling",
      timeStamp: "6:05 PM",
      message: "This name was hard to think of",
    },
  ];

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.800"}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      ></StatusBar>

      <Box
        w="100%"
        h="100%"
        backgroundColor={colorMode === "light" ? "#f9fafb" : "coolGray.800"}
        safeArea
      >
        <Box w="100%">
          <Center w="100%" mb={16}>
            <HStack
              w="100%"
              justifyContent="center"
              alignItems="center"
              borderBottomWidth={1}
              borderBottomColor="coolGray.200"
            >
              <Pressable
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderBottomColor="primary.600"
                borderBottomWidth={2}
                p={3}
              >
                <Text fontWeight="bold" color="darkText">
                  Contacts
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                justifyContent="center"
                alignItems="center"
                p={3}
              >
                <Text fontWeight="bold" color="darkText">
                  Forums
                </Text>
              </Pressable>
            </HStack>

            <Flex w="100%" alignSelf="center">
              <Input
                placeholder="Search for contact"
                variant="filled"
                backgroundColor="coolGray.100"
                width="100%"
                borderWidth={1}
                borderColor="coolGray.200"
                py="1"
                px="2"
                h="12"
                InputLeftElement={
                  <Icon
                    ml="2"
                    size="4"
                    color="gray.400"
                    as={<Ionicons name="ios-search" />}
                  />
                }
              />
            </Flex>

            <FlatList
              w="100%"
              data={chatData}
              renderItem={({ item }) => (
                <Box
                  w="100%"
                  borderBottomColor="coolGray.200"
                  borderBottomWidth={1}
                >
                  <HStack
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    px={4}
                    py={2}
                  >
                    <Center>
                      <Avatar size="md" bgColor={item.bgColor} mr={2}>
                        {item.name}
                      </Avatar>
                    </Center>

                    <VStack flexGrow={1}>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {item.fullName}
                        </Text>
                        <Text
                          fontSize="xs"
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="coolGray.800"
                        >
                          {item.timeStamp}
                        </Text>
                      </HStack>

                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.message}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              )}
            />
          </Center>
        </Box>

        <Button
          position="absolute"
          bottom={4}
          right={5}
          borderRadius="full"
          height={16}
          width={16}
          shadow={2}
        >
          <Icon as={Ionicons} name="chatbubbles" color="lightText" size="xl" />
        </Button>
      </Box>
    </>
  );
}
