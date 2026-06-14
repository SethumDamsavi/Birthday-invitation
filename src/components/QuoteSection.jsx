import { motion } from 'framer-motion'

export default function QuoteSection() {
  return (
    <section id="quote" className="section-container" style={{ padding: '20px 40px' }}>
      <motion.div 
        className="ticket-quote"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p>"Some milestones are simply too special to celebrate alone. I am so excited to invite you to an unforgettable evening of joy, dancing, and beautiful memories as I turn twenty-one."</p>
      </motion.div>

      <motion.div 
        className="ticket-parents"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <p className="parents-label">JOIN ME FOR THIS INCREDIBLE NIGHT:</p>
        <h3 className="parents-names" style={{fontSize: '3.5rem'}}>Raveesha</h3>
        
        <p className="parents-label" style={{marginTop: '30px'}}>TO CELEBRATE MY</p>
        <h2 className="parents-fest">21st BIRTHDAY</h2>
      </motion.div>
    </section>
  )
}
