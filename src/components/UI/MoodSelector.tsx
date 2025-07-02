import React from 'react'
import type { Mood } from '../MainApp'
import './MoodSelector.scss'

interface MoodSelectorProps {
  moods: Mood[]
  selectedMood: Mood | null
  onMoodSelect: (mood: Mood | null) => void
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ moods, selectedMood, onMoodSelect }) => {
  return (
    <div className="mood-selector">
      <h3 className="selector-title">Choose Your Mood</h3>
      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`mood-card ${selectedMood?.id === mood.id ? 'selected' : ''}`}
            onClick={() => onMoodSelect(selectedMood?.id === mood.id ? null : mood)}
            style={{ '--mood-color': mood.color } as React.CSSProperties}
          >
            <div className="mood-icon">
              <div className="mood-color-dot" style={{ backgroundColor: mood.color }}></div>
            </div>
            <div className="mood-info">
              <h4 className="mood-name">{mood.name}</h4>
              <p className="mood-description">{mood.description}</p>
              <div className="mood-keywords">
                {mood.keywords.slice(0, 2).map((keyword, index) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MoodSelector 