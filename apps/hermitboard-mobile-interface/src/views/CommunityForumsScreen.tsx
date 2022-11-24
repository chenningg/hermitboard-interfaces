import {
  Avatar,
  Box,
  Button,
  Center,
  Image,
  CheckIcon,
  Container,
  FlatList,
  HStack,
  Icon,
  Input,
  Pressable,
  Select,
  Spacer,
  StatusBar,
  Text,
  VStack,
  Heading,
} from "native-base";
import React from "react";
import { useAppSettingsStore } from "../store/app-settings";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export function CommunityForumsScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  const [postsToShow, setPostsToShow] = React.useState("hot");

  const postsData = [
    {
      type: "image",
      imageURL:
        "https://images.unsplash.com/photo-1669295235408-81174795bd87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      poster: "NotABot",
      timeStamp: "12h ago",
      title: "Best places to retire",
    },
    {
      type: "text",
      imageURL: "",
      poster: "InvestingForTwo",
      timeStamp: "12h ago",
      title: "What are your thoughts about the recent crash in the markets?",
    },
    {
      type: "image",
      imageURL:
        "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bW9uZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      poster: "InvestingForTwo",
      timeStamp: "20h ago",
      title: "How to save money",
    },
    {
      type: "image",
      imageURL:
        "https://plus.unsplash.com/premium_photo-1663931932637-e30332303b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      poster: "SmartMoney",
      timeStamp: "1d ago",
      title: "Bitcoin crashes 60%",
    },
    {
      type: "image",
      imageURL:
        "https://images.unsplash.com/photo-1617275249641-322ed29f098e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      poster: "OhNoIFailedToGetBTO",
      timeStamp: "1d ago",
      title: "Cooling measures in Singapore for property",
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
        <HStack
          w="100%"
          justifyContent="center"
          alignItems="center"
          borderBottomWidth={1}
          borderBottomColor="coolGray.200"
        >
          <Pressable flex={1} justifyContent="center" alignItems="center" p={3}>
            <Text fontWeight="bold" color="darkText">
              Contacts
            </Text>
          </Pressable>
          <Pressable
            flex={1}
            justifyContent="center"
            alignItems="center"
            p={3}
            borderBottomColor="primary.600"
            borderBottomWidth={2}
          >
            <Text fontWeight="bold" color="darkText">
              Forums
            </Text>
          </Pressable>
        </HStack>

        <HStack
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          px={5}
          py={3}
          mt={1}
        >
          <Select
            selectedValue={postsToShow}
            width="32"
            height="9"
            accessibilityLabel="Choose posts to show"
            defaultValue="hot"
            _selectedItem={{
              bg: "teal.600",
            }}
            dropdownIcon={
              <Icon as={Entypo} name="chevron-down" size="sm" mr={2} />
            }
            onValueChange={(itemValue) => setPostsToShow(itemValue)}
          >
            <Select.Item label="Hot" value="hot" />
            <Select.Item label="Rising" value="rising" />
            <Select.Item label="New" value="new" />
          </Select>
          <Icon
            ml="2"
            size="lg"
            color="darkText.400"
            as={Ionicons}
            name="ios-search"
          />
        </HStack>

        <Box w="100%">
          <Center w="100%">
            <Center w="100%">
              <FlatList
                mb={32}
                px={5}
                w="100%"
                data={postsData}
                renderItem={({ item }) => (
                  <Box
                    w="100%"
                    borderColor="coolGray.200"
                    borderWidth={1}
                    borderRadius="lg"
                    mb={3}
                  >
                    <VStack
                      w="100%"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {item.type === "image" ? (
                        <Image
                          w="100%"
                          h={32}
                          borderTopRadius="lg"
                          resizeMethod="scale"
                          resizeMode="cover"
                          source={{
                            uri: item.imageURL,
                          }}
                          alt="Alternate Text"
                        />
                      ) : null}

                      <VStack w="100%" p={3}>
                        <Heading w="100%" size="sm" mb={2}>
                          {item.title}
                        </Heading>
                        <HStack w="100%" justifyContent="flex-end">
                          <Text color="coolGray.600" fontSize="2xs">
                            Posted {item.timeStamp} by {item.poster}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
                )}
              />
            </Center>
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
          <Icon
            as={FontAwesome}
            name="pencil"
            color="lightText"
            size="xl"
            ml={1}
          />
        </Button>
      </Box>
    </>
  );
}
