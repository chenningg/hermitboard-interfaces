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

export function DashboardScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  return (
    <>
      <StatusBar
        backgroundColor={colorMode === "light" ? "#4F46E5" : "coolGray.800"}
        barStyle={colorMode === "light" ? "light-content" : "light-content"}
      ></StatusBar>

      <ScrollView
        w="100%"
        h="100%"
        flex={1}
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
      >
        <Box w="100%" h="100%" safeArea>
          <Box w="100%" bg="primary.600">
            <Center w="100%">
              <Container w="100%" py={4}>
                <VStack w="100%" justifyContent="center" alignItems="center">
                  <Text
                    color="lightText"
                    opacity={0.4}
                    letterSpacing="lg"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    Total balance
                  </Text>
                  <Skeleton.Text
                    justifyContent="center"
                    alignItems="center"
                    isLoaded={true}
                    fadeDuration={0.5}
                    startColor="primary.50"
                    endColor="primary.200"
                    opacity={0.1}
                    lines={1}
                    _line={{
                      h: 12,
                      w: 40,
                      mt: 3,
                      mb: 3,
                      borderRadius: "lg",
                    }}
                    mr={3}
                  >
                    <HStack alignItems="center">
                      <Text
                        mr="4"
                        fontSize="4xl"
                        fontWeight="bold"
                        color="lightText"
                      >
                        $10.53
                      </Text>
                      <HStack
                        bgColor="red.200"
                        borderRadius="full"
                        px={2}
                        py={1}
                      >
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
                  </Skeleton.Text>
                </VStack>
              </Container>
            </Center>
          </Box>
          <Box w="100%" bg="primary.600" h="6">
            <Box w="100%" bg="coolGray.50" borderTopRadius="3xl" h="6"></Box>
          </Box>
          <Box w="100%" bg="coolGray.50">
            <Center w="100%">
              <Container w="100%">
                <Center w="100%" mb="3">
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
                <Heading mb="3" fontSize="lg">
                  Portfolios
                </Heading>
                <HStack mb="6">
                  <Pressable
                    w={24}
                    h={24}
                    mr={5}
                    bgColor="coolGray.200"
                    borderRadius="lg"
                    p={4}
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    <Text fontWeight="bold" mb="1">
                      Portfolio 1
                    </Text>
                    <Text color="red.600">-12.6%</Text>
                  </Pressable>
                  <Pressable
                    w={24}
                    h={24}
                    bgColor="transparent"
                    borderWidth={1}
                    borderStyle="dotted"
                    borderRadius="lg"
                    p={4}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text fontWeight="bold" mb="1">
                      New
                    </Text>
                    <Icon as={Entypo} name="plus" />
                  </Pressable>
                </HStack>
                <Heading mb="3" fontSize="lg">
                  Combined assets
                </Heading>
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
              </Container>
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
