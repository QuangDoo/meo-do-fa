FROM node:12-alpine

ENV PORT 3000
RUN apk update && apk add yarn && rm -rf /var/cache/apk/*

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json  ./
COPY yarn.lock ./
RUN yarn --silent

COPY ./ ./
RUN yarn build

# Building app
EXPOSE 3000

CMD "yarn" "start"