import { useRef, useState } from 'react'
import { Box, Cylinder, Torus, Sphere, Cone } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useGameStore from '../store/gameStore'

// 증거 타입별 3D 모델 컴포넌트
function EvidenceModel({ evidence, onClick }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  // 증거 타입에 따른 3D 모델 선택
  const renderEvidenceShape = () => {
    const clueType = evidence.clue_type || '물리적 증거'
    const baseColor = hovered ? '#ffdd44' : '#d4a574'
    
    switch (clueType) {
      case '범행 도구':
        // 칼/도구 형태
        return (
          <>
            {/* 칼날 */}
            <Box args={[0.15, 0.05, 0.6]} position={[0, 0, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial 
                color={hovered ? '#cccccc' : '#999999'}
                metalness={0.9}
                roughness={0.2}
              />
            </Box>
            {/* 손잡이 */}
            <Cylinder args={[0.04, 0.04, 0.25]} position={[0, 0, -0.35]} castShadow receiveShadow>
              <meshStandardMaterial 
                color="#442211" 
                roughness={0.8}
              />
            </Cylinder>
            {/* 받침대 */}
            <Cylinder args={[0.25, 0.25, 0.05]} position={[0, -0.15, 0]} receiveShadow>
              <meshStandardMaterial 
                color="#8b7355"
                roughness={0.7}
              />
            </Cylinder>
          </>
        )
      
      case '문서':
        // 종이/문서 형태
        return (
          <>
            {/* 종이 */}
            <Box args={[0.35, 0.02, 0.5]} castShadow receiveShadow>
              <meshStandardMaterial 
                color={hovered ? '#ffffdd' : '#f5f5dc'}
                roughness={0.9}
              />
            </Box>
            {/* 텍스트 라인들 */}
            <Box args={[0.28, 0.025, 0.03]} position={[0, 0.015, 0.12]}>
              <meshStandardMaterial color="#333333" />
            </Box>
            <Box args={[0.28, 0.025, 0.03]} position={[0, 0.015, 0.06]}>
              <meshStandardMaterial color="#333333" />
            </Box>
            <Box args={[0.28, 0.025, 0.03]} position={[0, 0.015, 0]}>
              <meshStandardMaterial color="#333333" />
            </Box>
            <Box args={[0.2, 0.025, 0.03]} position={[-0.04, 0.015, -0.06]}>
              <meshStandardMaterial color="#333333" />
            </Box>
          </>
        )
      
      case '디지털 증거':
        // 휴대폰/디지털 기기
        return (
          <>
            {/* 본체 */}
            <Box args={[0.25, 0.5, 0.05]} castShadow receiveShadow>
              <meshStandardMaterial 
                color={hovered ? '#2a2a2a' : '#1a1a1a'}
                metalness={0.7}
                roughness={0.3}
              />
            </Box>
            {/* 화면 */}
            <Box args={[0.22, 0.42, 0.051]} position={[0, 0.02, 0]}>
              <meshStandardMaterial 
                color={hovered ? '#00ddff' : '#00aacc'}
                emissive={hovered ? '#00ddff' : '#00aacc'}
                emissiveIntensity={0.3}
              />
            </Box>
            {/* 홈 버튼 */}
            <Cylinder args={[0.03, 0.03, 0.02]} position={[0, -0.2, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#444444" />
            </Cylinder>
          </>
        )
      
      case '영상 증거':
        // USB/메모리카드
        return (
          <>
            <Box args={[0.15, 0.35, 0.08]} castShadow receiveShadow>
              <meshStandardMaterial 
                color={hovered ? '#3366ff' : '#2244cc'}
                metalness={0.6}
                roughness={0.4}
              />
            </Box>
            {/* USB 커넥터 */}
            <Box args={[0.1, 0.15, 0.05]} position={[0, -0.25, 0]}>
              <meshStandardMaterial 
                color="#cccccc"
                metalness={0.9}
                roughness={0.2}
              />
            </Box>
          </>
        )
      
      case '독극물':
        // 병/약병
        return (
          <>
            {/* 병 본체 */}
            <Cylinder args={[0.12, 0.14, 0.45]} castShadow receiveShadow>
              <meshStandardMaterial 
                color={hovered ? '#66ff66' : '#44cc44'}
                transparent
                opacity={0.7}
                metalness={0.3}
                roughness={0.2}
              />
            </Cylinder>
            {/* 뚜껑 */}
            <Cylinder args={[0.13, 0.13, 0.08]} position={[0, 0.265, 0]} castShadow>
              <meshStandardMaterial 
                color="#333333"
                roughness={0.5}
              />
            </Cylinder>
            {/* 라벨 */}
            <Cylinder args={[0.125, 0.145, 0.15]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#ffffff"
                roughness={0.9}
              />
            </Cylinder>
            {/* 해골 마크 */}
            <Sphere args={[0.05]} position={[0, 0.05, 0.13]}>
              <meshStandardMaterial color="#ff0000" />
            </Sphere>
          </>
        )
      
      case '현장 증거':
        // 증거 봉투
        return (
          <>
            <Box args={[0.4, 0.02, 0.3]} castShadow receiveShadow>
              <meshStandardMaterial 
                color={hovered ? '#ffeeaa' : '#f5e6d3'}
                roughness={0.8}
              />
            </Box>
            {/* 봉인 테이프 */}
            <Box args={[0.42, 0.025, 0.05]} position={[0, 0.015, 0]}>
              <meshStandardMaterial 
                color="#ff0000"
                roughness={0.6}
              />
            </Box>
          </>
        )
      
      case '물리적 증거':
      default:
        // 증거 상자
        return (
          <>
            {/* 상자 */}
            <Box args={[0.35, 0.25, 0.35]} castShadow receiveShadow>
              <meshStandardMaterial 
                color={baseColor}
                roughness={0.7}
                metalness={0.1}
              />
            </Box>
            {/* 증거 표시 테이프 */}
            <Box args={[0.37, 0.04, 0.1]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={hovered ? 0.4 : 0.2}
              />
            </Box>
            <Box args={[0.1, 0.04, 0.37]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={hovered ? 0.4 : 0.2}
              />
            </Box>
          </>
        )
    }
  }

  return (
    <group
      ref={groupRef}
      position={[evidence.position.x, evidence.position.y, evidence.position.z]}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      {renderEvidenceShape()}
    </group>
  )
}

export default function EvidenceMarkers() {
  const { scenario, collectedEvidence, collectEvidence } = useGameStore()

  if (!scenario) return null

  return (
    <>
      {scenario.evidence.map((evidence) => {
        const isCollected = collectedEvidence.includes(evidence.id)
        if (isCollected) return null

        return (
          <EvidenceModel
            key={evidence.id}
            evidence={evidence}
            onClick={() => collectEvidence(evidence.id)}
          />
        )
      })}
    </>
  )
}
