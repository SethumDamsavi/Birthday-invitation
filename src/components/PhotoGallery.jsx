import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, QrCode } from 'lucide-react'

const photos = [
  { src: '', caption: 'Photo 1' },
  { src: '', caption: 'Photo 2' },
  { src: '', caption: 'Photo 3' },
  { src: '', caption: 'Photo 4' },
  { src: '', caption: 'Photo 5' },
]

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (index) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prevPhoto = (e) => { e.stopPropagation(); setLightbox(i => (i - 1 + photos.length) % photos.length) }
  const nextPhoto = (e) => { e.stopPropagation(); setLightbox(i => (i + 1) % photos.length) }

  return (
    <section id="gallery" className="section-container" style={{ padding: '4vw 2vw', width: '100%' }}>
      <motion.h2 
        className="timeline-title-minimal"
        style={{ color: 'var(--pink-600)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Birthday Shoot
      </motion.h2>

      <motion.div 
        className="gallery-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2vw', width: '100%', maxWidth: '1200px', margin: '0 auto 40px' }}
      >
        {photos.map((photo, i) => (
          <motion.div 
            className="gallery-item-minimal" 
            key={i} 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring' } } }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            style={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 10px 30px rgba(236,72,153,0.1)', border: '2px solid var(--pink-100)', background: 'var(--pink-50)', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--pink-400)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Empty Frame</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Modern QR Code Section */}
      <motion.div 
        className="qr-banner-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="qr-text-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <QrCode size={40} color="var(--pink-500)" strokeWidth={1.5} />
            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--pink-600)' }}>View Full Gallery</h3>
          </div>
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'var(--text-medium)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Scan to see all memories
          </p>
        </div>
        
        <motion.div 
          className="qr-image-wrapper"
          whileHover={{ scale: 1.05 }}
        >
          <img src="/images/qr-code.png" alt="QR Code" style={{ width: '100%', display: 'block' }} />
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div 
            className="lightbox" 
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255,255,255,0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
          >
            <motion.div 
              className="lightbox-content" 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
            >
              <button onClick={closeLightbox} style={{ position: 'absolute', top: '-40px', right: 0, background: 'none', border: 'none', color: 'var(--pink-600)', cursor: 'pointer' }}><X size={32} /></button>
              <button onClick={prevPhoto} style={{ position: 'absolute', left: '-50px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--pink-600)', cursor: 'pointer' }}><ChevronLeft size={48} /></button>
              <button onClick={nextPhoto} style={{ position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--pink-600)', cursor: 'pointer' }}><ChevronRight size={48} /></button>
              
              <motion.img 
                key={lightbox}
                src={photos[lightbox].src} 
                alt={photos[lightbox].caption} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ maxHeight: '85vh', borderRadius: '20px', boxShadow: '0 20px 50px rgba(236,72,153,0.2)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
