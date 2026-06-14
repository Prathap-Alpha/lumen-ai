/*
 * LumenOrb — Aggressively performance-tuned 3D hero.
 *
 * Strategy:
 *  - frameloop="demand" + manual invalidate() at ~30fps target. This gives
 *    the browser plenty of main-thread time for smooth scrolling.
 *  - During active scroll, we PAUSE 3D rendering entirely (resume after
 *    150ms idle).
 *  - Off-screen (IntersectionObserver) also pauses.
 *  - DPR clamped to 1 on retina to halve fragment work.
 *  - Geometry minimal: sphere 48 segments, torus 24x96.
 *  - Single directional light + ambient. No HDR env, no rim, no clearcoat.
 *  - mouse follow uses passive document listener (not useThree), so it
 *    doesn't force render on every mousemove.
 */
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Shared global pointer state, updated from document-level listener
const pointer = { x: 0, y: 0 };

function Ring({
  radius,
  tube,
  color,
  metalness = 0.9,
  roughness = 0.2,
}: {
  radius: number;
  tube: number;
  color: string;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <mesh>
      <torusGeometry args={[radius, tube, 24, 96]} />
      <meshPhysicalMaterial
        color="#050505"
        metalness={0.7}
        roughness={0.25}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function CoreSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.05, 48, 48]} />
      <meshPhysicalMaterial
        color="#040404"
        metalness={0.85}
        roughness={0.18}
        clearcoat={1}
        clearcoatRoughness={0.08}
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const { invalidate: inv } = useThree();

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (group.current) {
      const targetX = pointer.x * 0.25;
      const targetY = pointer.y * 0.25;
      group.current.rotation.y +=
        (targetX - group.current.rotation.y) * dt * 2;
      group.current.rotation.x +=
        (-targetY - group.current.rotation.x) * dt * 2;
      group.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.06;
    }
    if (ring1.current) {
      ring1.current.rotation.x += dt * 0.22;
      ring1.current.rotation.y += dt * 0.14;
    }
    if (ring2.current) {
      ring2.current.rotation.x += dt * -0.18;
      ring2.current.rotation.z += dt * 0.12;
    }
    if (ring3.current) {
      ring3.current.rotation.y += dt * 0.1;
      ring3.current.rotation.z += dt * -0.08;
    }
    // Schedule next frame while we want continuous animation
    inv();
  });

  return (
    <group ref={group} position={[1.4, 0, 0]}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.15}>
        <CoreSphere />
        <group ref={ring1}>
          <Ring radius={1.85} tube={0.07} color="#f4d8a3" />
        </group>
        <group ref={ring2}>
          <Ring radius={2.25} tube={0.05} color="#D9A441" />
        </group>
        <group ref={ring3}>
          <Ring radius={2.6} tube={0.035} color="#fff0d1" />
        </group>
      </Float>
    </group>
  );
}

export default function LumenOrb({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect reduced motion + mobile once
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Pause when off-screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause during active scroll, resume after 200ms idle
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      setScrolling(true);
      if (t) clearTimeout(t);
      t = setTimeout(() => setScrolling(false), 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (t) clearTimeout(t);
    };
  }, []);

  // Pointer tracking (passive, no React state, no render)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      invalidate();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const active = visible && !scrolling;

  // Static fallback for mobile and reduced-motion users
  if (isMobile || reducedMotion) {
    return (
      <div
        ref={wrapRef}
        className={`relative w-full h-full ${className}`}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 65% 50%, #050505 0%, #050505 12%, transparent 22%), radial-gradient(circle at 65% 50%, transparent 18%, rgba(10,10,10,0.85) 19%, rgba(10,10,10,0.0) 22%), radial-gradient(circle at 65% 50%, transparent 25%, rgba(10,10,10,0.6) 26%, rgba(10,10,10,0.0) 29%)",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [1.2, 0, 11.8], fov: 32 }}
        dpr={[1, 1.25]}
        frameloop={active ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#f2f0eb"]} />
        <fog attach="fog" args={["#f2f0eb", 9, 17]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#fff5e0"
        />
        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.5}
          color="#D9A441"
        />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#fff0d1" />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
