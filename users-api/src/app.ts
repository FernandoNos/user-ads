import dotenv from 'dotenv'
import express from 'express';
import {debug} from "debug";
import bodyParser from "body-parser";
import {Database} from "./configs/database";
dotenv.config()
debug('users-api');

const app = express();
const {PORT} = process.env;

(async()=>{
  module.exports.MongoClient = await new Database().getDbConenction()

  app.use(bodyParser.json());
  app.use(`/api`, require('./adapters/input').router);
  app.listen(PORT, () => {
    debug.log(`server is listening on ${PORT}`);
  });
})()
    .catch(error => {
      debug(`Error starting up application : ${error.message}`)
      process.exit(0)
    })



