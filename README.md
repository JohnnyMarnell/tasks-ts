# To-Do App with TypeScript Backend

Attempt at making a modern TypeScript + Postgres backed micro service API for ToDo's

## Commands

See [package.json](./package.json) of course for some example commands, e.g. `pnpm dev` to run local, watchable, debuggable instace via `tsx`. Docker-Compose also works for express app.

```bash
# Start database and other containers
docker-compose up

# Some API curls
curl -H 'Content-Type: application/json' localhost:3000/tasks -d '{"title":"Do Homework", "description":"Study for math test"}'
curl -H 'Content-Type: application/json' localhost:3000/tasks

# Set a db conn string var
set -a ; source .env ; set +a ; db_conn="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}" ; echo $db_conn

# Connect to PSQL shell in Postgres container
docker-compose exec -it db psql $db_conn

# Query DB
docker-compose exec -it db psql $db_conn -c 'select * from tasks'
```

# Questions / ToDos ToDos

- error handling + export const look of controllers/tasks.ts ?
- database.js pool as imported module?
- tests... jest ok for simple integration test of API calls? Mocha?
- file naming & org typical? e.g. src/, index, src/(controllers|routes)/, index.controllers.ts, "database.ts"
- original structure from example repo had code duplication for "routes/index". bad bug. and weird. i removed it
- pnpm is ok choice ya? i like the space opt
- no semi colons ok?
- `tsx` seems modern fast choice?
- handle the default for a new Task is incomplete (complete == false), currently using OR pipe in controller, redundant since database scheme effectively defines the default. but how to balance code looking weird(er)?
- docker-compose api container improvement?
- ✅ docker-compose container for typescript, close enough
- ✅ tsconfig via extending a base
- ✅ code formatting
