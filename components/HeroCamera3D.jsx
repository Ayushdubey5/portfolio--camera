'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, Suspense } from 'react';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function DSLRCameraModel({ mouseX, mouseY, hovered, currentSection, clicked, mouseIntensity }) {
  const groupRef = useRef();
  const lensRingRef = useRef();
  const apertureRef = useRef();
  const flashRef = useRef();
  const shutterRef = useRef();
  const dialRef = useRef();
  const recordDotRef = useRef();
  const screenRef = useRef();
  const bodyRef = useRef();
  const focusRingRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const targetX = (mouseX.current / window.innerWidth) * 2 - 1;
    const targetY = -(mouseY.current / window.innerHeight) * 2 + 1;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX * mouseIntensity,
      0.12
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * mouseIntensity * 0.7,
      0.12
    );

    // CLICK = SHUTTER
    if (clicked) {
      if (apertureRef.current) apertureRef.current.scale.set(0.2, 0.2, 1);
      if (flashRef.current) flashRef.current.intensity = 25;
      if (bodyRef.current) bodyRef.current.position.z = Math.sin(state.clock.elapsedTime * 30) * 0.04;
    } else {
      if (apertureRef.current) {
        apertureRef.current.scale.x = THREE.MathUtils.lerp(apertureRef.current.scale.x, 1, 0.15);
        apertureRef.current.scale.y = THREE.MathUtils.lerp(apertureRef.current.scale.y, 1, 0.15);
      }
      if (bodyRef.current) bodyRef.current.position.z = THREE.MathUtils.lerp(bodyRef.current.position.z, 0, 0.1);
    }

    // SECTION ANIMATIONS — rotate around Z axis (lens forward facing)
    if (currentSection === 1) {
      if (lensRingRef.current) lensRingRef.current.rotation.z += 0.005;
    }
    if (currentSection === 2) {
      if (recordDotRef.current) recordDotRef.current.material.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 6) * 1.5;
      if (focusRingRef.current) focusRingRef.current.rotation.z += 0.02;
    }
    if (currentSection === 3) {
      if (dialRef.current) dialRef.current.rotation.y += 0.08;
    }
    if (currentSection === 4) {
      if (screenRef.current) screenRef.current.material.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.4;
    }

    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.2) * 0.002;

    if (hovered && lensRingRef.current) lensRingRef.current.rotation.z += 0.02;

    const targetScale = hovered ? 1.06 : 1;
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.1);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <group ref={groupRef}>
      <group ref={bodyRef}>

        {/* ✅ MAIN BODY */}
        <RoundedBox args={[3.4, 2.4, 1.3]} radius={0.12} smoothness={8} castShadow receiveShadow>
          <meshStandardMaterial color="#0a0a0a" metalness={0.4} roughness={0.55} />
        </RoundedBox>

        {/* ✅ PENTAPRISM HUMP */}
        <RoundedBox args={[1.4, 0.65, 1]} radius={0.08} smoothness={6} position={[0, 1.3, -0.05]} castShadow>
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
        </RoundedBox>

        {/* ✅ Brand plate */}
        <mesh position={[0, 1.32, 0.46]}>
          <boxGeometry args={[0.8, 0.15, 0.02]} />
          <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.2} />
        </mesh>

        {/* ✅ Hot shoe */}
        <mesh position={[0, 1.7, -0.05]} castShadow>
          <boxGeometry args={[0.7, 0.15, 0.6]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.78, -0.05]}>
          <boxGeometry args={[0.5, 0.08, 0.4]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>

        {/* ✅ MODE DIAL */}
        <group ref={dialRef} position={[-1.15, 1.25, 0.2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.2, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.11, 0.18]}>
            <boxGeometry args={[0.04, 0.02, 0.12]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* ✅ Secondary dial */}
        <mesh position={[1.15, 1.25, 0.2]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* ✅ Shutter button */}
        <mesh ref={shutterRef} position={[1.35, 1.18, 0.4]} castShadow rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.12, 24]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[1.35, 1.24, 0.42]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.02, 24]} />
          <meshStandardMaterial color="#cc0000" metalness={0.6} />
        </mesh>

        {/* ✅ LCD info screen */}
        <mesh position={[0.5, 1.15, 0.66]}>
          <boxGeometry args={[0.9, 0.35, 0.02]} />
          <meshStandardMaterial color="#2a3a4a" emissive="#5ed8ff" emissiveIntensity={0.2} />
        </mesh>

        {/* ============================================ */}
        {/* ✅ LENS — FIXED — rotation on mesh, points forward (Z axis) */}
        {/* ============================================ */}

        {/* Lens mount base — rotated 90° on X so cylinder points forward */}
        <mesh position={[0, -0.15, 0.78]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[1, 1, 0.25, 48]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Main lens barrel */}
        <mesh ref={lensRingRef} position={[0, -0.15, 1.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.92, 0.5, 48]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Zoom ring (slightly larger to stick out) */}
        <mesh position={[0, -0.15, 1.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.18, 64]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} metalness={0.4} />
        </mesh>

        {/* Red brand ring */}
        <mesh position={[0, -0.15, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.91, 0.91, 0.04, 48]} />
          <meshStandardMaterial color="#cc0000" metalness={0.6} emissive="#cc0000" emissiveIntensity={0.2} />
        </mesh>

        {/* Second narrower lens segment */}
        <mesh position={[0, -0.15, 1.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.85, 0.88, 0.3, 48]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Focus ring */}
        <mesh ref={focusRingRef} position={[0, -0.15, 1.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.88, 0.88, 0.12, 64]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} metalness={0.3} />
        </mesh>

        {/* Front lens rim */}
        <mesh position={[0, -0.15, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 0.05, 48]} />
          <meshStandardMaterial color="#000" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* ✅ FRONT GLASS LENS (the visible blue glass) */}
        <mesh ref={apertureRef} position={[0, -0.15, 1.73]}>
          <circleGeometry args={[0.78, 64]} />
          <meshStandardMaterial
            color="#1a3a5e"
            metalness={1}
            roughness={0.05}
            emissive="#5ed8ff"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Darker center pupil */}
        <mesh position={[0, -0.15, 1.74]}>
          <circleGeometry args={[0.4, 32]} />
          <meshStandardMaterial color="#000814" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* ✨ Big glass reflection */}
        <mesh position={[-0.25, 0.05, 1.76]}>
          <circleGeometry args={[0.15, 24]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.6} emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>

        {/* ✨ Small reflection */}
        <mesh position={[0.18, -0.3, 1.76]}>
          <circleGeometry args={[0.07, 16]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.5} emissive="#ffffff" emissiveIntensity={0.4} />
        </mesh>

        {/* ============================================ */}
        {/* ✅ FRONT DETAILS */}
        {/* ============================================ */}

        {/* AF lamp */}
        <mesh ref={recordDotRef} position={[-1.3, 0.6, 0.66]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={1.2} />
        </mesh>

        {/* Built-in flash */}
        <RoundedBox args={[0.5, 0.2, 0.1]} radius={0.03} smoothness={4} position={[-1, 0.85, 0.65]}>
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.6}
            roughness={0.4}
            emissive="#fff59d"
            emissiveIntensity={hovered ? 0.5 : 0.1}
          />
        </RoundedBox>

        <pointLight ref={flashRef} position={[-1, 0.85, 1.5]} color="#fff59d" intensity={0.3} distance={15} />

        {/* Self-timer lamp */}
        <mesh position={[1.3, 0.6, 0.66]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
        </mesh>

        {/* Lens release button */}
        <mesh position={[-1.3, -0.4, 0.66]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Brand label */}
        <mesh position={[0.7, -0.95, 0.66]}>
          <boxGeometry args={[0.9, 0.1, 0.02]} />
          <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.2} />
        </mesh>

        {/* Mic holes */}
        <mesh position={[-0.5, 1.5, 0.4]}>
          <boxGeometry args={[0.3, 0.03, 0.06]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh position={[0.5, 1.5, 0.4]}>
          <boxGeometry args={[0.3, 0.03, 0.06]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* ✅ HAND GRIP */}
        <RoundedBox args={[0.5, 2.2, 1.4]} radius={0.15} smoothness={6} position={[-1.75, -0.05, 0]} castShadow>
          <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.85} />
        </RoundedBox>

        <RoundedBox args={[0.05, 1.6, 1.2]} radius={0.05} smoothness={4} position={[-2.02, -0.1, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.98} />
        </RoundedBox>

        {/* ✅ BACK LCD */}
        <mesh ref={screenRef} position={[0, -0.1, -0.66]}>
          <boxGeometry args={[2.2, 1.5, 0.02]} />
          <meshStandardMaterial color="#0a1828" emissive="#5ed8ff" emissiveIntensity={0.5} />
        </mesh>

        <mesh position={[0, -0.1, -0.65]}>
          <boxGeometry args={[2.4, 1.7, 0.02]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Viewfinder */}
        <RoundedBox args={[0.6, 0.35, 0.2]} radius={0.05} smoothness={6} position={[0, 1.05, -0.5]} castShadow>
          <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
        </RoundedBox>

        <mesh position={[0, 1.05, -0.62]}>
          <torusGeometry args={[0.2, 0.05, 12, 24]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
        </mesh>

        {/* Strap mounts */}
        <mesh position={[-1.8, 1, 0]}>
          <torusGeometry args={[0.12, 0.04, 8, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[1.8, 1, 0]}>
          <torusGeometry args={[0.12, 0.04, 8, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroCamera3D({ currentSection = 0 }) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  const mouseIntensity = currentSection === 0 ? 0.4 : 1.0;

  const handleMouseMove = (e) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setClicked(true);
    setShowFlash(true);
    setPhotoCount((c) => c + 1);
    setTimeout(() => setShowFlash(false), 250);
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <>
      {showFlash && (
        <>
          <div className="fixed inset-0 bg-white z-[9999] pointer-events-none" style={{ animation: 'flashBurst 0.25s ease-out' }} />
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none" style={{ animation: 'photoTaken 1.5s ease-out forwards' }}>
            <div className="bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full border-2 border-[#5ed8ff] flex items-center gap-2 shadow-2xl">
              <span className="text-2xl">📸</span>
              <span className="font-bold">Photo #{photoCount} Captured!</span>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes flashBurst {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        @keyframes photoTaken {
          0% { opacity: 0; transform: translate(-50%, -20px) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          80% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -20px) scale(0.8); }
        }
      `}</style>

      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className="w-full h-full cursor-pointer"
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, 3, 3]} intensity={0.6} />
          <pointLight position={[0, -3, 5]} color="#ffffff" intensity={0.4} />
          <spotLight position={[3, 4, 4]} angle={0.3} intensity={0.6} color="#ffffff" castShadow />

          <Suspense fallback={null}>
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
              <DSLRCameraModel
                mouseX={mouseX}
                mouseY={mouseY}
                hovered={hovered}
                clicked={clicked}
                currentSection={currentSection}
                mouseIntensity={mouseIntensity}
              />
            </Float>

            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}