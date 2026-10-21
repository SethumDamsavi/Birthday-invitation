import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause, Sparkles } from 'lucide-react'

const photos = [
  {
    id: 1,
    src: '/images/moments/moment-01.jpg',
    title: 'Golden Hour Radiance',
    subtitle: 'Basking in the golden evening light',
    caption: 'Lost in a fairytale of blooming pink roses',
  },
  {
    id: 2,
    src: '/images/moments/moment-02.jpg',
    title: 'Enchanted Blooms',
    subtitle: 'Surrounded by sweet petals and roses',
    caption: 'Soft smiles surrounded by birthday blooms',
  },
  {
    id: 3,
    src: '/images/moments/moment-03.jpg',
    title: 'Twirl of Elegance',
    subtitle: 'Graceful steps into Chapter 21',
    caption: 'A magical twirl beneath the floral canopy',
  },
  {
    id: 4,
    src: '/images/moments/moment-04.jpg',
    title: 'Whispers in the Garden',
    subtitle: 'Serene reflections and quiet beauty',
    caption: 'Celebrating twenty-one golden years with grace',
  },
  {
    id: 5,
    src: '/images/moments/moment-05.jpg',
    title: 'Laughter & Sunshine',
    subtitle: 'Radiant smiles that brighten the world',
    caption: 'Sunlight filtering through romantic vines',
  },
  {
    id: 6,
    src: '/images/moments/moment-06.jpg',
    title: 'Timeless Charm',
    subtitle: 'Draped in soft blush and delicate lace',
    caption: 'Surrounded by love, laughter, and lifelong memories',
  },
  {
    id: 7,
    src: '/images/moments/moment-07.jpg',
    title: 'Fairytale Dreamer',
    subtitle: 'Lost in the magic of today',
    caption: 'Every petal carries a wish for the years ahead',
  },
  {
    id: 8,
    src: '/images/moments/moment-08.jpg',
    title: 'Petals & Poetry',
    subtitle: 'Every bloom tells a sweet story',
    caption: 'Gentle moments frozen in timeless memory',
  },
  {
    id: 9,
    src: '/images/moments/moment-09.jpg',
    title: 'Milestone 21',
    subtitle: 'Stepping boldly into a new beginning',
    caption: 'A celebration of grace, laughter, and radiant dreams',
  },
  {
    id: 10,
    src: '/images/moments/moment-10.jpg',
    title: 'Gentle Glow',
    subtitle: 'Warmth, kindness, and eternal poise',
    caption: 'Soft sunlight accentuating every joyous laugh',
  },
  {
    id: 11,
    src: '/images/moments/moment-11.jpg',
    title: 'Garden Pathway',
    subtitle: 'Wandering through blooming arches',
    caption: 'Paths adorned with rose petals and sparkling light',
  },
  {
    id: 12,
    src: '/images/moments/moment-12.jpg',
    title: 'Crowning Moment',
    subtitle: 'Celebrating the queen of the day',
    caption: 'Shining brightly like the golden star you are',
  },
  {
    id: 13,
    src: '/images/moments/moment-13.jpg',
    title: 'Delicate & Divine',
    subtitle: 'Moments of quiet grace and poise',
    caption: 'Elegance woven into every fleeting expression',
  },
  {
    id: 14,
    src: '/images/moments/moment-14.jpg',
    title: 'Pure Joy',
    subtitle: 'Sparkling eyes and infectious happiness',
    caption: 'The kind of happiness that lights up every room',
  },
  {
    id: 15,
    src: '/images/moments/moment-15.jpg',
    title: 'A Dance in the Breeze',
    subtitle: 'Effortless beauty in every motion',
    caption: 'Drifting freely like butterfly wings in the wind',
  },
  {
    id: 16,
    src: '/images/moments/moment-16.jpg',
    title: 'Cherished Reflections',
    subtitle: 'Looking forward with hope and wonder',
    caption: 'Reflecting on twenty-one cherished chapters of life',
  },
  {
    id: 17,
    src: '/images/moments/moment-17.jpg',
    title: 'Forever Blooms',
    subtitle: 'A lifetime of love, laughter, and light',
    caption: 'Here is to forever memories and endless celebrations',
  },
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const thumbnailsRef = useRef(null)
  const sectionRef = useRef(null)

  // Track if gallery section is actually visible in the viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Scroll active thumbnail smoothly within the horizontal strip ONLY (NEVER moving the window or page)
  useEffect(() => {
    const container = thumbnailsRef.current
    if (!container) return

    const activeEl = container.children[currentIndex]
    if (activeEl) {
      const containerRect = container.getBoundingClientRect()
      const activeRect = activeEl.getBoundingClientRect()

      // Calculate how far activeEl is from the center of the thumbnail container
      const currentRelativeLeft = activeRect.left - containerRect.left
      const targetOffset = currentRelativeLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2)

      container.scrollBy({
        left: targetOffset,
        behavior: 'smooth',
      })
    }
  }, [currentIndex])

  const prevPhoto = useCallback(() => {
    setCurrentIndex(i => (i - 1 + photos.length) % photos.length)
  }, [])

  const nextPhoto = useCallback(() => {
    setCurrentIndex(i => (i + 1) % photos.length)
  }, [])

  const openLightbox = (index) => {
    setLightbox(index)
  }

  const closeLightbox = () => {
    setLightbox(null)
  }

  const prevLightbox = (e) => {
    if (e) e.stopPropagation()
    setLightbox(i => (i - 1 + photos.length) % photos.length)
  }

  const nextLightbox = (e) => {
    if (e) e.stopPropagation()
    setLightbox(i => (i + 1) % photos.length)
  }

  // Autoplay timer - only runs when gallery is in view, autoplay enabled, not hovered, and not in lightbox
  useEffect(() => {
    if (!isAutoPlay || !isInView || isHovered || lightbox !== null) return
    const timer = setInterval(() => {
      setCurrentIndex(i => (i + 1) % photos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isAutoPlay, isInView, isHovered, lightbox])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightbox !== null) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') prevLightbox()
        if (e.key === 'ArrowRight') nextLightbox()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox])

  // Compute position for 3D Coverflow stage
  const getCardStyle = (index) => {
    let diff = index - currentIndex
    const total = photos.length
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return {
        x: '0%',
        scale: 1,
        zIndex: 10,
        opacity: 1,
        rotateY: 0,
        filter: 'brightness(1)',
        pointerEvents: 'auto',
      }
    } else if (diff === -1) {
      return {
        x: '-58%',
        scale: 0.82,
        zIndex: 5,
        opacity: 0.65,
        rotateY: 14,
        filter: 'brightness(0.9)',
        pointerEvents: 'auto',
      }
    } else if (diff === 1) {
      return {
        x: '58%',
        scale: 0.82,
        zIndex: 5,
        opacity: 0.65,
        rotateY: -14,
        filter: 'brightness(0.9)',
        pointerEvents: 'auto',
      }
    } else if (diff === -2) {
      return {
        x: '-98%',
        scale: 0.68,
        zIndex: 2,
        opacity: 0.22,
        rotateY: 22,
        filter: 'brightness(0.8)',
        pointerEvents: 'none',
      }
    } else if (diff === 2) {
      return {
        x: '98%',
        scale: 0.68,
        zIndex: 2,
        opacity: 0.22,
        rotateY: -22,
        filter: 'brightness(0.8)',
        pointerEvents: 'none',
      }
    } else {
      return {
        x: diff < 0 ? '-120%' : '120%',
        scale: 0.5,
        zIndex: 0,
        opacity: 0,
        rotateY: 0,
        filter: 'brightness(0.6)',
        pointerEvents: 'none',
      }
    }
  }

  return (
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      {/* Header */}
      <motion.div 
        className="gallery-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={16} color="var(--pink-500)" />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--pink-500)', fontWeight: 600 }}>
            Memories in Bloom
          </span>
          <Sparkles size={16} color="var(--pink-500)" />
        </div>
        <h2 className="gallery-title">Birthday Shoot</h2>
        <p className="gallery-subtitle">A glimpse into the 21st celebration</p>
      </motion.div>

      {/* Stage Carousel */}
      <div 
        className="carousel-stage-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow Button */}
        <button 
          className="carousel-nav-btn prev"
          onClick={prevPhoto}
          aria-label="Previous Photo"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Carousel 3D Track */}
        <div className="carousel-track">
          {photos.map((photo, i) => {
            let diff = i - currentIndex
            const total = photos.length
            if (diff > total / 2) diff -= total
            if (diff < -total / 2) diff += total

            const isActive = diff === 0
            const style = getCardStyle(i)

            return (
              <motion.div
                key={photo.id}
                className={`carousel-card ${isActive ? 'active' : ''}`}
                animate={style}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                onClick={() => {
                  if (isActive) {
                    openLightbox(i)
                  } else if (diff === -1) {
                    prevPhoto()
                  } else if (diff === 1) {
                    nextPhoto()
                  } else {
                    setCurrentIndex(i)
                  }
                }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -40 || velocity.x < -300) {
                    nextPhoto()
                  } else if (offset.x > 40 || velocity.x > 300) {
                    prevPhoto()
                  }
                }}
              >
                <img src={photo.src} alt={photo.title} loading="lazy" />

                {/* Badges on active card */}
                {isActive && (
                  <>
                    <div className="carousel-badge">
                      {String(i + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                    </div>
                    <div className="carousel-zoom-hint" title="Click to view full screen">
                      <Maximize2 size={16} />
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Right Arrow Button */}
        <button 
          className="carousel-nav-btn next"
          onClick={nextPhoto}
          aria-label="Next Photo"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Controls: Dots & Autoplay Toggle */}
      <div className="carousel-controls">
        <div className="carousel-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="carousel-play-btn"
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          aria-label={isAutoPlay ? 'Pause auto slideshow' : 'Play auto slideshow'}
          title={isAutoPlay ? 'Pause Slideshow' : 'Play Slideshow'}
        >
          {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* Thumbnail Bar */}
      <div className="carousel-thumbnails" ref={thumbnailsRef}>
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            className={`carousel-thumb ${currentIndex === i ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`View ${photo.title}`}
          >
            <img src={photo.src} alt={`Thumbnail ${i + 1}`} />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div 
            className="gallery-lightbox-overlay"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div 
              className="gallery-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            >
              {/* Close Button */}
              <button 
                className="gallery-lightbox-close" 
                onClick={closeLightbox}
                aria-label="Close fullscreen preview"
              >
                <X size={22} />
              </button>

              {/* Prev / Next buttons in Lightbox */}
              <button 
                className="gallery-lightbox-nav prev" 
                onClick={prevLightbox}
                aria-label="Previous photo in preview"
              >
                <ChevronLeft size={30} />
              </button>
              <button 
                className="gallery-lightbox-nav next" 
                onClick={nextLightbox}
                aria-label="Next photo in preview"
              >
                <ChevronRight size={30} />
              </button>

              {/* Lightbox Image */}
              <motion.img 
                key={lightbox}
                src={photos[lightbox].src} 
                alt={photos[lightbox].title} 
                className="gallery-lightbox-img"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              />

              {/* Counter Badge */}
              <div className="gallery-lightbox-counter">
                {lightbox + 1} / {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
