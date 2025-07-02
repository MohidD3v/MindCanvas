// AI Service for MindCanvas
// Uses free, no-login AI services for intelligent content generation

export interface AIGenerationRequest {
  mood?: string
  keyword?: string
  type: 'image' | 'quote' | 'color'
}

export interface AIGenerationResponse {
  success: boolean
  content: string
  error?: string
}

// Free API endpoints (no login required)
const FREE_APIS = {
  // Unsplash for free images
  UNSPLASH_API: 'https://api.unsplash.com/photos/random',
  UNSPLASH_ACCESS_KEY: 'YOUR_UNSPLASH_ACCESS_KEY', // Optional: get free key at unsplash.com/developers
  
  // HuggingFace Inference API (free tier)
  HUGGINGFACE_API: 'https://api-inference.huggingface.co/models',
  
  // Free quote API
  QUOTE_API: 'https://api.quotable.io/random',
  
  // Free color palette API
  COLOR_API: 'https://www.colourlovers.com/api/palettes/random'
}

// Mood-based color palettes (no API needed)
const MOOD_COLORS = {
  happy: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#32CD32'],
  nostalgic: ['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460'],
  romantic: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB', '#FFE4E1'],
  mysterious: ['#4B0082', '#800080', '#9932CC', '#8A2BE2', '#9370DB'],
  confident: ['#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500'],
  creative: ['#00CED1', '#20B2AA', '#48D1CC', '#40E0D0', '#7FFFD4']
}

// AI-powered quote generation using HuggingFace (free)
export const generateAIQuote = async (mood: string, keyword?: string): Promise<AIGenerationResponse> => {
  try {
    // Try HuggingFace first (free, no API key required for basic models)
    const prompt = keyword 
      ? `${mood} mood about ${keyword}`
      : `${mood} mood`

    const response = await fetch(`${FREE_APIS.HUGGINGFACE_API}/gpt2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Generate an inspirational quote about ${prompt}:`,
        parameters: {
          max_length: 50,
          temperature: 0.8,
          do_sample: true
        }
      })
    })

    if (response.ok) {
      const data = await response.json()
      if (data && data[0]?.generated_text) {
        const quote = data[0].generated_text
          .replace('Generate an inspirational quote about', '')
          .replace(prompt + ':', '')
          .trim()
          .split('.')[0] + '.'
        
        if (quote.length > 10) {
          return { success: true, content: quote }
        }
      }
    }

    // Fallback to free quote API
    const quoteResponse = await fetch(`${FREE_APIS.QUOTE_API}?tags=${mood}`)
    if (quoteResponse.ok) {
      const quoteData = await quoteResponse.json()
      return { success: true, content: quoteData.content }
    }

    throw new Error('Quote generation failed')
  } catch (error) {
    console.warn('AI Quote generation failed, using fallback:', error)
    // Return mood-specific quotes as fallback
    const fallbackQuotes = {
      happy: [
        "Joy is the simplest form of gratitude.",
        "Happiness is not something ready-made. It comes from your own actions.",
        "The sun is a daily reminder that we too can rise again from the darkness."
      ],
      nostalgic: [
        "Memories are the treasures that we keep locked deep within the storehouse of our souls.",
        "The past is always beautiful. So, for that matter, is the future.",
        "Nostalgia is a file that removes the rough edges from the good old days."
      ],
      romantic: [
        "Love is composed of a single soul inhabiting two bodies.",
        "The best thing to hold onto in life is each other.",
        "Love is the poetry of the senses."
      ],
      mysterious: [
        "The mystery of life is not a problem to be solved, but a reality to be experienced.",
        "In the midst of chaos, there is also opportunity.",
        "The unknown is what makes life worth living."
      ],
      confident: [
        "Confidence is not 'they will like me'. Confidence is 'I'll be fine if they don't.'",
        "The only way to do great work is to love what you do.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts."
      ],
      creative: [
        "Creativity is intelligence having fun.",
        "Every artist was first an amateur.",
        "The creative adult is the child who survived."
      ]
    }
    
    const moodQuotes = fallbackQuotes[mood as keyof typeof fallbackQuotes] || fallbackQuotes.creative
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)]
    return { success: true, content: randomQuote }
  }
}

