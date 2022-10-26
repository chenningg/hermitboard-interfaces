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
import { CreateConnectionFormChooseSource } from "./CreateConnectionFormChooseSource";
import { CreateConnectionFormConnectionDetails } from "./CreateConnectionFormConnectionDetails";
import { useCreateConnectionFormStore } from "./create-connection-store";
import { State } from "react-native-gesture-handler";

export function CreateConnectionModal(props: {
  open: boolean;
  setOpen: (openState: boolean) => void;
}) {
  const colorMode = useAppSettingsStore((state) => state.colorMode);
  const resetCreateConnectionStore = useCreateConnectionFormStore(
    (state) => state.reset
  );

  // Track which stage of form we are at.
  const [connectionFormStage, setConnectionFormStage] = useState<
    "chooseSource" | "connectionDetails"
  >("chooseSource");

  return (
    <>
      <Modal
        isOpen={props.open}
        onClose={() => {
          // Reset all state.
          resetCreateConnectionStore();
          props.setOpen(false);
        }}
        _backdrop={{
          bg: "coolGray.800",
        }}
        avoidKeyboard
      >
        <Modal.Content maxWidth="90%" maxH="3/4">
          <Modal.CloseButton />
          <Modal.Header>Create connection</Modal.Header>
          <Modal.Body>
            {connectionFormStage === "chooseSource" ? (
              <CreateConnectionFormChooseSource
                setConnectionFormStage={setConnectionFormStage}
              />
            ) : (
              <CreateConnectionFormConnectionDetails
                setOpen={props.setOpen}
                setConnectionFormStage={setConnectionFormStage}
              />
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
