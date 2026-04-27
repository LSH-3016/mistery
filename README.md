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

## 🎵 사운드 시스템

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
- React 18, Vite, Three.js, React Three Fiber, Zustand, Axios, Howler.js

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
