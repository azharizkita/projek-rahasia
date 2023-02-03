import { Html } from "@react-three/drei";
import React, { useLayoutEffect, useMemo, useState } from "react";
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
  const textPosition = useMemo(
    () => new Vector3(position.x, position.y + 0.75, position.z),
    [position]
  );
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
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshLambertMaterial color={color} emissive={color} />
        <pointLight color={color} />
      </mesh>
      {showText && (
        <>
          <mesh>
            <Html position={textPosition} center>
              <animated.div
                style={{
                  ...springProps,
                  background: "white",
                  padding: "0.5em",
                  color,
                  minWidth: "6em",
                  textAlign: "center",
                  borderRadius: "0.5em",
                  border: "1px solid",
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
