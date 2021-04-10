FROM node:14


RUN mkdir -p /opt/security-api
RUN npm i
RUN npx tsc
ENV PROJECT_HOME /opt/security-api

COPY node_modules $PROJECT_HOME/node_modules
COPY ./dist $PROJECT_HOME/dist
COPY ./.env $PROJECT_HOME/.env
COPY ./package.json $PROJECT_HOME/package.json

WORKDIR $PROJECT_HOME

EXPOSE 3001
