import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { selectionTheme } from '../themes/selection.theme'

/**
 * Node and edge data representing the interconnection of skills/interests
 * across all three lenses. Shows that Rafif is one multidimensional person.
 */
const nodes = [
  // Core identity (center)
  { id: 'rafif', label: 'Rafif Alton', group: 'core', x: 0, y: 0, radius: 28 },

  // Web3 nodes
  { id: 'defi', label: 'DeFi', group: 'web3', x: -220, y: -160, radius: 20 },
  { id: 'solidity', label: 'Solidity', group: 'web3', x: -300, y: -60, radius: 16 },
  { id: 'lisk', label: 'Lisk', group: 'web3', x: -260, y: -220, radius: 16 },
  { id: 'tokenomics', label: 'Tokenomics', group: 'web3', x: -160, y: -240, radius: 16 },
  { id: 'governance', label: 'Governance', group: 'web3', x: -340, y: -160, radius: 14 },

  // Cybersec nodes
  { id: 'pentest', label: 'Pentesting', group: 'cybersec', x: 220, y: -160, radius: 20 },
  { id: 'network', label: 'Network Analysis', group: 'cybersec', x: 300, y: -60, radius: 16 },
  { id: 'osint', label: 'OSINT', group: 'cybersec', x: 260, y: -220, radius: 16 },
  { id: 'vuln', label: 'Vuln Assessment', group: 'cybersec', x: 340, y: -140, radius: 14 },
  { id: 'webapp-sec', label: 'Web App Security', group: 'cybersec', x: 180, y: -260, radius: 16 },

  // Life nodes
  { id: 'macro', label: 'Macroeconomics', group: 'life', x: -100, y: 200, radius: 18 },
  { id: 'geopolitics', label: 'Geopolitics', group: 'life', x: 100, y: 200, radius: 18 },
  { id: 'learning', label: 'Pola Belajar', group: 'life', x: 0, y: 260, radius: 16 },
  { id: 'writing', label: 'Writing', group: 'life', x: -180, y: 260, radius: 14 },
  { id: 'systems', label: 'Systems Thinking', group: 'life', x: 180, y: 260, radius: 16 },

  // Shared/bridge nodes (skills that span multiple lenses)
  { id: 'react', label: 'React', group: 'shared', x: -120, y: -40, radius: 16 },
  { id: 'research', label: 'Research', group: 'shared', x: 120, y: 60, radius: 18 },
  { id: 'incentives', label: 'Incentive Design', group: 'shared', x: -60, y: 120, radius: 16 },
  { id: 'frontend', label: 'Frontend', group: 'shared', x: -180, y: 60, radius: 16 },
  { id: 'critical-thinking', label: 'Critical Thinking', group: 'shared', x: 60, y: -80, radius: 16 },
]

const edges = [
  // Core connections
  { from: 'rafif', to: 'react', strength: 0.9 },
  { from: 'rafif', to: 'research', strength: 0.9 },
  { from: 'rafif', to: 'critical-thinking', strength: 0.9 },

  // Web3 internal
  { from: 'defi', to: 'tokenomics', strength: 0.8 },
  { from: 'defi', to: 'lisk', strength: 0.7 },
  { from: 'solidity', to: 'defi', strength: 0.8 },
  { from: 'governance', to: 'tokenomics', strength: 0.7 },
  { from: 'lisk', to: 'governance', strength: 0.6 },

  // Cybersec internal
  { from: 'pentest', to: 'vuln', strength: 0.8 },
  { from: 'pentest', to: 'webapp-sec', strength: 0.8 },
  { from: 'network', to: 'osint', strength: 0.6 },
  { from: 'webapp-sec', to: 'network', strength: 0.5 },

  // Life internal
  { from: 'macro', to: 'geopolitics', strength: 0.8 },
  { from: 'learning', to: 'writing', strength: 0.7 },
  { from: 'systems', to: 'learning', strength: 0.7 },
  { from: 'geopolitics', to: 'systems', strength: 0.6 },

  // Cross-lens bridges (the interesting connections!)
  { from: 'defi', to: 'incentives', strength: 0.8 },
  { from: 'incentives', to: 'macro', strength: 0.7 },
  { from: 'incentives', to: 'governance', strength: 0.7 },
  { from: 'tokenomics', to: 'macro', strength: 0.6 },
  { from: 'react', to: 'frontend', strength: 0.9 },
  { from: 'frontend', to: 'solidity', strength: 0.5 },
  { from: 'research', to: 'osint', strength: 0.7 },
  { from: 'research', to: 'geopolitics', strength: 0.6 },
  { from: 'research', to: 'defi', strength: 0.7 },
  { from: 'critical-thinking', to: 'pentest', strength: 0.8 },
  { from: 'critical-thinking', to: 'systems', strength: 0.7 },
  { from: 'systems', to: 'governance', strength: 0.5 },
  { from: 'webapp-sec', to: 'frontend', strength: 0.5 },
  { from: 'writing', to: 'research', strength: 0.6 },
]

