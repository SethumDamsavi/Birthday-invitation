import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set target date to November 22, 2026
    const targetDate = new Date('November 22, 2026 00:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="countdown" className="section-container" style={{ padding: '6vw 2vw', width: '100%' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--pink-600)', margin: 0, fontStyle: 'italic', textShadow: '0 5px 15px rgba(219,39,119,0.1)' }}>
          November 22, 2026
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--pink-400)', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '15px', fontWeight: '600' }}>
          The countdown begins
        </p>
      </motion.div>

      <motion.div 
        className="beautiful-countdown-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
        style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '3vw' }}>
          {Object.entries(timeLeft).map(([unit, value], idx) => (
            <motion.div 
              key={unit} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(236,72,153,0.15)', scale: 1.02 }}
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))', 
                backdropFilter: 'blur(20px)', 
                border: '2px solid white', 
                borderRadius: '35px', 
                padding: '40px 20px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                boxShadow: '0 10px 30px rgba(236,72,153,0.08)' 
              }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', color: 'var(--pink-500)', lineHeight: '1', textShadow: '0 4px 10px rgba(244,114,182,0.2)' }}
                >
                  {value.toString().padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-medium)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '15px', fontWeight: '600' }}>
                {unit}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
