"use client";

import React, { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  OrbitControls,
  Float,
  Text,
  Sparkles,
  Stats,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

// Simple deep clone function for scene objects
function deepCloneScene(source: THREE.Object3D): THREE.Object3D {
  const cloned = source.clone();
  cloned.traverse((child: any) => {
    if (child.isMesh && child.material) {
      if (Array.isArray(child.material)) {
        child.material = child.material.map((m: any) => m.clone());
      } else {
        child.material = child.material.clone();
      }
    }
  });
  return cloned;
}


const CAR_POSITION: [number, number, number] = [2.13, 2.7989, 2.28]; // adjust here to move cyb2
const CAR_SCALE: [number, number, number] = [0.46, 0.46, 0.46]; // adjust here to resize cyb2

function Scene() {
  const gltf = useLoader(GLTFLoader, "/cyb.glb");
  const tiles = React.useMemo(
    () => [
      [0, 0, 0],
      [8, 0, 0],
      [-8, 0, 0],
      [0, 0, 8],
      [0, 0, -8],
      [8, 0, 8],
      [8, 0, -8],
      [-8, 0, 8],
      [-8, 0, -8],
    ],
    []
  );

  const clones = React.useMemo(() => {
    return tiles.map((pos, idx) => {
      const root = deepCloneScene(gltf.scene);
      root.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      root.position.set(pos[0], pos[1], pos[2]);
      return <primitive key={`cyb-tile-${idx}`} object={root} />;
    });
  }, [gltf.scene, tiles]);

  return <group>{clones}</group>;
}

function Scene2() {
  const gltf = useLoader(GLTFLoader, "/cyb2.glb");
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!gltf.scene) return;

    gltf.scene.rotation.y = Math.PI;

  gltf.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material.envMapIntensity = 3; // more reflections

        if ("emissiveIntensity" in child.material) {
          child.material.emissiveIntensity = 3.5; // NOT 100
          child.material.emissive = child.material.color; // match glow color
        }
      }
    }
  });
}, [gltf.scene]);

  const { actions } = useAnimations(gltf.animations, group);

  // Play all available animation clips on load
  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset().play();
      }
    });
  }, [actions]);

  return (
    <>
      <group
        ref={group}
        scale={CAR_SCALE}
        position={CAR_POSITION}
        rotation={[ -Math.PI * 0.08, 0, 0]}
      >
        <primitive object={gltf.scene} />
        {/* Neon underglow disk */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} >
          
  <meshBasicMaterial color="#FFB812" transparent opacity={0.45} />
        </mesh>
      </group>
      <ambientLight intensity={0.4} color="#FF8AFF" />
      <hemisphereLight
        intensity={0.35}
        color="#FF8AFF"
        groundColor="#1a1a1a"
        position={[0, 3.5, 0]}
      />
      <pointLight position={[0, 2.6, 0]} intensity={1.0} color="#ff6bfd" decay={0.1} />
      <pointLight position={[1.2, 1.8, 1.2]} intensity={1.0} color="#6ff7ff" decay={2} />
      <pointLight position={[-1.2, 1.6, -1.2]} intensity={0.8} color="#ff6bfd" decay={2} />
      <spotLight
        position={[-2.4, 4.2, 2.2]}
        angle={0.55}
        penumbra={0.45}
        intensity={1.5}
        color="#fff4e5"
        castShadow
      />
      <spotLight
        position={[0, 3.2, 0]}
        angle={0.95}
        penumbra={0.7}
        intensity={1.2}
        color="#7cfbff"
      />
      {/* Caption above the car */}
      <Float
        speed={0}
        floatIntensity={0}
        rotationIntensity={0}
        position={[0, 3.5, 0]}
      >
        <Text
          font="/nothing-font-5x7.otf"
          fontSize={0.32}
          lineHeight={1}
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          {"Damn it can crash"}
          <meshStandardMaterial
            color="#ff4bcd"
            emissive="#ff4bcd"
            emissiveIntensity={2.4}
            metalness={1.1}
            roughness={1.15}
            side={THREE.DoubleSide}
          />
        </Text>
      </Float>
    </>
  );
}

