import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometries() {
    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + 0.25, 0.1)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10, 0.1)
    })

    return (
        <group ref={group}>
            <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
                <mesh position={[2, 1, -5]} scale={1.5}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshPhysicalMaterial
                        color="#1b1a17"
                        roughness={0}
                        metalness={0.1}
                        transmission={0.6}
                        thickness={2}
                        envMapIntensity={1}
                    />
                </mesh>
            </Float>

            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                <mesh position={[-3, -1, -4]} scale={1}>
                    <octahedronGeometry />
                    <meshPhysicalMaterial
                        color="#463a2e"
                        roughness={0.2}
                        metalness={0.5}
                        transmission={0.5}
                        thickness={1}
                    />
                </mesh>
            </Float>

            <Float speed={1} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[3, -2, -6]} scale={0.8}>
                    <dodecahedronGeometry />
                    <meshPhysicalMaterial
                        color="#8c7b6c"
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.9}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            </Float>
        </group>
    )
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-[#f5f2ed]">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#463a2e" />

                <FloatingGeometries />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                <fog attach="fog" args={['#f5f2ed', 10, 25]} />
            </Canvas>
        </div>
    )
}
