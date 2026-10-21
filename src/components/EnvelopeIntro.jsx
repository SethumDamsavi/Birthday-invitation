import { useState } from 'react'
import { motion } from 'framer-motion'

export default function EnvelopeIntro({ onClick }) {
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)

  const handleOpen = () => {
    if (opened) return;
    setOpened(true)
    setTimeout(() => {
      setClosing(true)
      setTimeout(() => onClick(), 1000)
    }, 2200) // Wait for flap to open and letter to slide up
  }

  const quoteText = `"A beautiful milestone reached, a new chapter begins. Join me in celebrating twenty-one years of life, love, and endless memories."`
  const quoteWords = quoteText.split(" ")

  return (
    <div className={`envelope-intro-screen ${closing ? 'closing' : ''}`}>
      {/* Dreamy Golden Bokeh Lights */}
      <div className="intro-bokeh-container" aria-hidden="true">
        <span className="bokeh-orb bokeh-orb-1" />
        <span className="bokeh-orb bokeh-orb-2" />
        <span className="bokeh-orb bokeh-orb-3" />
        <span className="bokeh-orb bokeh-orb-4" />
        <span className="bokeh-orb bokeh-orb-5" />
      </div>

      <img src="/images/floral-decoration.png" className="intro-floral-top" alt="floral top" />
      <img src="/images/floral-bottom-new.png" className="intro-floral-bottom" alt="floral bottom" />

      <motion.div 
        className="intro-text-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div 
          className="intro-header"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, type: 'spring', bounce: 0.3 }}
        >
          <motion.h1 
            className="intro-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Raveesha's
          </motion.h1>
          <motion.h2 
            className="intro-age"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, type: 'spring' }}
          >
            21st
          </motion.h2>
        </motion.div>

        <motion.div 
          className="intro-quote-modern"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.04, delayChildren: 1.2 } }
          }}
        >
          {quoteWords.map((word, idx) => (
            <motion.span 
              key={idx} 
              className="quote-word"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className="intro-envelope-container" 
        onClick={handleOpen}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`envelope ${opened ? 'open' : ''}`}>
          {/* Inside back of the envelope */}
          <div className="envelope-back" />
          
          {/* Royal Invitation Letter inside */}
          <div className="envelope-letter">
            <div className="letter-content">
              <div className="letter-inner-border">
                <span className="letter-eyebrow">You're Invited</span>
                <p className="letter-name">Raveesha's 21st</p>
                <span className="letter-celebration">Birthday Celebration</span>
              </div>
            </div>
          </div>

          {/* Front folded flaps (warm cream linen paper) */}
          <div className="envelope-front">
            <div className="envelope-front-left"></div>
            <div className="envelope-front-right"></div>
            <div className="envelope-front-bottom"></div>
          </div>
          
          {/* 3D Folding Flap with Realistic Floral Lace Trim */}
          <div className="envelope-flap">
            {/* Front side of the flap (seen when closed) */}
            <div className="flap-face flap-face-front">
              <div className="flap-paper-triangle" />
              <img 
                src="/images/envelope-lace-trim.png" 
                className="flap-lace-trim" 
                alt="Intricate lace trim" 
              />
              <div className="flap-crease-shadow" />
            </div>

            {/* Back side of the flap (seen when flipped open 180deg) */}
            <div className="flap-face flap-face-back">
              <div className="flap-paper-triangle-back" />
            </div>
          </div>
          
          {/* Antique Gold Wax Seal with Embossed Blooming Rose */}
          <div className="vintage-wax-seal">
            <img 
              src="/images/gold-rose-seal.png" 
              className="gold-rose-seal-img" 
              alt="Antique Gold Rose Wax Seal" 
            />
            <span className="gold-seal-gleam" />
          </div>
        </div>

        <motion.p 
          className="envelope-click-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 0 : 0.85 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="prompt-sparkle">✨</span> Tap the gold seal to open <span className="prompt-sparkle">✨</span>
        </motion.p>
      </motion.div>
    </div>
  )
}
