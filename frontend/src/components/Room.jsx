import useGameStore from '../store/gameStore'

export default function Room() {
  const { scenario } = useGameStore()
  
  // 시나리오별 색상 설정
  const getRoomColors = () => {
    if (!scenario) return { floor: '#3a3a45', wall: '#4a4a55' }
    
    switch (scenario.case_title) {
      case '베이지 갤러리의 정전':
        return {
          floor: '#4a4035',  // 따뜻한 갈색 톤
          wall: '#5a5045'    // 베이지 갤러리 느낌
        }
      case '심야 연구실의 비밀':
        return {
          floor: '#2a3540',  // 차가운 파란 톤
          wall: '#3a4550'    // 연구실 느낌
        }
      case '고층 빌딩의 추락':
        return {
          floor: '#3a3a45',  // 현대적인 회색 톤
          wall: '#4a4a55'    // 고급 사무실 느낌
        }
      default:
        return {
          floor: '#3a3a45',
          wall: '#4a4a55'
        }
    }
  }

  const colors = getRoomColors()

  return (
    <group>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color={colors.floor} 
          roughness={0.8} 
          metalness={0.15}
        />
      </mesh>

      {/* 뒷벽 */}
      <mesh position={[0, 2.5, -7.5]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={colors.wall} 
          roughness={0.85}
        />
      </mesh>

      {/* 왼쪽 벽 */}
      <mesh position={[-7.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={colors.wall} 
          roughness={0.85}
        />
      </mesh>

      {/* 오른쪽 벽 */}
      <mesh position={[7.5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={colors.wall} 
          roughness={0.85}
        />
      </mesh>
    </group>
  )
}
