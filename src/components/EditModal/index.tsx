import { CONTROL_MODE } from "@/constants/controlMode";
import { GlobalContext } from "@/contexts/GlobalContext";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";

export const EditModal = () => {
  const { controlMode, selectedSphere, editSphere, selectSphere } =
    useContext(GlobalContext);

  const [_selectedSphere, _setSelectedSphere] = useState(selectedSphere);

  useEffect(() => {
    _setSelectedSphere(selectedSphere);
  }, [selectedSphere]);

  const handleCloseEditModal = () => {
    selectSphere(null);
  };

  const handleSaveChanges = () => {
    editSphere(_selectedSphere);
    handleCloseEditModal();
  };

  const handleEditSphereName = (e: ChangeEvent<HTMLInputElement>) => {
    const nameSphere = e.target.value;
    _setSelectedSphere((sphere) => {
      sphere.name = nameSphere;
      return sphere;
    });
  };

  return (
    <Modal
      isOpen={controlMode === CONTROL_MODE.EDIT && _selectedSphere.name !== ""}
      onClose={handleCloseEditModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex w="100%" h="100%" direction="column">
            <Input
              isRequired
              onChange={handleEditSphereName}
              defaultValue={selectedSphere.name}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
