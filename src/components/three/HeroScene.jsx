import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/** Sichqoncha (yoki telefon egilishi) bo'yicha sahnani biroz buradi */
function Rig({ children }) {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.35, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.2, 3, delta);
  });
  return <group ref={group}>{children}</group>;
}

function Core({ darkMode, isMobile }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.15;
      mesh.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} scale={isMobile ? 1.35 : 1.6}>
        <icosahedronGeometry args={[1, isMobile ? 16 : 32]} />
        <MeshDistortMaterial
          color={darkMode ? "#f97316" : "#fb923c"}
          emissive={darkMode ? "#7c2d12" : "#fed7aa"}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.38}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Orbiter({ position, color, geometry, scale = 0.35, speed = 1.5 }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.5;
      mesh.current.rotation.z += delta * 0.3;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.7} />
      </mesh>
    </Float>
  );
}

function Ring({ darkMode }) {
  const ring = useRef();
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.1;
  });
  return (
    <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[2.6, 0.015, 16, 160]} />
      <meshBasicMaterial color={darkMode ? "#fdba74" : "#ea580c"} transparent opacity={0.6} />
    </mesh>
  );
}

export default function HeroScene({ darkMode = true, isMobile = false, active = true }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={darkMode ? 0.4 : 0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#f59e0b" />
      <pointLight position={[3, 3, -2]} intensity={20} color="#3b82f6" />

      <Rig>
        <Core darkMode={darkMode} isMobile={isMobile} />
        <Ring darkMode={darkMode} />
        <Orbiter position={[2.3, 1.2, 0.5]} color="#3b82f6" geometry={<torusKnotGeometry args={[1, 0.3, 96, 16]} />} scale={0.32} />
        <Orbiter position={[-2.4, -1.1, 0.3]} color="#f59e0b" geometry={<octahedronGeometry args={[1]} />} scale={0.4} speed={2} />
        <Orbiter position={[-1.9, 1.6, -0.8]} color="#ec4899" geometry={<boxGeometry args={[1, 1, 1]} />} scale={0.32} speed={1.2} />
        <Orbiter position={[1.9, -1.6, -0.4]} color="#10b981" geometry={<sphereGeometry args={[1, 32, 32]} />} scale={0.25} speed={2.5} />
        <Sparkles count={isMobile ? 40 : 90} scale={[7, 5, 4]} size={2.5} speed={0.4} color={darkMode ? "#fdba74" : "#f97316"} />
      </Rig>

      {darkMode && <Stars radius={60} depth={40} count={isMobile ? 1200 : 3000} factor={3} fade speed={0.6} />}

      {/* Tarmoqdan HDR yuklamaslik uchun o'zimizning yorug'lik muhiti */}
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 4, -5]} scale={[10, 2, 1]} color="#ffffff" />
        <Lightformer intensity={1.5} position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} color="#fb923c" />
        <Lightformer intensity={1} position={[5, 0, 0]} rotation-y={-Math.PI / 2} scale={[10, 4, 1]} color="#60a5fa" />
      </Environment>
    </Canvas>
  );
}
