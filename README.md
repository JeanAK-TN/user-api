# User API

API REST simple de gestion d'utilisateurs avec pipeline CI GitHub Actions.

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

Le serveur démarre par défaut sur `http://localhost:3000`.

## Tests

```bash
npm test
npm run test:coverage
```

## Linting

```bash
npm run lint
```

## Build

```bash
npm run build
```

Le build génère un dossier `dist/` prêt à être archivé comme artifact.

## Docker

```bash
docker build -t user-api:1.0 .
docker run -d -p 3000:3000 --name user-api -e NODE_ENV=production user-api:1.0
```

Vérifications utiles :

```bash
curl http://localhost:3000/health
docker inspect --format='{{.State.Health.Status}}' user-api
docker logs user-api
```

## Endpoints

- `GET /api/users` : retourne tous les utilisateurs.
- `GET /api/users/:id` : retourne un utilisateur par identifiant.
- `POST /api/users` : crée un utilisateur avec un corps JSON `{ "name": "...", "email": "..." }`.

## Pipeline CI

Le workflow GitHub Actions `.github/workflows/ci.yml` exécute :

- `lint`
- `security`
- `test` avec couverture et artifact
- `build` avec artifact `dist-files`
