import { Html } from "@react-three/drei";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { BufferGeometry, Color, Vector3 } from "three";
import { useSpring, animated } from "@react-spring/web";
import { Box } from "@chakra-ui/react";

export interface BareSphereProps {
  position: Vector3;
  color: Color;
  name: string;
  sphereId: number;
}
interface SphereProps extends BareSphereProps {
  isInnerEventDisabled?: boolean;
  onClick?: (sphereId: number) => void;
}

const Sphere = ({
  position,
  color,
  name,
  sphereId,
  isInnerEventDisabled = false,
  onClick,
}: SphereProps) => {
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
          if (!isInnerEventDisabled) setShowText((state) => !state);
          if (!onClick) return;
          onClick(sphereId);
        }}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshLambertMaterial color={color} emissive={color} />
        <pointLight color={color} />
      </mesh>
      {showText && (
        <>
          <mesh>
            <Html position={textPosition} center prepend>
              <animated.div style={{ ...springProps, overflow: "hidden" }}>
                <Box
                  p="0.5em"
                  minWidth="6em"
                  textAlign="center"
                  borderWidth="medium"
                  style={{ borderRadius: "5px" }}
                  overflow="hidden"
                  bg="whitesmoke"
                >
                  {name}
                </Box>
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
