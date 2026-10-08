import { motion } from 'framer-motion'
import { MapPin, Wine, Map } from 'lucide-react'

export default function EventDetails() {
  return (
    <section id="event" className="section-container" style={{ padding: '4vw 2vw', width: '100%' }}>
      <div className="event-split-layout" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        

        {/* Reception Card */}
        <motion.div 
          className="ticket-event"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -15, boxShadow: '0 25px 50px rgba(236,72,153,0.15)' }}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
          style={{
            background: 'white',
            borderRadius: '40px',
            padding: '50px 30px',
            border: '2px solid var(--pink-50)',
            boxShadow: '0 10px 30px rgba(236,72,153,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            flex: 1
          }}
        >


          <motion.div 
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, var(--pink-50), white)',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px',
              border: '2px dashed var(--pink-300)',
              boxShadow: 'inset 0 0 10px rgba(236,72,153,0.1)'
            }}
          >
            <Wine strokeWidth={1.5} size={40} color="var(--pink-500)" />
          </motion.div>
          
          <h3 className="event-title-minimal" style={{ color: 'var(--pink-600)', marginBottom: '5px' }}>Birthday Party</h3>
          <p className="event-time-minimal" style={{ color: 'var(--text-medium)', fontSize: '1.5rem', marginBottom: '20px' }}>6:00 PM</p>
          
          <div style={{ background: 'var(--pink-50)', padding: '15px 25px', borderRadius: '20px', width: '100%', marginBottom: '30px' }}>
            <p className="event-location-minimal" style={{ margin: 0, color: 'var(--pink-600)', fontWeight: '700', letterSpacing: '1px' }}>THE FALCON</p>
            <p className="event-location-minimal" style={{ margin: 0, marginTop: '5px', fontSize: '0.88rem', color: 'var(--text-medium)' }}>No. 50, Radawana Road, Yakkala</p>
          </div>

          <motion.a 
            href="https://share.google/xVZcxtFpC0BzF4ttc" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(236,72,153,0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: 'auto',
              padding: '14px 35px',
              background: 'linear-gradient(135deg, var(--pink-400), var(--pink-600))',
              color: 'white',
              borderRadius: '30px',
              fontFamily: 'var(--font-sans)',
              fontWeight: '600',
              letterSpacing: '2px',
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 5px 15px rgba(236,72,153,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Map size={18} /> VIEW LOCATION
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
