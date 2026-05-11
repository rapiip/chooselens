import { useEffect, useMemo, useRef, useState } from 'react'
import { terminalCommandNotFound } from '../../utils/formatters'

// Easter egg responses
const easterEggs = {
  'sudo rm -rf /': {
    text: '[sudo] password for root: ********\n\n⚠️  Nice try. This isn\'t a real shell.\nBut if it were... you\'d have just mass-deleted the entire portfolio.\nDon\'t worry, no files were harmed in the making of this terminal.\n\n💀 Achievement unlocked: "Chaotic Neutral"',
    isEasterEgg: true,
  },
  'sudo rm -rf / --no-preserve-root': {
    text: '🚨 CRITICAL: You really tried with --no-preserve-root?\n\nRelax. This is a sandboxed simulation.\nBut I admire the commitment to destruction.\n\n🏆 Achievement unlocked: "Persistence is Key"',
    isEasterEgg: true,
  },
  matrix: {
    text: null, // Special: triggers matrix rain animation
    isEasterEgg: true,
    special: 'matrix',
  },
  'hack nasa': {
    text: '🛰️ Connecting to nasa.gov...\n[████████████████████] 100%\n\nERROR 403: Access Denied\n\nJust kidding. This is a portfolio, not a CTF.\nBut props for thinking big.\n\n🌍 Achievement unlocked: "Aim for the Stars"',
    isEasterEgg: true,
  },
  'hack pentagon': {
    text: '🏛️ Attempting connection to pentagon.mil...\n\n[BLOCKED] Yeah... no.\nWe don\'t do that here. This is a legal-only zone.\n\n🎖️ Ethical hacking means: permission first, always.',
    isEasterEgg: true,
  },
  exit: {
    text: 'Logout from what? You\'re reading a portfolio.\nBut I respect the instinct. Old habits die hard.\n\nTry: help, about, skills, or just vibe here.',
    isEasterEgg: true,
  },
  neofetch: {
    text: `       ╔══════════════════╗
       ║  RAFIF-ALTON OS  ║
       ╚══════════════════╝
  OS:       ChooseLens v1.0
  Host:     Browser Sandbox
  Kernel:   React 18.3.1
  Shell:    SimulatedBash 1.0
  Theme:    Cybersec [Dark]
  Terminal: InteractiveTerminal.jsx
  CPU:      Your Device @ ??? GHz
  Memory:   Enough to run this
  Uptime:   Since you opened this tab`,
    isEasterEgg: true,
  },
  hello: {
    text: 'Hey there! 👋\nWelcome to my terminal. Type "help" to see what you can do.\nOr try something unexpected... you might find an easter egg.',
    isEasterEgg: true,
  },
  hi: {
    text: 'Hey! 👋 Nice of you to say hi.\nFeel free to explore. Type "help" for commands or try something creative.',
    isEasterEgg: true,
  },
  'ping google.com': {
    text: 'PING google.com (142.250.xx.xx): 56 data bytes\n64 bytes: icmp_seq=0 ttl=118 time=12.4ms\n64 bytes: icmp_seq=1 ttl=118 time=11.8ms\n64 bytes: icmp_seq=2 ttl=118 time=13.1ms\n\n--- Simulated. This terminal has no network access.\nBut at least the latency looks realistic. 🤷',
    isEasterEgg: true,
  },
  cowsay: {
    text: ' ________________________\n< Security is a mindset >\n ------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||',
    isEasterEgg: true,
  },
  'apt-get install girlfriend': {
    text: 'E: Unable to locate package "girlfriend"\nE: Try: apt-get install social-skills first\n\n...I\'m kidding. You\'re doing great. 💪',
    isEasterEgg: true,
  },
  uptime: {
    text: `up ${Math.floor(Math.random() * 365)} days, ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}, 1 user, load average: 0.42, 0.38, 0.29\n\n(Simulated. Real uptime: however long you've had this tab open.)`,
    isEasterEgg: true,
  },
  date: {
    text: new Date().toString() + '\n\n(This one is actually real.)',
    isEasterEgg: true,
  },
  pwd: {
    text: '/home/rafif-alton/portfolio/cybersec-lens/terminal',
    isEasterEgg: true,
  },
  'rm -rf /': {
    text: 'rm: cannot remove "/": Permission denied\n\nYou need sudo for that kind of chaos.\n(...not that it would work here anyway.)',
    isEasterEgg: true,
  },
  vim: {
    text: '> Opening vim...\n> ...\n> How do I exit this thing?\n> :q!\n\n(Classic. Even simulated vim is inescapable.)',
    isEasterEgg: true,
  },
  'git push --force': {
    text: '⚠️  WARNING: Force pushing to main detected!\n\n[REJECTED] This is a portfolio, not your repo.\nAlso, please never do this at work.\n\n📝 Note: Use --force-with-lease if you must.',
    isEasterEgg: true,
  },
  secret: {
    text: '🔐 You found a secret!\n\nHere\'s one: this entire portfolio was designed\nwith the philosophy that identity is multidimensional.\nEvery lens shows a different truth about the same person.\n\nNow try: matrix, cowsay, or neofetch',
    isEasterEgg: true,
  },
}

