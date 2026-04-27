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
    texture.repeat.set(2, 2)
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

  // 프로시저럴 노멀 맵 생성 (요철 효과)
  const createNormalMap = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // 베이스 (중간 파란색 = 평평한 면)
    ctx.fillStyle = '#8080ff'
    ctx.fillRect(0, 0, 512, 512)
    
    // 미세한 요철 패턴
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const size = Math.random() * 3 + 1
      const brightness = Math.random() * 100 + 100
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, 255)`
      ctx.fillRect(x, y, size, size)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
    return texture
  }

  // 거칠기 맵 생성 (얼룩진 반사)
  const createRoughnessMap = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // 베이스 (중간 회색)
    ctx.fillStyle = '#888888'
    ctx.fillRect(0, 0, 512, 512)
    
    // 얼룩 (발자국, 먼지)
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const size = Math.random() * 50 + 20
      const opacity = Math.random() * 0.4 + 0.3
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `rgba(200, 200, 200, ${opacity})`)
      gradient.addColorStop(1, 'rgba(100, 100, 100, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(x - size, y - size, size * 2, size * 2)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 3)
    return texture
  }

  const floorTexture = createFloorTexture(config.floor)
  const wallTexture = createWallTexture(config.wall)
  const normalMap = createNormalMap()
  const roughnessMap = createRoughnessMap()

  return (
    <group>
      {/* 방 전체를 감싸는 박스 (BackSide 렌더링으로 내부가 보이는 방 구조) */}
      <mesh receiveShadow position={[0, 2.5, 0]}>
        <boxGeometry args={[15, 5, 15]} />
        <meshStandardMaterial 
          color={config.wall}
          side={THREE.BackSide}
          roughness={config.wallRoughness}
          metalness={0.02}
          map={wallTexture}
          normalMap={normalMap}
          normalScale={[0.2, 0.2]}
          envMapIntensity={0.3}
          aoMapIntensity={1.5}
        />
      </mesh>

      {/* 메인 룸 바닥 - PBR 재질 + Normal Map + 개선된 반사 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color={config.floor}
          roughness={0.95}
          metalness={0.0}
          map={floorTexture}
          normalMap={normalMap}
          normalScale={[0.15, 0.15]}
          envMapIntensity={0.1}
          aoMapIntensity={1.2}
        />
      </mesh>

      {/* 시나리오별 추가 공간 */}
      {scenario && scenario.case_title === '베이지 갤러리의 정전' && (
        <>
          {/* 갤러리 - 왼쪽 창고/보관실 */}
          <group position={[-10, 0, -3]}>
            {/* 창고 바닥 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
              <planeGeometry args={[4, 5]} />
              <meshStandardMaterial color="#2a2520" roughness={0.8} />
            </mesh>
            {/* 창고 뒷벽 */}
            <mesh position={[0, 2, -2.5]} receiveShadow castShadow>
              <planeGeometry args={[4, 4]} />
              <meshStandardMaterial color="#35302a" roughness={0.95} />
            </mesh>
            {/* 창고 왼쪽 벽 */}
            <mesh position={[-2, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
              <planeGeometry args={[5, 4]} />
              <meshStandardMaterial color="#35302a" roughness={0.95} />
            </mesh>
            {/* 창고 문틀 */}
            <mesh position={[2, 1.2, 0]} castShadow>
              <boxGeometry args={[0.1, 2.4, 0.1]} />
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </mesh>
            <mesh position={[2, 2.5, 0]} castShadow>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="#8b7355" roughness={0.7} />
            </mesh>
          </group>

          {/* 갤러리 - 오른쪽 화장실 */}
          <group position={[10, 0, -3]}>
            {/* 화장실 바닥 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
              <planeGeometry args={[3, 4]} />
              <meshStandardMaterial color="#e8e8e8" roughness={0.2} metalness={0.1} />
            </mesh>
            {/* 화장실 뒷벽 */}
            <mesh position={[0, 2, -2]} receiveShadow castShadow>
              <planeGeometry args={[3, 4]} />
              <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
            </mesh>
            {/* 화장실 오른쪽 벽 */}
            <mesh position={[1.5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
              <planeGeometry args={[4, 4]} />
              <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
            </mesh>
            {/* 화장실 문틀 */}
            <mesh position={[-1.5, 1.2, 0]} castShadow>
              <boxGeometry args={[0.1, 2.4, 0.1]} />
              <meshStandardMaterial color="#d4a574" roughness={0.6} />
            </mesh>
          </group>
        </>
      )}

      {scenario && scenario.case_title === '심야 연구실의 비밀' && (
        <>
          {/* 연구실 - 왼쪽 화학물질 보관실 */}
          <group position={[-10, 0, -3]}>
            {/* 보관실 바닥 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
              <planeGeometry args={[4, 5]} />
              <meshStandardMaterial color="#1a2530" roughness={0.3} metalness={0.2} />
            </mesh>
            {/* 보관실 뒷벽 */}
            <mesh position={[0, 2, -2.5]} receiveShadow castShadow>
              <planeGeometry args={[4, 4]} />
              <meshStandardMaterial color="#252f3a" roughness={0.85} />
            </mesh>
            {/* 보관실 왼쪽 벽 */}
            <mesh position={[-2, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
              <planeGeometry args={[5, 4]} />
              <meshStandardMaterial color="#252f3a" roughness={0.85} />
            </mesh>
            {/* 금속 문틀 */}
            <mesh position={[2, 1.2, 0]} castShadow>
              <boxGeometry args={[0.1, 2.4, 0.1]} />
              <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.9} />
            </mesh>
          </group>

          {/* 연구실 - 오른쪽 샤워실/제염실 */}
          <group position={[10, 0, -3]}>
            {/* 샤워실 바닥 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
              <planeGeometry args={[3, 4]} />
              <meshStandardMaterial color="#d0d0d0" roughness={0.2} metalness={0.3} />
            </mesh>
            {/* 샤워실 뒷벽 */}
            <mesh position={[0, 2, -2]} receiveShadow castShadow>
              <planeGeometry args={[3, 4]} />
              <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.2} />
            </mesh>
            {/* 샤워실 오른쪽 벽 */}
            <mesh position={[1.5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
              <planeGeometry args={[4, 4]} />
              <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.2} />
            </mesh>
            {/* 금속 문틀 */}
            <mesh position={[-1.5, 1.2, 0]} castShadow>
              <boxGeometry args={[0.1, 2.4, 0.1]} />
              <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.9} />
            </mesh>
          </group>
        </>
      )}

      {scenario && scenario.case_title === '고층 빌딩의 추락' && (
        <>
          {/* 회장실 - 왼쪽 개인 화장실 */}
          <group position={[-10, 0, -3]}>
            {/* 화장실 바닥 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
              <planeGeometry args={[4, 5]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.5} />
            </mesh>
            {/* 화장실 뒷벽 */}
            <mesh position={[0, 2, -2.5]} receiveShadow castShadow>
              <planeGeometry args={[4, 4]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.3} />
            </mesh>
            {/* 화장실 왼쪽 벽 */}
            <mesh position={[-2, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow castShadow>
              <planeGeometry args={[5, 4]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.3} />
            </mesh>
            {/* 고급 문틀 */}
            <mesh position={[2, 1.2, 0]} castShadow>
              <boxGeometry args={[0.1, 2.4, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
            </mesh>
          </group>

          {/* 회장실 - 오른쪽 비서실 */}
          <group position={[10, 0, -3]}>
            {/* 비서실 바닥 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
              <planeGeometry args={[4, 5]} />
              <meshStandardMaterial color="#2a2a35" roughness={0.2} metalness={0.4} />
            </mesh>
            {/* 비서실 뒷벽 */}
            <mesh position={[0, 2, -2.5]} receiveShadow castShadow>
              <planeGeometry args={[4, 4]} />
              <meshStandardMaterial color="#35353f" roughness={0.3} metalness={0.2} />
            </mesh>
            {/* 비서실 오른쪽 벽 */}
            <mesh position={[2, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow castShadow>
              <planeGeometry args={[5, 4]} />
              <meshStandardMaterial color="#35353f" roughness={0.3} metalness={0.2} />
            </mesh>
            {/* 고급 문틀 */}
            <mesh position={[-2, 1.2, 0]} castShadow>
              <boxGeometry args={[0.1, 2.4, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
            </mesh>
          </group>
        </>
      )}

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

      {/* 바닥 먼지/얼룩 Decals (무작위 배치) */}
      <mesh position={[-2, 0.01, -3]} rotation={[-Math.PI / 2, 0, 0.5]} receiveShadow>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          transparent
          opacity={0.15}
          roughness={1.0}
        />
      </mesh>
      <mesh position={[3, 0.01, -1]} rotation={[-Math.PI / 2, 0, -0.8]} receiveShadow>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          transparent
          opacity={0.12}
          roughness={1.0}
        />
      </mesh>
      <mesh position={[-4, 0.01, -6]} rotation={[-Math.PI / 2, 0, 1.2]} receiveShadow>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          transparent
          opacity={0.18}
          roughness={1.0}
        />
      </mesh>
      <mesh position={[1, 0.01, -6.5]} rotation={[-Math.PI / 2, 0, -0.3]} receiveShadow>
        <circleGeometry args={[0.45, 32]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          transparent
          opacity={0.1}
          roughness={1.0}
        />
      </mesh>
      <mesh position={[5, 0.01, -4]} rotation={[-Math.PI / 2, 0, 0.9]} receiveShadow>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          transparent
          opacity={0.14}
          roughness={1.0}
        />
      </mesh>
    </group>
  )
}
