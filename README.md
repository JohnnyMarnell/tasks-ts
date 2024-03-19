# To-Do App with TypeScript Backend

## Commands

```bash
# Start database and other containers
docker-compose up

# Add to-do
curl -H 'Content-Type: application/json' -v localhost:3000/tasks -d '{"title":"Do Homework", "description":"Study for math test"}'

# Set a db conn string var
db_conn=$(echo "$(cat .env | xargs) echo 'postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}'" | bash) ; echo $db_conn

# Connect to PSQL shell in Postgres container
docker-compose exec -it db psql $db_conn

# Query DB
docker-compose exec -it db psql $db_conn -c 'select * from tasks'
```

# Questions

- docker-compose container for typescript
- original structure from example repo had code duplication for "routes/index". bad bug. and weird. i removed it
- tsconfig via extending a base
- pnpm is ok choice ya? i like the space opt
- file naming & org typical? e.g. src/, index, src/(controllers|routes)/, index.controllers.ts, "database.ts"
- how to set up docker-compose smart + easy?
- no semi colons ok?
- syntax formatting and linting
- i changed ts-node to tsx
- removed nodemon, is this a thing? speaking of:
- hot reload best practices?
- handle the default is incomplete for task, currently OR pipe, redundant since database scheme effectively defines the default. but how to balance code looking weird(er)
