import { CONTROL_MODE } from "@/constants/controlMode";
import { GlobalContext } from "@/contexts/GlobalContext";
import { Flex } from "@chakra-ui/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useContext } from "react";
import { Model } from "./Fragments/ModelLoader";
import Sphere from "./Fragments/Sphere";

const CameraHandler = () => {
  const { lookAtVector, isFocused } = useContext(GlobalContext);

  return useFrame((state) => {
    if (!isFocused) return;
    state.camera.lookAt(lookAtVector);
    state.camera.position.set(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z
    );

    state.camera.updateProjectionMatrix();
  });
};

export const MainCanvas = () => {
  const { addSphere, removeSphere, selectSphere, spheres, controlMode } =
    useContext(GlobalContext);

  const handleOnSphereClick = (sphereId: number) => {
    if (controlMode === CONTROL_MODE.DELETE) removeSphere(sphereId);
    if (controlMode === CONTROL_MODE.EDIT) selectSphere(sphereId);
  };
  return (
    <Flex
      shadow="lg"
      bg="gray.900"
      w="100%"
      h="100%"
      borderRadius={"2xl"}
      align="center"
      justify={"center"}
      overflow={"hidden"}
    >
      <Suspense fallback={"bentar..."}>
        <Canvas shadows camera={{ position: [1, 1, 4] }} frameloop="demand">
          <ambientLight intensity={0.5} />
          <Model
            onClickModel={(vector) => {
              if (controlMode !== CONTROL_MODE.ADD) return;

              // Check if the new sphere is colliding with any existing spheres
              let isColliding = false;
              for (const sphere of spheres) {
                const distance = sphere.position.distanceTo(vector);
                if (distance <= 0.099) {
                  // The spheres are colliding, set isColliding to true and break the loop
                  isColliding = true;
                  break;
                }
              }

              // If the new sphere is not colliding, add it to the spheres state
              if (!isColliding) {
                addSphere(vector);
              }
            }}
          />
          {spheres.map(({ color, position, name, sphereId }, i) => (
            <Sphere
              isInnerEventDisabled={controlMode !== CONTROL_MODE.NONE}
              color={color}
              position={position}
              key={i}
              name={name}
              sphereId={sphereId}
              onClick={handleOnSphereClick}
            />
          ))}
          <OrbitControls />
          <gridHelper />
          <CameraHandler />
        </Canvas>
      </Suspense>
    </Flex>
  );
};
