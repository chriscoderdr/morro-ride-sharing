FROM node:18-alpine

RUN apk add --no-cache git

RUN apk add --no-cache bash

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

COPY wait-for-it.sh /wait-for-it.sh


RUN chmod +x /wait-for-it.sh

WORKDIR /app/apps/api