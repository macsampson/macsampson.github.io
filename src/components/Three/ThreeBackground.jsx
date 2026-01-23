import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometries() {
    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 4) / 15, 0.1)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 8) / 15, 0.1)
    })

    return (
        <group ref={group}>
            {/* Main large icosahedron - Solid Metallic */}
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
                <mesh position={[2, 1, -5]} scale={1.8}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshPhysicalMaterial
                        color="#b441a5ff" // Slate 800
                        roughness={0.1}
                        metalness={0.1}
                        thickness={2}
                        transmission={0.6}
                        flatShading
                    />
                </mesh>
            </Float>

            {/* Glassy icosahedron */}
            <Float speed={2} rotationIntensity={2} floatIntensity={2}>
                <mesh position={[-3, -1, -4]} scale={1.2}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshPhysicalMaterial
                        color="#38bdf8" // Cyan/Light Blue
                        roughness={0.1}
                        metalness={0.2}
                        transmission={0.6}
                        thickness={2}
                        flatShading
                    />
                </mesh>
            </Float>

            {/* Dark Matte icosahedron */}
            <Float speed={1} rotationIntensity={2} floatIntensity={2}>
                <mesh position={[4, -3, -8]} scale={1.5}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshPhysicalMaterial
                        color="#37bd90ff" // Slate 800
                        roughness={0.4}
                        metalness={0.0}
                        transmission={0.6}
                        thickness={5}
                        flatShading
                    />
                </mesh>
            </Float>

            {/* Small accent icosahedron */}
            <Float speed={3} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[-5, 4, -10]} scale={0.6}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshPhysicalMaterial
                        color="#38bdf8"
                        roughness={0.1}
                        metalness={0.2}
                        transmission={0.6}
                        thickness={2}
                        flatShading
                    />
                </mesh>
            </Float>
        </group>
    )
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-[#0f172a]">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#38bdf8" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#64748b" />

                <FloatingGeometries />

                <Stars radius={100} depth={100} count={3000} factor={7} saturation={0} fade speed={1} />

                <fog attach="fog" args={['#0f172a', 10, 25]} />
            </Canvas>
        </div>
    )
}
