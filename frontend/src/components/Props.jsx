import { Box, Cylinder, Sphere } from '@react-three/drei'
import useGameStore from '../store/gameStore'

// 일반 소품 컴포넌트 (증거가 아닌 배경 오브젝트들)
export default function Props() {
  const { scenario } = useGameStore()

  if (!scenario) return null

  // 시나리오별 소품 배치
  const getProps = () => {
    switch (scenario.case_title) {
      case '베이지 갤러리의 정전':
        return (
          <>
            {/* 책들 - 바닥에 */}
            <Box args={[0.2, 0.3, 0.15]} position={[-3, 0.15, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b4513" roughness={0.8} />
            </Box>
            <Box args={[0.2, 0.25, 0.15]} position={[-2.7, 0.125, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#654321" roughness={0.8} />
            </Box>
            <Box args={[0.2, 0.28, 0.15]} position={[-2.4, 0.14, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0522d" roughness={0.8} />
            </Box>

            {/* 화분 - 바닥에 */}
            <Cylinder args={[0.15, 0.18, 0.3]} position={[3.5, 0.15, -6]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.2]} position={[3.5, 0.4, -6]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            {/* 액자들 (벽에) */}
            <Box args={[0.6, 0.8, 0.05]} position={[-5, 2, -7.4]} castShadow>
              <meshStandardMaterial color="#d4a574" roughness={0.3} metalness={0.5} />
            </Box>
            <Box args={[0.5, 0.5, 0.05]} position={[4, 2.2, -7.4]} castShadow>
              <meshStandardMaterial color="#c19a6b" roughness={0.3} metalness={0.5} />
            </Box>

            {/* 컵 - 책상 위에 */}
            <Cylinder args={[0.08, 0.06, 0.15]} position={[-1, 0.92, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </Cylinder>

            {/* 펜 - 책상 위에 */}
            <Cylinder args={[0.015, 0.015, 0.2]} position={[0.5, 0.89, -4.8]} rotation={[0, 0, Math.PI / 6]} castShadow>
              <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
            </Cylinder>

            {/* 노트 - 책상 위에 */}
            <Box args={[0.25, 0.02, 0.35]} position={[1.2, 0.85, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>

            {/* 램프 - 바닥에 */}
            <Cylinder args={[0.1, 0.15, 0.4]} position={[-4, 0.2, -3]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
            </Cylinder>
            <Sphere args={[0.18]} position={[-4, 0.5, -3]} castShadow>
              <meshStandardMaterial color="#ffffaa" emissive="#ffaa00" emissiveIntensity={0.2} />
            </Sphere>

            {/* 상자들 - 바닥에 */}
            <Box args={[0.4, 0.3, 0.4]} position={[5, 0.15, -3]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>
            <Box args={[0.35, 0.25, 0.35]} position={[5.4, 0.125, -3.4]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0826d" roughness={0.8} />
            </Box>
          </>
        )

      case '심야 연구실의 비밀':
        return (
          <>
            {/* 비커들 - 책상 위에 */}
            <Cylinder args={[0.1, 0.12, 0.25]} position={[-2, 0.97, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#88ccff" transparent opacity={0.6} roughness={0.1} />
            </Cylinder>
            <Cylinder args={[0.08, 0.1, 0.2]} position={[-1.5, 0.95, -4.6]} castShadow receiveShadow>
              <meshStandardMaterial color="#ff8888" transparent opacity={0.6} roughness={0.1} />
            </Cylinder>

            {/* 시약병들 - 책상 위에 */}
            <Cylinder args={[0.06, 0.08, 0.2]} position={[1.5, 1.0, -4.8]} castShadow receiveShadow>
              <meshStandardMaterial color="#66ff66" transparent opacity={0.7} />
            </Cylinder>
            <Cylinder args={[0.06, 0.08, 0.2]} position={[1.7, 1.0, -4.8]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffff66" transparent opacity={0.7} />
            </Cylinder>
            <Cylinder args={[0.06, 0.08, 0.2]} position={[1.9, 1.0, -4.8]} castShadow receiveShadow>
              <meshStandardMaterial color="#ff66ff" transparent opacity={0.7} />
            </Cylinder>

            {/* 현미경 - 책상 위에 */}
            <Cylinder args={[0.08, 0.12, 0.3]} position={[0, 1.05, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.04, 0.04, 0.25]} position={[0, 1.35, -4.5]} rotation={[Math.PI / 6, 0, 0]} castShadow>
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
            </Cylinder>

            {/* 노트북 - 책상 위에 */}
            <Box args={[0.4, 0.02, 0.3]} position={[-3.5, 0.93, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
            </Box>
            <Box args={[0.4, 0.3, 0.02]} position={[-3.5, 1.08, -4.65]} rotation={[-Math.PI / 12, 0, 0]} castShadow>
              <meshStandardMaterial color="#0a0a0a" />
            </Box>
            <Box args={[0.35, 0.25, 0.01]} position={[-3.5, 1.08, -4.64]} rotation={[-Math.PI / 12, 0, 0]}>
              <meshStandardMaterial color="#00aaff" emissive="#0088cc" emissiveIntensity={0.3} />
            </Box>

            {/* 서류 더미 - 바닥에 */}
            <Box args={[0.3, 0.15, 0.4]} position={[3, 0.075, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>

            {/* 보호 장갑 - 바닥에 */}
            <Box args={[0.15, 0.05, 0.2]} position={[-5, 0.025, -4]} castShadow receiveShadow>
              <meshStandardMaterial color="#6699ff" roughness={0.6} />
            </Box>

            {/* 시험관 거치대 - 책상 위에 */}
            <Box args={[0.5, 0.05, 0.15]} position={[4, 0.95, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Box>
            <Cylinder args={[0.02, 0.02, 0.15]} position={[3.8, 1.05, -5]} castShadow>
              <meshStandardMaterial color="#88ccff" transparent opacity={0.6} />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 0.15]} position={[4, 1.05, -5]} castShadow>
              <meshStandardMaterial color="#ff8888" transparent opacity={0.6} />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 0.15]} position={[4.2, 1.05, -5]} castShadow>
              <meshStandardMaterial color="#88ff88" transparent opacity={0.6} />
            </Cylinder>
          </>
        )

      case '고층 빌딩의 추락':
        return (
          <>
            {/* 서류 더미들 - 바닥에 */}
            <Box args={[0.3, 0.2, 0.4]} position={[-2.5, 0.1, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.3, 0.15, 0.4]} position={[2, 0.075, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>

            {/* 커피잔 - 책상 위에 */}
            <Cylinder args={[0.08, 0.06, 0.12]} position={[-0.8, 0.96, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </Cylinder>
            <Cylinder args={[0.075, 0.075, 0.1]} position={[-0.8, 0.96, -4.5]}>
              <meshStandardMaterial color="#3d2817" roughness={0.8} />
            </Cylinder>

            {/* 펜꽂이 - 책상 위에 */}
            <Cylinder args={[0.08, 0.1, 0.15]} position={[1, 0.98, -4.8]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
            </Cylinder>
            <Cylinder args={[0.015, 0.015, 0.2]} position={[0.95, 1.13, -4.8]} castShadow>
              <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>
            <Cylinder args={[0.015, 0.015, 0.18]} position={[1.05, 1.12, -4.8]} castShadow>
              <meshStandardMaterial color="#0066cc" />
            </Cylinder>

            {/* 모니터 - 책상 위에 */}
            <Box args={[0.6, 0.4, 0.05]} position={[-3.5, 1.15, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
            </Box>
            <Box args={[0.55, 0.35, 0.02]} position={[-3.5, 1.15, -4.48]}>
              <meshStandardMaterial color="#0a0a0a" />
            </Box>
            <Box args={[0.5, 0.3, 0.01]} position={[-3.5, 1.15, -4.47]}>
              <meshStandardMaterial color="#1a3a5a" emissive="#0a2a4a" emissiveIntensity={0.2} />
            </Box>

            {/* 키보드 - 책상 위에 */}
            <Box args={[0.45, 0.02, 0.15]} position={[-3.5, 0.91, -4]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
            </Box>

            {/* 마우스 - 책상 위에 */}
            <Box args={[0.08, 0.04, 0.12]} position={[-3, 0.92, -4]} castShadow receiveShadow>
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
            </Box>

            {/* 트로피 - 바닥에 */}
            <Cylinder args={[0.08, 0.12, 0.3]} position={[4.5, 0.15, -6]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
            </Cylinder>
            <Sphere args={[0.1]} position={[4.5, 0.35, -6]} castShadow>
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
            </Sphere>

            {/* 액자 (벽에) */}
            <Box args={[0.8, 0.6, 0.05]} position={[0, 2.5, -7.4]} castShadow>
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
            </Box>

            {/* 시계 */}
            <Cylinder args={[0.2, 0.2, 0.05]} position={[-5, 2.5, -7.4]} castShadow>
              <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.4} />
            </Cylinder>

            {/* 화분 - 바닥에 */}
            <Cylinder args={[0.15, 0.18, 0.25]} position={[5.5, 0.125, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.18]} position={[5.5, 0.35, -5]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            {/* 서류 가방 - 바닥에 */}
            <Box args={[0.5, 0.35, 0.15]} position={[-5, 0.175, -3]} castShadow receiveShadow>
              <meshStandardMaterial color="#3d2817" roughness={0.7} />
            </Box>
          </>
        )

      default:
        return null
    }
  }

  return <group>{getProps()}</group>
}
