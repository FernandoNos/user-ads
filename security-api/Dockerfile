FROM node:14

RUN mkdir -p /opt/security-api

ENV PROJECT_HOME /opt/security-api
COPY . $PROJECT_HOME
#COPY ./.env $PROJECT_HOME/.env
WORKDIR $PROJECT_HOME
#RUN npm i
RUN ls -a
#RUN npx tsc
#RUN npx migrate-mongo up -f './src/migrate-mongo-config.js'
RUN ls
#COPY ./dist $PROJECT_HOME/dist

EXPOSE 3001
