'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Model';

export default function Page() {
  const modelRef = useRef();

  // ✅ Delay scale state until we are on the client
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const updateScale = () => setScale(getScale(window.innerWidth));
    updateScale(); // Set scale on mount
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // ⛔ Wait until scale is initialized (to avoid passing undefined to <Model>)
  if (scale === null) return null;

  return (
<Canvas camera={{ position: [1, 1, 6], fov: 50 }}>
  <ambientLight intensity={1.5} color="#ffffff" />
  
  <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" castShadow />
  <pointLight position={[-5, -5, 5]} intensity={0.7} color="#ffccff" />
  <pointLight position={[5, -3, -5]} intensity={0.5} color="#ffffff" />
  <spotLight position={[0, 5, 5]} angle={0.3} intensity={1} penumbra={1} castShadow />

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
  return 0.35;
}
