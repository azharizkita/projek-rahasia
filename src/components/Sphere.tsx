import { Html } from "@react-three/drei";
import React, { useLayoutEffect, useState } from "react";
import { BufferGeometry, Vector3 } from "three";
import { useSpring, animated } from "@react-spring/web";

interface SphereProps {
  position: Vector3;
  color: string;
  label: string;
}

const Sphere = ({ position, color, label }: SphereProps) => {
  const [showText, setShowText] = useState(false);
  const springProps = useSpring({ opacity: showText ? 1 : 0 });
  const spherePosition = position;
  const textPosition = new Vector3(position.x, position.y + 0.75, position.z);
  const ref = React.useRef<BufferGeometry>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.setFromPoints([spherePosition, textPosition]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spherePosition, showText]);
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        position={spherePosition}
        onClick={() => {
          setShowText((state) => !state);
        }}
      >
        <pointLight color={color} />
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshLambertMaterial color={color} emissive={color} />
      </mesh>
      {showText && (
        <>
          <mesh>
            <Html position={textPosition} center>
              <animated.div
                style={{
                  ...springProps,
                  background: "white",
                  padding: "2em",
                  color,
                  minWidth: "10em",
                  textAlign: "center",
                  borderRadius: "1em",
                  border: "2px solid",
                  borderColor: color,
                }}
              >
                {label}
              </animated.div>
            </Html>
          </mesh>
          <line>
            <bufferGeometry attach="geometry" ref={ref} />
            <lineBasicMaterial color={color} />
          </line>
        </>
      )}
    </>
  );
};

export default Sphere;