// Softly animate background/fog colors over time for a living atmosphere
function DynamicAtmosphere() {
  const { scene, gl } = useThree();
  const startBg = useMemo(() => new THREE.Color("#03050b"), []);
  const endBg = useMemo(() => new THREE.Color("#120027"), []);
  const startFog = useMemo(() => new THREE.Color("#05070f"), []);
  const endFog = useMemo(() => new THREE.Color("#1a0c2a"), []);

  useFrame(({ clock }) => {
    const t = (Math.sin(clock.elapsedTime * 0.15) + 1) / 2; // 0..1
    scene.background = startBg.clone().lerp(endBg, t);
    if (scene.fog) {
      scene.fog.color = startFog.clone().lerp(endFog, t);
    }
    gl.setClearColor(scene.background);
  });
  return null;
}

// Orbiting rainbow point lights for dynamic highlights
function RainbowOrbLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const r = 6;
    const y = 3 + Math.sin(t * 0.8) * 0.5;
    if (light1.current) {
      light1.current.position.set(
        Math.cos(t * 0.6) * r,
        y,
        Math.sin(t * 0.6) * r
      );
      light1.current.color.setHSL(((t * 0.1) % 1), 0.7, 0.6);
    }
    if (light2.current) {
      light2.current.position.set(
        Math.cos(t * -0.5) * (r + 1.5),
        2.5 + Math.cos(t * 0.7) * 0.4,
        Math.sin(t * -0.5) * (r + 1.5)
      );
      light2.current.color.setHSL(((t * 0.1 + 0.5) % 1), 0.7, 0.55);
    }
  });
  return (
    <>
      <pointLight ref={light1} intensity={1.0} decay={1.8} distance={20} />
      <pointLight ref={light2} intensity={0.8} decay={1.6} distance={20} />
    </>
  );
}

// Pulsing lava-like glow plane under the car
function LavaGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.2); // reduced frequency
    mat.emissiveIntensity = 0.8 + pulse * 0.8; // reduced intensity
    mat.color.setHSL(0.05 + pulse * 0.05, 1, 0.5);
    mat.emissive.setHSL(0.04 + pulse * 0.06, 1, 0.45 + pulse * 0.1);
  });
  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[CAR_POSITION[0], 0.05, CAR_POSITION[2]]}
    >
      <circleGeometry args={[5.5, 32]} />
      <meshStandardMaterial
        color="#ff6b00"
        emissive="#ff3b00"
        emissiveIntensity={1.8}
        roughness={0.4}
        metalness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}


