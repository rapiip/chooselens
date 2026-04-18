export function applyTheme(themeObject) {
  const root = document.documentElement

  Object.entries(themeObject).forEach(([token, value]) => {
    root.style.setProperty(token, value)
  })

  const textColor = themeObject['--color-text-primary']
  const bgColor = themeObject['--color-bg-primary']
  const isLight = bgColor && ['#FAFAF7', '#F2F1ED', '#FFFFFF'].includes(bgColor.toUpperCase())

  root.style.color = textColor ?? ''
  root.style.backgroundColor = bgColor ?? ''
  root.style.colorScheme = isLight ? 'light' : 'dark'
}
