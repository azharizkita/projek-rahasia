import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three";
import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface PrimitiveProps {
  object?: Object3D;
  scale?: number;
  onClickModel?: (vector: THREE.Vector3) => void;
}

export const Model: React.FC<PrimitiveProps> = (props) => {
  const { camera } = useThree();
  const gltf = useLoader(GLTFLoader, "./Duck.gltf");
  const [mixer, setMixer] = useState<THREE.AnimationMixer | null>(null);
  useEffect(() => {
    const _mixer = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((animation) => {
      const action = _mixer.clipAction(animation);
      action.play();
    });
    setMixer(_mixer);
  }, [gltf]);

  useFrame((_, delta) => {
    if (!mixer) return;
    mixer.update(delta);
  });
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        onClick={(event) => {
          const raycaster = new THREE.Raycaster();
          const mousePos = new THREE.Vector2();
          mousePos.x = event.pointer.x;
          mousePos.y = event.pointer.y;
          raycaster.setFromCamera(mousePos, camera);
          const intersects = raycaster.intersectObjects([gltf.scene]);
          if (intersects.length > 0) {
            const intersection = intersects[0];
            // If the new sphere is not colliding, add it to the spheres state
            if (props.onClickModel) {
              props.onClickModel(intersection.point);
            }
          }
        }}
      >
        <primitive object={gltf.scene} scale={1} {...props} />
      </mesh>
    </>
  );
};
