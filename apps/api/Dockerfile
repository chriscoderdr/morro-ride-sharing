
FROM node:18-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY ../../package.json ../../yarn.lock ./

COPY . .

EXPOSE 3000

CMD yarn install && yarn dev
