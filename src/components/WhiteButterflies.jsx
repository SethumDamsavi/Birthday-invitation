import { useEffect, useRef } from 'react'

export default function WhiteButterflies({ count = 3, mode = 'pink-and-white' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Fairy dust / sparkle particles with pink and white colors
    class Sparkle {
      constructor(x, y, colorType = 'white') {
        this.x = x + (Math.random() - 0.5) * 12
        this.y = y + (Math.random() - 0.5) * 12
        this.size = Math.random() * 2.5 + 1.2
        this.opacity = Math.random() * 0.7 + 0.35
        this.decay = Math.random() * 0.02 + 0.012
        this.vx = (Math.random() - 0.5) * 0.6
        this.vy = Math.random() * 0.8 + 0.3
        this.colorType = colorType
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.opacity -= this.decay
        this.size *= 0.96
        return this.opacity > 0
      }

      draw(c) {
        c.save()
        if (this.colorType === 'pink') {
          c.fillStyle = `rgba(244, 114, 182, ${this.opacity})`
          c.shadowColor = 'rgba(236, 72, 153, 0.9)'
        } else if (this.colorType === 'pink-white') {
          c.fillStyle = `rgba(251, 207, 232, ${this.opacity})`
          c.shadowColor = 'rgba(244, 114, 182, 0.8)'
        } else {
          c.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
          c.shadowColor = 'rgba(255, 240, 245, 0.85)'
        }
        c.shadowBlur = 6
        c.beginPath()
        c.arc(this.x, this.y, Math.max(0.2, this.size), 0, Math.PI * 2)
        c.fill()
        c.restore()
      }
    }

    const sparkles = []

    // Realistic 3D Butterflies (supports Pink, White & Ombre)
    class Butterfly {
      constructor(initialX, initialY, forceType = null) {
        if (mode === 'white') {
          this.type = 'white'
        } else if (forceType) {
          this.type = forceType
        } else {
          const rand = Math.random()
          if (rand < 0.45) {
            this.type = 'pink'
          } else if (rand < 0.75) {
            this.type = 'white'
          } else {
            this.type = 'pink-white'
          }
        }
        this.reset(initialX, initialY)
      }

      reset(initX, initY) {
        this.x = initX !== undefined ? initX : Math.random() * width
        this.y = initY !== undefined ? initY : height + 20 + Math.random() * 50

        // Speed & trajectory: serene, dreamy, graceful flight
        this.baseSpeed = Math.random() * 0.8 + 0.7
        this.vx = (Math.random() - 0.5) * 1.2
        this.vy = -(Math.random() * 0.9 + 0.8)

        // Appearance: elegant, distinct scale
        this.size = Math.random() * 10 + 22 // 22 to 32px scale
        this.opacity = Math.random() * 0.2 + 0.8 // 0.8 to 1.0
        this.angle = 0

        // Flapping rhythm
        this.flapTime = Math.random() * 10
        this.flapSpeed = Math.random() * 0.22 + 0.18
        this.glideDuration = 0
        this.isGliding = false

        // Natural wander oscillation
        this.wanderPhase = Math.random() * 100
        this.wanderSpeed = Math.random() * 0.018 + 0.012

        this.sparkleTimer = 0
      }

      update(mouseX, mouseY) {
        this.wanderPhase += this.wanderSpeed
        const driftX = Math.sin(this.wanderPhase * 1.5) * 1.1
        const driftY = Math.cos(this.wanderPhase * 0.8) * 0.4

        // Gentle interactive avoidance if mouse is near
        let avoidX = 0
        let avoidY = 0
        if (mouseX !== null && mouseY !== null) {
          const dx = this.x - mouseX
          const dy = this.y - mouseY
          const dist = Math.hypot(dx, dy)
          if (dist < 130 && dist > 0) {
            const force = ((130 - dist) / 130) * 2.5
            avoidX = (dx / dist) * force
            avoidY = (dy / dist) * force
          }
        }

        this.x += this.vx + driftX + avoidX
        this.y += this.vy + driftY + avoidY

        // Flap and glide cycle
        if (!this.isGliding) {
          this.flapTime += this.flapSpeed
          if (Math.random() < 0.015 && this.flapSpeed > 0.2) {
            this.isGliding = true
            this.glideDuration = Math.floor(Math.random() * 25 + 15)
          }
        } else {
          this.glideDuration--
          this.flapTime += 0.05
          if (this.glideDuration <= 0) {
            this.isGliding = false
          }
        }

        // Heading angle aligned with flight
        const targetAngle = Math.atan2(this.vy + driftY, this.vx + driftX) + Math.PI / 2
        this.angle += (targetAngle - this.angle) * 0.1

        // Spawn trailing sparkles matching butterfly color
        this.sparkleTimer++
        if (this.sparkleTimer % 5 === 0 && Math.random() > 0.4) {
          sparkles.push(new Sparkle(this.x, this.y, this.type))
        }

        // Wrap around / respawn when moving off screen
        const padding = 70
        if (
          this.y < -padding ||
          this.x < -padding ||
          this.x > width + padding
        ) {
          this.reset(
            Math.random() * (width - 100) + 50,
            height + 20 + Math.random() * 50
          )
        }
      }

      draw(c) {
        c.save()
        c.translate(this.x, this.y)
        c.rotate(this.angle)

        // 3D wing fold factor
        const flap = Math.cos(this.flapTime)
        const wingScaleX = Math.abs(flap) * 0.85 + 0.15
        const wingElevateY = -Math.sin(this.flapTime) * 3

        c.globalAlpha = this.opacity

        // Set glow according to color
        if (this.type === 'pink') {
          c.shadowColor = 'rgba(244, 114, 182, 0.9)'
          c.shadowBlur = 10
        } else if (this.type === 'pink-white') {
          c.shadowColor = 'rgba(251, 207, 232, 0.85)'
          c.shadowBlur = 9
        } else {
          c.shadowColor = 'rgba(255, 255, 255, 0.95)'
          c.shadowBlur = 10
        }

        const s = this.size / 24

        // Draw Left Wing Pair
        c.save()
        c.scale(-wingScaleX * s, s)
        c.translate(0, wingElevateY)
        this.drawWingPair(c)
        c.restore()

        // Draw Right Wing Pair
        c.save()
        c.scale(wingScaleX * s, s)
        c.translate(0, wingElevateY)
        this.drawWingPair(c)
        c.restore()

        // Central Body & Antennae
        c.save()
        c.scale(s, s)
        this.drawBody(c)
        c.restore()

        c.restore()
      }

      drawWingPair(c) {
        // --- Forewing (Upper Wing) ---
        c.beginPath()
        c.moveTo(0, 2)
        c.bezierCurveTo(8, -8, 22, -26, 26, -20)
        c.bezierCurveTo(30, -12, 28, 4, 16, 12)
        c.bezierCurveTo(8, 16, 2, 8, 0, 2)
        c.closePath()

        const gradFore = c.createRadialGradient(4, 0, 2, 16, -10, 24)

        if (this.type === 'pink') {
          // Delicate fairytale blush/rose pink
          gradFore.addColorStop(0, 'rgba(255, 220, 235, 0.98)')
          gradFore.addColorStop(0.35, 'rgba(249, 168, 212, 0.92)')
          gradFore.addColorStop(0.75, 'rgba(244, 114, 182, 0.85)')
          gradFore.addColorStop(1, 'rgba(236, 72, 153, 0.55)')
        } else if (this.type === 'pink-white') {
          // Ombre: Soft pink core with glowing white edges
          gradFore.addColorStop(0, 'rgba(255, 255, 255, 0.98)')
          gradFore.addColorStop(0.3, 'rgba(254, 205, 228, 0.92)')
          gradFore.addColorStop(0.7, 'rgba(244, 114, 182, 0.78)')
          gradFore.addColorStop(1, 'rgba(255, 255, 255, 0.6)')
        } else {
          // Luminous pearl white
          gradFore.addColorStop(0, 'rgba(255, 255, 255, 0.98)')
          gradFore.addColorStop(0.5, 'rgba(255, 252, 254, 0.88)')
          gradFore.addColorStop(0.85, 'rgba(250, 245, 250, 0.65)')
          gradFore.addColorStop(1, 'rgba(255, 255, 255, 0.45)')
        }

        c.fillStyle = gradFore
        c.fill()

        // Delicate vein lines
        if (this.type === 'pink') {
          c.strokeStyle = 'rgba(236, 72, 153, 0.65)'
        } else if (this.type === 'pink-white') {
          c.strokeStyle = 'rgba(244, 114, 182, 0.6)'
        } else {
          c.strokeStyle = 'rgba(255, 255, 255, 0.75)'
        }
        c.lineWidth = 0.8
        c.stroke()

        c.beginPath()
        c.moveTo(2, 2)
        c.quadraticCurveTo(12, -8, 24, -18)
        c.moveTo(2, 2)
        c.quadraticCurveTo(15, -2, 23, 2)
        c.strokeStyle = this.type === 'pink' ? 'rgba(244, 114, 182, 0.45)' : 'rgba(255, 255, 255, 0.4)'
        c.lineWidth = 0.6
        c.stroke()

        // --- Hindwing (Lower Wing) ---
        c.beginPath()
        c.moveTo(0, 4)
        c.bezierCurveTo(8, 6, 20, 10, 18, 22)
        c.bezierCurveTo(16, 28, 6, 26, 0, 16)
        c.closePath()

        const gradHind = c.createRadialGradient(2, 6, 1, 10, 14, 16)
        if (this.type === 'pink') {
          gradHind.addColorStop(0, 'rgba(254, 215, 230, 0.95)')
          gradHind.addColorStop(0.5, 'rgba(249, 168, 212, 0.88)')
          gradHind.addColorStop(1, 'rgba(244, 114, 182, 0.55)')
        } else if (this.type === 'pink-white') {
          gradHind.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
          gradHind.addColorStop(0.5, 'rgba(249, 168, 212, 0.8)')
          gradHind.addColorStop(1, 'rgba(255, 240, 248, 0.5)')
        } else {
          gradHind.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
          gradHind.addColorStop(0.6, 'rgba(255, 250, 253, 0.8)')
          gradHind.addColorStop(1, 'rgba(250, 240, 248, 0.4)')
        }

        c.fillStyle = gradHind
        c.fill()

        c.strokeStyle = this.type === 'pink' ? 'rgba(236, 72, 153, 0.55)' : 'rgba(255, 255, 255, 0.65)'
        c.lineWidth = 0.6
        c.stroke()
      }

      drawBody(c) {
        // Body color
        const bodyColor = this.type === 'pink' ? '#fce7f3' : '#f8f4f6'
        const headColor = this.type === 'pink' ? '#f472b6' : '#f0e6eb'
        const antennaColor = this.type === 'pink' ? 'rgba(219, 39, 119, 0.75)' : 'rgba(240, 225, 235, 0.85)'

        // Abdomen & Thorax
        c.beginPath()
        c.ellipse(0, 6, 1.4, 8, 0, 0, Math.PI * 2)
        c.fillStyle = bodyColor
        c.fill()

        // Head
        c.beginPath()
        c.arc(0, -3, 1.8, 0, Math.PI * 2)
        c.fillStyle = headColor
        c.fill()

        // Antennae
        c.strokeStyle = antennaColor
        c.lineWidth = 0.7
        c.beginPath()
        c.moveTo(-0.5, -4)
        c.quadraticCurveTo(-4, -10, -7, -13)
        c.moveTo(0.5, -4)
        c.quadraticCurveTo(4, -10, 7, -13)
        c.stroke()

        // Antenna tips
        c.fillStyle = this.type === 'pink' ? '#f472b6' : 'rgba(255, 255, 255, 0.95)'
        c.beginPath()
        c.arc(-7, -13, 0.8, 0, Math.PI * 2)
        c.arc(7, -13, 0.8, 0, Math.PI * 2)
        c.fill()
      }
    }

    // Initialize exactly the requested number of butterflies (default 3)
    const butterflies = []
    const totalButterflies = Math.max(1, count)

    for (let i = 0; i < totalButterflies; i++) {
      let type = null
      if (mode === 'white') {
        type = 'white'
      } else {
        type = i % 3 === 0 ? 'pink' : i % 3 === 1 ? 'white' : 'pink-white'
      }

      // Space initial positions gracefully across the viewport so they never overlap
      let initX, initY
      if (totalButterflies === 3) {
        if (i === 0) {
          initX = width * 0.22
          initY = height * 0.65
        } else if (i === 1) {
          initX = width * 0.78
          initY = height * 0.38
        } else {
          initX = width * 0.50
          initY = height * 0.82
        }
      } else {
        initX = ((i + 0.5) / totalButterflies) * width
        initY = Math.random() * height
      }

      const b = new Butterfly(initX, initY, type)
      b.wanderPhase = i * 42.5 + Math.random() * 5
      b.flapTime = i * 3.8 + Math.random() * 2
      butterflies.push(b)
    }

    // Mouse / touch interaction
    let mousePos = { x: null, y: null }
    const handleMouseMove = (e) => {
      mousePos.x = e.clientX
      mousePos.y = e.clientY
    }
    const handleMouseLeave = () => {
      mousePos.x = null
      mousePos.y = null
    }

    // Click/tap interaction: sparkle burst without adding more butterflies (strictly preserves count)
    const handleClick = (e) => {
      const clickX = e.clientX
      const clickY = e.clientY

      const sparkleCount = 6
      for (let i = 0; i < sparkleCount; i++) {
        const color = mode === 'white' ? 'white' : (i % 2 === 0 ? 'pink' : 'pink-white')
        sparkles.push(new Sparkle(clickX, clickY, color))
      }

      // Nearby butterflies gently flutter away with a pleasant impulse
      for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i]
        const dx = b.x - clickX
        const dy = b.y - clickY
        const dist = Math.hypot(dx, dy)
        if (dist < 180 && dist > 0) {
          b.vx += (dx / dist) * 1.6
          b.vy += (dy / dist) * 1.6
          b.isGliding = false
          b.flapSpeed = 0.32
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })

    // Animation Loop (60 FPS)
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update & Draw Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i]
        if (sp.update()) {
          sp.draw(ctx)
        } else {
          sparkles.splice(i, 1)
        }
      }

      // Update & Draw Butterflies
      for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i]
        b.update(mousePos.x, mousePos.y)
        b.draw(ctx)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleClick)
    }
  }, [count, mode])

  return (
    <canvas
      ref={canvasRef}
      className="butterflies-canvas"
      aria-hidden="true"
    />
  )
}
