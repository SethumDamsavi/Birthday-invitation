import { motion } from 'framer-motion'
import { Gift, Building2 } from 'lucide-react'

export default function GiftSection() {
  return (
    <section className="section-container" style={{ padding: '20px 40px' }}>
      <motion.div 
        className="ticket-gift"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center' }}
      >
        <div className="event-icon-minimal">
          <Gift strokeWidth={1} size={32} color="#8c7362" />
        </div>
        <h3 className="event-title-minimal" style={{color: '#c49a6c'}}>Gift Suggestions</h3>
        <p className="event-location-minimal" style={{textTransform: 'uppercase'}}>
          Your presence is the greatest gift.<br/>However, if you wish to bless me with a gift,<br/>a monetary contribution is deeply appreciated.
        </p>
        
        <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Building2 strokeWidth={1} size={24} color="#8c7362" style={{marginBottom: '10px'}} />
          <p className="event-time-minimal" style={{fontSize: '0.9rem', color: '#666', fontFamily: 'var(--font-sans)'}}>BANK ABC<br/>RAVEESHA<br/>1111-2222-3333-4444</p>
        </div>
      </motion.div>
    </section>
  )
}
