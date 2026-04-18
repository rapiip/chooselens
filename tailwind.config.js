/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg-primary)',
        surface: 'var(--color-bg-surface)',
        card: 'var(--color-bg-card)',
        accent: 'var(--color-accent-primary)',
        accent2: 'var(--color-accent-secondary)',
        accent3: 'var(--color-accent-tertiary)',
        text: 'var(--color-text-primary)',
        muted: 'var(--color-text-secondary)',
        subtle: 'var(--color-text-tertiary)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
        accent: 'var(--font-accent)',
      },
      borderRadius: {
        lens: 'var(--radius-lens)',
      },
      boxShadow: {
        glow: '0 0 30px color-mix(in srgb, var(--color-accent-primary) 24%, transparent)',
        soft: '0 20px 40px rgba(17, 17, 17, 0.08)',
      },
      transitionTimingFunction: {
        lens: 'var(--transition-easing)',
      },
      maxWidth: {
        wide: '1400px',
      },
    },
  },
  plugins: [],
}
