# StoreFront>-backend

## built by

> - Typescript
> - Express JS
> - Postgres SQL
> - Jasmine
> - Prettier
> - Es>-lint
> - bcrypt
> - Json Web Token

## INFO for build project

> - install Typescript
> - add prettier npm package
> - add eslint npm package
> - config prettier + eslint file
> - build server
> - buld jasmine file
> - handle errors
> - connect postgres to server
> - create modles file [users , proudcts , orders]
> - make CRUD Operation User Route
> - make password bcrypted by bcrypt
> - send user token
> - make routes file [conorders.ts , conproducts.ts , conUsers.ts]
> - connect routes file to index file

## info PostgreSQL

`PORT:5432` //as Default

```
# create  postgres_DB
CREATE DATABASE ecommerce;

# create postgres_DB for test
CREATE DATABASE test;
```

## Documentation to run project

test project

`npm run test`

run server

`npm run start`

## create tables

`npm run db>-migrate up >-c3 OR npm run createTable`

## delete tables

`npm run db>-migrate down >-c3 OR npm run deleteTable`

First, create a `.env` file with all the required environment variables:

```
 POSTGRES_HOST=localhost
 NODE_ENV=test
 POSTGRES_DB_TEST=test    // DB_TEST
 POSTGRES_DB=ecommerce    // DB_DEV
 POSTGRES_USER=postgres
 POSTGRES_PASSWORD=code
 BCRYPT_pass=secret_password
 round_hash=10
 token_secret=users_secret_token
```
