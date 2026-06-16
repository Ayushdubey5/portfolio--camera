'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, Suspense } from 'react';
import { Float, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// ✅ The actual 3D Camera mesh
function Camera3DModel({ mouseX, mouseY, hovered }) {
  const groupRef = useRef();
  const lensRef = useRef();
  const flashRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // ✅ Camera follows mouse smoothly
    const targetX = (mouseX.current / window.innerWidth) * 2 - 1;
    const targetY = -(mouseY.current / window.innerHeight) * 2 + 1;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX * 0.6,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * 0.4,
      0.08
    );

    // ✅ Subtle floating animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.1;

    // ✅ Lens spins continuously
    if (lensRef.current) {
      lensRef.current.rotation.z += hovered ? 0.05 : 0.01;
    }

    // ✅ Scale on hover
    const targetScale = hovered ? 1.15 : 1;
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.1);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);

    // ✅ Flash glow pulses
    if (flashRef.current) {
      flashRef.current.intensity = hovered
        ? 3 + Math.sin(state.clock.elapsedTime * 8) * 2
        : 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ✅ Main Camera Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.6, 1.2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* ✅ Top viewfinder */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.8, 0.4, 0.8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* ✅ Lens outer ring */}
      <mesh ref={lensRef} position={[0, 0, 0.7]} castShadow>
        <cylinderGeometry args={[0.65, 0.65, 0.3, 32]} />
        <meshStandardMaterial
          color="#222"
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* ✅ Lens glass (cyan reflection) */}
      <mesh position={[0, 0, 0.86]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial
          color="#00b4d8"
          metalness={1}
          roughness={0}
          emissive="#00b4d8"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* ✅ Lens inner depth */}
      <mesh position={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* ✅ Flash bulb (top right) */}
      <mesh position={[0.9, 0.5, 0.61]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#fff"
          emissive="#fff59d"
          emissiveIntensity={hovered ? 2 : 0.3}
        />
      </mesh>

      {/* ✅ Flash light source */}
      <pointLight
        ref={flashRef}
        position={[0.9, 0.5, 1]}
        color="#fff59d"
        intensity={0.5}
        distance={8}
      />

      {/* ✅ Red recording dot */}
      <mesh position={[-0.9, 0.5, 0.61]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* ✅ Brand label area */}
      <mesh position={[0, -0.6, 0.61]}>
        <boxGeometry args={[1.2, 0.2, 0.02]} />
        <meshStandardMaterial
          color="#00b4d8"
          emissive="#00b4d8"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ✅ Side grip texture */}
      <mesh position={[-1.3, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 1.4, 1]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

// ✅ Main exported component
export default function HeroCamera3D() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-full cursor-pointer"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
        dpr={[1, 2]}
      >
        {/* ✅ Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <pointLight position={[-5, -5, -5]} color="#00b4d8" intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#ffffff" intensity={0.3} />

        {/* ✅ Floating motion + presentation controls (drag-to-rotate) */}
        <Suspense fallback={null}>
          <PresentationControls
            global
            cursor={false}
            snap
            speed={1.5}
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 3, Math.PI / 3]}
          >
            <Float
              speed={2}
              rotationIntensity={0.5}
              floatIntensity={0.5}
            >
              <Camera3DModel
                mouseX={mouseX}
                mouseY={mouseY}
                hovered={hovered}
              />
            </Float>
          </PresentationControls>

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}