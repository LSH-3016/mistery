import { RoundedBox } from '@react-three/drei'
import useGameStore from '../store/gameStore'

export default function Furniture() {
  const { scenario } = useGameStore()
  
  if (!scenario) return null

  const deskMaterial = { color: '#8b4513', roughness: 0.7, metalness: 0.3 }
  const chairMaterial = { color: '#333333' }

  // 시나리오별 가구 렌더링
  switch (scenario.case_title) {
    case '베이지 갤러리의 정전':
      return <GalleryFurniture />
    case '심야 연구실의 비밀':
      return <LabFurniture />
    case '고층 빌딩의 추락':
      return <OfficeFurniture />
    default:
      return <DefaultFurniture />
  }
}

// 갤러리 가구 (360도 공간 활용)
function GalleryFurniture() {
  // 미세한 랜덤 회전으로 자연스러움 추가
  const randomRotation = () => [0, Math.random() * 0.08 - 0.04, 0]
  
  return (
    <group>
      {/* 중앙 관장 책상 */}
      <RoundedBox args={[2.5, 0.08, 1.2]} position={[0, 0.8, -5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#d4a574" roughness={0.6} metalness={0.4} />
      </RoundedBox>
      
      {/* 책상 다리 */}
      {[[-1.1, 0.4, -5.5], [1.1, 0.4, -5.5], [-1.1, 0.4, -4.5], [1.1, 0.4, -4.5]].map((pos, i) => (
        <RoundedBox key={i} args={[0.08, 0.8, 0.08]} position={pos} radius={0.005} smoothness={4} castShadow>
          <meshStandardMaterial color="#a67c52" />
        </RoundedBox>
      ))}

      {/* 중앙 의자 */}
      <RoundedBox args={[0.6, 0.1, 0.6]} position={[0, 0.5, -3.5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#8b6f47" />
      </RoundedBox>
      <RoundedBox args={[0.6, 0.8, 0.1]} position={[0, 0.9, -3.8]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#8b6f47" />
      </RoundedBox>

      {/* 왼쪽 구역 - 전시 공간 */}
      {/* 전시 받침대 1 */}
      <mesh position={[-5, 0.6, -5]} rotation={randomRotation()} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 8]} />
        <meshStandardMaterial color="#f5e6d3" />
      </mesh>
      <RoundedBox args={[0.4, 0.05, 0.4]} position={[-5, 1.25, -5]} rotation={randomRotation()} radius={0.005} smoothness={4} castShadow>
        <meshStandardMaterial color="#d4a574" />
      </RoundedBox>

      {/* 전시 받침대 2 */}
      <mesh position={[-5, 0.6, -1]} rotation={randomRotation()} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 8]} />
        <meshStandardMaterial color="#f5e6d3" />
      </mesh>
      <RoundedBox args={[0.4, 0.05, 0.4]} position={[-5, 1.25, -1]} rotation={randomRotation()} radius={0.005} smoothness={4} castShadow>
        <meshStandardMaterial color="#d4a574" />
      </RoundedBox>

      {/* 오른쪽 구역 - 작업 공간 */}
      {/* 작업 테이블 */}
      <RoundedBox args={[1.5, 0.08, 1]} position={[5, 0.8, -5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#c19a6b" roughness={0.7} metalness={0.3} />
      </RoundedBox>
      {[[-0.65, 0.4, -5.4], [0.65, 0.4, -5.4], [-0.65, 0.4, -4.6], [0.65, 0.4, -4.6]].map((pos, i) => (
        <RoundedBox key={`right-${i}`} args={[0.08, 0.8, 0.08]} position={[pos[0] + 5, pos[1], pos[2]]} radius={0.005} smoothness={4} castShadow>
          <meshStandardMaterial color="#a67c52" />
        </RoundedBox>
      ))}

      {/* 오른쪽 의자 */}
      <RoundedBox args={[0.5, 0.1, 0.5]} position={[5, 0.5, -3.5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#8b6f47" />
      </RoundedBox>

      {/* 뒷벽 - 그림 액자들 */}
      <RoundedBox args={[1.5, 2, 0.05]} position={[-3, 2, -7.4]} rotation={randomRotation()} radius={0.008} smoothness={4} castShadow>
        <meshStandardMaterial color="#f5e6d3" />
      </RoundedBox>
      <mesh position={[-3, 2, -7.35]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      <RoundedBox args={[1.2, 1.5, 0.05]} position={[3, 2.5, -7.4]} radius={0.008} smoothness={4} castShadow>
        <meshStandardMaterial color="#f5e6d3" />
      </RoundedBox>
      <mesh position={[3, 2.5, -7.35]}>
        <planeGeometry args={[1, 1.3]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* 왼쪽 벽 - 액자 */}
      <RoundedBox args={[0.05, 1.8, 1.2]} position={[-7.4, 2.2, -3]} radius={0.008} smoothness={4} castShadow>
        <meshStandardMaterial color="#f5e6d3" />
      </RoundedBox>
      <mesh position={[-7.35, 2.2, -3]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1, 1.6]} />
        <meshStandardMaterial color="#c19a6b" />
      </mesh>

      {/* 오른쪽 벽 - 액자 */}
      <RoundedBox args={[0.05, 1.5, 1]} position={[7.4, 2.3, -4]} radius={0.008} smoothness={4} castShadow>
        <meshStandardMaterial color="#f5e6d3" />
      </RoundedBox>
      <mesh position={[7.35, 2.3, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* 찻잔 (증거물) */}
      <mesh position={[-0.3, 0.87, -5]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* 서류 */}
      <mesh position={[0.4, 0.85, -4.8]} rotation={[-Math.PI / 2, 0, 0.3]} castShadow>
        <planeGeometry args={[0.25, 0.35]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  )
}

// 연구실 가구 (360도 공간 활용)
function LabFurniture() {
  const randomRotation = () => [0, Math.random() * 0.08 - 0.04, 0]
  
  return (
    <group>
      {/* 중앙 실험대 */}
      <mesh position={[0, 0.9, -5]} rotation={randomRotation()} castShadow receiveShadow>
        <boxGeometry args={[3, 0.05, 1.5]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* 실험대 다리 (금속) */}
      {[[-1.4, 0.45, -5.6], [1.4, 0.45, -5.6], [-1.4, 0.45, -4.4], [1.4, 0.45, -4.4]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} />
        </mesh>
      ))}

      {/* 왼쪽 구역 - 실험 장비 캐비닛 */}
      <mesh position={[-5.5, 1.5, -5]} rotation={randomRotation()} castShadow>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[-5.5, 1.5, -4.7]}>
        <planeGeometry args={[1.8, 2.8]} />
        <meshStandardMaterial 
          color="#88ccff" 
          transparent 
          opacity={0.3} 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 왼쪽 작업대 */}
      <mesh position={[-5.5, 0.9, -1.5]} rotation={randomRotation()} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 1.2]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.7} />
      </mesh>
      {[[-0.65, 0.45, -2], [0.65, 0.45, -2], [-0.65, 0.45, -1], [0.65, 0.45, -1]].map((pos, i) => (
        <mesh key={`left-${i}`} position={[pos[0] - 5.5, pos[1], pos[2]]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} />
        </mesh>
      ))}

      {/* 오른쪽 구역 - 분석 장비 */}
      <mesh position={[5.5, 1.25, -5]} rotation={randomRotation()} castShadow>
        <boxGeometry args={[1.8, 2.5, 0.5]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* 오른쪽 작업대 */}
      <mesh position={[5.5, 0.9, -1.5]} rotation={randomRotation()} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 1.2]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.7} />
      </mesh>
      {[[-0.65, 0.45, -2], [0.65, 0.45, -2], [-0.65, 0.45, -1], [0.65, 0.45, -1]].map((pos, i) => (
        <mesh key={`right-${i}`} position={[pos[0] + 5.5, pos[1], pos[2]]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} />
        </mesh>
      ))}

      {/* 중앙 현미경 */}
      <group position={[-0.8, 0.95, -5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 16]} />
          <meshStandardMaterial color="#444444" metalness={0.8} />
        </mesh>
      </group>

      {/* 비커들 */}
      <mesh position={[0.5, 0.95, -4.8]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.15, 16]} />
        <meshStandardMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.6}
          emissive="#00ffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0.8, 0.95, -5.2]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.12, 16]} />
        <meshStandardMaterial 
          color="#00ff88" 
          transparent 
          opacity={0.6}
          emissive="#00ff88"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 노트북 */}
      <mesh position={[-0.3, 0.92, -5.3]} rotation={[-Math.PI / 3, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} />
      </mesh>
    </group>
  )
}

