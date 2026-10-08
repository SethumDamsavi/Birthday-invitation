import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export default function VenueImage() {
  return (
    <section className="venue-image-section">
      <div className="venue-image-wrapper">
        <img src="/images/venue.png" alt="The Falcon Hotel & Banquet, Yakkala" className="venue-img" />
        <div className="venue-image-overlay">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <p className="venue-overlay-text">A Night to Remember</p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.95)',
              margin: '8px 0 16px',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(0,0,0,0.6)'
            }}>
              The Falcon • Yakkala
            </p>
            <a 
              href="https://share.google/xVZcxtFpC0BzF4ttc"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 22px',
                background: 'rgba(255, 255, 255, 0.22)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '30px',
                color: 'white',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.38)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <MapPin size={14} /> Open in Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