function buildOutput(command, content) {
  const trimmed = command.trim()
  const lower = trimmed.toLowerCase()

  // Check easter eggs first (case-insensitive match)
  const easterEggKey = Object.keys(easterEggs).find(
    (key) => key.toLowerCase() === lower
  )
  if (easterEggKey) {
    const egg = easterEggs[easterEggKey]
    return { clear: false, text: egg.text, special: egg.special, isEasterEgg: true }
  }

  const [base, arg] = trimmed.split(/\s+/, 2)

  const outputs = {
    help: [
      'Available commands:',
      '─────────────────────────────────',
      '  help        Show this help message',
      '  about       About me',
      '  skills      Technical skills',
      '  projects    Project list',
      '  contact     Contact info',
      '  whoami      Who am I?',
      '  ls          List files',
      '  cat [file]  Read a file',
      '  clear       Clear terminal',
      '',
      '💡 Hint: Try some unexpected commands...',
      '   There might be easter eggs hidden here.',
    ].join('\n'),
    about: content.about.paragraphs.join('\n\n'),
    skills: content.skills.map((item) => `${item.label.padEnd(24, ' ')} ${item.percent}%`).join('\n'),
    projects: content.projects.map((project) => `${project.target} :: ${project.status}`).join('\n'),
    contact: content.contact.actions.map((action) => `${action.label} -> ${action.href}`).join('\n'),
    whoami: 'Rafif Alton / security-focused draft persona / evidence-first by design',
    ls: Object.keys(content.terminalFiles).join('\n'),
  }

  if (base === 'clear') return { clear: true, text: '' }
  if (base === 'cat') {
    const file = content.terminalFiles[arg]
    return { clear: false, text: file ?? terminalCommandNotFound(command) }
  }

  return { clear: false, text: outputs[base] ?? terminalCommandNotFound(command) }
}

// Matrix rain effect component
function MatrixRain({ onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')

    canvas.width = canvas.parentElement.clientWidth
    canvas.height = 200

    const columns = Math.floor(canvas.width / 14)
    const drops = Array(columns).fill(1)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

    let frame
    let frameCount = 0
    const maxFrames = 120

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 8, 12, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00FF41'
      ctx.font = '12px JetBrains Mono, monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * 14, drops[i] * 14)

        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      frameCount++
      if (frameCount >= maxFrames) {
        window.cancelAnimationFrame(frame)
        if (onComplete) onComplete()
        return
      }

      frame = window.requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [onComplete])

  return <canvas className="w-full rounded-sm" ref={canvasRef} />
}

