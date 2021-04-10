import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import {debug} from "debug";
import {Database} from "./database";
debug('ads-api');
const app = express();
const {PORT} = process.env;

(async()=>{
  module.exports.MongoClient = await new Database().getDbConenction()

  app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
  });
  app.listen(PORT, () => {
    debug.log(`server is listening on ${PORT}`);
  });
})()
    .catch(error => {
      debug(`Error starting up application : ${error.message}`)
      process.exit(0)
    })



