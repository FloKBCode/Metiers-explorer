import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MetierListItem } from './MetierListItem';
import type { FicheMetier } from '../types';

const ficheExemple: FicheMetier = {
  code: 'M1805',
  metier: { libelle: 'Études et développement informatique' },
} as FicheMetier;

describe('MetierListItem', () => {
  it('affiche le libellé du métier', () => {
    render(
      <MetierListItem
        fiche={ficheExemple}
        estFavori={false}
        onVoirFiche={vi.fn()}
        onToggleFavori={vi.fn()}
      />
    );
    expect(screen.getByText('Études et développement informatique')).toBeInTheDocument();
  });

  it('appelle onVoirFiche avec le bon code au clic sur "Voir la fiche"', () => {
    const handleVoirFiche = vi.fn();
    render(
      <MetierListItem
        fiche={ficheExemple}
        estFavori={false}
        onVoirFiche={handleVoirFiche}
        onToggleFavori={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText(/voir la fiche/i));
    expect(handleVoirFiche).toHaveBeenCalledWith('M1805');
  });

  it('appelle onToggleFavori avec le bon code au clic sur le bouton favori', () => {
    const handleToggleFavori = vi.fn();
    render(
      <MetierListItem
        fiche={ficheExemple}
        estFavori={false}
        onVoirFiche={vi.fn()}
        onToggleFavori={handleToggleFavori}
      />
    );
    fireEvent.click(screen.getByText(/ajouter aux favoris/i));
    expect(handleToggleFavori).toHaveBeenCalledWith('M1805');
  });

  it('affiche un état visuel différent selon estFavori (comportement conditionnel)', () => {
    const { rerender } = render(
      <MetierListItem
        fiche={ficheExemple}
        estFavori={false}
        onVoirFiche={vi.fn()}
        onToggleFavori={vi.fn()}
      />
    );
    expect(screen.getByText(/☆ Ajouter aux favoris/)).toBeInTheDocument();

    rerender(
      <MetierListItem
        fiche={ficheExemple}
        estFavori={true}
        onVoirFiche={vi.fn()}
        onToggleFavori={vi.fn()}
      />
    );
    expect(screen.getByText(/★ Favori/)).toBeInTheDocument();
  });
});