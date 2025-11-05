'use client'
import { Canvas } from '@react-three/fiber'
import { useFBX, OrbitControls, CameraControls } from '@react-three/drei'
import React, { Suspense } from 'react'

function Model() {
  const fbx = useFBX(
    '/assets/low-poly-gaming-room/source/low poly gaming room.fbx',
  )
  return <primitive object={fbx} scale={0.01} position={[0, -1, 0]} />
}

export default function Login3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <CameraControls
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            minDistance={2}
            maxDistance={5}
            polarAngle={Math.PI / 3}
            distance={5}
            azimuthAngle={140 * (Math.PI / 180)}
            maxAzimuthAngle={190 * (Math.PI / 180)}
            minAzimuthAngle={90 * (Math.PI / 180)}
            makeDefault
          />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}
