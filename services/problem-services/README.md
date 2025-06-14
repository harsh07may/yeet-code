1. Generate random secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. Run `docker-compose up -d` to spin up `postgresdb`, `redis` & `worker-service`.

3. Populate your env:

```
DATABASE_URL=""
JWT_SECRET=""
```
