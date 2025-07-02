import { useState, useCallback, useMemo } from 'react'
import MoodSelector from './UI/MoodSelector'
import MoodboardGenerator from './Moodboard/MoodboardGenerator'
import AudioController from './Audio/AudioController'
import CustomCursor from './UI/CustomCursor'
import { generateMoodboardContent } from '../api/ai'
import './MainApp.scss'

export interface Mood {
  id: string
  name: string
  color: string
  description: string
  keywords: string[]
}

export interface MoodboardItem {
  id: string
  type: 'image' | 'quote' | 'color'
  content: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: number
}

const MainApp = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [customKeyword, setCustomKeyword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [moodboardItems, setMoodboardItems] = useState<MoodboardItem[]>([])
  const [showMoodboard, setShowMoodboard] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)
  const [generationProgress, setGenerationProgress] = useState(0)

  const moods: Mood[] = useMemo(() => [
    {
      id: 'happy',
      name: 'Happy',
      color: '#00ff41',
      description: 'Joyful and uplifting vibes',
      keywords: ['sunshine', 'smile', 'bright', 'cheerful']
    },
    {
      id: 'nostalgic',
      name: 'Nostalgic',
      color: '#ff6600',
      description: 'Warm memories and retro feels',
      keywords: ['vintage', 'memory', 'warm', 'retro']
    },
    {
      id: 'romantic',
      name: 'Romantic',
      color: '#ff0080',
      description: 'Love and passion',
      keywords: ['love', 'heart', 'passion', 'romance']
    },
    {
      id: 'mysterious',
      name: 'Mysterious',
      color: '#8000ff',
      description: 'Enigmatic and intriguing',
      keywords: ['mystery', 'dark', 'enigma', 'shadow']
    },
    {
      id: 'confident',
      name: 'Confident',
      color: '#ffff00',
      description: 'Bold and powerful energy',
      keywords: ['power', 'strength', 'bold', 'confident']
    },
    {
      id: 'creative',
      name: 'Creative',
      color: '#00ffff',
      description: 'Artistic and imaginative',
      keywords: ['art', 'imagination', 'creative', 'inspiration']
    }
  ], [])

  // Generate content using AI service
  const generateAIContent = useCallback(async (mood: Mood | null, keyword: string) => {
    const seed = generationCount + Date.now()
    
    try {
      // Use AI service to generate content
      const aiContent = await generateMoodboardContent(
        mood?.name || 'creative',
        keyword || undefined
      )
      
      // Random positions for 3D layout
      const positions = [
        { x: 0, y: 0, z: 0 },
        { x: 200 + (seed % 100), y: -100 + (seed % 50), z: 50 + (seed % 30) },
        { x: -200 - (seed % 100), y: 100 - (seed % 50), z: -50 - (seed % 30) }
      ]
      
      return [
        {
          id: `image-${seed}`,
          type: 'image' as const,
          content: aiContent.image,
          position: positions[0],
          rotation: { x: 0, y: 0, z: 0 },
          scale: 1
        },
        {
          id: `quote-${seed}`,
          type: 'quote' as const,
          content: aiContent.quote,
          position: positions[1],
          rotation: { x: 0, y: 0, z: 0 },
          scale: 1
        },
        {
          id: `color-${seed}`,
          type: 'color' as const,
          content: aiContent.color,
          position: positions[2],
          rotation: { x: 0, y: 0, z: 0 },
          scale: 1
        }
      ]
    } catch (error) {
      console.error('AI generation failed:', error)
      // Fallback to basic randomization
      const fallbackQuotes = [
        "Creativity is intelligence having fun.",
        "The journey of a thousand miles begins with one step.",
        "In the midst of chaos, there is also opportunity."
      ]
      
      const fallbackColors = ['#ff0080', '#00ffff', '#8000ff', '#00ff41', '#ffff00', '#ff6600']
      
      const positions = [
        { x: 0, y: 0, z: 0 },
        { x: 200 + (seed % 100), y: -100 + (seed % 50), z: 50 + (seed % 30) },
        { x: -200 - (seed % 100), y: 100 - (seed % 50), z: -50 - (seed % 30) }
      ]
      
      return [
        {
          id: `image-${seed}`,
          type: 'image' as const,
          content: `https://picsum.photos/800/600?random=${seed + 100}`,
          position: positions[0],
          rotation: { x: 0, y: 0, z: 0 },
          scale: 1
        },
        {
          id: `quote-${seed}`,
          type: 'quote' as const,
          content: fallbackQuotes[seed % fallbackQuotes.length],
          position: positions[1],
          rotation: { x: 0, y: 0, z: 0 },
          scale: 1
        },
        {
          id: `color-${seed}`,
          type: 'color' as const,
          content: fallbackColors[seed % fallbackColors.length],
          position: positions[2],
          rotation: { x: 0, y: 0, z: 0 },
          scale: 1
        }
      ]
    }
  }, [generationCount])

  const handleGenerateMoodboard = useCallback(async () => {
    if (!selectedMood && !customKeyword.trim()) return

    setIsGenerating(true)
    setGenerationCount(prev => prev + 1)
    setGenerationProgress(0)
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)
    
    try {
      const items = await generateAIContent(selectedMood, customKeyword)
      setMoodboardItems(items)
      setShowMoodboard(true)
      setGenerationProgress(100)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
      clearInterval(progressInterval)
      setGenerationProgress(0)
    }
  }, [selectedMood, customKeyword, generateAIContent])

  // Performance optimization: Only render CustomCursor when needed
  const shouldShowCursor = useMemo(() => {
    return window.innerWidth > 768 // Hide on mobile for performance
  }, [])

  return (
    <div className="main-app">
      {shouldShowCursor && <CustomCursor />}
      
      {!showMoodboard ? (
        <div className="generator-interface">
          <header className="app-header">
            <h1 className="text-gradient floating">MindCanvas</h1>
            <p className="subtitle">AI-Powered Inspiration Generator</p>
          </header>

          <div className="generator-content">
            <MoodSelector 
              moods={moods}
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
            />

            <div className="keyword-input">
              <label htmlFor="keyword">Or enter your own keyword:</label>
              <input
                id="keyword"
                type="text"
                value={customKeyword}
                onChange={(e) => setCustomKeyword(e.target.value)}
                placeholder="e.g., cyberpunk, nature, adventure..."
                className="glass-panel"
                disabled={isGenerating}
              />
              {customKeyword && (
                <small className="keyword-hint">
                  Will generate content based on: "{customKeyword}"
                </small>
              )}
            </div>

            <button
              onClick={handleGenerateMoodboard}
              disabled={isGenerating || (!selectedMood && !customKeyword.trim())}
              className={`generate-btn ${isGenerating ? 'generating' : ''}`}
            >
              {isGenerating ? `Generating... ${generationProgress}%` : 'Generate Moodboard'}
            </button>
            
            {isGenerating && (
              <div className="generation-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
                <p className="progress-text">AI is creating your inspiration...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <MoodboardGenerator 
          items={moodboardItems}
          mood={selectedMood}
          onBack={() => setShowMoodboard(false)}
        />
      )}

      <AudioController mood={selectedMood} />
    </div>
  )
}

export default MainApp 