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
            {/* 왼쪽 구역 - 책들 (바닥에 확실히, 더 넓게 분산) */}
            <Box args={[0.2, 0.3, 0.15]} position={[-6.8, 0.15, -2]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b4513" roughness={0.8} />
            </Box>
            <Box args={[0.2, 0.25, 0.15]} position={[-6.5, 0.125, -2.5]} rotation={[0, -0.008, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#654321" roughness={0.8} />
            </Box>
            <Box args={[0.2, 0.28, 0.15]} position={[-6.2, 0.14, -1.5]} rotation={[0, 0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0522d" roughness={0.8} />
            </Box>
            <Box args={[0.18, 0.26, 0.14]} position={[-6.9, 0.13, -0.8]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b4513" roughness={0.8} />
            </Box>
            <Box args={[0.22, 0.32, 0.16]} position={[-5.5, 0.16, -1]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#654321" roughness={0.8} />
            </Box>
            <Box args={[0.19, 0.27, 0.14]} position={[-5.8, 0.135, -3.5]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0522d" roughness={0.8} />
            </Box>
            <Box args={[0.21, 0.29, 0.15]} position={[-4.8, 0.145, -2]} rotation={[0, -0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b4513" roughness={0.8} />
            </Box>

            {/* 앞쪽 왼쪽 - 추가 책들과 소품 */}
            <Box args={[0.2, 0.28, 0.15]} position={[-5, 0.14, 0]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#654321" roughness={0.8} />
            </Box>
            <Box args={[0.18, 0.25, 0.14]} position={[-4.5, 0.125, -0.5]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0522d" roughness={0.8} />
            </Box>
            <Box args={[0.22, 0.3, 0.16]} position={[-3.5, 0.15, 0.2]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b4513" roughness={0.8} />
            </Box>

            {/* 중앙 앞쪽 - 작은 조각상들 */}
            <Cylinder args={[0.15, 0.18, 0.4]} position={[-2, 0.2, 0]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#d4a574" roughness={0.6} />
            </Cylinder>
            <Sphere args={[0.12]} position={[-2, 0.5, 0]} castShadow>
              <meshStandardMaterial color="#f5e6d3" roughness={0.7} />
            </Sphere>

            <Cylinder args={[0.12, 0.15, 0.35]} position={[-0.5, 0.175, -0.3]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#c19a6b" roughness={0.6} />
            </Cylinder>
            <Box args={[0.15, 0.15, 0.15]} position={[-0.5, 0.45, -0.3]} rotation={[0, 0.3, 0]} castShadow>
              <meshStandardMaterial color="#d4a574" roughness={0.7} />
            </Box>

            <Cylinder args={[0.14, 0.17, 0.38]} position={[1, 0.19, 0.1]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5e6d3" roughness={0.6} />
            </Cylinder>
            <Cylinder args={[0.08, 0.08, 0.25]} position={[1, 0.5, 0.1]} castShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>

            {/* 앞쪽 오른쪽 - 추가 소품들 */}
            <Box args={[0.35, 0.25, 0.35]} position={[3, 0.125, 0]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>
            <Box args={[0.3, 0.2, 0.3]} position={[3.5, 0.1, -0.8]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0826d" roughness={0.8} />
            </Box>
            <Box args={[0.32, 0.22, 0.32]} position={[4.5, 0.11, -0.3]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>

            {/* 중간 영역 - 더 많은 소품 */}
            <Box args={[0.4, 0.3, 0.4]} position={[-4, 0.15, -3]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>
            <Box args={[0.35, 0.28, 0.35]} position={[-3, 0.14, -4]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0826d" roughness={0.8} />
            </Box>
            <Box args={[0.38, 0.32, 0.38]} position={[3, 0.16, -3.5]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>
            <Box args={[0.36, 0.3, 0.36]} position={[4, 0.15, -4.5]} rotation={[0, -0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0826d" roughness={0.8} />
            </Box>

            {/* 오른쪽 구역 - 화분들 (바닥에 확실히, 더 넓게 분산) */}
            <Cylinder args={[0.2, 0.25, 0.4]} position={[6.7, 0.2, -2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.25]} position={[6.7, 0.5, -2]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Cylinder args={[0.18, 0.22, 0.35]} position={[6.9, 0.175, -6.5]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.22]} position={[6.9, 0.45, -6.5]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Cylinder args={[0.19, 0.23, 0.38]} position={[6.5, 0.19, -0.8]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.24]} position={[6.5, 0.48, -0.8]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Cylinder args={[0.17, 0.21, 0.36]} position={[5.5, 0.18, -1.5]} rotation={[0, -0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.21]} position={[5.5, 0.44, -1.5]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Cylinder args={[0.21, 0.26, 0.42]} position={[5.8, 0.21, -3.5]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.26]} position={[5.8, 0.52, -3.5]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Cylinder args={[0.16, 0.2, 0.34]} position={[4.8, 0.17, -2]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.2]} position={[4.8, 0.42, -2]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            {/* 뒤쪽 - 상자들 (바닥에 확실히, 더 넓게 분산) */}
            <Box args={[0.5, 0.4, 0.5]} position={[-3.5, 0.2, -7.2]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>
            <Box args={[0.45, 0.35, 0.45]} position={[-1.5, 0.175, -7.0]} rotation={[0, 0.025, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#a0826d" roughness={0.8} />
            </Box>
            <Box args={[0.4, 0.3, 0.4]} position={[2, 0.15, -7.1]} rotation={[0, 0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>
            <Box args={[0.48, 0.38, 0.48]} position={[3.8, 0.19, -7.3]} rotation={[0, -0.022, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#8b7355" roughness={0.8} />
            </Box>

            {/* 램프들 (바닥에 확실히, 전선 포함, 더 넓게 분산) */}
            <Cylinder args={[0.12, 0.18, 0.5]} position={[-6.8, 0.25, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
            </Cylinder>
            <Sphere args={[0.2]} position={[-6.8, 0.6, -5]} castShadow>
              <meshStandardMaterial color="#ffffaa" emissive="#ffaa00" emissiveIntensity={0.3} />
            </Sphere>
            <Cylinder args={[0.015, 0.015, 0.4]} position={[-6.8, 0.2, -4.8]} rotation={[Math.PI / 6, 0, 0]} castShadow>
              <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>

            <Cylinder args={[0.12, 0.18, 0.5]} position={[6.8, 0.25, -4.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
            </Cylinder>
            <Sphere args={[0.2]} position={[6.8, 0.6, -4.5]} castShadow>
              <meshStandardMaterial color="#ffffaa" emissive="#ffaa00" emissiveIntensity={0.3} />
            </Sphere>
            <Cylinder args={[0.015, 0.015, 0.4]} position={[6.8, 0.2, -4.3]} rotation={[Math.PI / 6, 0, 0]} castShadow>
              <meshStandardMaterial color="#1a1a1a" />
            </Cylinder>

            {/* 바닥에 떨어진 종이들 (여러 곳에, 더 넓게 분산) */}
            <Box args={[0.2, 0.001, 0.25]} position={[-5, 0.001, -1]} rotation={[0, 0, 0]} rotation-z={0.5} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.15, 0.001, 0.2]} position={[5, 0.001, -1.5]} rotation={[0, 0, 0]} rotation-z={-0.3} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.18, 0.001, 0.22]} position={[-2, 0.001, -7]} rotation={[0, 0, 0]} rotation-z={0.8} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.16, 0.001, 0.24]} position={[5.5, 0.001, -7]} rotation={[0, 0, 0]} rotation-z={-0.6} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.19, 0.001, 0.23]} position={[-6.5, 0.001, -4]} rotation={[0, 0, 0]} rotation-z={0.4} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.17, 0.001, 0.21]} position={[6.5, 0.001, -3.5]} rotation={[0, 0, 0]} rotation-z={-0.7} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.18, 0.001, 0.23]} position={[-3, 0.001, 0.2]} rotation={[0, 0, 0]} rotation-z={0.6} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.16, 0.001, 0.21]} position={[2, 0.001, 0.1]} rotation={[0, 0, 0]} rotation-z={-0.4} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.2, 0.001, 0.24]} position={[-1, 0.001, -2]} rotation={[0, 0, 0]} rotation-z={0.7} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.17, 0.001, 0.22]} position={[1.5, 0.001, -3]} rotation={[0, 0, 0]} rotation-z={-0.5} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.19, 0.001, 0.25]} position={[-4.5, 0.001, -5]} rotation={[0, 0, 0]} rotation-z={0.8} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.15, 0.001, 0.2]} position={[4, 0.001, -5.5]} rotation={[0, 0, 0]} rotation-z={-0.6} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
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
          </>
        )

      case '심야 연구실의 비밀':
        return (
          <>
            {/* 왼쪽 구역 - 서류 더미들 (바닥에 확실히, 더 넓게 분산) */}
            <Box args={[0.35, 0.2, 0.45]} position={[-6.7, 0.1, -2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.3, 0.15, 0.4]} position={[-6.9, 0.075, -3.5]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.32, 0.18, 0.42]} position={[-6.5, 0.09, -0.8]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.33, 0.19, 0.43]} position={[-5.5, 0.095, -1.5]} rotation={[0, -0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.36, 0.21, 0.46]} position={[-5.8, 0.105, -4]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.31, 0.17, 0.41]} position={[-4.8, 0.085, -2.5]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>

            {/* 앞쪽 왼쪽 - 추가 서류와 장비 */}
            <Box args={[0.34, 0.2, 0.44]} position={[-5, 0.1, 0.2]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.3, 0.16, 0.4]} position={[-4.2, 0.08, -0.5]} rotation={[0, -0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.4, 0.3, 0.4]} position={[-3.5, 0.15, 0]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>

            {/* 중앙 앞쪽 - 실험 장비들 */}
            <Box args={[0.35, 0.28, 0.35]} position={[-2, 0.14, -0.2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#d0d0d0" roughness={0.4} metalness={0.6} />
            </Box>
            <Cylinder args={[0.15, 0.18, 0.4]} position={[-0.5, 0.2, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color="#c0c0c0" roughness={0.4} metalness={0.6} />
            </Cylinder>
            <Box args={[0.3, 0.25, 0.3]} position={[1, 0.125, -0.3]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#d0d0d0" roughness={0.4} metalness={0.6} />
            </Box>

            {/* 앞쪽 오른쪽 - 추가 장비 상자들 */}
            <Box args={[0.45, 0.35, 0.45]} position={[3, 0.175, 0]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.4, 0.3, 0.4]} position={[3.8, 0.15, -0.8]} rotation={[0, -0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.42, 0.32, 0.42]} position={[4.5, 0.16, -0.2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>

            {/* 중간 영역 - 더 많은 장비와 서류 */}
            <Box args={[0.38, 0.3, 0.38]} position={[-4, 0.15, -3]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.35, 0.2, 0.45]} position={[-3, 0.1, -4]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.4, 0.32, 0.4]} position={[3, 0.16, -3.5]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.36, 0.28, 0.36]} position={[4, 0.14, -4.5]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0.3} />
            </Box>

            {/* 오른쪽 구역 - 장비 상자들 (바닥에 확실히, 더 넓게 분산) */}
            <Box args={[0.5, 0.4, 0.5]} position={[6.8, 0.2, -2]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.45, 0.35, 0.45]} position={[6.9, 0.175, -3.8]} rotation={[0, -0.022, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.48, 0.38, 0.48]} position={[6.6, 0.19, -0.9]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.42, 0.32, 0.42]} position={[6.7, 0.16, -6.8]} rotation={[0, -0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.46, 0.36, 0.46]} position={[5.5, 0.18, -1.5]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.44, 0.34, 0.44]} position={[5.8, 0.17, -3.5]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#5a5a5a" roughness={0.7} metalness={0.3} />
            </Box>
            <Box args={[0.43, 0.33, 0.43]} position={[4.8, 0.165, -2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </Box>

            {/* 뒤쪽 - 보호 장갑들 (바닥에 확실히, 더 넓게 분산) */}
            <Box args={[0.18, 0.06, 0.25]} position={[-3.5, 0.03, -7.2]} rotation={[0, 0.5, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#6699ff" roughness={0.6} />
            </Box>
            <Box args={[0.18, 0.06, 0.25]} position={[2.5, 0.03, -7.1]} rotation={[0, -0.3, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#66ff99" roughness={0.6} />
            </Box>
            <Box args={[0.18, 0.06, 0.25]} position={[-1, 0.03, -7.3]} rotation={[0, 0.2, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#ff9966" roughness={0.6} />
            </Box>

            {/* 바닥에 떨어진 종이들 (더 넓게 분산) */}
            <Box args={[0.2, 0.001, 0.25]} position={[-5, 0.001, -1]} rotation={[0, 0, 0]} rotation-z={0.4} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.18, 0.001, 0.22]} position={[5, 0.001, -1.5]} rotation={[0, 0, 0]} rotation-z={-0.5} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.15, 0.001, 0.2]} position={[-2, 0.001, -7]} rotation={[0, 0, 0]} rotation-z={0.7} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.19, 0.001, 0.23]} position={[6.5, 0.001, -5]} rotation={[0, 0, 0]} rotation-z={-0.6} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.17, 0.001, 0.21]} position={[-6.5, 0.001, -6]} rotation={[0, 0, 0]} rotation-z={0.5} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.18, 0.001, 0.23]} position={[-3, 0.001, 0.2]} rotation={[0, 0, 0]} rotation-z={0.6} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.16, 0.001, 0.21]} position={[2, 0.001, 0.1]} rotation={[0, 0, 0]} rotation-z={-0.4} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.2, 0.001, 0.24]} position={[-1, 0.001, -2]} rotation={[0, 0, 0]} rotation-z={0.7} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.17, 0.001, 0.22]} position={[1.5, 0.001, -3]} rotation={[0, 0, 0]} rotation-z={-0.5} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.19, 0.001, 0.25]} position={[-4.5, 0.001, -5]} rotation={[0, 0, 0]} rotation-z={0.8} receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.15, 0.001, 0.2]} position={[4, 0.001, -5.5]} rotation={[0, 0, 0]} rotation-z={-0.6} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>

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
            {/* 왼쪽 구역 - 서류 가방과 상자들 (바닥에 확실히, 더 넓게 분산) */}
            <Box args={[0.6, 0.4, 0.2]} position={[-6.8, 0.2, -2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#3d2817" roughness={0.7} />
            </Box>
            <Box args={[0.4, 0.3, 0.4]} position={[-6.9, 0.15, -4]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>
            <Box args={[0.5, 0.35, 0.3]} position={[-6.5, 0.175, -0.8]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#3d2817" roughness={0.7} />
            </Box>
            <Box args={[0.55, 0.38, 0.25]} position={[-5.5, 0.19, -1.5]} rotation={[0, -0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#3d2817" roughness={0.7} />
            </Box>
            <Box args={[0.45, 0.32, 0.35]} position={[-5.8, 0.16, -3.5]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>
            <Box args={[0.48, 0.34, 0.28]} position={[-4.8, 0.17, -2.5]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#3d2817" roughness={0.7} />
            </Box>

            {/* 앞쪽 왼쪽 - 추가 서류 가방과 상자 */}
            <Box args={[0.52, 0.36, 0.22]} position={[-5, 0.18, 0.2]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#3d2817" roughness={0.7} />
            </Box>
            <Box args={[0.42, 0.31, 0.38]} position={[-4.2, 0.155, -0.5]} rotation={[0, -0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>
            <Box args={[0.46, 0.33, 0.32]} position={[-3.5, 0.165, 0]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#3d2817" roughness={0.7} />
            </Box>

            {/* 중앙 앞쪽 - 고급 소품들 */}
            <Cylinder args={[0.12, 0.16, 0.38]} position={[-2, 0.19, -0.2]} castShadow receiveShadow>
              <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Sphere args={[0.14]} position={[-2, 0.42, -0.2]} castShadow>
              <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
            </Sphere>

            <Box args={[0.35, 0.28, 0.35]} position={[-0.5, 0.14, 0.1]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>

            <Cylinder args={[0.11, 0.15, 0.36]} position={[1, 0.18, -0.3]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Sphere args={[0.13]} position={[1, 0.4, -0.3]} castShadow>
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </Sphere>

            {/* 앞쪽 오른쪽 - 추가 화분과 소품 */}
            <Cylinder args={[0.22, 0.27, 0.4]} position={[3, 0.2, 0]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.26]} position={[3, 0.5, 0]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Box args={[0.4, 0.3, 0.4]} position={[3.8, 0.15, -0.8]} rotation={[0, -0.012, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>

            <Cylinder args={[0.2, 0.24, 0.38]} position={[4.5, 0.19, -0.2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.24]} position={[4.5, 0.48, -0.2]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            {/* 중간 영역 - 더 많은 소품 */}
            <Box args={[0.38, 0.3, 0.38]} position={[-4, 0.15, -3]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>
            <Box args={[0.35, 0.25, 0.45]} position={[-3, 0.125, -4]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.4, 0.32, 0.4]} position={[3, 0.16, -3.5]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>
            <Box args={[0.36, 0.28, 0.36]} position={[4, 0.14, -4.5]} rotation={[0, -0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
            </Box>

            {/* 오른쪽 구역 - 화분들 (바닥에 확실히, 더 넓게 분산) */}
            <Cylinder args={[0.2, 0.25, 0.35]} position={[6.8, 0.175, -2]} rotation={[0, 0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.22]} position={[6.8, 0.45, -2]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Cylinder args={[0.18, 0.22, 0.3]} position={[6.9, 0.15, -6.5]} rotation={[0, -0.022, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.2]} position={[6.9, 0.4, -6.5]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            <Cylinder args={[0.19, 0.23, 0.33]} position={[6.6, 0.165, -0.9]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
            </Cylinder>
            <Sphere args={[0.21]} position={[6.6, 0.43, -0.9]} castShadow>
              <meshStandardMaterial color="#2d5016" roughness={0.9} />
            </Sphere>

            {/* 뒤쪽 - 서류 더미들 (바닥에 확실히, 더 넓게 분산) */}
            <Box args={[0.35, 0.25, 0.45]} position={[-3.5, 0.125, -7.2]} rotation={[0, 0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>
            <Box args={[0.3, 0.2, 0.4]} position={[2.5, 0.1, -7.1]} rotation={[0, -0.018, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.32, 0.22, 0.42]} position={[-1, 0.11, -7.3]} rotation={[0, 0.015, 0]} castShadow receiveShadow>
              <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
            </Box>

            {/* 트로피 (바닥에 확실히, 더 넓게 분산) */}
            <Cylinder args={[0.1, 0.15, 0.35]} position={[-6.8, 0.175, -5.5]} castShadow receiveShadow>
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Sphere args={[0.12]} position={[-6.8, 0.4, -5.5]} castShadow>
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </Sphere>

            {/* 추가 트로피 */}
            <Cylinder args={[0.09, 0.13, 0.3]} position={[6.7, 0.15, -5]} castShadow receiveShadow>
              <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Sphere args={[0.11]} position={[6.7, 0.35, -5]} castShadow>
              <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
            </Sphere>

            {/* 바닥에 떨어진 종이들 (더 넓게 분산) */}
            <Box args={[0.2, 0.001, 0.25]} position={[-5, 0.001, -1]} rotation={[0, 0, 0]} rotation-z={0.3} receiveShadow>
              <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Box>
            <Box args={[0.18, 0.001, 0.22]} position={[5, 0.001, -1.5]} rotation={[0, 0, 0]} rotation-z={-0.4} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.15, 0.001, 0.2]} position={[-2, 0.001, -7]} rotation={[0, 0, 0]} rotation-z={0.6} receiveShadow>
              <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Box>
            <Box args={[0.22, 0.001, 0.28]} position={[5.5, 0.001, -7]} rotation={[0, 0, 0]} rotation-z={-0.5} receiveShadow>
              <meshStandardMaterial color="#ffffcc" roughness={0.9} />
            </Box>
            <Box args={[0.19, 0.001, 0.24]} position={[-6.5, 0.001, -4]} rotation={[0, 0, 0]} rotation-z={0.4} receiveShadow>
              <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Box>
            <Box args={[0.17, 0.001, 0.21]} position={[6.5, 0.001, -3.5]} rotation={[0, 0, 0]} rotation-z={-0.6} receiveShadow>
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
          </>
        )

      default:
        return null
    }
  }

  return <group>{getProps()}</group>
}
