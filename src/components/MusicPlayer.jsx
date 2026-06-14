import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Add real happy birthday background music
    audioRef.current = new Audio('/music/birthday.mp3')
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="section-container" style={{ padding: '6vw 2vw', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
          backdropFilter: 'blur(20px)',
          border: '2px solid white',
          borderRadius: '40px',
          padding: '30px 40px',
          boxShadow: '0 15px 40px rgba(236,72,153,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Music size={18} color="var(--pink-400)" />
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--pink-500)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700' }}>
            Birthday Playlist
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', width: '100%', justifyContent: 'center', margin: '10px 0' }}>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--pink-300)', display: 'flex' }}
          >
            <SkipBack size={24} fill="currentColor" />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(236,72,153,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--pink-400), var(--pink-500))', 
              border: 'none', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(236,72,153,0.2)'
            }}
          >
            {isPlaying ? (
              <Pause size={32} fill="currentColor" />
            ) : (
              <Play size={32} fill="currentColor" style={{ marginLeft: '6px' }} />
            )}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--pink-300)', display: 'flex' }}
          >
            <SkipForward size={24} fill="currentColor" />
          </motion.button>
        </div>

        {/* Animated Progress Bar */}
        <div style={{ width: '100%', height: '6px', background: 'var(--pink-100)', borderRadius: '3px', overflow: 'hidden' }}>
          {isPlaying && (
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              style={{ height: '100%', background: 'var(--pink-400)', borderRadius: '3px' }}
            />
          )}
        </div>
      </motion.div>
    </section>
  )
}
