# syntax = docker/dockerfile:1.2
FROM node:18.16.0-alpine3.18 
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./

RUN npx prisma generate
RUN --mount=type=secret,id=DATABASE_URL \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" npx prisma migrate deploy
RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=PUBLIC_VERSION \
    --mount=type=secret,id=USE_RANDOM_NAMES \
    USE_RANDOM_NAMES="$(cat /run/secrets/USE_RANDOM_NAMES)" \
    PUBLIC_VERSION="$(cat /run/secrets/PUBLIC_VERSION)" \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    npm run build


EXPOSE 3000

CMD npm run start
