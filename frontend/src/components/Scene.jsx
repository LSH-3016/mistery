import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration, SSAO } from '@react-three/postprocessing'
import { ContactShadows, Environment } from '@react-three/drei'
import { BlendFunction } from 'postprocessing'
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
    if (!scenario) return { fog: '#1a1a25', ambient: 0.3, main: 1.0 }
    
    switch (scenario.case_title) {
      case '베이지 갤러리의 정전':
        return {
          fog: '#2a2520',
          ambient: 0.4,
          main: 1.2,
          accent1: { color: '#d4a574', intensity: 2.0, position: [-5, 3, -5] },
          accent2: { color: '#f5e6d3', intensity: 1.5, position: [5, 2, 0] },
          accent3: { color: '#8b7355', intensity: 1.2, position: [0, 2, -8] }
        }
      case '심야 연구실의 비밀':
        return {
          fog: '#0f1a25',
          ambient: 0.3,
          main: 1.0,
          accent1: { color: '#00ffff', intensity: 2.5, position: [-5, 3, -5] },
          accent2: { color: '#00ff88', intensity: 2.0, position: [5, 2, 0] },
          accent3: { color: '#6666ff', intensity: 1.8, position: [0, 2, -8] }
        }
      case '고층 빌딩의 추락':
        return {
          fog: '#1a1a2a',
          ambient: 0.5,
          main: 1.3,
          accent1: { color: '#6699ff', intensity: 2.2, position: [-5, 3, -5] },
          accent2: { color: '#ffffff', intensity: 1.8, position: [5, 2, 0] },
          accent3: { color: '#88aaff', intensity: 1.5, position: [0, 2, -8] }
        }
      default:
        return {
          fog: '#1a1a25',
          ambient: 0.3,
          main: 1.0,
          accent1: { color: '#ff6b6b', intensity: 2.0, position: [-5, 3, -5] },
          accent2: { color: '#ffe66d', intensity: 1.5, position: [5, 2, 0] },
          accent3: { color: '#4ecdc4', intensity: 1.5, position: [0, 2, -8] }
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
      
      {/* 메인 조명 (위에서 비추는 극적인 조명) - 그림자 강화 */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={config.main}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* 보조 조명 (반대편에서 부드럽게) - 림 라이트 효과 */}
      <directionalLight
        position={[-3, 8, -3]}
        intensity={config.main * 0.4}
        color="#aaaacc"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0003}
      />
      
      {/* 추가 전역 조명 (전체적으로 밝게) - 약하게 조정 */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#222222"
        intensity={0.3}
      />
      
      {/* 포인트 라이트들 (분위기 조명 - 더 강렬하게) */}
      <pointLight 
        position={config.accent1.position} 
        intensity={config.accent1.intensity} 
        color={config.accent1.color}
        distance={15}
        decay={2}
      />
      <pointLight 
        position={config.accent2.position} 
        intensity={config.accent2.intensity} 
        color={config.accent2.color}
        distance={15}
        decay={2}
      />
      <pointLight 
        position={config.accent3.position} 
        intensity={config.accent3.intensity} 
        color={config.accent3.color}
        distance={15}
        decay={2}
      />
      
      {/* 천장 조명 (약하게) */}
      <pointLight 
        position={[0, 4.5, -3]} 
        intensity={0.6}
        color="#ffffff"
        distance={12}
        decay={2}
      />
      
      {/* Fake GI - 바닥 반사광 (바닥에서 위로 빛 반사) */}
      <pointLight 
        position={[0, 0.1, -4]} 
        intensity={0.3}
        color={config.fog}
        distance={5}
        decay={2}
      />
      <pointLight 
        position={[-3, 0.1, -2]} 
        intensity={0.25}
        color={config.fog}
        distance={4}
        decay={2}
      />
      <pointLight 
        position={[3, 0.1, -5]} 
        intensity={0.25}
        color={config.fog}
        distance={4}
        decay={2}
      />
      
      {/* 스포트라이트 (중앙 집중 - 더 극적으로) - 그림자 강화 */}
      <spotLight
        position={[0, 8, -5]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.8}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0005}
      />

      {/* 안개 효과 (노아르 분위기) */}
      <fog attach="fog" args={[config.fog, 10, 35]} />

      {/* 씬 구성 요소 */}
      <Room />
      <Furniture />
      <Props />
      <Suspects />
      <EvidenceMarkers />

      {/* 접촉 그림자 - 바닥에 진하고 날카로운 그림자 */}
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.6}
        scale={15}
        blur={1.5}
        far={5}
        resolution={512}
        color="#000000"
      />

      {/* 환경 조명 - 미묘한 반사광 */}
      <Environment preset="night" />

      {/* 포스트 프로세싱 효과 - 성능 최적화 */}
      <EffectComposer multisampling={0}>
        {/* SSAO - 적절한 수준으로 조정 */}
        <SSAO
          samples={16}
          radius={0.2}
          intensity={30}
          luminanceInfluence={0.6}
          color="black"
          bias={0.015}
        />

        {/* 블룸 - 밝은 부분이 번지는 효과 */}
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.7}
          blendFunction={BlendFunction.ADD}
        />
        
        {/* 비네팅 - 화면 가장자리 어둡게 (시선 집중) */}
        <Vignette
          offset={0.3}
          darkness={0.6}
          blendFunction={BlendFunction.NORMAL}
        />

        {/* 색수차 - 렌즈 왜곡 효과 (아주 미세하게) */}
        <ChromaticAberration
          offset={[0.0003, 0.0003]}
          blendFunction={BlendFunction.NORMAL}
        />

        {/* 노이즈/그레인 - 필름 느낌 (미세하게) */}
        <Noise
          opacity={0.05}
          blendFunction={BlendFunction.OVERLAY}
        />
      </EffectComposer>
    </>
  )
}
