import React from 'react'
import './Preloader.scss'

const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="logo-container">
          <h1 className="logo-text">MindCanvas</h1>
          <div className="logo-glow"></div>
        </div>
        
        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>
        
        <p className="loading-text">Initializing AI Systems...</p>
        
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      
      <div className="background-effects">
        <div className="grid-lines"></div>
        <div className="floating-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Preloader 