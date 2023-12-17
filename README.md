# Application Todo - Architecture Propre

Il s'agit d'une application Todo simple développée avec TypeScript et Express, suivant les principes de l'architecture propre.

## Structure du Projet

- `src/` : C'est l'endroit où tout le code source réside.
- `adapters/` : Contient la classe `JsonStorageAdapter` qui est responsable de la lecture et de l'écriture des tâches dans un fichier JSON.
- `entities/` : Contient l'entité `Task`.
- `interfaces/` : Contient le code frontend de l'application.
- `app.js` : Contient les fonctions de création, mise à jour, suppression, récupération et affichage des tâches.
- `index.html` : La structure HTML de l'application.
- `styles.css` : Les styles CSS de l'application.
- `useCases/` : Contient les cas d'utilisation pour la création, la mise à jour, la suppression et la récupération des tâches.
- `package.json` : Contient les métadonnées du projet et les dépendances.
- `tsconfig.json` : Contient les options du compilateur TypeScript.

## Exécution de l'Application

Pour exécuter l'application, vous devez avoir Node.js et npm installés. Ensuite, vous pouvez exécuter la commande suivante dans le terminal :

```bash
node dist/app.js
```

Cela démarrera le serveur Express sur le port 3000.

## Utilisation de l'Application

L'application propose une interface web simple pour gérer les tâches. Vous pouvez créer une nouvelle tâche en saisissant le titre de la tâche, la description et la date d'échéance, puis en cliquant sur le bouton "Ajouter une tâche". Les tâches sont affichées dans une liste, chaque tâche ayant un bouton "Mettre à jour" et "Supprimer".
