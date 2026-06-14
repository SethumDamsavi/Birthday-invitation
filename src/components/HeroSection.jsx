import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="section-container" id="hero" style={{ padding: '0', paddingTop: '40px' }}>
      <motion.img 
        src="/images/floral-decoration.png" 
        alt="Floral" 
        className="hero-floral-arch" 
        style={{ mixBlendMode: 'multiply' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <div className="hero-split-layout">
        <div className="hero-text-ticket">
          <motion.p 
            className="hero-pretitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Celebrating
          </motion.p>
          <motion.h1 
            className="hero-title-ticket" 
            style={{ marginBottom: '10px' }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, type: "spring", bounce: 0.4 }}
          >
            Raveesha's
          </motion.h1>
          <motion.div
            className="hero-subtitle-ticket"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            21st Birthday
          </motion.div>
        </div>

        <motion.div 
          className="hero-arch-photo-container"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, type: "spring", bounce: 0.3 }}
        >
          <div className="arch-frame" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--pink-100)' }}>
            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--pink-400)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Photo Coming Soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
