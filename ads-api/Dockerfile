FROM node:14


RUN mkdir -p /opt/ads-api
RUN npm i
RUN npx tsc
ENV PROJECT_HOME /opt/ads-api

COPY node_modules $PROJECT_HOME/node_modules
COPY ./dist $PROJECT_HOME/dist
COPY ./.env $PROJECT_HOME/.env

WORKDIR $PROJECT_HOME

EXPOSE 3000

# RUN node ./dist/app.js
