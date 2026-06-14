import { motion } from 'framer-motion'
import { Crown, Music, Utensils, Sparkles, Clock } from 'lucide-react'

export default function Timeline() {
  const events = [
    { time: '5:30 PM', title: 'Arrival & Welcome', desc: 'Step onto the red carpet and take photos', icon: Crown },
    { time: '6:30 PM', title: 'The Grand Waltz', desc: 'A magical first dance', icon: Music },
    { time: '8:00 PM', title: 'Dinner Service', desc: 'A delicious feast with family & friends', icon: Utensils },
    { time: '9:30 PM', title: 'Let\'s Party!', desc: 'Hit the dance floor and celebrate', icon: Sparkles },
    { time: '12:00 AM', title: 'Farewell', desc: 'A beautiful goodbye to an unforgettable night', icon: Clock },
  ]

  return (
    <section id="timeline" className="section-container" style={{ padding: '6vw 2vw', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--pink-600)', margin: 0, textShadow: '0 5px 15px rgba(219,39,119,0.1)' }}>
          Itinerary
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--pink-400)', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '10px', fontWeight: '600' }}>
          The flow of the evening
        </p>
      </motion.div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '700px', margin: '0 auto' }}>
        {/* Continuous Vertical Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ position: 'absolute', top: '20px', left: '20.5px', width: '3px', background: 'linear-gradient(to bottom, var(--pink-400), var(--pink-200))', borderRadius: '3px', zIndex: 0 }} 
        />

        {events.map((event, idx) => {
          const Icon = event.icon
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 150, damping: 20 }}
              style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 'clamp(10px, 3vw, 20px)', marginBottom: idx === events.length - 1 ? '0' : '40px' }}
            >
              {/* Timeline Dot/Icon */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 10 }}
                style={{ 
                  zIndex: 1, 
                  flexShrink: 0, 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  background: 'white', 
                  border: '3px solid var(--pink-400)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginTop: '10px',
                  boxShadow: '0 5px 15px rgba(236,72,153,0.3)'
                }}
              >
                <Icon size={20} color="var(--pink-500)" strokeWidth={2.5} />
              </motion.div>

              {/* Glassmorphism Details Card */}
              <motion.div 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 15px 40px rgba(236,72,153,0.15)' }}
                style={{ 
                  flex: 1,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.5))', 
                  backdropFilter: 'blur(20px)', 
                  border: '2px solid white', 
                  borderRadius: '30px', 
                  padding: 'clamp(20px, 5vw, 30px)', 
                  boxShadow: '0 10px 30px rgba(236,72,153,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--pink-600)', fontWeight: '700', backgroundColor: 'var(--pink-100)', padding: '5px 12px', borderRadius: '20px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                    {event.time}
                  </span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 5vw, 2rem)', color: 'var(--text-dark)' }}>
                    {event.title}
                  </h3>
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--font-sans)', color: 'var(--text-medium)', fontSize: 'clamp(0.9rem, 3vw, 1rem)', lineHeight: '1.5' }}>
                  {event.desc}
                </p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