function DesktopFPSControls() {
  const { camera } = useThree();
  const controls = useRef<any>(null);
  const followCar = useRef(true); // start by orbiting cyb2; movement keys drop to free fly
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
      followCar.current = false; // any move key exits orbit-follow mode
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
    const moveSpeed = 3;
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

    if (controls.current) {
      controls.current.autoRotate = followCar.current;
      if (followCar.current) {
      controls.current.target.set(...CAR_POSITION);
      controls.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom
      enableDamping
      dampingFactor={0.08}
      autoRotate
      autoRotateSpeed={0.6}
      minDistance={2.2}
      maxDistance={16}
      target={CAR_POSITION}
    />
  );
}

function FlyingTitle() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (textRef.current && textRef.current.material) {
      const t = clock.elapsedTime;
      const mat = textRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(t * 1.2) * 0.8;
    }
  });

  return (
    <Float
    speed={0}
    floatIntensity={0}
    rotationIntensity={0}
      position={[0, 6.4, -6]}
    >
      {/* Removed redundant glow lights - using material emissive instead */}
      <Text
        ref={textRef}
        font="/nothing-font-5x7.otf"
        fontSize={0.65}
        lineHeight={1}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {"SOUMYA's"+
         "  "+"VERSE"}
        <meshStandardMaterial
          color="#00dd00"
          emissive="#00ff00"
          emissiveIntensity={1.5}
          metalness={1.45}
          roughness={0.85}
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
      position={[2.2, 4.6, -6.2]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.38}
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
      position={[-4.5, 3.2, 3.8]}
      rotation={[0, Math.PI / 3, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.38}
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
      position={[3.2, 2.0, -3.2]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.4}
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

function FlyingTitleBack1() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (textRef.current && textRef.current.material) {
      const t = clock.elapsedTime;
      const mat = textRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.0 + Math.sin(t * 1.2 + Math.PI) * 1.5;
    }
  });

  return (
    <Float
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[0, 6.0, 6]}
      rotation={[0, Math.PI, 0]}
    >
      {/* Removed redundant glow lights - using material emissive instead */}
      <Text
        ref={textRef}
        font="/nothing-font-5x7.otf"
        fontSize={0.6}
        lineHeight={1}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {"SOUMYA's" + "  " + "VERSE"}
        <meshStandardMaterial
          color="#00dd00"
          emissive="#00ff00"
          emissiveIntensity={3.0}
          metalness={1.45}
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function FlyingTitleBack2() {
  return (
    <Float
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[-2.2, 4.4, 6.2]}
      rotation={[0, Math.PI, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.36}
        lineHeight={0.9}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Hello, I'm Soumya Jaiswal{"\n"}
        Building joyful products{"\n"}
        Crafting clean systems{"\n"}
        With a love for speed. 🚀
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

function FlyingTitleSideRight() {
  return (
    <Float
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[7, 4.2, -0.5]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.48}
        lineHeight={0.95}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Full Stack Craft
        {"\n"}Web3 & Realtime
        {"\n"}Systems that scale
        <meshStandardMaterial
          color="#00b3ff"
          emissive="#00b3ff"
          emissiveIntensity={2.1}
          metalness={1.1}
          roughness={1.2}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function FlyingTitleSideLeft() {
  return (
    <Float
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[-7, 4.2, -0.5]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.48}
        lineHeight={0.95}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Competitive Prog
        {"\n"}Clean Architecture
        {"\n"}Shipping fast 🚀
        <meshStandardMaterial
          color="#ff8b00"
          emissive="#ff8b00"
          emissiveIntensity={2.1}
          metalness={1.1}
          roughness={1.2}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function FlyingTitleNoText() {
  return (
    <Float
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[3.5, 2.8, 4.5]}
      rotation={[0, -Math.PI / 6, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.14}
        lineHeight={0.95}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        'Sorry, Soumya we have {"\n"} someone better than you'{"\n"}
        Really really  You think so{"\n"} I'M BETTER
        <meshStandardMaterial
          color="#ff4b4b"
          emissive="#ff4b4b"
          emissiveIntensity={1.8}
          metalness={1.0}
          roughness={1.1}
          
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

// Moon component with craters and enhanced glow
function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (moonRef.current) {
      const t = clock.elapsedTime;
      const mat = moonRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.2 + Math.sin(t * 0.5) * 0.8;
    }
  });

  return (
    <group position={[12, 18, -15]}>
      {/* Main moon sphere with enhanced glow */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[3.5, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffeb99"
          emissiveIntensity={1.0}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {/* Crater 1 */}
      <mesh position={[0.8, 1.2, -1.5]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial
          color="#a9a9a9"
          emissive="#606060"
          emissiveIntensity={0.8}
          roughness={0.9}
        />
      </mesh>
      {/* Crater 2 */}
      <mesh position={[-1.2, -0.8, 1.8]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#a9a9a9"
          emissive="#606060"
          emissiveIntensity={0.8}
          roughness={0.9}
        />
      </mesh>
      {/* Crater 3 */}
      <mesh position={[1.5, -1.5, 0.5]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#a9a9a9"
          emissive="#606060"
          emissiveIntensity={0.8}
          roughness={0.9}
        />
      </mesh>
      {/* Strong diffuse glow */}
      <pointLight intensity={2.0} color="#ffeb99" distance={20} decay={2} />
      {/* Rim light for shine */}
      <pointLight intensity={1.0} color="#ffffff" distance={18} decay={2} position={[2, 1, 2]} />
      {/* Bloom effect light */}
      <pointLight intensity={0.8} color="#ffffcc" distance={15} decay={1.5} />
    </group>
  );
}

// Rainbow arc component
function RainbowArc() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.15;
    }
  });

  const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
  
  return (
    <group ref={groupRef} position={[-8, 8, 10]}>
      {colors.map((color, idx) => (
        <mesh key={`rainbow-${idx}`} position={[0, 0, idx * 0.08]}>
          <torusGeometry args={[4.5 + idx * 0.35, 0.25, 16, 32, 0, Math.PI]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.2}
            roughness={0.4}
            metalness={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}



function CodingText1() {
  return (
    <Float 
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[-3.5, 7.2, 2.5]}
      rotation={[0, Math.PI / 4, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.28}
        lineHeight={0.8}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        LeetCode Top 0.5%{"\n"}
        DSA Master{"\n"}Problem solver
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={2.1}
          metalness={1.2}
          roughness={1.1}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function CodingText2() {
  return (
    <Float 
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[5.2, 5.5, -4.2]}
      rotation={[0, -Math.PI / 6, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.26}
        lineHeight={0.8}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        OWASP Contributor{"\n"}
        Hacktoberfest 2025{"\n"}Open source lover
        <meshStandardMaterial
          color="#ff1493"
          emissive="#ff1493"
          emissiveIntensity={2.0}
          metalness={1.2}
          roughness={1.1}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function CodingText3() {
  return (
    <Float 
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[-6.5, 3.8, 5.5]}
      rotation={[0, Math.PI / 3, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.27}
        lineHeight={0.85}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        WebRTC / WebSockets{"\n"}
        Real-time Systems{"\n"}Backend architect
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2.0}
          metalness={1.1}
          roughness={1.15}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function CodingText4() {
  return (
    <Float 
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[2.5, 6.5, 4.8]}
      rotation={[0, -Math.PI / 5, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.25}
        lineHeight={0.8}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Rust & Web3{"\n"}Blockchain dev{"\n"}Innovate-A-Thon finalist
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={2.0}
          metalness={1.1}
          roughness={1.2}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function CodingText5() {
  return (
    <Float 
      speed={0}
      floatIntensity={0}
      rotationIntensity={0}
      position={[-2.2, 8.5, -5.5]}
      rotation={[0, Math.PI * 0.7, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.24}
        lineHeight={0.8}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Docker / Kubernetes{"\n"}Scalable systems{"\n"}DevOps pro
        <meshStandardMaterial
          color="#00ddff"
          emissive="#00ddff"
          emissiveIntensity={2.0}
          metalness={1.15}
          roughness={1.1}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}


// Falling binary/code text like the Matrix effect
function FallingBinaryText() {
  const columns = 4;
  const matrix: React.ReactNode[] = [];

  for (let col = 0; col < columns; col++) {
    const chars = "01abcdef_()[]{}<>./;:+=*&|^@#$%!?";
    const randomChars = Array(10).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]);
    
    matrix.push(
      <FallingColumnText
        key={`binary-col-${col}`}
        column={col}
        totalColumns={columns}
        characters={randomChars}
      />
    );
  }

  return <>{matrix}</>;
}

function FallingColumnText({ column, totalColumns, characters }: { column: number; totalColumns: number; characters: string[] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const xPos = -6 + (column * 12) / totalColumns;
  const speed = 2 + Math.random() * 3;
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime;
      groupRef.current.position.y = 10 - (t * speed) % 20;
      groupRef.current.position.x = xPos + Math.sin(t * 0.5 + column) * 0.3;
    }
  });

  const colors = [
    "#00ff88",  // neon green
    "#ff1493",  // deep pink
    "#00ffff",  // cyan
    "#ffaa00",  // orange
    "#00ddff",  // light cyan
    "#ff00ff",  // magenta
  ];

  return (
    <group ref={groupRef} position={[xPos, 10, -8]}>
      {characters.map((_, idx) => (
        <mesh key={`char-${idx}`} position={[0, -idx * 0.3, 0]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial
            color={colors[idx % colors.length]}
            emissive={colors[idx % colors.length]}
            emissiveIntensity={0.5}
            roughness={0.5}
            metalness={0.2}
            transparent
            opacity={0.5 - idx * 0.03}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Tech Stack Skills scattered around
const techSkills = [
  "React", "Node.js", "TypeScript", "Python", "Docker",
  "PostgreSQL", "Redis", "WebRTC", "Next.js", "AWS",
  "GraphQL", "Rust", "WebGL", "Three.js", "Git"
];

const colorPalette = [
  "#00ff88",
  "#ff1493",
  "#00ffff",
  "#ffaa00",
  "#00ddff",
  "#ff00ff",
  "#00ffaa",
  "#ffdd00",
  "#ff00aa",
  "#00ffdd"
];

function TechSkillText({ skill, index }: { skill: string; index: number }) {
  const posX = -10 + (index % 5) * 5 + (Math.random() - 0.5) * 2;
  const posY = 4 + Math.floor(index / 5) * 2.5 + (Math.random() - 0.5) * 1.5;
  const posZ = -8 + Math.random() * 8;
  const color = colorPalette[index % colorPalette.length];
  const rotY = Math.random() * Math.PI * 2;
  
  return (
    <Float
      speed={0.5}
      floatIntensity={0.3}
      rotationIntensity={0.2}
      position={[posX, posY, posZ]}
      rotation={[0, rotY, 0]}
    >
      <Text
        font="/nothing-font-5x7.otf"
        fontSize={0.22}
        lineHeight={0.8}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {skill}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.6}
          metalness={1.1}
          roughness={1.0}
          side={THREE.DoubleSide}
        />
      </Text>
    </Float>
  );
}

function TechSkillsCloud() {
  return (
    <>
      {techSkills.map((skill, idx) => (
        <TechSkillText key={`tech-${idx}`} skill={skill} index={idx} />
      ))}
    </>
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
    <div className="h-screen w-screen bg-white relative">
      <Canvas
        dpr={[1, 1]}
        camera={{
          position: isMobile ? [5, 1.6, 8.66] : [4, 1.3, 6.93],
          fov: 50,
        }}
        gl={{
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          powerPreference: "high-performance",
          precision: "lowp",
        }}
        frameloop="demand"
      >
        <color attach="background" args={["#03050b"]} />
        <fog attach="fog" args={["#05070f", 20, 50]} />

        <DynamicAtmosphere />
        <RainbowOrbLights />
        <ambientLight intensity={0.25} color="#4aa0ff" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.6}
          color="#9cc9ff"
          castShadow={false}
        />
        <pointLight position={[-6, 3, -4]} intensity={0.6} color="#6ad1ff" />
        <spotLight
          position={[0, 10, 4]}
          angle={0.3}
          penumbra={0.4}
          intensity={1.2}
          color="#b8d6ff"
        />

        <Suspense fallback={null}>
          <TechSkillsCloud />
          <FlyingTitle />
          <FlyingTitle2 />
          <FlyingTitle3 />
          <FlyingTitle4/>
          <FlyingTitleBack1/>
          <FlyingTitleBack2/>
          <FlyingTitleSideRight/>
          <FlyingTitleSideLeft/>
          <FlyingTitleNoText />
          <CodingText1 />
          <CodingText2 />
          <CodingText3 />
          <CodingText4 />
          <CodingText5 />
            <Moon />
            <RainbowArc />
          <Scene />
          <Scene2/>
        </Suspense>

        <Sparkles
          count={20}
          speed={0.35}
          opacity={0.35}
          scale={[15, 10, 10]}
          color="#5df4ff"
        />

        <DesktopFPSControls />
        <Stats />
      </Canvas>
      
      {/* Watermark */}
      <div className="absolute left-4 top-4 z-10 pointer-events-none">
        <div className="text-sm font-bold tracking-widest" style={{
          background: 'linear-gradient(135deg, #00ff88 0%, #00ffff 50%, #ff00ff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 10px rgba(0, 255, 136, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)',
          filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.5))',
          fontSize: '11px',
          letterSpacing: '2px',
          fontFamily: 'monospace',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          © SOUMYA'S VERSE
        </div>
        <div style={{
          fontSize: '10px',
          color: '#00ff88',
          marginTop: '2px',
          letterSpacing: '1px',
          fontFamily: 'monospace',
          opacity: 0.7,
          textShadow: '0 0 5px rgba(0, 255, 136, 0.4)'
        }}>
          Full-Stack Dev
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
