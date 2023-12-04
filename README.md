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
4. gen next auth secret token in local

```
openssl rand -base64 32
```

or via web

```
https://generate-secret.vercel.app/32
```

5. set enviroiments vars
6. Execute seed to create database [crear base de datos local](http://localhost:3000/api/seed)

7. to run de delopment server

```
npm run dev
```

8. into browser paste url

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
