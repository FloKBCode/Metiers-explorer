import { useTheme } from '../hooks/useTheme'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <line x1="12" y1="2.5" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="21.5" />
      <line x1="2.5" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="21.5" y2="12" />
      <line x1="5.1" y1="5.1" x2="6.9" y2="6.9" />
      <line x1="17.1" y1="17.1" x2="18.9" y2="18.9" />
      <line x1="5.1" y1="18.9" x2="6.9" y2="17.1" />
      <line x1="17.1" y1="6.9" x2="18.9" y2="5.1" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.4 14.7A8.3 8.3 0 1 1 9.3 3.6a6.7 6.7 0 0 0 11.1 11.1Z" />
    </svg>
  )
}

/** Sélecteur de thème clair/sombre — soleil et lune côte à côte dans la nav. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-toggle" role="group" aria-label="Thème de l'application">
      <button
        type="button"
        className={theme === 'light' ? 'is-active' : undefined}
        aria-pressed={theme === 'light'}
        aria-label="Thème clair"
        onClick={() => setTheme('light')}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        className={theme === 'dark' ? 'is-active' : undefined}
        aria-pressed={theme === 'dark'}
        aria-label="Thème sombre"
        onClick={() => setTheme('dark')}
      >
        <MoonIcon />
      </button>
    </div>
  )
}
