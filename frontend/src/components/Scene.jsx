import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
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
          main: 1.4,
          accent1: { color: '#d4a574', intensity: 1.8, position: [-5, 3, -5] },
          accent2: { color: '#f5e6d3', intensity: 1.2, position: [5, 2, 0] },
          accent3: { color: '#8b7355', intensity: 1.0, position: [0, 2, -8] }
        }
      case '심야 연구실의 비밀':
        return {
          fog: '#1a2530',
          ambient: 0.6,
          main: 1.3,
          accent1: { color: '#00ffff', intensity: 2.0, position: [-5, 3, -5] },
          accent2: { color: '#00ff88', intensity: 1.6, position: [5, 2, 0] },
          accent3: { color: '#6666ff', intensity: 1.4, position: [0, 2, -8] }
        }
      case '고층 빌딩의 추락':
        return {
          fog: '#2a2a35',
          ambient: 0.8,
          main: 1.5,
          accent1: { color: '#6699ff', intensity: 1.8, position: [-5, 3, -5] },
          accent2: { color: '#ffffff', intensity: 1.4, position: [5, 2, 0] },
          accent3: { color: '#88aaff', intensity: 1.2, position: [0, 2, -8] }
        }
      default:
        return {
          fog: '#2a2a35',
          ambient: 0.6,
          main: 1.2,
          accent1: { color: '#ff6b6b', intensity: 1.6, position: [-5, 3, -5] },
          accent2: { color: '#ffe66d', intensity: 1.2, position: [5, 2, 0] },
          accent3: { color: '#4ecdc4', intensity: 1.2, position: [0, 2, -8] }
        }
    }
  }

  const config = getSceneConfig()

  return (
    <>
      {/* 배경색 - 더 어둡게 */}
      <color attach="background" args={[config.fog]} />
      
      {/* 조명 - 노아르 스타일로 어둡고 극적으로 */}
      <ambientLight intensity={config.ambient} />
      
      {/* 메인 조명 (위에서 비추는 극적인 조명) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={config.main}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      {/* 보조 조명 (반대편에서 부드럽게) */}
      <directionalLight
        position={[-3, 8, -3]}
        intensity={config.main * 0.5}
        color="#aaaacc"
      />
      
      {/* 추가 전역 조명 (전체적으로 밝게) */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.5}
      />
      
      {/* 포인트 라이트들 (분위기 조명 - 더 강렬하게) */}
      <pointLight 
        position={config.accent1.position} 
        intensity={config.accent1.intensity} 
        color={config.accent1.color}
        distance={12}
        decay={2}
      />
      <pointLight 
        position={config.accent2.position} 
        intensity={config.accent2.intensity} 
        color={config.accent2.color}
        distance={12}
        decay={2}
      />
      <pointLight 
        position={config.accent3.position} 
        intensity={config.accent3.intensity} 
        color={config.accent3.color}
        distance={12}
        decay={2}
      />
      
      {/* 천장 조명 (약하게) */}
      <pointLight 
        position={[0, 4.5, -3]} 
        intensity={0.8}
        color="#ffffff"
        distance={10}
        decay={2}
      />
      
      {/* 스포트라이트 (중앙 집중 - 더 극적으로) */}
      <spotLight
        position={[0, 8, -5]}
        angle={0.5}
        penumbra={0.7}
        intensity={1.6}
      />

      {/* 안개 효과 (더 가깝게 시작해서 미스테리한 분위기) */}
      <fog attach="fog" args={[config.fog, 12, 40]} />

      {/* 씬 구성 요소 */}
      <Room />
      <Furniture />
      <Props />
      <Suspects />
      <EvidenceMarkers />

      {/* 포스트 프로세싱 효과 - 최적화됨 */}
      <EffectComposer multisampling={0}>
        {/* 블룸 - 밝은 부분이 번지는 효과 */}
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.7}
        />
        
        {/* 비네팅 - 화면 가장자리 어둡게 */}
        <Vignette
          offset={0.3}
          darkness={0.5}
        />
      </EffectComposer>
    </>
  )
}
