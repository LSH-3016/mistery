import { Howl } from 'howler'

class SoundManager {
  constructor() {
    this.sounds = {}
    this.bgm = null
    this.isMuted = false
    this.bgmVolume = 0.3
    this.sfxVolume = 0.5
  }

  // 사운드 초기화 (Web Audio API를 사용하므로 사용자 인터랙션 후 호출)
  init() {
    // 배경 음악 (빗소리 + 미스테리 앰비언트)
    // 실제 파일이 없으므로 주석 처리, 나중에 파일 추가 시 활성화
    /*
    this.bgm = new Howl({
      src: ['/sounds/bgm-mystery.mp3'],
      loop: true,
      volume: this.bgmVolume,
      html5: true // 스트리밍 방식으로 메모리 절약
    })
    */

    // 효과음들
    this.sounds = {
      // 증거 획득 - 폴라로이드 셔터음
      evidenceCollect: new Howl({
        src: ['/sounds/camera-shutter.mp3'],
        volume: this.sfxVolume,
        onloaderror: () => console.log('Evidence sound not found - using silence')
      }),

      // 용의자 클릭 - 종이 넘기는 소리
      suspectClick: new Howl({
        src: ['/sounds/page-turn.mp3'],
        volume: this.sfxVolume * 0.8,
        onloaderror: () => console.log('Suspect click sound not found - using silence')
      }),

      // 심장 박동 (긴장 상태)
      heartbeat: new Howl({
        src: ['/sounds/heartbeat.mp3'],
        loop: true,
        volume: this.sfxVolume * 0.6,
        onloaderror: () => console.log('Heartbeat sound not found - using silence')
      }),

      // 범인 지목 성공 - 의사봉 소리
      success: new Howl({
        src: ['/sounds/gavel.mp3'],
        volume: this.sfxVolume,
        onloaderror: () => console.log('Success sound not found - using silence')
      }),

      // 추리 실패
      failure: new Howl({
        src: ['/sounds/failure.mp3'],
        volume: this.sfxVolume * 0.7,
        onloaderror: () => console.log('Failure sound not found - using silence')
      }),

      // 버튼 클릭
      buttonClick: new Howl({
        src: ['/sounds/click.mp3'],
        volume: this.sfxVolume * 0.4,
        onloaderror: () => console.log('Button click sound not found - using silence')
      })
    }
  }

  // 배경 음악 재생
  playBGM() {
    if (this.bgm && !this.isMuted) {
      this.bgm.play()
    }
  }

  // 배경 음악 정지
  stopBGM() {
    if (this.bgm) {
      this.bgm.stop()
    }
  }

  // 배경 음악 페이드 아웃
  fadeBGM(duration = 1000) {
    if (this.bgm && this.bgm.playing()) {
      this.bgm.fade(this.bgmVolume, 0, duration)
    }
  }

  // 배경 음악 페이드 인
  fadeInBGM(duration = 1000) {
    if (this.bgm && !this.isMuted) {
      if (!this.bgm.playing()) {
        this.bgm.play()
      }
      this.bgm.fade(0, this.bgmVolume, duration)
    }
  }

  // 효과음 재생
  play(soundName, options = {}) {
    if (this.isMuted) return

    const sound = this.sounds[soundName]
    if (sound) {
      // 팬닝 (좌우 스피커 조절) - 공간감 연출
      if (options.pan !== undefined) {
        sound.stereo(options.pan) // -1 (왼쪽) ~ 1 (오른쪽)
      }

      // 볼륨 조절
      if (options.volume !== undefined) {
        sound.volume(options.volume * this.sfxVolume)
      }

      sound.play()
    }
  }

  // 특정 사운드 정지
  stop(soundName) {
    const sound = this.sounds[soundName]
    if (sound) {
      sound.stop()
    }
  }

  // 음소거 토글
  toggleMute() {
    this.isMuted = !this.isMuted
    
    if (this.isMuted) {
      // 모든 사운드 정지
      if (this.bgm) this.bgm.mute(true)
      Object.values(this.sounds).forEach(sound => sound.mute(true))
    } else {
      // 음소거 해제
      if (this.bgm) this.bgm.mute(false)
      Object.values(this.sounds).forEach(sound => sound.mute(false))
    }

    return this.isMuted
  }

  // 배경 음악 볼륨 조절
  setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume))
    if (this.bgm) {
      this.bgm.volume(this.bgmVolume)
    }
  }

  // 효과음 볼륨 조절
  setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume))
    Object.values(this.sounds).forEach(sound => {
      sound.volume(this.sfxVolume)
    })
  }

  // 모든 사운드 정리
  cleanup() {
    if (this.bgm) {
      this.bgm.unload()
    }
    Object.values(this.sounds).forEach(sound => {
      sound.unload()
    })
  }
}

// 싱글톤 인스턴스
const soundManager = new SoundManager()

export default soundManager
