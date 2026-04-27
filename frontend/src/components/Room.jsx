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

  // 프로시저럴 텍스처 생성 (개선된 노이즈 패턴)
  const createFloorTexture = (baseColor) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')
    
    // 베이스 색상
    ctx.fillStyle = baseColor
    ctx.fillRect(0, 0, 1024, 1024)
    
    // 나무 결 패턴 (세로 라인)
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 1024
      const width = Math.random() * 3 + 1
      const opacity = Math.random() * 0.15 + 0.05
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      ctx.fillRect(x, 0, width, 1024)
    }
    
    // 더티 텍스처 (얼룩)
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 1024
      const size = Math.random() * 30 + 10
      const opacity = Math.random() * 0.1
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(x - size, y - size, size * 2, size * 2)
    }
    
    // 미세한 노이즈
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 1024
      const size = Math.random() * 1.5
      const opacity = Math.random() * 0.2
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0}, ${Math.random() > 0.5 ? 255 : 0}, ${Math.random() > 0.5 ? 255 : 0}, ${opacity})`
      ctx.fillRect(x, y, size, size)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 3)
    return texture
  }

  const createWallTexture = (baseColor) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')
    
    // 베이스 색상
    ctx.fillStyle = baseColor
    ctx.fillRect(0, 0, 1024, 1024)
    
    // 벽 얼룩 (더 많이)
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 1024
      const size = Math.random() * 40 + 15
      const opacity = Math.random() * 0.08
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(x - size, y - size, size * 2, size * 2)
    }
    
    // 미세한 텍스처
    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 1024
      const size = Math.random() * 2
      const opacity = Math.random() * 0.15
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fillRect(x, y, size, size)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    return texture
  }

  const floorTexture = createFloorTexture(config.floor)
  const wallTexture = createWallTexture(config.wall)

  return (
    <group>
      {/* 바닥 - PBR 재질 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color={config.floor}
          roughness={config.floorRoughness}
          metalness={0.05}
          map={floorTexture}
          envMapIntensity={0.4}
          aoMapIntensity={1.5}
        />
      </mesh>

      {/* 뒷벽 - PBR 재질 */}
      <mesh position={[0, 2.5, -7.5]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={config.wall}
          roughness={config.wallRoughness}
          metalness={0.02}
          map={wallTexture}
          envMapIntensity={0.3}
          aoMapIntensity={1.2}
        />
      </mesh>

      {/* 왼쪽 벽 */}
      <mesh position={[-7.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={config.wall}
          roughness={config.wallRoughness}
          metalness={0.02}
          map={wallTexture}
          envMapIntensity={0.3}
          aoMapIntensity={1.2}
        />
      </mesh>

      {/* 오른쪽 벽 */}
      <mesh position={[7.5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[15, 5]} />
        <meshStandardMaterial 
          color={config.wall}
          roughness={config.wallRoughness}
          metalness={0.02}
          map={wallTexture}
          envMapIntensity={0.3}
          aoMapIntensity={1.2}
        />
      </mesh>

      {/* 천장 - 약간 반사되는 재질 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow position={[0, 5, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color="#1a1a20"
          roughness={0.7}
          metalness={0.15}
          envMapIntensity={0.2}
        />
      </mesh>

      {/* 굽도리(Baseboard) - 벽과 바닥 연결 */}
      {/* 뒷벽 굽도리 */}
      <mesh position={[0, 0.05, -7.45]} castShadow receiveShadow>
        <boxGeometry args={[15, 0.1, 0.05]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* 왼쪽 벽 굽도리 */}
      <mesh position={[-7.45, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.1, 15]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* 오른쪽 벽 굽도리 */}
      <mesh position={[7.45, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.1, 15]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}
