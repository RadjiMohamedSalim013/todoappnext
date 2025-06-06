# Todo App

Une application simple de gestion de tâches construite avec Next.js, React et MongoDB. Cette application permet aux utilisateurs de créer, lire, mettre à jour et supprimer des tâches avec une interface propre et réactive.

## Fonctionnalités

- Création de nouvelles tâches avec un titre
- Visualisation d'une liste de tâches avec leur statut (incomplète ou terminée)
- Mise à jour du titre et du statut des tâches
- Suppression des tâches
- Filtrage des tâches par statut (toutes, terminées, incomplètes)
- Recherche de tâches par titre
- Statistiques des tâches (total, terminées, en cours)
- Interface réactive et conviviale

## Technologies utilisées

- [Next.js](https://nextjs.org/) (framework React)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) avec [Mongoose](https://mongoosejs.com/)
- [Tailwind CSS](https://tailwindcss.com/) pour le style
- [Lucide React](https://lucide.dev/) pour les icônes

## Installation

1. Cloner le dépôt :

   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Créer un fichier `.env.local` à la racine et ajouter votre chaîne de connexion MongoDB :

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

## Utilisation

Démarrer le serveur de développement :

```bash
npm run dev
```

Ouvrez votre navigateur et allez à [http://localhost:3000](http://localhost:3000). L'application redirigera vers la page des tâches.

## Endpoints API

- `GET /api/tasks` - Récupérer toutes les tâches
- `POST /api/tasks` - Créer une nouvelle tâche (corps JSON : `{ "title": "Titre de la tâche" }`)
- `GET /api/tasks/:id` - Récupérer une tâche par ID
- `PUT /api/tasks/:id` - Mettre à jour une tâche par ID (corps JSON : `{ "title": "Nouveau titre", "status": "complete" | "incomplete" }`)
- `DELETE /api/tasks/:id` - Supprimer une tâche par ID

## Structure du projet

```
src/
├── app/
│   ├── api/
│   │   └── tasks/           # Routes API pour les tâches
│   ├── createtask/          # Page pour créer une nouvelle tâche
│   ├── delete/              # Page pour supprimer une tâche
│   ├── edit/                # Page pour modifier une tâche
│   ├── tasks/               # Page principale de la liste des tâches
│   ├── page.tsx             # Redirection vers /tasks
│   └── globals.css          # Styles globaux
├── components/              # Composants React (TaskItem, TaskCreate, TaskEdit, TaskFilter, TaskStats, TaskSearch)
├── gateway/                 # Couche d'accès aux données pour les tâches (taskGateway.ts)
├── lib/                     # Connexion MongoDB (mongo.ts)
├── models/                  # Modèles Mongoose (Task.ts)
├── types/                   # Types TypeScript
```

## Licence

Ce projet est sous licence MIT.
