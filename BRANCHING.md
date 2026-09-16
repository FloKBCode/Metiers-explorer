# Méthode de travail avec Git

À 5 sur le même repo, la règle numéro un est : **personne ne travaille directement sur `main`**. Voici comment on s'organise.

## Les branches

- **`main`** : toujours stable, toujours fonctionnelle. C'est ce qui est déployé. On n'y pousse jamais directement.
- **`develop`** : branche d'intégration. C'est là que toutes les fonctionnalités se retrouvent avant de partir sur `main`.
- **`feature/xxx`** : une branche par tâche, créée à partir de `develop`. Exemples, en lien avec la répartition du README :
  - `feature/api-auth` (Florence)
  - `feature/tests-perf` (Sarah)
  - `feature/liste-fiche-metier` (Marly)
  - `feature/formulaire-comparateur` (Mina)
  - `feature/routing-layout` (Miriam)

## Le workflow, étape par étape

1. **Avant de commencer une tâche**, se placer sur `develop` et récupérer les derniers changements :
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Créer sa branche** à partir de `develop` :
   ```bash
   git checkout -b feature/ma-tache
   ```

3. **Travailler et committer régulièrement**, par petits commits clairs (pas un seul énorme commit en fin de semaine) :
   ```bash
   git add .
   git commit -m "feat: ajoute le hook useFetch avec gestion des 3 états"
   ```

4. **Pousser sa branche** régulièrement (au moins une fois par jour de travail) :
   ```bash
   git push origin feature/ma-tache
   ```

5. **Avant d'ouvrir une Pull Request**, remettre sa branche à jour avec `develop` pour repérer les conflits soi-même, sur sa machine, plutôt que sur GitHub :
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/ma-tache
   git merge develop
   ```
   S'il y a des conflits, les résoudre maintenant, tester que tout fonctionne encore, puis commit + push.

6. **Ouvrir une Pull Request** sur GitHub : `feature/ma-tache` → `develop`. Demander à **une autre personne du groupe** de relire avant de merger (même rapidement — ça évite les régressions).

7. **Une fois `develop` stable et testé**, une Pull Request `develop` → `main` est faite à plusieurs (par exemple juste avant une démo ou un rendu).

## Pourquoi ça évite les conflits

- Chacun travaille sur son propre fichier/dossier autant que possible (voir la répartition par domaine dans le README) → moins de fichiers touchés par plusieurs personnes à la fois.
- Le merge de `develop` dans sa branche **avant** la Pull Request permet de résoudre les conflits seul, tranquillement, plutôt qu'en dernière minute avec quelqu'un qui attend.
- Des commits petits et fréquents sont beaucoup plus faciles à fusionner qu'un gros commit final qui touche 20 fichiers.

## Règles de nommage des commits (convention simple)

- `feat: ...` → nouvelle fonctionnalité
- `fix: ...` → correction de bug
- `style: ...` → mise en forme, CSS, pas de changement de logique
- `refactor: ...` → réécriture sans changer le comportement
- `test: ...` → ajout/modification de tests
- `docs: ...` → documentation (README, commentaires)

## En cas de conflit de merge

1. Ne pas paniquer, ne pas tout écraser au hasard.
2. `git status` pour voir les fichiers en conflit.
3. Ouvrir chaque fichier, chercher les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`.
4. Décider ensemble (message rapide au groupe) quelle version garder, ou fusionner les deux.
5. Une fois résolu : `git add <fichier>` puis `git commit` pour clore le merge.
6. Si un conflit est trop confus : demander de l'aide plutôt que de forcer un `git push --force` (à éviter absolument sur une branche partagée).

## Ce qu'il ne faut jamais faire

- `git push --force` sur `develop` ou `main`.
- Travailler plusieurs jours sans push ni pull (le décalage avec `develop` devient trop grand, les conflits explosent).
- Commiter le fichier `.env` ou tout fichier contenant des identifiants API.
