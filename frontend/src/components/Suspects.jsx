import { useRef, useState } from 'react'
import { Box, Cylinder, Sphere, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useGameStore from '../store/gameStore'

// 간단한 3D 사람 모델
function SuspectCharacter({ suspect, position, onClick }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  // 용의자 역할에 따른 외모 특징
  const getAppearance = () => {
    const role = suspect.role

    // 기본 색상
    let skinColor = '#ffdbac'
    let hairColor = '#2a2a2a'
    let clothesColor = '#4a4a4a'
    let accessory = null

    // 역할별 외모 커스터마이징
    if (role.includes('작가') || role.includes('예술')) {
      clothesColor = '#8b7355' // 베이지/갈색 (물감 묻은 느낌)
      hairColor = '#3d2817'
      accessory = 'paint' // 물감 얼룩
    } else if (role.includes('큐레이터') || role.includes('실장')) {
      clothesColor = '#2a2a3a' // 정장 느낌
      hairColor = '#1a1a1a'
      accessory = 'formal' // 정장
    } else if (role.includes('보안') || role.includes('청소')) {
      clothesColor = '#3a4a5a' // 유니폼 느낌
      hairColor = '#4a4a4a'
      accessory = 'uniform'
    } else if (role.includes('연구원')) {
      clothesColor = '#f5f5f5' // 흰 가운
      hairColor = '#2a2a2a'
      accessory = 'labcoat'
    } else if (role.includes('임원') || role.includes('회장') || role.includes('전무')) {
      clothesColor = '#1a1a2a' // 고급 정장
      hairColor = '#3a3a3a'
      accessory = 'suit'
    } else if (role.includes('비서')) {
      clothesColor = '#4a3a5a' // 단정한 복장
      hairColor = '#2a1a1a'
      accessory = 'formal'
    }

    return { skinColor, hairColor, clothesColor, accessory }
  }

  const appearance = getAppearance()

  return (
    <group
      ref={groupRef}
      position={position}
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
      {/* 몸통 - 어두운 실루엣 */}
      <Box 
        args={[0.4, 0.6, 0.25]} 
        position={[0, 0.9, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color={hovered ? appearance.clothesColor : '#3a3a3a'}
          roughness={0.9}
          metalness={0.0}
          emissive={hovered ? appearance.clothesColor : '#2a2a2a'}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Box>

      {/* 머리 - 얼굴 없는 실루엣 */}
      <Sphere args={[0.18]} position={[0, 1.4, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? appearance.skinColor : '#2a2a2a'}
          roughness={1.0}
          emissive={hovered ? appearance.skinColor : '#1a1a1a'}
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </Sphere>

      {/* 머리카락 - 어두운 실루엣 */}
      <Sphere args={[0.19]} position={[0, 1.48, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#1a1a1a' : '#0a0a0a'}
          roughness={1.0}
          emissive={hovered ? '#1a1a1a' : '#000000'}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Sphere>

      {/* 팔 (왼쪽) - 실루엣 */}
      <Box args={[0.12, 0.5, 0.12]} position={[-0.26, 0.85, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? appearance.clothesColor : '#3a3a3a'}
          roughness={0.9}
          emissive={hovered ? appearance.clothesColor : '#2a2a2a'}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Box>
      <Box args={[0.1, 0.35, 0.1]} position={[-0.26, 0.4, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? appearance.skinColor : '#2a2a2a'}
          roughness={1.0}
          emissive={hovered ? appearance.skinColor : '#1a1a1a'}
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </Box>

      {/* 팔 (오른쪽) - 실루엣 */}
      <Box args={[0.12, 0.5, 0.12]} position={[0.26, 0.85, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? appearance.clothesColor : '#3a3a3a'}
          roughness={0.9}
          emissive={hovered ? appearance.clothesColor : '#2a2a2a'}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Box>
      <Box args={[0.1, 0.35, 0.1]} position={[0.26, 0.4, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? appearance.skinColor : '#2a2a2a'}
          roughness={1.0}
          emissive={hovered ? appearance.skinColor : '#1a1a1a'}
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </Box>

      {/* 다리 (왼쪽) - 실루엣 */}
      <Box args={[0.15, 0.6, 0.15]} position={[-0.12, 0.3, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#2a2a2a' : '#1a1a1a'}
          roughness={0.95}
          emissive={hovered ? '#1a1a1a' : '#000000'}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>

      {/* 다리 (오른쪽) - 실루엣 */}
      <Box args={[0.15, 0.6, 0.15]} position={[0.12, 0.3, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#2a2a2a' : '#1a1a1a'}
          roughness={0.95}
          emissive={hovered ? '#1a1a1a' : '#000000'}
          emissiveIntensity={hovered ? 0.1 : 0}
        />
      </Box>

      {/* 액세서리/특징 - 호버 시에만 보임 */}
      {hovered && appearance.accessory === 'paint' && (
        <>
          {/* 물감 얼룩 (옷에) */}
          <Box args={[0.08, 0.08, 0.26]} position={[0.1, 0.9, 0.13]}>
            <meshStandardMaterial 
              color="#d4a574"
              roughness={0.6}
              emissive="#d4a574"
              emissiveIntensity={0.3}
            />
          </Box>
          <Box args={[0.06, 0.06, 0.26]} position={[-0.08, 1.0, 0.13]}>
            <meshStandardMaterial 
              color="#8b7355"
              roughness={0.6}
              emissive="#8b7355"
              emissiveIntensity={0.3}
            />
          </Box>
        </>
      )}

      {hovered && appearance.accessory === 'labcoat' && (
        <>
          {/* 흰 가운 (몸통 위에) */}
          <Box args={[0.42, 0.65, 0.27]} position={[0, 0.9, 0]}>
            <meshStandardMaterial 
              color="#f5f5f5"
              roughness={0.7}
              transparent
              opacity={0.9}
              emissive="#f5f5f5"
              emissiveIntensity={0.2}
            />
          </Box>
        </>
      )}

      {hovered && appearance.accessory === 'suit' && (
        <>
          {/* 넥타이 */}
          <Box args={[0.08, 0.35, 0.02]} position={[0, 1.0, 0.13]} castShadow>
            <meshStandardMaterial 
              color="#8b0000"
              roughness={0.5}
              emissive="#8b0000"
              emissiveIntensity={0.4}
            />
          </Box>
        </>
      )}

      {hovered && appearance.accessory === 'uniform' && (
        <>
          {/* 명찰 */}
          <Box args={[0.12, 0.08, 0.02]} position={[0.15, 1.1, 0.13]} castShadow>
            <meshStandardMaterial 
              color="#ffcc00"
              metalness={0.6}
              roughness={0.3}
              emissive="#ffcc00"
              emissiveIntensity={0.5}
            />
          </Box>
        </>
      )}

      {/* 발 밑 그림자 강조 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.4, 32]} />
        <meshBasicMaterial 
          color={hovered ? '#ff6600' : '#000000'}
          transparent 
          opacity={hovered ? 0.6 : 0.3}
        />
      </mesh>
      
      {/* 호버 시 테두리 링 - 더 강렬하게 */}
      {hovered && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <ringGeometry args={[0.45, 0.5, 32]} />
            <meshBasicMaterial 
              color="#ff6600"
              transparent 
              opacity={0.9}
            />
          </mesh>
          {/* 빛나는 효과 */}
          <pointLight 
            position={[0, 1.5, 0]} 
            intensity={1.5} 
            distance={3}
            color="#ff6600"
          />
        </>
      )}
      
      {/* 호버 시 이름 표시 */}
      {hovered && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          {suspect.name}
        </Text>
      )}
    </group>
  )
}

export default function Suspects() {
  const { scenario, showSuspectInfo } = useGameStore()

  if (!scenario) return null

  // 시나리오별 용의자 위치 배치
  const getSuspectPositions = () => {
    switch (scenario.case_title) {
      case '베이지 갤러리의 정전':
        return [
          [-4.5, 0, -2],   // 왼쪽
          [0, 0, -6.5],    // 중앙 뒤
          [4.5, 0, -2]     // 오른쪽
        ]
      case '심야 연구실의 비밀':
        return [
          [-5, 0, -3],     // 왼쪽
          [0, 0, -6.8],    // 중앙 뒤
          [5, 0, -3]       // 오른쪽
        ]
      case '고층 빌딩의 추락':
        return [
          [-4.8, 0, -2.5], // 왼쪽
          [0, 0, -6.5],    // 중앙 뒤
          [4.8, 0, -2.5]   // 오른쪽
        ]
      default:
        return [
          [-4, 0, -3],
          [0, 0, -6],
          [4, 0, -3]
        ]
    }
  }

  const positions = getSuspectPositions()

  return (
    <>
      {scenario.suspects.map((suspect, index) => (
        <SuspectCharacter
          key={suspect.id}
          suspect={suspect}
          position={positions[index]}
          onClick={() => showSuspectInfo(suspect.id)}
        />
      ))}
    </>
  )
}
