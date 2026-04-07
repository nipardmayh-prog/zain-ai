// =============================================================
// FloatingObjects — ZAIN branded floating 3D shapes
// =============================================================
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';

function FloatingShape({ position, color, speed = 1, scale = 1, shape = 'icosahedron' }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 * speed;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2 * speed;
  });

  const geometries = {
    icosahedron: <icosahedronGeometry args={[1, 1]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    torus: <torusGeometry args={[1, 0.4, 16, 32]} />,
    torusKnot: <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
  };

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometries[shape] || geometries.icosahedron}
        <MeshDistortMaterial color={color} roughness={0.2} metalness={0.8} distort={0.2} speed={2} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

export default function FloatingObjects() {
  return (
    <group>
      <FloatingShape position={[-4, 2, -3]} color="#0A84FF" speed={0.8} scale={0.7} shape="icosahedron" />
      <FloatingShape position={[4, -1, -4]} color="#00FFB2" speed={1.2} scale={0.5} shape="torusKnot" />
      <FloatingShape position={[-2, -3, -2]} color="#1a8cff" speed={0.6} scale={0.6} shape="octahedron" />
      <FloatingShape position={[3, 3, -5]} color="#00bf87" speed={1} scale={0.4} shape="dodecahedron" />
      <FloatingShape position={[0, -2, -6]} color="#4da6ff" speed={0.7} scale={0.5} shape="torus" />
    </group>
  );
}
