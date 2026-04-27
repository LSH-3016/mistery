import useGameStore from '../store/gameStore'
import * as THREE from 'three'

export default function Room() {
  const { scenario } = useGameStore()
  
  // 시나리오별 색상 및 재질 설정
  const getRoomConfig = () => {
    if (!scenario) return { 
      floor: '#2a2a35', 
      wall: '#35353f',
      floorRoughness: 0.7,
      wallRoughness: 0.9
    }
    
    switch (scenario.case_title) {
      case '베이지 갤러리의 정전':
        return {
          floor: '#3a3025',  // 어두운 나무 바닥
          wall: '#45403a',   // 어두운 베이지 벽
          floorRoughness: 0.6,
          wallRoughness: 0.95
        }
      case '심야 연구실의 비밀':
        return {
          floor: '#1a2530',  // 어두운 타일
          wall: '#252f3a',   // 차가운 회색 벽
          floorRoughness: 0.3,
          wallRoughness: 0.85
        }
      case '고층 빌딩의 추락':
        return {
          floor: '#2a2a35',  // 어두운 대리석
          wall: '#35353f',   // 현대적 회색 벽
          floorRoughness: 0.2,
          wallRoughness: 0.8
        }
      default:
        return {
          floor: '#2a2a35',
          wall: '#35353f',
          floorRoughness: 0.7,
          wallRoughness: 0.9
        }
    }
  }

  const config = getRoomConfig()

  // 프로시저럴 텍스처 생성 (간단한 노이즈 패턴)
  const createNoiseTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // 베이스 색상
    ctx.fillStyle = '#222'
    ctx.fillRect(0, 0, 512, 512)
    
    // 노이즈 추가
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const size = Math.random() * 2
      const opacity = Math.random() * 0.3
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fillRect(x, y, size, size)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
    return texture
  }

  const noiseTexture = createNoiseTexture()

  return (
    <group>
      {/* 바닥 - 어두운 재질 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color={config.floor}
          roughness={config.floorRoughness}
          metalness={0.1}
          map={noiseTexture}
          envMapIntensity={0.3}
        />
      </mesh>

      {/* 뒷벽 - 거친 질감 */}
      <mesh position={[0, 2.5, -7.5]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={config.wall}
          roughness={config.wallRoughness}
          metalness={0.05}
          map={noiseTexture}
        />
      </mesh>

      {/* 왼쪽 벽 */}
      <mesh position={[-7.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={config.wall}
          roughness={config.wallRoughness}
          metalness={0.05}
          map={noiseTexture}
        />
      </mesh>

      {/* 오른쪽 벽 */}
      <mesh position={[7.5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={config.wall}
          roughness={config.wallRoughness}
          metalness={0.05}
          map={noiseTexture}
        />
      </mesh>

      {/* 천장 - 약간 반사되는 재질 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow position={[0, 5, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color="#1a1a20"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}
