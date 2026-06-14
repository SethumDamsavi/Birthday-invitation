import { motion } from 'framer-motion'

export default function CakeSection() {
  return (
    <section className="cake-section">
      <div className="section-container">
        <motion.div 
          className="cake-image-wrapper"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, type: 'spring' }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <img src="/images/cake.png" alt="Birthday cake" className="cake-img" />
        </motion.div>
      </div>
    </section>
  )
}
