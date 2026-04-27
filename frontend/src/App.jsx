import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Scene from './components/Scene'
import UI from './components/UI'
import useGameStore from './store/gameStore'
import './App.css'

function App() {
  const { loadScenario, loading } = useGameStore()

  useEffect(() => {
    loadScenario()
  }, [loadScenario])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p style={{ fontSize: '1.1em', marginTop: '10px' }}>시나리오 생성 중...</p>
        <p style={{ fontSize: '0.9em', opacity: 0.7, marginTop: '5px' }}>
          미스테리를 준비하고 있습니다
        </p>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Canvas
        camera={{ 
          position: [3, 2.5, 6], 
          fov: 65,
          near: 0.1,
          far: 100
        }}
        shadows
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Scene />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 1, -2]}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.5}
        />
      </Canvas>
      <UI />
    </div>
  )
}

export default App
