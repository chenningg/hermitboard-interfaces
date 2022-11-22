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
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
  VictoryPie,
  VictoryVoronoiContainer,
} from "victory-native";
import { useAppSettingsStore } from "../store/app-settings";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FocusAwareStatusBar } from "../components/FocusAwareStatusBar";
import { LineChart } from "react-native-wagmi-charts";
import { LineGraph } from "react-native-graph";
import { Defs, LinearGradient, Stop } from "react-native-svg";

export function DashboardScreen() {
  const colorMode = useAppSettingsStore((state) => state.colorMode);

  const netWorthData = [
    { x: new Date("2022-11-20"), y: 2130 },
    { x: new Date("2022-11-21"), y: 4520 },
    { x: new Date("2022-11-22"), y: 5230 },
    { x: new Date("2022-11-23"), y: 6460 },
    { x: new Date("2022-11-24"), y: 10546 },
  ];

  const assetBreakdownData = [
    {
      x: "Cryptocurrencies",
      y: "60%",
    },
    {
      x: "Cash & Cash Equivalents",
      y: "40%",
    },
  ];

  return (
    <>
      <FocusAwareStatusBar
        bgColor="#f9fafb"
        barStyle="dark-content"
      ></FocusAwareStatusBar>

      <ScrollView
        w="100%"
        h="100%"
        flex={1}
        bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
      >
        <Box w="100%" h="100%" safeArea>
          <Box w="100%">
            <Center w="100%">
              <Container w="100%" py={4}>
                <VStack
                  w="100%"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text
                    color="darkText"
                    opacity="0.5"
                    letterSpacing="lg"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    Total net worth
                  </Text>
                  <Skeleton.Text
                    justifyContent="center"
                    alignItems="center"
                    isLoaded={true}
                    fadeDuration={0.5}
                    startColor="muted.50"
                    endColor="muted.200"
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
                    <VStack
                      mb="1"
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text fontSize="4xl" fontWeight="bold" color="darkText">
                        $10546.65
                      </Text>
                      <HStack borderRadius="full">
                        <Icon
                          as={FontAwesome}
                          name="caret-down"
                          size={6}
                          color="red.600"
                          mr={-1}
                        />
                        <Text color="red.600">$20112.22 (-65.6%)</Text>
                      </HStack>
                    </VStack>
                  </Skeleton.Text>
                </VStack>
              </Container>
            </Center>
          </Box>

          <Box w="100%" mb={3}>
            <Center w="100%">
              <VictoryChart
                padding={0}
                height={200}
                domain={{ y: [0, 12000] }}
                containerComponent={<VictoryVoronoiContainer />}
              >
                <VictoryAxis
                  tickFormat={() => ""}
                  style={{
                    axis: { stroke: "none" },
                    ticks: { stroke: "none" },
                    tickLabels: { fill: "none" },
                  }}
                />

                <VictoryArea
                  interpolation="natural"
                  style={{ data: { fill: "#c7d2fe", opacity: 0.5 } }}
                  data={netWorthData}
                />
                <VictoryLine
                  style={{
                    data: {
                      stroke: "#4338ca",
                      strokeWidth: 3,
                    },
                  }}
                  interpolation="natural"
                  data={netWorthData}
                />
              </VictoryChart>
            </Center>
          </Box>

          <Box w="100%">
            <Center w="100%">
              <Container w="100%" py={4}>
                <Heading size={"md"} mb={4}>
                  Asset breakdown
                </Heading>
                <Center w="100%" mb="4">
                  <VictoryPie
                    height={250}
                    padding={0}
                    innerRadius={90}
                    animate={{
                      duration: 400,
                    }}
                    colorScale="cool"
                    data={[
                      { x: "Cryptocurrencies", y: 60 },
                      { x: "ss", y: 40 },
                    ]}
                    labels={() => null}
                    // labelComponent={
                    //   <VictoryLabel
                    //     text={(datum) => {
                    //       return `Cryptocurrency: 100%`;
                    //     }}
                    //   />
                    // }
                  />
                </Center>
                <Center w="100%" mb="3">
                  <VictoryLegend
                    borderPadding={{ left: 15 }}
                    orientation="horizontal"
                    itemsPerRow={1}
                    colorScale="cool"
                    gutter={0}
                    rowGutter={-1}
                    padding={0}
                    symbolSpacer={10}
                    height={assetBreakdownData.length * 30}
                    data={assetBreakdownData.map((labels) => {
                      return {
                        name: `${labels.x} (${labels.y})`,
                      };
                    })}
                  />
                </Center>
                <Heading size={"md"} mb={4}>
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
                <Heading size={"md"} mb={4}>
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
