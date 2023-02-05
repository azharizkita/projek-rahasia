"use client";

import { CONTROL_MODE } from "@/constants/controlMode";
import { GlobalContext } from "@/contexts/GlobalContext";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import Select from "react-select";

export const ControlPanel = () => {
  const {
    reset,
    controlMode,
    changeControlMode,
    selectOptions,
    changeLookAtVector,
  } = useContext(GlobalContext);

  const handleOnClickAdd = () => {
    changeControlMode(controlMode === CONTROL_MODE.ADD ? "NONE" : "ADD");
  };
  const handleOnClickEdit = () => {
    changeControlMode(controlMode === CONTROL_MODE.EDIT ? "NONE" : "EDIT");
  };
  const handleOnClickRemove = () => {
    changeControlMode(controlMode === CONTROL_MODE.DELETE ? "NONE" : "DELETE");
  };

  return (
    <Flex
      direction={"column"}
      gap="1em"
      bg="gray.50"
      p="1em"
      borderRadius={"2xl"}
      shadow="xl"
      borderColor="gray.200"
      borderWidth="thin"
    >
      <Flex w="100%" align="center" justify="center" gap="1em">
        <Text fontSize="sm" color="gray.600" fontStyle="oblique">
          Control panel
        </Text>
      </Flex>
      <Divider />
      <Flex w="100%" align="center" justify="center" gap="1em">
        <Button h="full" onClick={reset}>
          Reset
        </Button>
        <Divider orientation="vertical" />
        <Flex gap="0.5em" direction="column">
          <Text
            align="center"
            fontSize="sm"
            color="gray.600"
            fontStyle="oblique"
          >
            Basic action
          </Text>
          <Flex gap="1em">
            <Button
              onClick={handleOnClickAdd}
              colorScheme={controlMode === CONTROL_MODE.ADD ? "blue" : "gray"}
            >
              Add
            </Button>
            <Button
              onClick={handleOnClickEdit}
              colorScheme={
                controlMode === CONTROL_MODE.EDIT ? "yellow" : "gray"
              }
            >
              Edit
            </Button>
            <Button
              onClick={handleOnClickRemove}
              colorScheme={controlMode === CONTROL_MODE.DELETE ? "red" : "gray"}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
        <Divider orientation="vertical" />
        <Flex gap="0.5em" direction="column" minWidth="10em">
          <Text
            align="center"
            fontSize="sm"
            color="gray.600"
            fontStyle="oblique"
          >
            Advanced action
          </Text>
          <Flex gap="1em" w="100%">
            <Select
              isSearchable
              isClearable
              options={selectOptions}
              menuPlacement="auto"
              onChange={(props) => {
                if (!props) {
                  changeLookAtVector(null);
                  return;
                }
                changeLookAtVector(props.value);
              }}
              styles={{
                container: (provided) => ({ ...provided, flex: 1 }),
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