function InteractiveTerminal({ content }) {
  const [isMobile, setIsMobile] = useState(false)
  const [input, setInput] = useState('')
  const [showMatrix, setShowMatrix] = useState(false)
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [history, setHistory] = useState([
    {
      command: 'help',
      output: [
        'Available commands:',
        '─────────────────────────────────',
        '  help        Show this help message',
        '  about       About me',
        '  skills      Technical skills',
        '  projects    Project list',
        '  contact     Contact info',
        '  whoami      Who am I?',
        '  ls          List files',
        '  cat [file]  Read a file',
        '  clear       Clear terminal',
        '',
        '💡 Hint: Try some unexpected commands...',
        '   There might be easter eggs hidden here.',
      ].join('\n'),
      isEasterEgg: false,
    },
  ])
  const viewportRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight })
  }, [history, showMatrix])

  const fallbackLines = useMemo(
    () => [
      '$ help',
      'help, about, skills, projects, contact, whoami, ls, cat [file]',
      '$ ls',
      Object.keys(content.terminalFiles).join(', '),
      '$ cat readme.txt',
      content.terminalFiles['readme.txt'],
      '',
      '💡 Desktop mode unlocks the interactive terminal with easter eggs!',
    ],
    [content.terminalFiles],
  )

  const handleKeyDown = (event) => {
    // Arrow up/down for command history navigation
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (commandHistory.length === 0) return
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setInput('')
        return
      }
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const command = input.trim()
    if (!command) return

    // Add to command history
    setCommandHistory((prev) => [...prev, command])
    setHistoryIndex(-1)

    const result = buildOutput(command, content)

    if (result.clear) {
      setHistory([])
      setInput('')
      setShowMatrix(false)
      return
    }

    // Handle special effects
    if (result.special === 'matrix') {
      setHistory((current) => [
        ...current,
        { command, output: '🟢 Initiating Matrix rain sequence...', isEasterEgg: true },
      ])
      setShowMatrix(true)
      setInput('')
      return
    }

    setHistory((current) => [
      ...current,
      { command, output: result.text, isEasterEgg: result.isEasterEgg || false },
    ])
    setInput('')
  }

  if (isMobile) {
    return (
      <div className="section-frame rounded-sm p-5 font-mono text-sm">
        <p className="mb-4 text-accent">Mobile fallback mode</p>
        <div className="space-y-3 text-muted">
          {fallbackLines.map((line, i) => (
            <div key={`${line}-${i}`}>{line}</div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="section-frame rounded-sm p-4 font-mono text-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-accent">interactive-terminal@draft:~</span>
        <span className="text-xs text-muted">
          {commandHistory.length} cmds | try something unexpected
        </span>
      </div>
      <div
        className="max-h-[380px] overflow-y-auto rounded-sm border border-border bg-[#05080c] p-4"
        onClick={() => inputRef.current?.focus()}
        ref={viewportRef}
      >
        {history.map((entry, index) => (
          <div className="mb-4 space-y-2" key={`${entry.command}-${index}`}>
            <div className="text-accent">$ {entry.command}</div>
            <pre
              className={`whitespace-pre-wrap ${
                entry.isEasterEgg ? 'text-[#FFB700]' : 'text-muted'
              }`}
            >
              {entry.output}
            </pre>
          </div>
        ))}

        {showMatrix && (
          <div className="mb-4">
            <MatrixRain onComplete={() => setShowMatrix(false)} />
            <pre className="mt-2 whitespace-pre-wrap text-[#00FF41]">
              Wake up, Neo... The Matrix has you.
            </pre>
          </div>
        )}
      </div>
      <form className="mt-4 flex gap-3" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="terminal-input">
          Terminal input
        </label>
        <span className="pt-3 text-accent">$</span>
        <input
          aria-label="Interactive terminal input"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-sm border border-border bg-transparent px-3 py-2 text-text focus:border-[#00FF41]/50 focus:outline-none"
          id="terminal-input"
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command... (try something unexpected)"
          ref={inputRef}
          spellCheck="false"
          value={input}
        />
      </form>
    </div>
  )
}

export default InteractiveTerminal
