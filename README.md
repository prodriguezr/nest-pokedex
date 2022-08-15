<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in Development

1. Clone repository
2. Execute

```
yarn install
```

3. Have Nest CLI installed. You can install it by running the following command in the command window:

```
npm i -g @nestjs/cli
```

4. Raise the local Mongo database container:

```
docker-compose up -d
```

5. Build/Rebuild the database with the seed

```
http://localhost:3000/api/v1/seed
```

## Used Stack

-   MongoDB
-   Nest
