import { create } from 'zustand'
import axios from 'axios'
import soundManager from '../utils/soundManager'

const useGameStore = create((set, get) => ({
  scenario: null,
  loading: true,
  collectedEvidence: [],
  selectedModal: null,

  loadScenario: async () => {
    try {
      set({ loading: true })
      const response = await axios.get('/api/scenario')
      set({ scenario: response.data, loading: false })
      
      // 사운드 초기화 (사용자 인터랙션 후)
      soundManager.init()
      soundManager.playBGM()
    } catch (error) {
      console.error('Failed to load scenario:', error)
      set({ loading: false })
    }
  },

  collectEvidence: (evidenceId) => {
    const { collectedEvidence, scenario } = get()
    if (!collectedEvidence.includes(evidenceId)) {
      const evidence = scenario.evidence.find(e => e.id === evidenceId)
      
      // 증거 획득 사운드 재생
      soundManager.play('evidenceCollect')
      
      set({ 
        collectedEvidence: [...collectedEvidence, evidenceId],
        selectedModal: { type: 'evidence', data: evidence }
      })
    }
  },

  showSuspectInfo: (suspectId) => {
    const { scenario } = get()
    const suspect = scenario.suspects.find(s => s.id === suspectId)
    
    // 용의자 클릭 사운드 재생
    soundManager.play('suspectClick')
    
    set({ selectedModal: { type: 'suspect', data: suspect } })
  },

  showEvidenceDetail: (evidenceId) => {
    const { scenario } = get()
    const evidence = scenario.evidence.find(e => e.id === evidenceId)
    set({ selectedModal: { type: 'evidence', data: evidence } })
  },

  closeModal: () => {
    set({ selectedModal: null })
  },

  checkSolution: (culprit, motive) => {
    const { scenario, collectedEvidence } = get()
    const isCorrectCulprit = culprit === scenario.solution.culprit
    const isCorrectMotive = motive === scenario.solution.motive
    const isCorrect = isCorrectCulprit && isCorrectMotive

    // 결과에 따른 사운드 재생
    if (isCorrect) {
      soundManager.play('success')
    } else {
      soundManager.play('failure')
    }

    // 점수 계산
    const totalEvidence = scenario.evidence.length
    const collectedCount = collectedEvidence.length
    const decisiveCount = scenario.evidence.filter(e => e.is_decisive && collectedEvidence.includes(e.id)).length
    
    let score = 100
    
    // 모든 증거 수집 보너스
    if (collectedCount === totalEvidence) {
      score += 20
    }
    
    // 효율성 보너스 (결정적 증거만 수집)
    if (decisiveCount > 0 && collectedCount === decisiveCount) {
      score += 10
    }
    
    // 등급 계산
    let grade = 'B'
    if (score >= 120) grade = 'S'
    else if (score >= 110) grade = 'A'

    set({
      selectedModal: {
        type: 'result',
        data: {
          correct: isCorrect,
          isCorrectCulprit,
          isCorrectMotive,
          solution: scenario.solution,
          collectedCount,
          totalCount: totalEvidence,
          score,
          grade
        }
      }
    })
  },

  resetGame: () => {
    set({ collectedEvidence: [], selectedModal: null })
    soundManager.stopBGM()
    get().loadScenario()
  }
}))

export default useGameStore
