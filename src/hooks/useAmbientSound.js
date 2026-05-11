import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'chooselens-sound-muted'

function getSavedMuteState() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return true // Default muted
  }
}

function saveMuteState(muted) {
  try {
    localStorage.setItem(STORAGE_KEY, String(muted))
  } catch {
    // localStorage unavailable
  }
}

/**
 * Web Audio API-based ambient sound generator.
 * No external audio files needed — generates ambient tones procedurally.
 *
 * Each lens gets a unique audio profile:
 * - web3: Low electronic hum with subtle modulation
 * - cybersecurity: Soft static noise with digital beeps
 * - life: Warm lo-fi filtered noise with gentle tones
 */
export function useAmbientSound(lens) {
  const [muted, setMuted] = useState(getSavedMuteState)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef(null)
  const nodesRef = useRef([])
  const gainRef = useRef(null)
  const startedRef = useRef(false)

  // Create the audio context and nodes for the current lens
  const createAudioGraph = useCallback(() => {
    if (!lens) return null

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return null

    const ctx = new AudioContext()
    const masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)

    const nodes = []

    if (lens === 'web3') {
      // Electronic ambient: low oscillator + LFO modulation + filtered noise
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.value = 55 // Low A

      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.value = 82.5 // Low E

      const lfo = ctx.createOscillator()
      lfo.type = 'sine'
      lfo.frequency.value = 0.15

      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 3

      lfo.connect(lfoGain)
      lfoGain.connect(osc1.frequency)

      const oscGain1 = ctx.createGain()
      oscGain1.gain.value = 0.06
      osc1.connect(oscGain1)
      oscGain1.connect(masterGain)

      const oscGain2 = ctx.createGain()
      oscGain2.gain.value = 0.03
      osc2.connect(oscGain2)
      oscGain2.connect(masterGain)

      // Subtle noise layer
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015
      }
      const noise = ctx.createBufferSource()
      noise.buffer = noiseBuffer
      noise.loop = true

      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'lowpass'
      noiseFilter.frequency.value = 200

      noise.connect(noiseFilter)
      noiseFilter.connect(masterGain)

      osc1.start()
      osc2.start()
      lfo.start()
      noise.start()
      nodes.push(osc1, osc2, lfo, noise)
    } else if (lens === 'cybersecurity') {
      // Digital static: filtered noise + intermittent beeps
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.02
      }
      const noise = ctx.createBufferSource()
      noise.buffer = noiseBuffer
      noise.loop = true

      const bandpass = ctx.createBiquadFilter()
      bandpass.type = 'bandpass'
      bandpass.frequency.value = 2000
      bandpass.Q.value = 0.5

      const noiseGain = ctx.createGain()
      noiseGain.gain.value = 0.4

      noise.connect(bandpass)
      bandpass.connect(noiseGain)
      noiseGain.connect(masterGain)
      noise.start()
      nodes.push(noise)

      // Periodic subtle beep
      const scheduleBeep = () => {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') return

        const beepOsc = ctx.createOscillator()
        beepOsc.type = 'square'
        beepOsc.frequency.value = 800 + Math.random() * 400

        const beepGain = ctx.createGain()
        beepGain.gain.value = 0

        const now = ctx.currentTime
        beepGain.gain.setValueAtTime(0, now)
        beepGain.gain.linearRampToValueAtTime(0.03, now + 0.01)
        beepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

        beepOsc.connect(beepGain)
        beepGain.connect(masterGain)
        beepOsc.start(now)
        beepOsc.stop(now + 0.1)

        // Schedule next beep randomly (3-8 seconds)
        const nextDelay = 3000 + Math.random() * 5000
        const timeoutId = setTimeout(scheduleBeep, nextDelay)
        nodesRef.current.push({ stop: () => clearTimeout(timeoutId) })
      }

      // Start first beep after a short delay
      const initialTimeout = setTimeout(scheduleBeep, 2000)
      nodes.push({ stop: () => clearTimeout(initialTimeout) })
    } else if (lens === 'life') {
      // Warm lo-fi: filtered pink noise + gentle sine tones
      const bufferSize = ctx.sampleRate * 3
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)

      // Generate pink-ish noise (brown noise approximation)
      let last = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        last = (last + 0.02 * white) / 1.02
        data[i] = last * 3.5 * 0.04
      }

      const noise = ctx.createBufferSource()
      noise.buffer = noiseBuffer
      noise.loop = true

      const lowpass = ctx.createBiquadFilter()
      lowpass.type = 'lowpass'
      lowpass.frequency.value = 400

      const noiseGain = ctx.createGain()
      noiseGain.gain.value = 0.6

      noise.connect(lowpass)
      lowpass.connect(noiseGain)
      noiseGain.connect(masterGain)
      noise.start()
      nodes.push(noise)

      // Gentle harmonic tones
      const freqs = [261.63, 329.63, 392] // C4, E4, G4 — C major
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq

        const oscGain = ctx.createGain()
        oscGain.gain.value = 0.012 - i * 0.002

        // Slow tremolo
        const tremolo = ctx.createOscillator()
        tremolo.type = 'sine'
        tremolo.frequency.value = 0.1 + i * 0.05

        const tremoloGain = ctx.createGain()
        tremoloGain.gain.value = 0.005

        tremolo.connect(tremoloGain)
        tremoloGain.connect(oscGain.gain)

        osc.connect(oscGain)
        oscGain.connect(masterGain)

        osc.start()
        tremolo.start()
        nodes.push(osc, tremolo)
      })
    }

    return { ctx, masterGain, nodes }
  }, [lens])

  // Start or resume audio
  const play = useCallback(() => {
    if (startedRef.current && audioContextRef.current) {
      // Resume existing context
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
      if (gainRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(
          1,
          audioContextRef.current.currentTime + 0.5
        )
      }
      setIsPlaying(true)
      return
    }

    const graph = createAudioGraph()
    if (!graph) return

    audioContextRef.current = graph.ctx
    gainRef.current = graph.masterGain
    nodesRef.current = graph.nodes
    startedRef.current = true

    // Fade in
    graph.masterGain.gain.linearRampToValueAtTime(1, graph.ctx.currentTime + 1)
    setIsPlaying(true)
  }, [createAudioGraph])

  // Pause audio (fade out)
  const pause = useCallback(() => {
    if (audioContextRef.current && gainRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current.currentTime + 0.3
      )
      setTimeout(() => {
        if (audioContextRef.current && audioContextRef.current.state === 'running') {
          audioContextRef.current.suspend()
        }
      }, 350)
    }
    setIsPlaying(false)
  }, [])

  // Toggle mute
  const toggle = useCallback(() => {
    const newMuted = !muted
    setMuted(newMuted)
    saveMuteState(newMuted)

    if (newMuted) {
      pause()
    } else {
      play()
    }
  }, [muted, play, pause])

  // Auto-play if not muted on mount
  useEffect(() => {
    if (!muted && lens) {
      // Audio context requires user interaction first
      const handleInteraction = () => {
        play()
        window.removeEventListener('click', handleInteraction)
        window.removeEventListener('keydown', handleInteraction)
        window.removeEventListener('touchstart', handleInteraction)
      }

      window.addEventListener('click', handleInteraction, { once: true })
      window.addEventListener('keydown', handleInteraction, { once: true })
      window.addEventListener('touchstart', handleInteraction, { once: true })

      return () => {
        window.removeEventListener('click', handleInteraction)
        window.removeEventListener('keydown', handleInteraction)
        window.removeEventListener('touchstart', handleInteraction)
      }
    }
    return undefined
  }, [muted, lens, play])

  // Cleanup on unmount or lens change
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        nodesRef.current.forEach((node) => {
          try {
            if (node.stop) node.stop()
          } catch {
            // Already stopped
          }
        })
        audioContextRef.current.close()
        audioContextRef.current = null
        gainRef.current = null
        nodesRef.current = []
        startedRef.current = false
        setIsPlaying(false)
      }
    }
  }, [lens])

  return { muted, isPlaying, toggle }
}
