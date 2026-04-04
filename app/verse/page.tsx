"use client"
import React from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'


function Scene() {
    const gltf = useLoader(GLTFLoader, '/cyb.glb')
    return <primitive object={gltf.scene} />
}

export default function page() {
    return (
        <div className='h-screen w-screen mt-6  '>
            <Canvas>
                <Scene/>
                <OrbitControls />
                 <ambientLight />
            </Canvas>
        </div>
    )
}
