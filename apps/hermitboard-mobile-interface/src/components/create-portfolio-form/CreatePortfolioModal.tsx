import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  HStack,
  Pressable,
  Input,
  Link,
  StatusBar,
  Text,
  VStack,
  useToast,
  Modal,
} from "native-base";
import React, { useState } from "react";
import { useAppSettingsStore } from "../../store/app-settings";
import { useMutation } from "urql";
import {
  CreateConnectionDocument,
  CreateConnectionInput,
} from "../../graphql/generated/index";
import { CustomToast } from "../CustomToast";
import { CreatePortfolioConnections } from "./CreatePortfolioConnections";
import { CreatePortfolioDetails } from "./CreatePortfolioDetails";
import { useCreatePortfolioFormStore } from "./create-portfolio-store";
import { State } from "react-native-gesture-handler";

export function CreatePortfolioModal(props: {
  open: boolean;
  setOpen: (openState: boolean) => void;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const resetCreatePortfolioFormStore = useCreatePortfolioFormStore(
    (state) => state.reset
  );

  // Track which stage of form we are at.
  const [portfolioFormStage, setportfolioFormStage] = useState<
    "portfolioDetails" | "chooseConnections"
  >("portfolioDetails");

  return (
    <>
      <Modal
        isOpen={props.open}
        onClose={() => {
          // Reset all state.
          resetCreatePortfolioFormStore();
          setportfolioFormStage("portfolioDetails");
          props.setOpen(false);
        }}
        _backdrop={{
          bg: "coolGray.800",
        }}
        avoidKeyboard
      >
        <Modal.Content width="90%" maxH="3/4">
          <Modal.CloseButton />
          <Modal.Header>Create portfolio</Modal.Header>
          <Modal.Body>
            {portfolioFormStage === "portfolioDetails" ? (
              <CreatePortfolioDetails
                setPortfolioFormStage={setportfolioFormStage}
              />
            ) : (
              <CreatePortfolioConnections
                setOpen={props.setOpen}
                setPortfolioFormStage={setportfolioFormStage}
              />
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
