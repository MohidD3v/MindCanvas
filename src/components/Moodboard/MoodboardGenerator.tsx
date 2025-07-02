import { useEffect, useRef } from 'react'
import type { Mood, MoodboardItem } from '../MainApp'
import './MoodboardGenerator.scss'

interface MoodboardGeneratorProps {
  items: MoodboardItem[]
  mood: Mood | null
  onBack: () => void
}

const MoodboardGenerator: React.FC<MoodboardGeneratorProps> = ({ items, mood, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Add entrance animation
      containerRef.current.style.opacity = '0'
      containerRef.current.style.transform = 'scale(0.9)'
      
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = '1'
          containerRef.current.style.transform = 'scale(1)'
        }
      }, 100)
    }
  }, [])

  const renderItem = (item: MoodboardItem) => {
    switch (item.type) {
      case 'image':
        return (
          <div className="moodboard-item image-item">
            <img 
              src={item.content} 
              alt="Generated inspiration"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`
              }}
            />
            <div className="item-overlay">
              <span className="item-type">Image</span>
            </div>
          </div>
        )
      
      case 'quote':
        return (
          <div className="moodboard-item quote-item">
            <blockquote>
              "{item.content}"
            </blockquote>
            <div className="item-overlay">
              <span className="item-type">Quote</span>
            </div>
          </div>
        )
      
      case 'color':
        return (
          <div className="moodboard-item color-item">
            <div 
              className="color-swatch"
              style={{ backgroundColor: item.content }}
            ></div>
            <div className="color-info">
              <span className="color-hex">{item.content}</span>
            </div>
            <div className="item-overlay">
              <span className="item-type">Color</span>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="moodboard-generator" ref={containerRef}>
      <header className="moodboard-header">
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Generator
        </button>
        
        {mood && (
          <div className="mood-info">
            <h2 className="mood-title">Your {mood.name} Moodboard</h2>
            <p className="mood-description">{mood.description}</p>
          </div>
        )}
      </header>

      <div className="moodboard-container">
        <div className="moodboard-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="moodboard-item-wrapper"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      <div className="moodboard-actions">
        <button className="action-btn regenerate-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
          </svg>
          Regenerate
        </button>
        
        <button className="action-btn download-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download
        </button>
      </div>
    </div>
  )
}

export default MoodboardGenerator 