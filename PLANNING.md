# Planning — Métiers Explorer (sprint compact, ~14h sur 8 jours)

Soutenance : **jeudi 24/09**. Total dispo réel : 4h aujourd'hui + sessions courtes (1-2h) le soir et le week-end. Peu de marge → un objectif unique par session, pas de temps mort.

**Avec l'IA (Claude/Copilot) en soutien** : laissez-la générer le boilerplate (types, composants de base, tests), débugger plus vite, écrire les premiers jets de code. Le temps humain doit aller sur l'intégration et la compréhension, pas sur la frappe.

## Priorités (à garder même sous pression de temps)
- 3 états chargement/erreur/succès + démo d'erreur réseau en direct
- Routage complet (4 routes, route param, nav prog, Outlet, 404)
- Formulaire validé
- Déploiement HTTPS fonctionnel

## À réduire en premier si ça manque
- Perf (1-2 optimisations ciblées suffisent)
- Tests (viser le minimum : 4)
- Comparateur : version simple (2 métiers côte à côte) plutôt qu'élaborée

## Planning

| Jour | Durée | Objectif unique |
|---|---|---|
| **Mer 16 (auj.)** | 4h | Setup pour tous + **Florence** : API token OK (bloquant) + **Miriam** : routing squelette + types TS définis ensemble. Répartir précisément le reste. |
| **Jeu 17 soir** | 1-2h | Chacun avance sa feature en solo, avec l'IA (Florence: hook useFetch ; Marly: liste ; Mina: formulaire ; Miriam: page détail). Push en fin de session, même incomplet. |
| **Ven 18 soir** | 1-2h | Suite + premier merge sur `develop`. Résoudre les conflits tout de suite, pas d'attente. |
| **Sam 19** | 1-2h | Intégration liste → détail → favoris. **Miriam** lance le déploiement dès que possible. |
| **Dim 20** | 1-2h | Comparateur (Mina) + 3 états partout (Florence) + merge final du week-end. Test de l'app déployée par tout le monde. |
| **Lun 21 soir** | 1-2h | Corrections des bugs trouvés sur l'app déployée. Sarah : les 4 tests minimum si pas encore fait. |
| **Mar 22 soir** | 1-2h | Vérifs techniques : `tsc --noEmit` sans `any`, `npm run build` OK. Début support de présentation. |
| **Mer 23 soir** | 1-2h | Répétition orale chronométrée (10 min + questions), checklist finale, partage de connexion de secours prêt. |
| **Jeu 24** | — | Soutenance. Démo depuis l'URL déployée, jamais en local. |

## Règle unique à tenir

Push et merge à chaque session, même code imparfait. Sur ce volume d'heures, un blocage de plus de 15 min non signalé au groupe peut coûter une session entière — le dire tout de suite plutôt que de chercher seul.
