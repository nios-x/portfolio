"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  OrbitControls,
  PointerLockControls,
  Float,
  Text,
  Sparkles,
  Stats,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const gltf = useLoader(GLTFLoader, "/cyb.glb");
  return <primitive object={gltf.scene} />;
}

function Scene2() {
  const gltf = useLoader(GLTFLoader, "/cyb2.glb");

  const scene = React.useMemo(() => {
    const root = gltf.scene.clone(true);
    root.rotation.y = Math.PI; // rotate 180°
    root.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 1.4;
        }
      }
    });
    return root;
  }, [gltf.scene]);

  return <primitive object={scene} />;
}


function DesktopFPSControls() {
  const { camera } = useThree();
  const keys = useRef({
    forward: false,
    back: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyW") keys.current.forward = true;
      if (e.code === "KeyS") keys.current.back = true;
      if (e.code === "KeyA") keys.current.left = true;
      if (e.code === "KeyD") keys.current.right = true;
       if (e.code === "Space") keys.current.up = true;
       if (e.code === "ShiftLeft" || e.code === "ShiftRight") keys.current.down = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "KeyW") keys.current.forward = false;
      if (e.code === "KeyS") keys.current.back = false;
      if (e.code === "KeyA") keys.current.left = false;
      if (e.code === "KeyD") keys.current.right = false;
       if (e.code === "Space") keys.current.up = false;
       if (e.code === "ShiftLeft" || e.code === "ShiftRight") keys.current.down = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const moveSpeed = 6;
    const dir = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const vertical = new THREE.Vector3(0, 1, 0);
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

    if (keys.current.forward) dir.add(forward);
    if (keys.current.back) dir.sub(forward);
    if (keys.current.left) dir.sub(right);
    if (keys.current.right) dir.add(right);

    if (keys.current.up) dir.add(vertical);
    if (keys.current.down) dir.sub(vertical);

    if (dir.lengthSq() > 0) {
      dir.normalize().multiplyScalar(moveSpeed * delta);
      camera.position.add(dir);
    }
  });

  return <PointerLockControls makeDefault />;
}

function FlyingTitle() {
  return (
    <Float
    speed={0}
    floatIntensity={0}
    rotationIntensity={0}
      position={[0.6, 7, -2]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.8}
        depth={0.22}
        lineHeight={1}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {"SOUMYA's"+
         "  "+"VERSE"}
        <meshStandardMaterial
          color="#076200"
          emissive="#076200"
          emissiveIntensity={2.2}
          metalness={1.38}
          roughness={1.28}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function FlyingTitle2() {
  return (
    <Float 
    speed={0}
    floatIntensity={0}
    rotationIntensity={0}
      position={[0.5, 5.5, -2]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.45}
        depth={0.18}
        lineHeight={0.9}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Hello, I'm Soumya Jaiswal{"\n"}
        I love building cool stuff for{"\n"}
        mental satisfaction and{"\n"}
        work life balance .😊

        <meshStandardMaterial
          color="#f70093"
          emissive="#f70093"
          emissiveIntensity={2.2}
          metalness={1.38}
          roughness={1.28}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function FlyingTitle3() {
  return (
    <Float 
    speed={0}
    floatIntensity={0}
    rotationIntensity={0}
      position={[1.0, 3.5, -2]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.45}
        depth={0.18}
        lineHeight={0.9}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        SDE-I @ CNEAR | Full Stack Dev {"\n"}
        WebRTC / WebSockets / Redis{"\n"}
        Open Source & Web3 builder{"\n"}
        Shipping fast with clean arch. 🚀

        <meshStandardMaterial
          color="#0038ff"
          emissive="#0038ff"
          emissiveIntensity={2.2}
          metalness={1.38}
          roughness={1.28}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}


function FlyingTitle4() {
  return (
    <Float 
    speed={0}
    floatIntensity={0}
    rotationIntensity={0}
      position={[1.0, 1.5, -2]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.46}
        depth={0.18}
        lineHeight={0.9}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Btw.I am damn awwsome.
        <meshStandardMaterial
          color="#c57d00"
          emissive="#c57d00"
          emissiveIntensity={2.2}
          metalness={1.38}
          roughness={1.28}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}


export default function Page() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <div className="h-screen w-screen bg-white">
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: isMobile ? [0, 2.5, 18] : [0, 2, 14],
          fov: 55,
        }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={["#ffffff"]} />
        <fog attach="fog" args={["#ffffff", 24, 60]} />

        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-6, 3, -4]} intensity={0.6} color="#ffffff" />
        <spotLight
          position={[0, 10, 4]}
          angle={0.3}
          penumbra={0.4}
          intensity={1.5}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <FlyingTitle />
          <FlyingTitle2 />
          <FlyingTitle3 />
          <FlyingTitle4/>
          <Scene />
          <Scene2/>
        </Suspense>

        <Sparkles
          count={120}
          speed={0.35}
          opacity={0.35}
          scale={[15, 10, 10]}
          color="#4af2ff"
        />

        {isMobile ? (
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={6}
            maxDistance={22}
          />
        ) : (
          <DesktopFPSControls />
        )}
        <Stats />
      </Canvas>
    </div>
  );
}
