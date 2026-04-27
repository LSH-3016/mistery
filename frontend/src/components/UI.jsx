import { useState, useEffect } from 'react'
import useGameStore from '../store/gameStore'
import './UI.css'

function InterviewModal({ suspect, onClose }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [askedQuestions, setAskedQuestions] = useState([])

  const questions = [
    { id: 'q1', text: suspect.interview.q1, answer: suspect.interview.a1 },
    { id: 'q2', text: suspect.interview.q2, answer: suspect.interview.a2 },
    { id: 'q3', text: suspect.interview.q3, answer: suspect.interview.a3 },
  ]

  const handleAskQuestion = (question) => {
    setSelectedQuestion(question)
    if (!askedQuestions.includes(question.id)) {
      setAskedQuestions([...askedQuestions, question.id])
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal interview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👤 {suspect.name} 인터뷰</h2>
          <div className="suspect-info-grid">
            <div><strong>나이:</strong> {suspect.age}세</div>
            <div><strong>직책:</strong> {suspect.role}</div>
          </div>
        </div>

        <div className="info-section">
          <p><strong>관계:</strong> {suspect.relationship}</p>
          <p><strong>배경:</strong> {suspect.motive}</p>
          {suspect.appearance_hint && (
            <div className="appearance-box">
              <strong>👁️ 외모 특징:</strong> {suspect.appearance_hint}
            </div>
          )}
          <div className="alibi-box">
            <strong>알리바이:</strong> {suspect.alibi}
          </div>
        </div>

        <div className="interview-section">
          <h3>🎤 질문하기</h3>
          
          <div className="question-list">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleAskQuestion(q)}
                className={`question-btn ${askedQuestions.includes(q.id) ? 'asked' : ''}`}
              >
                <span className="question-icon">
                  {askedQuestions.includes(q.id) ? '✓' : '❓'}
                </span>
                <span className="question-text">{q.text}</span>
              </button>
            ))}
          </div>

          {selectedQuestion && (
            <div className="answer-box">
              <div className="answer-label">답변:</div>
              <div className="answer-text">"{selectedQuestion.answer}"</div>
            </div>
          )}
        </div>

        <button className="close-btn" onClick={onClose}>
          인터뷰 종료
        </button>
      </div>
    </div>
  )
}

const getThemeColors = (caseTitle) => {
  switch (caseTitle) {
    case '베이지 갤러리의 정전':
      return {
        'primary-color': '#d4a574',
        'secondary-color': '#f5e6d3',
        'accent-color': '#8b7355',
        'bg-overlay': 'rgba(42, 37, 32, 0.92)',
        'text-primary': '#f5e6d3',
        'text-secondary': '#d4a574'
      }
    case '심야 연구실의 비밀':
      return {
        'primary-color': '#00ffff',
        'secondary-color': '#00ff88',
        'accent-color': '#4444ff',
        'bg-overlay': 'rgba(10, 15, 26, 0.92)',
        'text-primary': '#e0f7ff',
        'text-secondary': '#00ffff'
      }
    case '고층 빌딩의 추락':
      return {
        'primary-color': '#6699ff',
        'secondary-color': '#88aaff',
        'accent-color': '#ffffff',
        'bg-overlay': 'rgba(15, 15, 21, 0.92)',
        'text-primary': '#e8f0ff',
        'text-secondary': '#6699ff'
      }
    default:
      return {
        'primary-color': '#ff6b6b',
        'secondary-color': '#4ecdc4',
        'accent-color': '#ffe66d',
        'bg-overlay': 'rgba(10, 10, 15, 0.92)',
        'text-primary': '#eee',
        'text-secondary': '#ff6b6b'
      }
  }
}

