import { useEffect, useRef, useState } from 'react'
import { apiFetch, buildSalaireParMetierPath } from '../api/client'
import type { IndicateurSalaire } from '../types'

const CLE_STOCKAGE = 'atlas-salaires-disponibles'

function lireCache(): Record<string, boolean> {
  try {
    const brut = window.localStorage.getItem(CLE_STOCKAGE)
    return brut ? (JSON.parse(brut) as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

function ecrireCache(valeurs: Record<string, boolean>) {
  try {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(valeurs))
  } catch {
    // Stockage plein ou indisponible (navigation privée...) : tant pis, le
    // cache reste juste en mémoire pour cette session.
  }
}

// Un métier ROME "a un salaire disponible" si l'API "Marché du travail"
// renvoie au moins une ligne avec des montants pour la famille professionnelle
// associée. Beaucoup de métiers n'ont aucune correspondance côté France
// Travail : plutôt que de bloquer sur une erreur, on considère juste qu'ils
// n'ont pas de salaire disponible.
async function aUnSalaireDisponible(codeRome: string): Promise<boolean> {
  try {
    const donnees = await apiFetch<IndicateurSalaire>(buildSalaireParMetierPath(codeRome))
    return (donnees.valeursParPeriode ?? []).some(
      (ligne) => (ligne.salaireValeurMontant?.length ?? 0) > 0,
    )
  } catch {
    return false
  }
}

/**
 * Vérifie, une seule fois par code ROME (résultat mis en cache dans le
 * navigateur, persistant entre les sessions), si un salaire est disponible
 * via l'API "Marché du travail". Démarre automatiquement dès que la liste
 * de codes est connue (pas besoin d'action de l'utilisateur) et tourne en
 * tâche de fond : un code déjà vérifié — même lors d'une visite précédente —
 * n'est jamais revérifié.
 */
export function useSalairesDisponibles(codes: string[]) {
  const [salaires, setSalaires] = useState<Record<string, boolean>>(() => lireCache())
  const [progression, setProgression] = useState<{ fait: number; total: number } | null>(null)
  const enCours = useRef(false)

  useEffect(() => {
    if (codes.length === 0 || enCours.current) return

    const aVerifier = codes.filter((code) => !(code in salaires))
    if (aVerifier.length === 0) return

    let annule = false
    enCours.current = true
    setProgression({ fait: 0, total: aVerifier.length })

    ;(async () => {
      let resultatsCourants = salaires
      for (let i = 0; i < aVerifier.length; i++) {
        if (annule) return
        const code = aVerifier[i]
        const disponible = await aUnSalaireDisponible(code)
        if (annule) return
        resultatsCourants = { ...resultatsCourants, [code]: disponible }
        setSalaires(resultatsCourants)
        ecrireCache(resultatsCourants)
        setProgression({ fait: i + 1, total: aVerifier.length })
      }
      setProgression(null)
    })().finally(() => {
      enCours.current = false
    })

    return () => {
      annule = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codes])

  return { salaires, progression }
}
