import { useState } from 'react'
import './App.css'
import CustomCursor from './components/CustomCursor'
import EnvelopeIntro from './components/EnvelopeIntro'
import FloatingPetals from './components/FloatingPetals'
import WhiteButterflies from './components/WhiteButterflies'
import HeroSection from './components/HeroSection'
import QuoteSection from './components/QuoteSection'
import MusicPlayer from './components/MusicPlayer'
import Countdown from './components/Countdown'
import EventDetails from './components/EventDetails'
import VenueImage from './components/VenueImage'
import Timeline from './components/Timeline'
import PhotoGallery from './components/PhotoGallery'
import CakeSection from './components/CakeSection'
import RSVP from './components/RSVP'
import ClosingSection from './components/ClosingSection'
import NavDots from './components/NavDots'

function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(true)
  }

  if (!envelopeOpen) {
    return (
      <>
        <CustomCursor />
        <div className="mesh-bg" />
        <WhiteButterflies count={16} mode="white" />
        <FloatingPetals />
        <EnvelopeIntro onClick={handleEnvelopeClick} />
      </>
    )
  }

  return (
    <>
      <CustomCursor />
      <div className="mesh-bg" />
      <WhiteButterflies count={20} mode="pink-and-white" />
      <FloatingPetals />
      
      <div className="paper-strip-wrapper">
        <div className="paper-strip">
          <NavDots />
          <div className="content-wrapper">
            <HeroSection />
            <QuoteSection />
            <MusicPlayer />
            <Countdown />
            <EventDetails />
            <PhotoGallery />
            <Timeline />
            <RSVP />
            <VenueImage />
            <footer className="footer">
              <p style={{fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: '#888', letterSpacing: '2px', textAlign: 'center', margin: '0', textTransform: 'uppercase'}}>
                WE WAIT FOR YOU!
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
