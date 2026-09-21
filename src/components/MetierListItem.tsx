import { memo } from 'react'
import type { FicheMetier } from '../types'

interface MetierListItemProps {
  fiche: FicheMetier
  estFavori: boolean
  onVoirFiche: (codeRome: string) => void
  onToggleFavori: (codeRome: string) => void
}

export const MetierListItem = memo(function MetierListItem({
  fiche,
  estFavori,
  onVoirFiche,
  onToggleFavori,
}: MetierListItemProps) {
  return (
    <li>
      <span>{fiche.metier.libelle}</span>
      <button type="button" onClick={() => onVoirFiche(fiche.code)}>
        Voir la fiche
      </button>
      <button
        type="button"
        onClick={() => onToggleFavori(fiche.code)}
        aria-pressed={estFavori}
      >
        {estFavori ? '★ Favori' : '☆ Ajouter aux favoris'}
      </button>
    </li>
  )
})