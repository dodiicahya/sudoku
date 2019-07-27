FROM node:10-alpine

RUN npm install -g nodemon

RUN apk update && \
    apk upgrade && \
    apk add bash git && \
    apk add gcc && \
    apk add musl-dev && \
    apk add curl

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN ls -la

COPY package*.json ./

USER node

RUN npm install -f

COPY --chown=node:node . .
