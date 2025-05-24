'use client';
import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Model = forwardRef((props, ref) => {
  const { scene } = useGLTF('/abc.glb');
  const groupRef = useRef();

  useImperativeHandle(ref, () => groupRef.current);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.aoMap) {
          child.material.aoMapIntensity = 1.2;
          child.material.needsUpdate = true;
        }
        child.material.metalness = 0.9;
        child.material.roughness = 0.15;
        child.material.color = new THREE.Color(0.6, 0.2, 0.8);
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);
const elapsed = useRef(0);

useFrame((state, delta) => {
  if (!groupRef.current) return;

  elapsed.current += delta;

  const targetZ = Math.sin(elapsed.current * 0.3) * 0.1;
  const targetX = Math.sin(elapsed.current * 0.2) * 0.06;
  const targetY = 0.02 * Math.sin(elapsed.current * 0.5);

  groupRef.current.rotation.z = THREE.MathUtils.lerp(
    groupRef.current.rotation.z,
    targetZ,
    0.05
  );

  groupRef.current.rotation.x = THREE.MathUtils.lerp(
    groupRef.current.rotation.x,
    targetX,
    0.05
  );

  groupRef.current.position.y = THREE.MathUtils.lerp(
    groupRef.current.position.y,
    targetY,
    0.05
  );
});


  return (
    <group ref={groupRef} {...props}>
      <primitive rotation={[0,-0.3,0]} object={scene} />
    </group>
  );
});
