'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, Suspense } from 'react';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function CuteCameraModel({ mouseX, mouseY, hovered, currentSection, clicked }) {
  const groupRef = useRef();
  const pupilRef = useRef(); // ✅ The lens pupil that follows mouse
  const lensRingRef = useRef();
  const flashRef = useRef();
  const shutterRef = useRef();
  const apertureRef = useRef();
  const bodyRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // ✅ Body subtle rotation following mouse
    const targetX = (mouseX.current / window.innerWidth) * 2 - 1;
    const targetY = -(mouseY.current / window.innerHeight) * 2 + 1;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX * 0.3,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * 0.2,
      0.08
    );

    // ============================================
    // ✅ PUPIL TRACKS MOUSE (like an eye)
    // ============================================
    if (pupilRef.current) {
      // Move pupil within lens bounds
      const pupilTargetX = targetX * 0.15; // max movement range
      const pupilTargetY = targetY * 0.15;

      pupilRef.current.position.x = THREE.MathUtils.lerp(
        pupilRef.current.position.x,
        pupilTargetX,
        0.15
      );
      pupilRef.current.position.y = THREE.MathUtils.lerp(
        pupilRef.current.position.y,
        pupilTargetY - 0.15, // -0.15 because lens is offset down
        0.15
      );
    }

    // ============================================
    // ✅ CLICK = SHUTTER EFFECT
    // ============================================
    if (clicked) {
      // Aperture closes briefly
      if (apertureRef.current) {
        apertureRef.current.scale.set(0.1, 0.1, 1);
      }
      // Flash blast
      if (flashRef.current) {
        flashRef.current.intensity = 20;
      }
      // Camera shakes (recoil)
      if (bodyRef.current) {
        bodyRef.current.position.z = Math.sin(state.clock.elapsedTime * 30) * 0.05;
      }
    } else {
      // Reset aperture smoothly
      if (apertureRef.current) {
        apertureRef.current.scale.x = THREE.MathUtils.lerp(apertureRef.current.scale.x, 1, 0.15);
        apertureRef.current.scale.y = THREE.MathUtils.lerp(apertureRef.current.scale.y, 1, 0.15);
      }
      if (bodyRef.current) {
        bodyRef.current.position.z = THREE.MathUtils.lerp(bodyRef.current.position.z, 0, 0.1);
      }
    }

    // ============================================
    // SECTION ANIMATIONS
    // ============================================

    // 📸 Section 1 - Gallery: lens ring rotates slowly
    if (currentSection === 1) {
      if (lensRingRef.current) lensRingRef.current.rotation.z += 0.01;
      if (flashRef.current && !clicked) {
        flashRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
      }
    }

    // 🎥 Section 2 - Videos: lens ring spins fast
    if (currentSection === 2) {
      if (lensRingRef.current) lensRingRef.current.rotation.z += 0.04;
    }

    // 🌀 Section 3 - Packages: shutter button bounces
    if (currentSection === 3) {
      if (shutterRef.current) {
        shutterRef.current.position.y =
          1.05 + Math.sin(state.clock.elapsedTime * 5) * 0.06;
      }
    }

    // 🎨 Section 4 - Reviews: happy wiggle
    if (currentSection === 4) {
      if (lensRingRef.current) lensRingRef.current.rotation.z += 0.02;
    }

    // ✅ Idle floating
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.003;

    // ✅ Hover bounce
    if (hovered) {
      if (shutterRef.current) {
        shutterRef.current.position.y =
          1.05 + Math.sin(state.clock.elapsedTime * 8) * 0.06;
      }
    }

    // ✅ Hover scale
    const targetScale = hovered ? 1.08 : 1;
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.1);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <group ref={groupRef}>
      <group ref={bodyRef}>
        {/* ============================================ */}
        {/* ✅ SMOOTH ROUNDED MAIN BODY */}
        {/* ============================================ */}
        <RoundedBox args={[3, 2.2, 1.2]} radius={0.25} smoothness={6} castShadow receiveShadow>
          <meshStandardMaterial
            color="#9b6dff"
            metalness={0.2}
            roughness={0.5}
          />
        </RoundedBox>

        {/* ============================================ */}
        {/* ✅ TOP CYAN ROUNDED BAR */}
        {/* ============================================ */}
        <RoundedBox
          args={[2.8, 0.5, 1.1]}
          radius={0.2}
          smoothness={6}
          position={[0, 1.05, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#5ed8ff"
            metalness={0.3}
            roughness={0.4}
          />
        </RoundedBox>

        {/* ✅ Pink viewfinder on top */}
        <RoundedBox
          args={[1, 0.3, 0.5]}
          radius={0.1}
          smoothness={6}
          position={[0.3, 1.35, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#ff7eb6"
            metalness={0.2}
            roughness={0.4}
          />
        </RoundedBox>

        {/* ✅ Orange shutter button */}
        <mesh ref={shutterRef} position={[1.15, 1.32, 0.2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 24]} />
          <meshStandardMaterial
            color="#ff9a3c"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* ============================================ */}
        {/* ✅ BIG ROUND FRONT LENS (like an eye) */}
        {/* ============================================ */}

        {/* Outer cyan ring */}
        <mesh ref={lensRingRef} position={[0, -0.15, 0.62]} castShadow>
          <torusGeometry args={[0.95, 0.18, 16, 48]} />
          <meshStandardMaterial
            color="#5ed8ff"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* Purple middle ring */}
        <mesh position={[0, -0.15, 0.65]}>
          <torusGeometry args={[0.78, 0.1, 16, 48]} />
          <meshStandardMaterial
            color="#7c4dff"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* ✅ THE EYE / LENS - white sclera */}
        <mesh ref={apertureRef} position={[0, -0.15, 0.7]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#e0f7ff"
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>

        {/* ✅ THE PUPIL - follows mouse */}
        <group ref={pupilRef} position={[0, -0.15, 0.78]}>
          {/* Outer dark blue iris */}
          <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
              color="#3a4dd9"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* Inner black pupil */}
          <mesh position={[0, 0, 0.15]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial
              color="#0a0a2e"
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>

          {/* ✨ White shine highlight */}
          <mesh position={[-0.1, 0.1, 0.3]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#fff"
              emissive="#fff"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Small secondary shine */}
          <mesh position={[0.08, -0.08, 0.3]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial
              color="#fff"
              emissive="#fff"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>

        {/* ============================================ */}
        {/* ✅ FRONT DETAILS */}
        {/* ============================================ */}

        {/* Pink flash (top left) */}
        <RoundedBox
          args={[0.35, 0.22, 0.08]}
          radius={0.04}
          smoothness={4}
          position={[-1.1, 0.7, 0.62]}
        >
          <meshStandardMaterial
            color="#ff7eb6"
            metalness={0.3}
            roughness={0.3}
            emissive="#ff7eb6"
            emissiveIntensity={hovered ? 0.8 : 0.2}
          />
        </RoundedBox>

        {/* Flash light source */}
        <pointLight
          ref={flashRef}
          position={[-1.1, 0.7, 1.5]}
          color="#fff59d"
          intensity={0.3}
          distance={15}
        />

        {/* Small bottom button */}
        <RoundedBox
          args={[0.2, 0.15, 0.05]}
          radius={0.03}
          smoothness={4}
          position={[-1, -0.85, 0.62]}
        >
          <meshStandardMaterial color="#3a3a5e" roughness={0.6} />
        </RoundedBox>

        {/* Strap mounts */}
        <mesh position={[-1.5, 0.85, 0]}>
          <torusGeometry args={[0.1, 0.04, 8, 16]} />
          <meshStandardMaterial color="#3a3a5e" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[1.5, 0.85, 0]}>
          <torusGeometry args={[0.1, 0.04, 8, 16]} />
          <meshStandardMaterial color="#3a3a5e" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// ✅ Main exported component
export default function HeroCamera3D({ currentSection = 0 }) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  const handleMouseMove = (e) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  // ✅ Click = take photo
  const handleClick = () => {
    setClicked(true);
    setShowFlash(true);
    setPhotoCount((c) => c + 1);

    // Play shutter sound (optional - browsers may block)
    try {
      const audio = new Audio(
        'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAA'
      );
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {}

    setTimeout(() => setShowFlash(false), 250);
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <>
      {/* ✅ FULL SCREEN FLASH on click */}
      {showFlash && (
        <>
          <div
            className="fixed inset-0 bg-white z-[9999] pointer-events-none"
            style={{ animation: 'flashBurst 0.25s ease-out' }}
          />
          {/* ✅ Photo counter notification */}
          <div
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
            style={{ animation: 'photoTaken 1.5s ease-out forwards' }}
          >
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
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          shadows
          dpr={[1, 2]}
        >
          {/* ✅ Soft cartoon lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 3, 3]} color="#ff7eb6" intensity={0.4} />
          <pointLight position={[5, -3, 3]} color="#5ed8ff" intensity={0.4} />

          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
              <CuteCameraModel
                mouseX={mouseX}
                mouseY={mouseY}
                hovered={hovered}
                clicked={clicked}
                currentSection={currentSection}
              />
            </Float>

            <Environment preset="apartment" />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}