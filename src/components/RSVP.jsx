import { motion } from 'framer-motion'
import { CalendarHeart, Send } from 'lucide-react'

export default function RSVP() {
  return (
    <section id="rsvp" className="section-container" style={{ padding: '6vw 2vw', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))', 
          backdropFilter: 'blur(20px)', 
          border: '2px solid white', 
          borderRadius: '40px', 
          padding: 'clamp(40px, 6vw, 60px) 20px', 
          boxShadow: '0 20px 50px rgba(236,72,153,0.1)',
          width: '100%',
          maxWidth: '800px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Background Blur */}
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--pink-200)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--pink-300)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.3, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{ 
              background: 'linear-gradient(135deg, var(--pink-100), white)', 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: '0 10px 20px rgba(236,72,153,0.15)',
              marginBottom: '20px',
              border: '2px solid var(--pink-200)'
            }}
          >
            <CalendarHeart strokeWidth={2} size={36} color="var(--pink-500)" />
          </motion.div>
          
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--pink-600)', margin: '0 0 15px 0', textShadow: '0 2px 10px rgba(236,72,153,0.1)' }}>
            Confirm Attendance
          </h3>
          
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'var(--text-medium)', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '1.6', marginBottom: '40px', maxWidth: '500px' }}>
            Please confirm your attendance<br/>
            <span style={{ fontWeight: '700', color: 'var(--pink-500)' }}>Before November 1st, 2026</span>
          </p>
          
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(236,72,153,0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: 'linear-gradient(45deg, var(--pink-500), var(--pink-400))', 
              color: 'white', 
              padding: '18px 40px', 
              borderRadius: '30px', 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 20px rgba(236,72,153,0.2)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Confirm Here
            <Send size={18} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
