FROM node:14-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json  ./
COPY yarn.lock ./
RUN apk add curl 
RUN apk add net-tools 
RUN yarn --silent

COPY ./ ./
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}



RUN yarn build

# Building app
EXPOSE 3000

CMD "yarn" "start"
