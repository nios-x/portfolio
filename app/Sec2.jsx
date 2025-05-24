'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Model';

export default function Page() {
  const modelRef = useRef();
  
  // 👇 Track window width to adjust scale
  const [scale, setScale] = useState(getScale(window.innerWidth));

  
  useEffect(() => {
    const handleResize = () => {
      setScale(getScale(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas camera={{ position: [1, 1, 6], fov: 50 }}>
      <ambientLight intensity={2} color="#7B3FBF" />
      <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.3} color="#8e44ad" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#5e3370" />

      <Suspense fallback={null}>
        <Model position={[0.9, 0, 1.0]} ref={modelRef} scale={scale} />
      </Suspense>
    </Canvas>
  );
}

// 📏 Utility function to determine scale based on width
function getScale(width) {
  if (width > 1200) return 0.7;
  if (width > 800) return 0.55;
  if (width > 600) return 0.45;
  return 0.35; // smallest for mobile
}
