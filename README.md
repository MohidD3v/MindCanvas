# MindCanvas 🎨✨

**AI-Powered Inspiration Generator with Cyberpunk Aesthetics**

MindCanvas is a fully responsive, interactive web application that generates personalized moodboards using AI. Experience a next-generation tool that seamlessly blends artificial intelligence, modern design, and cinematic UI to create a magical and emotionally engaging daily-use web experience.

## ✨ Features

### 🎯 Core Functionality
- **No-Login AI Generation**: Generate unique moodboards instantly without registration
- **Mood Selection**: Choose from curated moods (Happy, Nostalgic, Romantic, Mysterious, Confident, Creative)
- **Custom Keywords**: Enter your own keywords for personalized inspiration
- **Real-time Generation**: Watch as AI creates images, colors, and quotes tailored to your mood

### 🎨 Visual Experience
- **Cyberpunk Aesthetics**: Dark theme with neon accents and glassmorphism effects
- **3D Interactive Moodboard**: Floating, parallax grid with kinetic scrolling and inertia
- **Animated Preloader**: Rotating neon wireframe sphere with quantum distortion effects
- **Custom Cursor**: Neon comet trail with magnetic pull effects and particle explosions
- **Microinteractions**: Hover glows, flickers, ripple effects, and dynamic neon outlines

### 🎵 Immersive Audio
- **Adaptive Soundtracks**: Ambient music that changes based on selected mood
- **Audio Visualizer**: Real-time neon bars and waveforms that pulse with the music
- **Floating Controls**: Neon audio panel with volume and playback controls

### 🛠️ Customization & Sharing
- **Interactive Elements**: Drag, rotate, and rearrange moodboard items with spring physics
- **Real-time Editing**: Edit AI-generated quotes with instant moodboard updates
- **Download Options**: Save moodboards as images or MP4 videos
- **Social Sharing**: One-click sharing to social media platforms

### 📱 Responsive Design
- **Mobile Optimized**: Kinetic swiping and tilt-responsive parallax on mobile
- **Fully Responsive**: Beautiful experience across all device sizes
- **Touch Friendly**: Optimized interactions for touch devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone (https://github.com/MohidD3v/MindCanvas.git)
   cd mindcanvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: SCSS with CSS Custom Properties
- **3D Graphics**: Three.js for interactive moodboards
- **Animations**: GSAP + Anime.js for smooth transitions
- **Build Tool**: Vite for fast development
- **Audio**: Web Audio API for adaptive soundtracks

## 🎨 Design System

### Colors
- **Neon Pink**: `#ff0080`
- **Neon Blue**: `#00ffff`
- **Neon Purple**: `#8000ff`
- **Neon Green**: `#00ff41`
- **Neon Yellow**: `#ffff00`
- **Neon Orange**: `#ff6600`

### Typography
- **Primary**: Orbitron (Futuristic sans-serif)
- **Secondary**: Rajdhani (Modern sans-serif)

### Effects
- **Glassmorphism**: Semi-transparent panels with backdrop blur
- **Neon Glows**: Dynamic lighting effects
- **Particle Systems**: Ambient floating elements
- **Spring Physics**: Natural motion animations

## 📁 Project Structure

```
src/
├── components/
│   ├── UI/
│   │   ├── Preloader.tsx          # Animated loading screen
│   │   ├── MoodSelector.tsx       # Interactive mood cards
│   │   └── CustomCursor.tsx       # Neon cursor effects
│   ├── Moodboard/
│   │   └── MoodboardGenerator.tsx # 3D moodboard display
│   └── Audio/
│       └── AudioController.tsx    # Adaptive soundtracks
├── styles/
│   └── main.scss                  # Global styles and variables
├── App.tsx                        # Main application component
└── main.tsx                       # Application entry point
```

## 🎯 Usage

1. **Select a Mood**: Choose from the curated mood options or enter a custom keyword
2. **Generate**: Click the generate button to create your personalized moodboard
3. **Interact**: Explore the 3D moodboard with drag, rotate, and hover effects
4. **Customize**: Edit quotes, adjust audio, and modify the layout
5. **Share**: Download or share your creation on social media

## 🔮 Future Features

- [ ] **AI Integration**: Real Stable Diffusion API integration
- [ ] **Collaboration**: Real-time shared moodboards with WebRTC
- [ ] **Advanced Customization**: More editing tools and effects
- [ ] **Daily Inspiration**: Automated daily moodboard generation
- [ ] **Export Options**: More file formats and quality settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** for 3D graphics and interactions
- **GSAP** for smooth animations
- **Google Fonts** for typography
- **Picsum Photos** for placeholder images

---

**Made with ❤️ and neon lights**
***Dev : Mohid*** 
