# 3D 공간 현실감 개선 사항

## 적용된 주요 개선 사항

### 1. ✅ 닫힌 방 구조 생성 (BackSide 렌더링)

**문제점**: 기존에는 개별 평면(Plane)으로 벽을 구성하여 공간이 열려있고 로블록스처럼 보였습니다.

**해결책**: 
- `Room.jsx`에서 거대한 박스(15x5x15)를 생성하고 `THREE.BackSide`로 내부를 렌더링
- 이제 방이 완전히 닫힌 구조로 변경되어 실제 방처럼 보입니다
- 벽, 천장, 바닥이 하나의 통합된 공간을 형성

```jsx
<mesh receiveShadow position={[0, 2.5, 0]}>
  <boxGeometry args={[15, 5, 15]} />
  <meshStandardMaterial 
    color={config.wall}
    side={THREE.BackSide}  // 핵심: 박스 내부를 렌더링
    roughness={config.wallRoughness}
    metalness={0.02}
  />
</mesh>
```

### 2. ✅ 그림자 Bias 최적화

**문제점**: 물체가 바닥에서 떠 있는 것처럼 보이는 현상 (그림자와 물체 사이 틈)

**해결책**:
- `Scene.jsx`의 모든 조명에서 `shadow-bias`를 `-0.0005`로 조정
- 음수 값으로 설정하여 그림자가 물체에 완전히 붙도록 수정
- 그림자 해상도를 2048x2048로 대폭 증가

```jsx
<directionalLight
  castShadow
  shadow-mapSize={[2048, 2048]}
  shadow-bias={-0.0005}  // 음수로 물체에 그림자 밀착
  shadow-normalBias={0.02}
  shadow-camera-far={50}
/>
```

### 3. ✅ SSAO 극단적 튜닝

**문제점**: 물체와 바닥의 접촉면이 명확하지 않아 공간감 부족

**해결책**:
- SSAO intensity를 60 → 100으로 대폭 증가
- radius를 0.2 → 0.15로 줄여서 접촉면에 집중
- samples를 16 → 32로 증가하여 품질 향상
- 물체와 바닥이 만나는 선이 진한 검은색으로 표현됨

```jsx
<SSAO
  samples={32}
  radius={0.15}        // 좁은 영역에 집중
  intensity={100}      // 매우 강한 효과
  luminanceInfluence={0.4}
  color="black"
  bias={0.01}
/>
```

### 4. ✅ 바닥 텍스처 타일링 증가

**문제점**: 바닥이 너무 넓고 단조로워서 거리감 상실

**해결책**:
- 바닥 텍스처 repeat을 3x3 → 8x8로 증가
- 타일 패턴이 반복되어 공간의 크기를 뇌가 인지하게 됨
- 실제 타일 바닥처럼 보이는 효과

```jsx
texture.repeat.set(8, 8)  // 텍스처를 8번 반복
```

### 5. ✅ ContactShadows 최적화

**문제점**: 접촉 그림자가 약하거나 흐릿함

**해결책**:
- position을 0.001로 바닥에 더 가깝게 배치
- opacity를 0.9로 증가하여 더 진하게
- blur를 0.8로 줄여서 더 날카롭게
- resolution을 1024로 증가하여 고품질

```jsx
<ContactShadows
  position={[0, 0.001, 0]}
  opacity={0.9}
  scale={15}
  blur={0.8}
  far={5}
  resolution={1024}
  color="#000000"
/>
```

## 추가 개선 제안 (향후 적용 가능)

### 1. 가구 배치 전략 (Zoning)
- 현재: 가구들이 방 중앙에 흩어져 있음
- 개선안: 책상/수납장을 벽면에 붙여 배치
- 효과: 벽과 가구가 만나는 그림자로 '구석' 인지

### 2. 조명 그룹화 (Area Lighting)
- 메인 룸: 어두운 푸른색 조명 (기본)
- 책상 위: 밝은 주황색 스포트라이트 (강조)
- 추가 공간: 문틈으로 새어나오는 하얀색 빛
- 효과: 빛의 색깔로 공간 구분

### 3. Low-poly 3D 모델 혼합
- 현재: BoxGeometry만 사용
- 개선안: 무료 GLB 모델 1-2개 추가 (예: 의자, 책상)
- 효과: 전문가 모델과 코드 생성 모델 혼합으로 퀄리티 향상

### 4. 소품 밀집 배치
- 현재: 빈 공간을 억지로 채움
- 개선안: 책상 위나 주변에 소품 밀집
- 효과: '정보량' 증가로 현실감 향상

## 테스트 방법

1. 개발 서버 실행:
```bash
cd frontend
npm run dev
```

2. 확인 사항:
   - ✅ 방이 닫힌 구조로 보이는지
   - ✅ 물체가 바닥에 붙어 있는지 (떠있지 않은지)
   - ✅ 물체와 바닥 접촉면에 진한 선이 보이는지
   - ✅ 바닥 타일 패턴이 반복되는지
   - ✅ 전체적으로 공간감이 느껴지는지

## 성능 영향

- SSAO samples 증가 (16→32): 약간의 성능 저하 가능
- 그림자 해상도 증가 (1024→2048): 약간의 성능 저하 가능
- 전체적으로 중급 이상 GPU에서는 문제없이 작동

## 참고 자료

- Three.js BackSide 렌더링: https://threejs.org/docs/#api/en/materials/Material.side
- Shadow Bias 튜닝: https://threejs.org/docs/#api/en/lights/shadows/LightShadow.bias
- SSAO 효과: https://github.com/pmndrs/postprocessing
