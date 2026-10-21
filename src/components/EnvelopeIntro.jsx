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
        animate={{ y: [0, -16, 0] }}
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

          {/* Front folded flaps (warm cream paper) */}
          <div className="envelope-front">
            <div className="envelope-front-left"></div>
            <div className="envelope-front-right"></div>
            <div className="envelope-front-bottom"></div>
          </div>
          
          {/* 3D Folding Flap with Scalloped Edge & Baroque Embossing */}
          <div className="envelope-flap">
            {/* Front side of the flap (seen when closed) */}
            <div className="flap-face flap-face-front">
              <svg 
                viewBox="0 0 350 165" 
                className="scalloped-flap-svg" 
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Luxury Cream Paper Gradient */}
                  <linearGradient id="creamFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbf9f4" />
                    <stop offset="55%" stopColor="#f4eee3" />
                    <stop offset="100%" stopColor="#e8dfce" />
                  </linearGradient>

                  {/* Top Fold Crease Shadow */}
                  <linearGradient id="topCreaseShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(125, 95, 75, 0.22)" />
                    <stop offset="20%" stopColor="rgba(125, 95, 75, 0.04)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* Scalloped Contour of the Flap */}
                <path
                  d="M 0 0 L 350 0 L 350 10 C 342 22, 330 30, 320 36 C 324 40, 324 44, 318 48 C 308 54, 298 58, 288 66 C 290 72, 288 76, 280 82 C 268 90, 256 94, 244 104 C 242 110, 238 114, 230 120 C 216 128, 198 140, 175 158 C 152 140, 134 128, 120 120 C 112 114, 108 110, 106 104 C 94 94, 82 90, 70 82 C 62 76, 60 72, 62 66 C 52 58, 42 54, 32 48 C 26 44, 26 40, 30 36 C 20 30, 8 22, 0 10 Z"
                  fill="url(#creamFlapGrad)"
                />

                {/* Top fold subtle shadow */}
                <rect x="0" y="0" width="350" height="20" fill="url(#topCreaseShadow)" />

                {/* --- BLIND EMBOSSED RELIEF (Dual Stroke: Shadow & Highlight for 3D paper effect) --- */}
                
                {/* 1. Inner Scalloped Relief Border */}
                {/* Shadow pass */}
                <path
                  d="M 334 12 C 326 24, 316 30, 308 34 C 310 38, 308 42, 302 46 C 294 50, 284 54, 276 62 C 278 66, 276 70, 268 76 C 258 82, 248 86, 236 94 C 234 100, 230 104, 222 110 C 210 118, 194 130, 175 146 C 156 130, 140 118, 128 110 C 120 104, 116 100, 114 94 C 102 86, 92 82, 82 76 C 74 70, 72 66, 74 62 C 66 54, 56 50, 48 46 C 42 42, 40 38, 42 34 C 34 30, 24 24, 16 12"
                  fill="none"
                  stroke="rgba(145, 120, 100, 0.35)"
                  strokeWidth="1.3"
                  transform="translate(0.5, 0.6)"
                />
                {/* Highlight pass */}
                <path
                  d="M 334 12 C 326 24, 316 30, 308 34 C 310 38, 308 42, 302 46 C 294 50, 284 54, 276 62 C 278 66, 276 70, 268 76 C 258 82, 248 86, 236 94 C 234 100, 230 104, 222 110 C 210 118, 194 130, 175 146 C 156 130, 140 118, 128 110 C 120 104, 116 100, 114 94 C 102 86, 92 82, 82 76 C 74 70, 72 66, 74 62 C 66 54, 56 50, 48 46 C 42 42, 40 38, 42 34 C 34 30, 24 24, 16 12"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="1.2"
                  transform="translate(-0.5, -0.6)"
                />

                {/* 2. Baroque Acanthus Flourishes & Palmette Shell Crest */}
                {/* Shadow pass */}
                <g stroke="rgba(145, 120, 100, 0.32)" strokeWidth="1.3" fill="none" transform="translate(0.5, 0.6)">
                  <path d="M 175 14 C 171 22, 171 27, 175 32 C 179 27, 179 22, 175 14 Z" />
                  <path d="M 172 18 C 166 22, 162 27, 165 31 C 168 32, 171 28, 173 25" />
                  <path d="M 178 18 C 184 22, 188 27, 185 31 C 182 32, 179 28, 177 25" />
                  <path d="M 169 29 C 156 31, 144 26, 136 34 C 132 38, 135 42, 140 39 C 148 33, 160 37, 168 34" />
                  <path d="M 181 29 C 194 31, 206 26, 214 34 C 218 38, 215 42, 210 39 C 202 33, 190 37, 182 34" />
                  <path d="M 136 37 C 120 43, 108 39, 96 50 C 90 56, 86 66, 76 70" />
                  <path d="M 214 37 C 230 43, 242 39, 254 50 C 260 56, 264 66, 274 70" />
                  <path d="M 124 57 C 117 53, 110 56, 113 63 C 115 67, 121 66, 127 62" />
                  <path d="M 226 57 C 233 53, 240 56, 237 63 C 235 67, 229 66, 223 62" />
                </g>
                {/* Highlight pass */}
                <g stroke="rgba(255, 255, 255, 0.88)" strokeWidth="1.2" fill="none" transform="translate(-0.5, -0.6)">
                  <path d="M 175 14 C 171 22, 171 27, 175 32 C 179 27, 179 22, 175 14 Z" />
                  <path d="M 172 18 C 166 22, 162 27, 165 31 C 168 32, 171 28, 173 25" />
                  <path d="M 178 18 C 184 22, 188 27, 185 31 C 182 32, 179 28, 177 25" />
                  <path d="M 169 29 C 156 31, 144 26, 136 34 C 132 38, 135 42, 140 39 C 148 33, 160 37, 168 34" />
                  <path d="M 181 29 C 194 31, 206 26, 214 34 C 218 38, 215 42, 210 39 C 202 33, 190 37, 182 34" />
                  <path d="M 136 37 C 120 43, 108 39, 96 50 C 90 56, 86 66, 76 70" />
                  <path d="M 214 37 C 230 43, 242 39, 254 50 C 260 56, 264 66, 274 70" />
                  <path d="M 124 57 C 117 53, 110 56, 113 63 C 115 67, 121 66, 127 62" />
                  <path d="M 226 57 C 233 53, 240 56, 237 63 C 235 67, 229 66, 223 62" />
                </g>

                {/* 3. "Tap to open" Classic Serif Debossed Text */}
                <text
                  x="175"
                  y="62"
                  textAnchor="middle"
                  className="flap-tap-to-open"
                >
                  Tap to open
                </text>
              </svg>
            </div>

            {/* Back side of the flap (seen when flipped open 180deg) */}
            <div className="flap-face flap-face-back">
              <svg 
                viewBox="0 0 350 165" 
                className="scalloped-flap-svg" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="creamFlapBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ede6d7" />
                    <stop offset="100%" stopColor="#f7f3ea" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 0 L 350 0 L 350 10 C 342 22, 330 30, 320 36 C 324 40, 324 44, 318 48 C 308 54, 298 58, 288 66 C 290 72, 288 76, 280 82 C 268 90, 256 94, 244 104 C 242 110, 238 114, 230 120 C 216 128, 198 140, 175 158 C 152 140, 134 128, 120 120 C 112 114, 108 110, 106 104 C 94 94, 82 90, 70 82 C 62 76, 60 72, 62 66 C 52 58, 42 54, 32 48 C 26 44, 26 40, 30 36 C 20 30, 8 22, 0 10 Z"
                  fill="url(#creamFlapBackGrad)"
                />
              </svg>
            </div>
          </div>
          
          {/* Pink Heart Wax Seal with Golden Crescent Moon */}
          <div className="vintage-wax-seal">
            <svg viewBox="0 0 100 100" className="heart-wax-seal-svg">
              <defs>
                {/* Dusty Pink Wax Radial Gradient */}
                <radialGradient id="heartPinkWaxGrad" cx="36%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#f7bec9" />
                  <stop offset="26%" stopColor="#e59da9" />
                  <stop offset="68%" stopColor="#cf7f8f" />
                  <stop offset="95%" stopColor="#a35464" />
                  <stop offset="100%" stopColor="#873e4d" />
                </radialGradient>

                {/* Sunken Stamped Bed Gradient */}
                <linearGradient id="heartInnerBedGrad" x1="25%" y1="20%" x2="75%" y2="80%">
                  <stop offset="0%" stopColor="#d88896" />
                  <stop offset="50%" stopColor="#cb7887" />
                  <stop offset="100%" stopColor="#b45f6f" />
                </linearGradient>

                {/* Rich Metallic Golden Moon & Stars */}
                <linearGradient id="goldMoonLuster" x1="12%" y1="10%" x2="88%" y2="90%">
                  <stop offset="0%" stopColor="#fff8e1" />
                  <stop offset="25%" stopColor="#f9d66f" />
                  <stop offset="55%" stopColor="#e3a730" />
                  <stop offset="80%" stopColor="#b57a12" />
                  <stop offset="100%" stopColor="#fedd82" />
                </linearGradient>

                {/* 3D Wax Rim Specular Highlight */}
                <linearGradient id="waxBevelHighlight" x1="20%" y1="10%" x2="80%" y2="90%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
                  <stop offset="45%" stopColor="rgba(255, 255, 255, 0.15)" />
                  <stop offset="100%" stopColor="rgba(80, 20, 30, 0.35)" />
                </linearGradient>

                {/* Golden 3D Bevel & Drop Shadow */}
                <filter id="moonGleamFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0.6" dy="1.2" stdDeviation="0.8" floodColor="#632616" floodOpacity="0.45" />
                  <feDropShadow dx="-0.4" dy="-0.4" stdDeviation="0.4" floodColor="#ffffff" floodOpacity="0.55" />
                </filter>
              </defs>

              {/* Organic Melted Wax Heart Pool */}
              <path
                d="M 50 88 C 45 88, 39 84, 34 79 C 25 71, 16 62, 10 52 C 5 42, 5 33, 8 26 C 12 17, 21 11, 32 12 C 39 12, 45 16, 49 21 C 50 22, 50 22, 51 21 C 55 16, 61 12, 68 12 C 79 11, 88 17, 92 26 C 95 33, 95 42, 90 52 C 84 62, 75 71, 66 79 C 61 84, 55 88, 50 88 Z"
                fill="url(#heartPinkWaxGrad)"
              />

              {/* Raised Wax Rim / Lip with Specular Highlight */}
              <path
                d="M 50 84 C 46 84, 41 80, 36 76 C 28 68, 20 60, 15 50 C 11 41, 11 34, 13 28 C 16 20, 24 15, 33 16 C 39 16, 45 19, 49 24 C 50 25, 50 25, 51 24 C 55 19, 61 16, 67 16 C 76 15, 84 20, 87 28 C 89 34, 89 41, 85 50 C 80 60, 72 68, 64 76 C 59 80, 54 84, 50 84 Z"
                fill="none"
                stroke="url(#waxBevelHighlight)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Sunken Debossed Inner Bed */}
              <path
                d="M 50 78 C 46 78, 41 74, 37 70 C 30 63, 23 55, 18 47 C 14 39, 14 33, 16 28 C 19 21, 26 17, 34 18 C 40 18, 45 21, 49 25 C 50 26, 50 26, 51 25 C 55 21, 60 18, 66 18 C 74 17, 81 21, 84 28 C 86 33, 86 39, 82 47 C 77 55, 70 63, 63 70 C 59 74, 54 78, 50 78 Z"
                fill="url(#heartInnerBedGrad)"
              />

              {/* Stamped Pearled Rim */}
              <path
                d="M 50 76 C 47 76, 42 72, 38 68 C 32 62, 25 54, 21 46 C 17 38, 17 33, 19 29 C 21 23, 27 20, 34 20 C 40 20, 44 23, 48 26 C 49 27, 51 27, 52 26 C 56 23, 60 20, 66 20 C 73 20, 79 23, 81 29 C 83 33, 83 38, 79 46 C 75 54, 68 62, 62 68 C 58 72, 53 76, 50 76 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.28)"
                strokeWidth="0.8"
                strokeDasharray="1.5 2"
              />

              {/* Stamped Wax Scroll Accent */}
              <path
                d="M 36 64 C 42 66, 46 71, 50 73 C 54 71, 58 66, 64 64"
                fill="none"
                stroke="rgba(115, 38, 50, 0.42)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* === THE GOLDEN CRESCENT MOON & STARS === */}
              <g filter="url(#moonGleamFilter)">
                {/* Crescent Moon */}
                <path
                  d="M 52 32 C 40 34, 33 42, 33 49 C 33 56, 40 64, 52 66 C 43 61, 39 55, 39 49 C 39 43, 43 37, 52 32 Z"
                  fill="url(#goldMoonLuster)"
                  stroke="#e5a932"
                  strokeWidth="0.4"
                />

                {/* Stamped Star Sparkle (Right) */}
                <path
                  d="M 62 40 Q 62 43 65 43 Q 62 43 62 46 Q 62 43 59 43 Q 62 43 62 40 Z"
                  fill="url(#goldMoonLuster)"
                />
                {/* Micro Star Dot */}
                <circle cx="63" cy="54" r="1.3" fill="url(#goldMoonLuster)" />
                {/* Micro Star Sparkle (Top-Left) */}
                <path
                  d="M 33 33 Q 33 35 35 35 Q 33 35 33 37 Q 33 35 31 35 Q 33 35 33 33 Z"
                  fill="url(#goldMoonLuster)"
                />
              </g>
            </svg>
          </div>
        </div>

        <motion.p 
          className="envelope-click-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 0 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Tap the envelope to open
        </motion.p>
      </motion.div>
    </div>
  )
}
