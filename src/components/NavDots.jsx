import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', title: 'Home' },
  { id: 'quote', title: 'Message' },
  { id: 'countdown', title: 'Countdown' },
  { id: 'event', title: 'Event Details' },
  { id: 'gallery', title: 'Photos' },
  { id: 'timeline', title: 'Schedule' },
  { id: 'rsvp', title: 'RSVP' },
]

export default function NavDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="nav-dots">
      {sections.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`nav-dot ${active === s.id ? 'active' : ''}`}
          title={s.title}
        />
      ))}
    </nav>
  )
}
