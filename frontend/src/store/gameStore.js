import { create } from 'zustand'
import axios from 'axios'

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
    } catch (error) {
      console.error('Failed to load scenario:', error)
      set({ loading: false })
    }
  },

  collectEvidence: (evidenceId) => {
    const { collectedEvidence, scenario } = get()
    if (!collectedEvidence.includes(evidenceId)) {
      const evidence = scenario.evidence.find(e => e.id === evidenceId)
      set({ 
        collectedEvidence: [...collectedEvidence, evidenceId],
        selectedModal: { type: 'evidence', data: evidence }
      })
    }
  },

  showSuspectInfo: (suspectId) => {
    const { scenario } = get()
    const suspect = scenario.suspects.find(s => s.id === suspectId)
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
    const { scenario } = get()
    const isCorrectCulprit = culprit === scenario.solution.culprit
    const isCorrectMotive = motive === scenario.solution.motive

    set({
      selectedModal: {
        type: 'result',
        data: {
          correct: isCorrectCulprit && isCorrectMotive,
          isCorrectCulprit,
          isCorrectMotive,
          solution: scenario.solution,
          collectedCount: get().collectedEvidence.length,
          totalCount: scenario.evidence.length
        }
      }
    })
  },

  resetGame: () => {
    set({ collectedEvidence: [], selectedModal: null })
    get().loadScenario()
  }
}))

export default useGameStore
