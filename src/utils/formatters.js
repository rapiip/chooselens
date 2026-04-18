export function formatLensLabel(lens) {
  if (lens === 'web3') return 'Web3 Lens'
  if (lens === 'cybersecurity') return 'Cybersecurity Lens'
  if (lens === 'life') return 'Kehidupan Saya Lens'
  return 'Choose Your Lens'
}

export function terminalCommandNotFound(command) {
  return `bash: ${command}: command not found`
}

export function toAnchorLabel(id) {
  return id.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}