export default function UI() {
  const {
    scenario,
    collectedEvidence,
    selectedModal,
    showEvidenceDetail,
    closeModal,
    checkSolution,
    resetGame
  } = useGameStore()

  const [showSolvePanel, setShowSolvePanel] = useState(false)
  const [selectedCulprit, setSelectedCulprit] = useState('')
  const [selectedMotive, setSelectedMotive] = useState('')
  const [interviewingSuspect, setInterviewingSuspect] = useState(null)

  // CSS 변수 동적 설정
  useEffect(() => {
    if (scenario) {
      const themeColors = getThemeColors(scenario.case_title)
      Object.entries(themeColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
    }
  }, [scenario])

  if (!scenario) return null

  const handleSolve = () => {
    if (collectedEvidence.length < 3) {
      alert('증거를 더 수집해야 합니다! (최소 3개 이상)')
      return
    }
    setShowSolvePanel(true)
  }

  const handleSubmit = () => {
    if (!selectedCulprit || !selectedMotive) {
      alert('범인과 동기를 모두 선택해주세요!')
      return
    }
    checkSolution(selectedCulprit, selectedMotive)
    setShowSolvePanel(false)
    setSelectedCulprit('')
    setSelectedMotive('')
  }

  return (
    <div className="ui-overlay">
      {/* 사건 정보 패널 */}
      <div className="info-panel glass-panel">
        <div className="panel-header">
          <h2>🔒 {scenario.case_title}</h2>
        </div>
        
        <div className="case-details">
          <div className="detail-row">
            <span className="label">피해자</span>
            <span className="value">{scenario.victim.name} ({scenario.victim.age}세)</span>
          </div>
          <div className="detail-row">
            <span className="label">직책</span>
            <span className="value">{scenario.victim.role}</span>
          </div>
          <div className="detail-row">
            <span className="label">사망 시간</span>
            <span className="value">{scenario.time_of_death}</span>
          </div>
          <div className="detail-row">
            <span className="label">장소</span>
            <span className="value">{scenario.location.name}</span>
          </div>
          <div className="detail-row">
            <span className="label">사인</span>
            <span className="value">{scenario.cause_of_death}</span>
          </div>
        </div>

        {scenario.special_event && (
          <div className="special-event">
            ⚡ {scenario.special_event}
          </div>
        )}

        <div className="discovery-box">
          <strong>발견 상태</strong>
          <p>{scenario.discovery}</p>
        </div>

        <div className="instruction">
          💡 <strong>조작 가이드</strong><br />
          • 마우스 드래그로 시점 회전<br />
          • 빨간 구체를 클릭하여 증거 수집<br />
          • 용의자 카드를 클릭하여 인터뷰
        </div>

        <button className="primary-btn" onClick={handleSolve}>
          🎯 범인 지목하기
        </button>
        <button className="secondary-btn" onClick={resetGame}>
          🔄 새 시나리오
        </button>
      </div>

      {/* 용의자 패널 */}
      <div className="suspects-panel glass-panel">
        <div className="panel-header">
          <h2>👥 용의자 목록</h2>
        </div>
        {scenario.suspects.map((suspect) => (
          <div
            key={suspect.id}
            className="suspect-card"
            onClick={() => setInterviewingSuspect(suspect)}
          >
            <div className="suspect-header">
              <div className="suspect-name">{suspect.name}</div>
              <div className="suspect-age">{suspect.age}세</div>
            </div>
            <div className="suspect-role">{suspect.role}</div>
            <div className="suspect-relation">{suspect.relationship}</div>
          </div>
        ))}
      </div>

      {/* 증거 패널 */}
      <div className="evidence-panel glass-panel">
        <h3>📋 수집한 증거 <span className="evidence-count">({collectedEvidence.length}/{scenario.evidence.length})</span></h3>
        <div className="evidence-list">
          {collectedEvidence.length === 0 ? (
            <div className="no-evidence">아직 수집한 증거가 없습니다</div>
          ) : (
            collectedEvidence.map((id) => {
              const evidence = scenario.evidence.find(e => e.id === id)
              return (
                <div
                  key={id}
                  className="evidence-item"
                  onClick={() => showEvidenceDetail(id)}
                >
                  <div className="evidence-icon">🔍</div>
                  <div className="evidence-name">{evidence.name}</div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* 인터뷰 모달 */}
      {interviewingSuspect && (
        <InterviewModal
          suspect={interviewingSuspect}
          onClose={() => setInterviewingSuspect(null)}
        />
      )}

      {/* 증거 상세 모달 */}
      {selectedModal && selectedModal.type === 'evidence' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal evidence-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🔍 {selectedModal.data.name}</h2>
            </div>
            <div className="evidence-detail">
              <div className="detail-section">
                <strong>발견 위치</strong>
                <p>{selectedModal.data.location}</p>
              </div>
              <div className="detail-section">
                <strong>상세 설명</strong>
                <p>{selectedModal.data.description}</p>
              </div>
              <div className="detail-section clue-type">
                <strong>증거 유형</strong>
                <span className="badge">{selectedModal.data.clue_type}</span>
              </div>
            </div>
            <button className="close-btn" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}

      {/* 결과 모달 */}
      {selectedModal && selectedModal.type === 'result' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal result-modal ${selectedModal.data.correct ? 'success' : 'failure'}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedModal.data.correct ? '🎉 사건 해결!' : '❌ 추리 실패'}</h2>
            </div>
            {selectedModal.data.correct ? (
              <div className="result-content">
                <p className="success-message">축하합니다! 완벽한 추리였습니다!</p>
                <div className="solution-details">
                  <div className="detail-row">
                    <span className="label">범인</span>
                    <span className="value">{selectedModal.data.solution.culprit}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">동기</span>
                    <span className="value">{selectedModal.data.solution.motive}</span>
                  </div>
                </div>
                <div className="explanation-box">
                  <strong>사건 해설</strong>
                  <p>{selectedModal.data.solution.explanation}</p>
                </div>
                <div className="stats-box">
                  수집한 증거: {selectedModal.data.collectedCount}/{selectedModal.data.totalCount}개<br />
                  당신은 훌륭한 탐정입니다! 🕵️
                </div>
              </div>
            ) : (
              <div className="result-content">
                <p className="failure-message">추리가 틀렸습니다. 증거를 다시 검토해보세요.</p>
                {!selectedModal.data.isCorrectCulprit && (
                  <p className="hint">💡 힌트: 물리적 증거들을 다시 확인해보세요.</p>
                )}
                {!selectedModal.data.isCorrectMotive && (
                  <p className="hint">💡 힌트: 용의자들의 배경을 다시 살펴보세요.</p>
                )}
                <div className="stats-box">
                  수집한 증거: {selectedModal.data.collectedCount}/{selectedModal.data.totalCount}개
                  {selectedModal.data.collectedCount < selectedModal.data.totalCount && (
                    <p>아직 발견하지 못한 증거가 있습니다!</p>
                  )}
                </div>
              </div>
            )}
            <button className="close-btn" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}

      {/* 추리 제출 패널 */}
      {showSolvePanel && (
        <div className="modal-overlay" onClick={() => setShowSolvePanel(false)}>
          <div className="modal solve-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🎯 범인 지목</h2>
            </div>
            <p className="solve-instruction">수집한 증거를 바탕으로 범인을 추리하세요.</p>
            
            <div className="form-group">
              <label>범인</label>
              <select value={selectedCulprit} onChange={(e) => setSelectedCulprit(e.target.value)}>
                <option value="">선택하세요</option>
                {scenario.suspects.map((suspect) => (
                  <option key={suspect.id} value={suspect.name}>
                    {suspect.name} ({suspect.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>범행 동기</label>
              <select value={selectedMotive} onChange={(e) => setSelectedMotive(e.target.value)}>
                <option value="">선택하세요</option>
                <option value="금전">금전 문제</option>
                <option value="권력">권력 다툼</option>
                <option value="복수">개인적 복수</option>
                <option value="비밀">비밀 은폐</option>
              </select>
            </div>

            <button className="primary-btn" onClick={handleSubmit}>제출하기</button>
            <button className="close-btn" onClick={() => setShowSolvePanel(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  )
}
