import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useGameStore from '../store/gameStore'
import Room from './Room'
import Furniture from './Furniture'
import EvidenceMarkers from './EvidenceMarkers'
import Props from './Props'
import Suspects from './Suspects'

export default function Scene() {
  const { scenario } = useGameStore()
  
  // 시나리오별 조명 및 색상 설정
  const getSceneConfig = () => {
    if (!scenario) return { fog: '#2a2a35', ambient: 0.6, main: 1.2 }
    
    switch (scenario.case_title) {
      case '베이지 갤러리의 정전':
        return {
          fog: '#3a3530',
          ambient: 0.7,
          main: 1.3,
          accent1: { color: '#d4a574', intensity: 0.6, position: [-5, 3, -5] },
          accent2: { color: '#f5e6d3', intensity: 0.5, position: [5, 2, 0] },
          accent3: { color: '#8b7355', intensity: 0.4, position: [0, 2, -8] }
        }
      case '심야 연구실의 비밀':
        return {
          fog: '#1a2530',
          ambient: 0.55,
          main: 1.1,
          accent1: { color: '#00ffff', intensity: 0.7, position: [-5, 3, -5] },
          accent2: { color: '#00ff88', intensity: 0.6, position: [5, 2, 0] },
          accent3: { color: '#4444ff', intensity: 0.5, position: [0, 2, -8] }
        }
      case '고층 빌딩의 추락':
        return {
          fog: '#2a2a35',
          ambient: 0.65,
          main: 1.25,
          accent1: { color: '#6699ff', intensity: 0.65, position: [-5, 3, -5] },
          accent2: { color: '#ffffff', intensity: 0.6, position: [5, 2, 0] },
          accent3: { color: '#88aaff', intensity: 0.5, position: [0, 2, -8] }
        }
      default:
        return {
          fog: '#2a2a35',
          ambient: 0.6,
          main: 1.2,
          accent1: { color: '#ff6b6b', intensity: 0.7, position: [-5, 3, -5] },
          accent2: { color: '#ffe66d', intensity: 0.5, position: [5, 2, 0] },
          accent3: { color: '#4ecdc4', intensity: 0.5, position: [0, 2, -8] }
        }
    }
  }

  const config = getSceneConfig()

  return (
    <>
      {/* 배경색 */}
      <color attach="background" args={[config.fog]} />
      
      {/* 조명 */}
      <ambientLight intensity={config.ambient} />
      
      {/* 메인 조명 (위에서 비추는 태양광) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={config.main}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* 보조 조명 (반대편에서 부드럽게) */}
      <directionalLight
        position={[-3, 8, -3]}
        intensity={config.main * 0.4}
        color="#ffffff"
      />
      
      {/* 포인트 라이트들 (분위기 조명) */}
      <pointLight 
        position={config.accent1.position} 
        intensity={config.accent1.intensity} 
        color={config.accent1.color}
        distance={10}
        decay={2}
      />
      <pointLight 
        position={config.accent2.position} 
        intensity={config.accent2.intensity} 
        color={config.accent2.color}
        distance={10}
        decay={2}
      />
      <pointLight 
        position={config.accent3.position} 
        intensity={config.accent3.intensity} 
        color={config.accent3.color}
        distance={10}
        decay={2}
      />
      
      {/* 천장 조명 (전체적으로 밝게) */}
      <pointLight 
        position={[0, 4.5, -3]} 
        intensity={0.8}
        color="#ffffff"
        distance={12}
        decay={2}
      />
      
      {/* 스포트라이트 (중앙 집중) */}
      <spotLight
        position={[0, 8, -5]}
        angle={0.6}
        penumbra={0.5}
        intensity={0.7}
        castShadow
        target-position={[0, 0, -5]}
      />

      {/* 안개 효과 (더 멀리서 시작) */}
      <fog attach="fog" args={[config.fog, 15, 50]} />

      {/* 씬 구성 요소 */}
      <Room />
      <Furniture />
      <Props />
      <Suspects />
      <EvidenceMarkers />
    </>
  )
}
