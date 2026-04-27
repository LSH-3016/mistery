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
      {/* 몸통 */}
      <Box 
        args={[0.4, 0.6, 0.25]} 
        position={[0, 0.9, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color={appearance.clothesColor}
          roughness={0.8}
        />
      </Box>

      {/* 머리 */}
      <Sphere args={[0.18]} position={[0, 1.4, 0]} castShadow>
        <meshStandardMaterial color={appearance.skinColor} roughness={0.9} />
      </Sphere>

      {/* 머리카락 */}
      <Sphere args={[0.19]} position={[0, 1.48, 0]} castShadow>
        <meshStandardMaterial color={appearance.hairColor} roughness={0.95} />
      </Sphere>

      {/* 팔 (왼쪽) */}
      <Box args={[0.12, 0.5, 0.12]} position={[-0.26, 0.85, 0]} castShadow>
        <meshStandardMaterial color={appearance.clothesColor} roughness={0.8} />
      </Box>
      <Box args={[0.1, 0.35, 0.1]} position={[-0.26, 0.4, 0]} castShadow>
        <meshStandardMaterial color={appearance.skinColor} roughness={0.9} />
      </Box>

      {/* 팔 (오른쪽) */}
      <Box args={[0.12, 0.5, 0.12]} position={[0.26, 0.85, 0]} castShadow>
        <meshStandardMaterial color={appearance.clothesColor} roughness={0.8} />
      </Box>
      <Box args={[0.1, 0.35, 0.1]} position={[0.26, 0.4, 0]} castShadow>
        <meshStandardMaterial color={appearance.skinColor} roughness={0.9} />
      </Box>

      {/* 다리 (왼쪽) */}
      <Box args={[0.15, 0.6, 0.15]} position={[-0.12, 0.3, 0]} castShadow>
        <meshStandardMaterial color="#2a2a3a" roughness={0.7} />
      </Box>

      {/* 다리 (오른쪽) */}
      <Box args={[0.15, 0.6, 0.15]} position={[0.12, 0.3, 0]} castShadow>
        <meshStandardMaterial color="#2a2a3a" roughness={0.7} />
      </Box>

      {/* 액세서리/특징 */}
      {appearance.accessory === 'paint' && (
        <>
          {/* 물감 얼룩 (옷에) */}
          <Box args={[0.08, 0.08, 0.26]} position={[0.1, 0.9, 0.13]}>
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </Box>
          <Box args={[0.06, 0.06, 0.26]} position={[-0.08, 1.0, 0.13]}>
            <meshStandardMaterial color="#8b7355" roughness={0.6} />
          </Box>
        </>
      )}

      {appearance.accessory === 'labcoat' && (
        <>
          {/* 흰 가운 (몸통 위에) */}
          <Box args={[0.42, 0.65, 0.27]} position={[0, 0.9, 0]}>
            <meshStandardMaterial color="#f5f5f5" roughness={0.7} transparent opacity={0.95} />
          </Box>
          {/* 가운 단추 */}
          <Sphere args={[0.03]} position={[0, 1.1, 0.14]} castShadow>
            <meshStandardMaterial color="#cccccc" />
          </Sphere>
          <Sphere args={[0.03]} position={[0, 0.9, 0.14]} castShadow>
            <meshStandardMaterial color="#cccccc" />
          </Sphere>
          <Sphere args={[0.03]} position={[0, 0.7, 0.14]} castShadow>
            <meshStandardMaterial color="#cccccc" />
          </Sphere>
        </>
      )}

      {appearance.accessory === 'suit' && (
        <>
          {/* 넥타이 */}
          <Box args={[0.08, 0.35, 0.02]} position={[0, 1.0, 0.13]} castShadow>
            <meshStandardMaterial color="#8b0000" roughness={0.5} />
          </Box>
        </>
      )}

      {appearance.accessory === 'uniform' && (
        <>
          {/* 명찰 */}
          <Box args={[0.12, 0.08, 0.02]} position={[0.15, 1.1, 0.13]} castShadow>
            <meshStandardMaterial color="#ffcc00" metalness={0.6} roughness={0.3} />
          </Box>
        </>
      )}

      {/* 발 밑 그림자 강조 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[0.4, 32]} />
        <meshBasicMaterial 
          color={hovered ? '#ffaa00' : '#000000'}
          transparent 
          opacity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* 호버 시 테두리 링 */}
      {hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.45, 0.5, 32]} />
          <meshBasicMaterial 
            color="#ffaa00"
            transparent 
            opacity={0.8}
          />
        </mesh>
      )}
      
      {/* 호버 시 이름 표시 */}
      {hovered && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
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
