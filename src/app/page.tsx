"use client";

import React from "react";

import { MainCanvas } from "@/components/MainCanvas";
import { ControlPanel } from "@/components/ControlPanel";
import { EditModal } from "@/components/EditModal";
import { Flex } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <>
      <Flex w="100%" h="100%" direction={"column"} p="1em" gap="1em">
        <MainCanvas />
        <ControlPanel />
      </Flex>
      <EditModal />
    </>
  );
};

export default Home;