// AI-powered image generation using Unsplash (free)
export const generateAIImage = async (prompt: string): Promise<AIGenerationResponse> => {
  try {
    // Use Unsplash for free, high-quality images
    const searchTerm = prompt.replace(/[^a-zA-Z0-9\s]/g, '').trim()
    const response = await fetch(
      `${FREE_APIS.UNSPLASH_API}?query=${encodeURIComponent(searchTerm)}&orientation=landscape&count=1`,
      {
        headers: {
          'Authorization': `Client-ID ${FREE_APIS.UNSPLASH_ACCESS_KEY}`
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      if (data && data[0]?.urls?.regular) {
        return { success: true, content: data[0].urls.regular }
      }
    }

    // Fallback to Picsum with search term hash
    const hash = searchTerm.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const randomId = Math.abs(hash) % 1000
    
    return { 
      success: true, 
      content: `https://picsum.photos/800/600?random=${randomId}` 
    }
  } catch (error) {
    console.warn('AI Image generation failed, using fallback:', error)
    // Return a random Picsum image as fallback
    const randomId = Math.floor(Math.random() * 1000)
    return { 
      success: true, 
      content: `https://picsum.photos/800/600?random=${randomId}` 
    }
  }
}

// AI-powered color generation using mood-based algorithms
export const generateAIColors = async (mood: string, keyword?: string): Promise<AIGenerationResponse> => {
  try {
    // Use mood-based color generation algorithm
    const moodKey = mood.toLowerCase() as keyof typeof MOOD_COLORS
    const moodPalette = MOOD_COLORS[moodKey] || MOOD_COLORS.creative
    
    // Add keyword influence to color selection
    let selectedColor = moodPalette[Math.floor(Math.random() * moodPalette.length)]
    
    if (keyword) {
      // Simple keyword-to-color mapping
      const keywordColors: { [key: string]: string } = {
        cyberpunk: '#00ffff',
        nature: '#228B22',
        ocean: '#4169E1',
        sunset: '#FF4500',
        forest: '#228B22',
        space: '#000080',
        fire: '#FF4500',
        ice: '#87CEEB',
        gold: '#FFD700',
        silver: '#C0C0C0',
        neon: '#FF1493',
        vintage: '#8B4513',
        modern: '#000000',
        retro: '#FF69B4',
        minimal: '#FFFFFF',
        vibrant: '#FF4500'
      }
      
      const keywordColor = keywordColors[keyword.toLowerCase()]
      if (keywordColor) {
        selectedColor = keywordColor
      }
    }
    
    return { success: true, content: selectedColor }
  } catch (error) {
    console.warn('AI Color generation failed, using fallback:', error)
    // Return a random neon color as fallback
    const neonColors = ['#ff0080', '#00ffff', '#8000ff', '#00ff41', '#ffff00', '#ff6600']
    const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)]
    return { success: true, content: randomColor }
  }
}

// Main AI generation function
export const generateAIContent = async (
  type: 'image' | 'quote' | 'color',
  mood?: string,
  keyword?: string
): Promise<AIGenerationResponse> => {
  const prompt = keyword 
    ? `${mood || 'creative'} mood with ${keyword} theme`
    : `${mood || 'creative'} mood`

  switch (type) {
    case 'image':
      return await generateAIImage(prompt)
    case 'quote':
      return await generateAIQuote(mood || 'creative', keyword)
    case 'color':
      return await generateAIColors(mood || 'creative', keyword)
    default:
      throw new Error(`Unknown generation type: ${type}`)
  }
}

// Batch generation for moodboard
export const generateMoodboardContent = async (
  mood?: string,
  keyword?: string
): Promise<{
  image: string
  quote: string
  color: string
}> => {
  try {
    // Generate all content in parallel for better performance
    const [imageResult, quoteResult, colorResult] = await Promise.allSettled([
      generateAIContent('image', mood, keyword),
      generateAIContent('quote', mood, keyword),
      generateAIContent('color', mood, keyword)
    ])

    return {
      image: imageResult.status === 'fulfilled' ? imageResult.value.content : `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
      quote: quoteResult.status === 'fulfilled' ? quoteResult.value.content : "Creativity is intelligence having fun.",
      color: colorResult.status === 'fulfilled' ? colorResult.value.content : '#ff0080'
    }
  } catch (error) {
    console.error('Batch generation failed:', error)
    // Return fallback data
    return {
      image: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
      quote: "The journey of a thousand miles begins with one step.",
      color: '#00ffff'
    }
  }
} 