// 회장실 가구 (360도 공간 활용)
function OfficeFurniture() {
  const randomRotation = () => [0, Math.random() * 0.08 - 0.04, 0]
  
  return (
    <group>
      {/* 중앙 고급 책상 */}
      <RoundedBox args={[3.5, 0.1, 1.8]} position={[0, 0.85, -5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2a35" roughness={0.2} metalness={0.8} />
      </RoundedBox>
      
      {/* 책상 다리 (현대적) */}
      {[[-1.6, 0.42, -5.8], [1.6, 0.42, -5.8], [-1.6, 0.42, -4.2], [1.6, 0.42, -4.2]].map((pos, i) => (
        <RoundedBox key={i} args={[0.12, 0.85, 0.12]} position={pos} radius={0.008} smoothness={4} castShadow>
          <meshStandardMaterial color="#1a1a25" metalness={0.9} />
        </RoundedBox>
      ))}

      {/* 중앙 고급 의자 */}
      <RoundedBox args={[0.7, 0.12, 0.7]} position={[0, 0.6, -3.3]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>
      <RoundedBox args={[0.7, 1, 0.12]} position={[0, 1.1, -3.65]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>

      {/* 왼쪽 구역 - 책장 */}
      <RoundedBox args={[2.5, 3, 0.4]} position={[-5.5, 1.5, -5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#2a2a35" roughness={0.3} metalness={0.7} />
      </RoundedBox>

      {/* 왼쪽 소파 */}
      <RoundedBox args={[1.8, 0.5, 0.8]} position={[-5.5, 0.25, -1.5]} rotation={randomRotation()} radius={0.02} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a2a" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      <RoundedBox args={[1.8, 0.6, 0.15]} position={[-5.5, 0.55, -1.95]} rotation={randomRotation()} radius={0.02} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1a2a" roughness={0.6} metalness={0.2} />
      </RoundedBox>

      {/* 오른쪽 구역 - 회의 테이블 */}
      <RoundedBox args={[2, 0.08, 1.2]} position={[5.5, 0.8, -4]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2a35" roughness={0.2} metalness={0.8} />
      </RoundedBox>
      {[[-0.9, 0.4, -4.5], [0.9, 0.4, -4.5], [-0.9, 0.4, -3.5], [0.9, 0.4, -3.5]].map((pos, i) => (
        <RoundedBox key={`meeting-${i}`} args={[0.1, 0.8, 0.1]} position={[pos[0] + 5.5, pos[1], pos[2]]} radius={0.008} smoothness={4} castShadow>
          <meshStandardMaterial color="#1a1a25" metalness={0.9} />
        </RoundedBox>
      ))}

      {/* 오른쪽 의자들 */}
      <RoundedBox args={[0.5, 0.1, 0.5]} position={[5.5, 0.5, -2.5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.1, 0.5]} position={[5.5, 0.5, -5.5]} rotation={randomRotation()} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>

      {/* 트로피 (증거물) */}
      <group position={[1, 0.05, -4.5]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.25, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 노트북 */}
      <RoundedBox args={[0.35, 0.02, 0.45]} position={[-0.5, 0.91, -5]} rotation={[-Math.PI / 6, 0, 0]} radius={0.005} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
      </RoundedBox>

      {/* 서류 */}
      <mesh position={[0.6, 0.91, -4.7]} rotation={[-Math.PI / 2, 0, 0.2]} castShadow>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* 뒷벽 창문 (대형) */}
      <mesh position={[0, 2.5, -7.4]}>
        <planeGeometry args={[4, 3.5]} />
        <meshStandardMaterial 
          color="#6699ff" 
          transparent 
          opacity={0.2} 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* 혈흔 */}
      <mesh position={[0.5, 0.01, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
    </group>
  )
}

// 기본 가구 (폴백)
function DefaultFurniture() {
  return (
    <group>
      <RoundedBox args={[3, 0.1, 1.5]} position={[0, 0.8, -5]} radius={0.01} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#8b4513" />
      </RoundedBox>
    </group>
  )
}
