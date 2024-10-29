FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/start.js"]
