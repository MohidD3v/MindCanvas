import React, { useState, useEffect, useRef } from 'react'
import type { Mood } from '../MainApp'
import './AudioController.scss'

interface AudioControllerProps {
  mood: Mood | null
}

const AudioController: React.FC<AudioControllerProps> = ({ mood }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  // Ambient sound URLs (you can replace with actual audio files)
  const ambientSounds = {
    happy: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    nostalgic: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    romantic: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    mysterious: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    confident: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    creative: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (mood && audioRef.current) {
      audioRef.current.src = ambientSounds[mood.id as keyof typeof ambientSounds] || ambientSounds.creative
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [mood, isPlaying])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  // Audio visualizer setup
  useEffect(() => {
    if (!canvasRef.current || !audioRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audioRef.current)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    audioContextRef.current = audioContext
    analyserRef.current = analyser

    const draw = () => {
      if (!ctx || !analyser) return

      requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, mood?.color || '#ff0080')
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    draw()

    return () => {
      audioContext.close()
    }
  }, [mood])

  if (!mood) return null

  return (
    <div className={`audio-controller ${isVisible ? 'visible' : ''}`}>
      <button
        className="audio-toggle"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Toggle audio controls"
      >
        <span className="icon">🎵</span>
      </button>

      <div className="audio-panel">
        <div className="audio-controls">
          <button
            className={`play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={toggleAudio}
            disabled={!mood}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <div className="volume-control">
            <label htmlFor="volume">Volume</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>

        <div className="visualizer-container">
          <canvas
            ref={canvasRef}
            width="200"
            height="60"
            className="audio-visualizer"
          />
        </div>

        <div className="mood-indicator">
          <span className="mood-name">{mood.name}</span>
          <div className="mood-color" style={{ backgroundColor: mood.color }}></div>
        </div>
      </div>
    </div>
  )
}

export default AudioController 