# 사운드 파일 가이드

이 폴더에 게임에 사용될 사운드 파일들을 추가하세요.

## 필요한 사운드 파일

### 효과음 (SFX)
1. **camera-shutter.mp3** - 증거 획득 시 (폴라로이드 셔터음)
2. **page-turn.mp3** - 용의자 클릭 시 (종이 넘기는 소리)
3. **heartbeat.mp3** - 범인 긴장 상태 (심장 박동 소리, 루프)
4. **gavel.mp3** - 범인 지목 성공 (의사봉 소리)
5. **failure.mp3** - 추리 실패 (실패 효과음)
6. **click.mp3** - 버튼 클릭 (일반 클릭 소리)

### 배경 음악 (BGM)
7. **bgm-mystery.mp3** - 배경 음악 (빗소리 + 미스테리 앰비언트, 루프)

## 무료 사운드 소스 추천

### 효과음
- **Freesound.org** - https://freesound.org/
- **Zapsplat** - https://www.zapsplat.com/
- **Mixkit** - https://mixkit.co/free-sound-effects/

### 배경 음악
- **Incompetech** - https://incompetech.com/music/royalty-free/
- **Purple Planet** - https://www.purple-planet.com/
- **Bensound** - https://www.bensound.com/

## 라이선스 주의사항

무료 사운드를 사용할 때는 반드시 라이선스를 확인하세요:
- **CC0 (Public Domain)**: 자유롭게 사용 가능
- **CC BY**: 출처 표기 필요
- **CC BY-NC**: 비상업적 용도만 가능

## 파일 형식 및 품질

- **형식**: MP3 (호환성이 가장 좋음)
- **비트레이트**: 128-192 kbps (웹 게임에 적합)
- **샘플레이트**: 44.1 kHz
- **파일 크기**: 효과음은 100KB 이하, BGM은 2MB 이하 권장

## 사운드 추가 방법

1. 위 사이트에서 적절한 사운드 다운로드
2. 파일명을 위 목록과 동일하게 변경
3. 이 폴더(`frontend/public/sounds/`)에 복사
4. 게임을 실행하면 자동으로 로드됩니다

## 현재 상태

사운드 시스템은 구현되어 있지만, 실제 사운드 파일이 없으면 콘솔에 경고만 표시되고 게임은 정상 작동합니다.
