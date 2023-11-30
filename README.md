# Development

Steps to build on develop enviroment

1. build database postgress with docker

```
docker compose build
```

2. turn on database

```
docker compose up -d
```

3. to install packages with node

```
npm install
```

3. copy and rename .env.example
4. set enviroiments vars

5. to run de delopment server

```
npm run dev
```

6. into browser paste url

```
localhost:3000
```

# Prisma Commands

```
npx prisma init
npx prisma migrate dev
```

# Production

Steps to build on develop enviroment

1. build database postgress with docker

```
docker compose build
```

2. turn on database

```
docker compose up -d
```

3. to install packages with node

```
npm install
```

3. copy and rename .env.example
4. set enviroiments vars
5. to build and compile files for production

```
npm run build
```

6. to start server with compiled files

```
npm run start
```

7. into browser paste url or your domain name vinculated to

```
localhost:3000
```
