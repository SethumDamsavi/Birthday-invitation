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
    }, 2000) // Wait for flap to open and letter to slide up
  }

  const quoteText = `"A beautiful milestone reached, a new chapter begins. Join me in celebrating twenty-one years of life, love, and endless memories."`
  const quoteWords = quoteText.split(" ")

  return (
    <div className={`envelope-intro-screen ${closing ? 'closing' : ''}`}>
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
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`envelope ${opened ? 'open' : ''}`}>
          <div className="envelope-back" />
          
          <div className="envelope-letter">
             <div className="letter-content">
               <p className="letter-text">You're Invited!</p>
             </div>
          </div>

          <div className="envelope-front">
            <div className="envelope-front-left"></div>
            <div className="envelope-front-right"></div>
            <div className="envelope-front-bottom"></div>
          </div>
          
          <div className="envelope-flap"></div>
          
          <div className="css-wax-seal">
            <svg viewBox="0 0 100 100" className="embossed-bow-svg">
              <path d="M 46 50 C 10 25, 5 75, 46 50 Z" fill="#a4888b" />
              <path d="M 54 50 C 90 25, 95 75, 54 50 Z" fill="#a4888b" />
              <path d="M 47 55 Q 35 70 25 90 L 35 85 L 45 95 Q 48 75 50 60 Z" fill="#a4888b" />
              <path d="M 53 55 Q 65 70 75 90 L 65 85 L 55 95 Q 52 75 50 60 Z" fill="#a4888b" />
              <circle cx="50" cy="50" r="7" fill="#a4888b" />
            </svg>
          </div>
        </div>

        <motion.p 
          className="envelope-click-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 0 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Click to open
        </motion.p>
      </motion.div>
    </div>
  )
}
