import { useEffect, useRef } from 'react'

export default function FloatingPetals({ active }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!active || !containerRef.current) return
    const container = containerRef.current
    const createPetal = () => {
      const petal = document.createElement('div')
      petal.className = 'petal'
      petal.style.left = Math.random() * 100 + '%'
      petal.style.animationDuration = (Math.random() * 6 + 8) + 's'
      petal.style.animationDelay = Math.random() * 5 + 's'
      petal.style.width = (Math.random() * 10 + 8) + 'px'
      petal.style.height = petal.style.width
      petal.style.opacity = Math.random() * 0.4 + 0.2
      const hue = Math.random() > 0.5 ? '330' : '340'
      const sat = Math.random() * 30 + 60
      const light = Math.random() * 20 + 75
      petal.style.background = `radial-gradient(ellipse at center, hsl(${hue},${sat}%,${light}%), hsl(${hue},${sat}%,${light + 10}%))`
      container.appendChild(petal)
      setTimeout(() => petal.remove(), 15000)
    }
    for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 600)
    const interval = setInterval(createPetal, 2500)
    return () => clearInterval(interval)
  }, [active])

  return <div className="petals-container" ref={containerRef} />
}
