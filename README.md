# Métiers Explorer

Application web permettant d'explorer des fiches métiers détaillées et de comparer plusieurs métiers entre eux, à partir des données ouvertes de l'API ROME 4.0 (France Travail).

Projet réalisé dans le cadre du Bachelor 2 — React.js & TypeScript (formateur : PREVOST Nathan).

Équipe : **Florence, Sarah, Marly, Mina, Miriam**

## Stack technique

- Vite + React + TypeScript
- React Router v6
- Context API + useReducer (état global)
- Vitest + Testing Library (tests)
- API France Travail (ROME 4.0)

## Installation (à faire par chaque membre de l'équipe)

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/FloKBCode/Metiers-explorer.git
   cd Metiers-explorer
   ```

2. Installer Node.js (version 18 ou supérieure) si ce n'est pas déjà fait : https://nodejs.org

3. Installer les dépendances du projet :
   ```bash
   npm install
   ```

4. Créer un fichier `.env` à la racine à partir de `.env.example` :
   ```bash
   cp .env.example .env
   ```
   Puis demander à Florence les identifiants API (`VITE_FT_CLIENT_ID` et `VITE_FT_CLIENT_SECRET`) et les coller dans `.env`.

   ⚠️ Ce fichier `.env` ne doit jamais être commité (il est exclu via `.gitignore`).

5. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
   L'application est accessible sur http://localhost:5173

6. Lancer les tests :
   ```bash
   npm run test
   ```

7. Build de production :
   ```bash
   npm run build
   ```

Voir aussi [BRANCHING.md](./BRANCHING.md) pour la méthode de travail avec Git, et [PLANNING.md](./PLANNING.md) pour l'organisation dans le temps.

## Application déployée

🔗 [URL à compléter après déploiement]

## Répartition du travail

| Domaine | Membre | Détail |
|---|---|---|
| API & état global | Florence | Intégration API France Travail (auth OAuth2, hook `useFetch<T>`), gestion des 3 états (chargement/erreur/succès), Context + useReducer (favoris) |
| Performance & tests | Sarah | Profiler, memo/useMemo/useCallback, 4 tests Vitest/Testing Library dont un comportement conditionnel |
| Composants liste & fiche détail | Marly | Page `/metiers` (liste, recherche, filtres) et `/metiers/:codeRome` (fiche détail), composants réutilisables |
| Formulaire & comparateur | Mina | Formulaire contrôlé avec validation, page comparateur de métiers |
| Routing, layout & déploiement | Miriam | React Router v6 (routes, page 404, Outlet), déploiement, README |

*(Ajustez les noms si la répartition change — gardez toujours une correspondance claire domaine ↔ personne pour l'oral.)*

## Structure du projet

```
src/
  components/     # composants réutilisables
  pages/          # pages / routes
  hooks/          # hooks personnalisés
  context/        # état global (Context + reducer)
  types/          # interfaces et types TypeScript
  api/            # appels à l'API France Travail
```
