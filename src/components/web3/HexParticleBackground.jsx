import { useEffect, useRef } from 'react'

function HexParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return undefined

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    const particles = Array.from({ length: 55 }, (_, index) => ({
      x: (index * 17) % window.innerWidth,
      y: (index * 29) % window.innerHeight,
      radius: (index % 4) + 1,
      speed: 0.12 + (index % 5) * 0.03,
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    let frame
    let running = true

    const render = () => {
      if (!running) return
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = 'rgba(0, 212, 255, 0.45)'
      particles.forEach((particle) => {
        particle.y -= particle.speed
        if (particle.y < -10) particle.y = canvas.height + 10
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })
      frame = window.requestAnimationFrame(render)
    }

    // Listen for changes to motion preference
    const handleMotionChange = (event) => {
      if (event.matches) {
        running = false
        window.cancelAnimationFrame(frame)
        context.clearRect(0, 0, canvas.width, canvas.height)
      } else {
        running = true
        render()
      }
    }

    motionQuery.addEventListener('change', handleMotionChange)

    resize()
    render()
    window.addEventListener('resize', resize)

    return () => {
      running = false
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <>
      <div className="hex-grid absolute inset-0 opacity-40" />
      <canvas className="absolute inset-0 h-full w-full opacity-60" ref={canvasRef} />
    </>
  )
}

export default HexParticleBackground
