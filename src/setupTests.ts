// Import "/vitest" (et non le import nu "@testing-library/jest-dom") pour
// que les types des matchers (toBeInTheDocument, etc.) s'appliquent bien
// au `expect` de Vitest et pas seulement à celui de Jest — sinon tsc -b
// (utilisé par `npm run build`) rejette les fichiers de test.
import '@testing-library/jest-dom/vitest'
