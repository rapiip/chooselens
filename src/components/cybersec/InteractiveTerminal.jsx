import { useEffect, useMemo, useRef, useState } from 'react'
import { terminalCommandNotFound } from '../../utils/formatters'

function buildOutput(command, content) {
  const [base, arg] = command.trim().split(/\s+/, 2)

  const outputs = {
    help: ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'whoami', 'ls', 'cat [file]'].join('\n'),
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

function InteractiveTerminal({ content }) {
  const [isMobile, setIsMobile] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    {
      command: 'help',
      output: 'help\nabout\nskills\nprojects\ncontact\nclear\nwhoami\nls\ncat [file]',
    },
  ])
  const viewportRef = useRef(null)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight })
  }, [history])

  const fallbackLines = useMemo(
    () => [
      '$ help',
      'help, about, skills, projects, contact, whoami, ls, cat [file]',
      '$ ls',
      Object.keys(content.terminalFiles).join(', '),
      '$ cat readme.txt',
      content.terminalFiles['readme.txt'],
    ],
    [content.terminalFiles],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const command = input.trim()
    if (!command) return

    const result = buildOutput(command, content)
    if (result.clear) {
      setHistory([])
      setInput('')
      return
    }

    setHistory((current) => [...current, { command, output: result.text }])
    setInput('')
  }

  if (isMobile) {
    return (
      <div className="section-frame rounded-sm p-5 font-mono text-sm">
        <p className="mb-4 text-accent">Mobile fallback mode</p>
        <div className="space-y-3 text-muted">
          {fallbackLines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="section-frame rounded-sm p-4 font-mono text-sm">
      <div className="mb-3 text-accent">interactive-terminal@draft:~</div>
      <div className="max-h-[320px] overflow-y-auto rounded-sm border border-border bg-[#05080c] p-4" ref={viewportRef}>
        {history.map((entry, index) => (
          <div className="mb-4 space-y-2" key={`${entry.command}-${index}`}>
            <div className="text-accent">$ {entry.command}</div>
            <pre className="whitespace-pre-wrap text-muted">{entry.output}</pre>
          </div>
        ))}
      </div>
      <form className="mt-4 flex gap-3" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="terminal-input">
          Terminal input
        </label>
        <span className="pt-3 text-accent">$</span>
        <input
          aria-label="Interactive terminal input"
          className="min-w-0 flex-1 rounded-sm border border-border bg-transparent px-3 py-2 text-text"
          id="terminal-input"
          onChange={(event) => setInput(event.target.value)}
          placeholder="type a command..."
          value={input}
        />
      </form>
    </div>
  )
}

export default InteractiveTerminal
