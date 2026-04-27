# 🔍 미스테리 추리 게임 - React + FastAPI

랜덤 시나리오 생성 기능이 있는 3D 인터랙티브 추리 게임입니다.

## � 주요 기능

- ✅ **랜덤 시나리오 생성**: 매번 다른 사건, 피해자, 용의자, 증거
- ✅ **논리적 완결성 보장**: 범인을 가리키는 고유 증거 6개, 타임라인 일관성
- ✅ **3D 인터랙티브 현장**: Three.js + React Three Fiber
- ✅ **증거 수집 시스템**: 클릭하여 증거 수집
- ✅ **용의자 조사**: 각 용의자의 알리바이, 동기 확인
- ✅ **추리 제출**: 범인과 동기 선택 후 정답 확인

## 🚀 실행 방법

### 1. 백엔드 실행 (FastAPI)

```bash
cd backend

# 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python main.py
```

백엔드 서버: http://localhost:8000

### 2. 프론트엔드 실행 (React)

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드 서버: http://localhost:3000

## � 게임 플레이

1. **시작**: 페이지 로드 시 자동으로 랜덤 시나리오 생성
2. **탐색**: 마우스 드래그로 3D 현장 둘러보기
3. **증거 수집**: 빨간 구체 클릭하여 증거 수집 (6개)
4. **용의자 조사**: 오른쪽 패널에서 용의자 정보 확인
5. **추리**: 최소 3개 증거 수집 후 범인 지목
6. **새 게임**: "새 시나리오" 버튼으로 다른 사건 생성

## � 비주얼 & 분위기

### 노아르 미스테리 스타일
- **어두운 조명**: 극적인 포인트 라이트와 스포트라이트로 긴장감 연출
- **실루엣 캐릭터**: 얼굴 없는 어두운 실루엣으로 미스테리한 분위기
- **호버 효과**: 용의자에 마우스를 올리면 색상과 특징이 드러남

### 포스트 프로세싱 효과
- **블룸 (Bloom)**: 밝은 조명이 번지는 효과
- **비네팅 (Vignette)**: 화면 가장자리 어둡게 처리
- **색수차 (Chromatic Aberration)**: 미세한 렌즈 왜곡
- **필름 그레인 (Noise)**: 거친 필름 느낌

### 프로시저럴 텍스처
- 바닥과 벽에 노이즈 텍스처 적용
- 시나리오별 다른 재질 (나무, 타일, 대리석)
- 천장 추가로 공간감 향상

## �🎵 사운드 시스템

게임에는 **Howler.js** 기반의 사운드 시스템이 구현되어 있습니다.

### 사운드 효과
- 🔊 **증거 획득**: 폴라로이드 셔터음
- 📄 **용의자 클릭**: 종이 넘기는 소리
- 💓 **범인 긴장**: 심장 박동 소리 (결정적 증거 수집 시)
- ⚖️ **추리 성공**: 의사봉 소리
- ❌ **추리 실패**: 실패 효과음
- 🎵 **배경 음악**: 미스테리 앰비언트 (루프)

### 사운드 파일 추가 방법
1. `frontend/public/sounds/` 폴더에 MP3 파일 추가
2. 필요한 파일 목록은 `frontend/public/sounds/README.md` 참고
3. 무료 사운드 소스: Freesound.org, Zapsplat, Mixkit 등

### 음소거 기능
- 우측 상단의 🔊 버튼으로 음소거 토글 가능
- 사운드 파일이 없어도 게임은 정상 작동합니다

## 🛠️ 기술 스택

### 백엔드
- FastAPI, Pydantic, Uvicorn

### 프론트엔드
- React 18, Vite, Three.js, React Three Fiber v9, @react-three/drei, @react-three/postprocessing, Zustand, Axios, Howler.js

## � 프로젝트 구조

```
.
├── backend/
│   ├── main.py              # FastAPI 서버 + 시나리오 생성 로직
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/      # React 컴포넌트
    │   ├── store/           # Zustand 상태 관리
    │   └── ...
    └── package.json
```

## 📝 상세 문서

더 자세한 내용은 [PROJECT_SETUP.md](./PROJECT_SETUP.md)를 참고하세요.
