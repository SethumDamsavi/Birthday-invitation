import { motion } from 'framer-motion'

export default function ClosingSection() {
  return (
    <section className="closing-section" id="closing">
      <div className="section-container">
        <motion.div 
          className="closing-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <p className="closing-text">
            Your presence and joy will make this night unforgettable.
          </p>
          <h2 className="closing-title">We Can't Wait<br />To See You!</h2>
          
          <div className="closing-hearts">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>♥</motion.span>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} style={{ fontSize: '2rem' }}>♥</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>♥</motion.span>
          </div>
          
          <p className="closing-name">With Love,</p>
          <p className="closing-signature">Raveesha & Family</p>
        </motion.div>
        
        <motion.img 
          src="/images/floral-bottom.png" 
          alt="Floral decoration" 
          className="closing-floral"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </section>
  )
}
