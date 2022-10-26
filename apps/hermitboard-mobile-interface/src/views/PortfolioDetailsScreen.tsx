import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Skeleton,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { VictoryLabel, VictoryPie } from "victory-native";
import { useAppSettingsStore } from "../store/app-settings";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export function PortfolioDetailsScreen() {
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
        <Box w="100%" h="100%" safeArea>
          <Center w="100%">
            <Container w="100%" py={4}>
              <HStack
                w="100%"
                mb="6"
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack space={2} alignItems="center">
                  <Icon
                    as={Ionicons}
                    name="ios-arrow-back"
                    size="2xl"
                    color="darkText"
                  />
                  <Heading fontSize="xl">Portfolio 1</Heading>
                </HStack>
                <Pressable>
                  <Icon as={Feather} name="edit" size="lg" color="darkText" />
                </Pressable>
              </HStack>
              <VStack w="100%" justifyContent="center" alignItems="center">
                <Text
                  color="darkText"
                  opacity={0.6}
                  letterSpacing="lg"
                  fontWeight="medium"
                  fontSize="sm"
                >
                  Portfolio balance
                </Text>
                <HStack alignItems="center">
                  <Text
                    mr="4"
                    fontSize="4xl"
                    fontWeight="bold"
                    color="darkText"
                  >
                    $10.53
                  </Text>
                  <HStack bgColor="red.200" borderRadius="full" px={2} py={1}>
                    <Icon
                      as={FontAwesome}
                      name="caret-down"
                      size={6}
                      color="red.600"
                      mr={-1.5}
                    />
                    <Text color="red.600">-12.6%</Text>
                  </HStack>
                </HStack>
              </VStack>
              <Box w="100%" bg="coolGray.50">
                <Center w="100%" mb="5">
                  <VictoryPie
                    height={330}
                    radius={120}
                    innerRadius={90}
                    animate={{
                      duration: 400,
                    }}
                    colorScale="cool"
                    data={[{ x: "Cryptocurrencies", y: 100 }]}
                    labelComponent={
                      <VictoryLabel
                        text={(datum) => {
                          return `Cryptocurrency: 100%`;
                        }}
                      />
                    }
                  />
                </Center>
                <HStack
                  mb="4"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Heading fontSize="lg">Assets</Heading>
                  <HStack
                    justifyContent="center"
                    alignItems="center"
                    bgColor="coolGray.200"
                    borderRadius="md"
                    py={1}
                    px={3}
                  >
                    <Text mr="3">By asset</Text>
                    <Icon
                      as={FontAwesome}
                      name="caret-down"
                      size="lg"
                      color="darkText"
                      mr="-2"
                    />
                  </HStack>
                </HStack>

                <Box
                  w="100%"
                  borderColor="coolGray.300"
                  borderWidth={1}
                  borderRadius="md"
                  p={4}
                >
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text mr="4" fontSize="md" color="darkText">
                      Ethereum
                    </Text>
                    <HStack bgColor="red.200" borderRadius="full" px={2} py={1}>
                      <Icon
                        as={FontAwesome}
                        name="caret-down"
                        size={6}
                        color="red.600"
                        mr={-1.5}
                      />
                      <Text color="red.600">-12.6%</Text>
                    </HStack>
                  </HStack>
                </Box>
              </Box>
            </Container>
          </Center>
        </Box>
      </ScrollView>
    </>
  );
}