const groupColors = {
  core: '#9AA4FF',
  web3: '#00D4FF',
  cybersec: '#00FF41',
  life: '#C4622D',
  shared: '#E7B77A',
}

const groupLabels = {
  web3: 'Web3 Lens',
  cybersec: 'Cybersecurity Lens',
  life: 'Kehidupan Saya',
  shared: 'Shared Skills',
  core: 'Identity',
}

function ConnectionGraphPage() {
  const reduceMotion = useReducedMotion()
  const canvasRef = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const animFrameRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const offsetRef = useRef({ x: 0, y: 0 })

  useTheme(selectionTheme)

  // Canvas rendering
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const cx = width / 2 + offsetRef.current.x
    const cy = height / 2 + offsetRef.current.y

    ctx.clearRect(0, 0, width, height)

    // Draw edges
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from)
      const toNode = nodes.find((n) => n.id === edge.to)
      if (!fromNode || !toNode) return

      const isHighlighted =
        !selectedGroup ||
        fromNode.group === selectedGroup ||
        toNode.group === selectedGroup ||
        fromNode.group === 'shared' ||
        toNode.group === 'shared' ||
        fromNode.group === 'core' ||
        toNode.group === 'core'

      const isHovered =
        hoveredNode && (edge.from === hoveredNode || edge.to === hoveredNode)

      ctx.beginPath()
      ctx.moveTo(cx + fromNode.x, cy + fromNode.y)
      ctx.lineTo(cx + toNode.x, cy + toNode.y)

      if (isHovered) {
        ctx.strokeStyle = `${groupColors[fromNode.group]}88`
        ctx.lineWidth = 2.5
      } else if (isHighlighted) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + edge.strength * 0.08})`
        ctx.lineWidth = 1 + edge.strength * 0.8
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 0.5
      }

      ctx.stroke()
    })

    // Draw nodes
    nodes.forEach((node) => {
      const isHighlighted =
        !selectedGroup ||
        node.group === selectedGroup ||
        node.group === 'shared' ||
        node.group === 'core'

      const isHovered = hoveredNode === node.id
      const isConnectedToHovered =
        hoveredNode &&
        edges.some(
          (e) =>
            (e.from === hoveredNode && e.to === node.id) ||
            (e.to === hoveredNode && e.from === node.id)
        )

      const color = groupColors[node.group]
      const alpha = isHighlighted ? 1 : 0.2
      const scale = isHovered ? 1.3 : isConnectedToHovered ? 1.15 : 1

      const x = cx + node.x
      const y = cy + node.y
      const r = node.radius * scale

      // Glow for hovered
      if (isHovered || isConnectedToHovered) {
        ctx.beginPath()
        ctx.arc(x, y, r + 8, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, r, x, y, r + 8)
        gradient.addColorStop(0, `${color}44`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Node circle
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = isHighlighted
        ? `${color}${isHovered ? 'cc' : '33'}`
        : `${color}11`
      ctx.fill()
      ctx.strokeStyle = `${color}${isHighlighted ? '88' : '22'}`
      ctx.lineWidth = isHovered ? 2 : 1
      ctx.stroke()

      // Label
      ctx.fillStyle = isHighlighted
        ? `rgba(255, 255, 255, ${isHovered ? 1 : 0.8})`
        : 'rgba(255, 255, 255, 0.2)'
      ctx.font = `${isHovered ? '600' : '400'} ${
        node.id === 'rafif' ? '13px' : '11px'
      } "DM Sans", sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, x, y)
    })
  }, [hoveredNode, selectedGroup])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      draw()
      animFrameRef.current = requestAnimationFrame(animate)
    }

    if (!reduceMotion) {
      animate()
    } else {
      draw()
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [draw, reduceMotion])

  // Handle resize
  useEffect(() => {
    const handleResize = () => draw()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [draw])

  // Handle mouse interactions
  const handleMouseMove = useCallback(
    (event) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const mx = event.clientX - rect.left
      const my = event.clientY - rect.top
      const cx = rect.width / 2 + offsetRef.current.x
      const cy = rect.height / 2 + offsetRef.current.y

      mouseRef.current = { x: mx, y: my }

      // Check if hovering over any node
      let found = null
      for (const node of nodes) {
        const dx = mx - (cx + node.x)
        const dy = my - (cy + node.y)
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist <= node.radius + 6) {
          found = node.id
          break
        }
      }

      setHoveredNode(found)
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null)
  }, [])

  // Get info about hovered node
  const hoveredNodeData = hoveredNode ? nodes.find((n) => n.id === hoveredNode) : null
  const hoveredConnections = hoveredNode
    ? edges.filter((e) => e.from === hoveredNode || e.to === hoveredNode)
    : []

  return (
    <motion.main
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#07080C] overflow-hidden"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-screen">
        {/* Header overlay */}
        <div className="absolute left-0 right-0 top-0 z-10 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <Link
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                to="/"
              >
                ← All Lenses
              </Link>
              <h1 className="mt-4 font-heading text-2xl text-white md:text-3xl">
                Connection Graph
              </h1>
              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Satu orang, tiga perspektif — tapi semuanya terhubung.
                Hover di setiap node untuk melihat keterkaitannya.
              </p>
            </div>

            {/* Legend */}
            <div className="hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm md:block">
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">
                Legend
              </div>
              <div className="space-y-2">
                {Object.entries(groupLabels).map(([key, label]) => (
                  <button
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors ${
                      selectedGroup === key
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                    }`}
                    key={key}
                    onClick={() =>
                      setSelectedGroup(selectedGroup === key ? null : key)
                    }
                    type="button"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: groupColors[key] }}
                    />
                    {label}
                  </button>
                ))}
              </div>
              {selectedGroup && (
                <button
                  className="mt-3 w-full rounded-md border border-white/10 px-2 py-1 text-xs text-gray-500 hover:text-gray-300"
                  onClick={() => setSelectedGroup(null)}
                  type="button"
                >
                  Show All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          className="absolute inset-0 h-full w-full cursor-crosshair"
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          ref={canvasRef}
        />

        {/* Hovered node info panel */}
        {hoveredNodeData && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 z-10 max-w-xs rounded-xl border border-white/10 bg-[#0E1220]/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: groupColors[hoveredNodeData.group] }}
              />
              <span className="font-medium text-white">
                {hoveredNodeData.label}
              </span>
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-500">
                {groupLabels[hoveredNodeData.group]}
              </span>
            </div>
            {hoveredConnections.length > 0 && (
              <div className="mt-3">
                <div className="mb-1 text-xs text-gray-500">
                  Connected to ({hoveredConnections.length}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hoveredConnections.map((edge) => {
                    const targetId =
                      edge.from === hoveredNode ? edge.to : edge.from
                    const target = nodes.find((n) => n.id === targetId)
                    if (!target) return null
                    return (
                      <span
                        className="rounded-md border px-2 py-0.5 text-xs"
                        key={targetId}
                        style={{
                          borderColor: `${groupColors[target.group]}44`,
                          color: groupColors[target.group],
                        }}
                      >
                        {target.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats overlay bottom-right */}
        <div className="absolute bottom-6 right-6 z-10 rounded-xl border border-white/10 bg-[#0E1220]/80 p-4 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-mono text-lg font-bold text-white">
                {nodes.length}
              </div>
              <div className="text-xs text-gray-500">Nodes</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">
                {edges.length}
              </div>
              <div className="text-xs text-gray-500">Connections</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-[#E7B77A]">
                {nodes.filter((n) => n.group === 'shared').length}
              </div>
              <div className="text-xs text-gray-500">Bridges</div>
            </div>
          </div>
        </div>

        {/* Mobile legend */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap gap-2 md:hidden">
          {Object.entries(groupLabels).map(([key, label]) => (
            <button
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                selectedGroup === key
                  ? 'border-white/20 bg-white/10 text-white'
                  : 'border-white/10 text-gray-500'
              }`}
              key={key}
              onClick={() =>
                setSelectedGroup(selectedGroup === key ? null : key)
              }
              type="button"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: groupColors[key] }}
              />
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.main>
  )
}

export default ConnectionGraphPage
