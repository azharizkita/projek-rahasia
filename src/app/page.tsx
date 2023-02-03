"use client";

import React, { lazy, Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Sphere from "@/components/Sphere";
import { Color, Vector3 } from "three";

interface SphereProps {
  vector: Vector3;
  color: Color;
}

const Model = lazy(() => import("@/components/Model"));

const Home: React.FC = () => {
  const [spheres, setSpheres] = useState<SphereProps[]>([]);

  return (
    <main style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Suspense fallback={"bentar..."}>
        <Canvas shadows camera={{ position: [1, 1, 4] }} frameloop="demand">
          <ambientLight intensity={0.1} />
          <Model
            onClickModel={(vector) => {
              const newSphere = {
                color: new Color(Math.random() * 0xffffff),
                vector,
              };

              // Check if the new sphere is colliding with any existing spheres
              let isColliding = false;
              for (const sphere of spheres) {
                const distance = sphere.vector.distanceTo(vector);
                if (distance <= 0.099) {
                  // The spheres are colliding, set isColliding to true and break the loop
                  isColliding = true;
                  break;
                }
              }

              // If the new sphere is not colliding, add it to the spheres state
              if (!isColliding) {
                setSpheres((vectors) => {
                  return [...vectors, newSphere];
                });
              }
            }}
          />
          {spheres.map(({ color, vector }, i) => {
            const colorCode = new Color(color).getHexString();
            return (
              <Sphere
                color={`#${colorCode}`}
                position={vector}
                key={i}
                label={`${i} - keren`}
              />
            );
          })}
          <OrbitControls />
          <gridHelper />
        </Canvas>
      </Suspense>
    </main>
  );
};

export default Home;
