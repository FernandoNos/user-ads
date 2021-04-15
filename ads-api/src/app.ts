import dotenv from 'dotenv'
import express from 'express';
import bodyParser from "body-parser";
import {Database} from "./configs/database";
dotenv.config()
import morgan from 'morgan'

const app = express();
const {PORT} = process.env;

(async()=>{
    module.exports.MongoClient = await new Database().getDbConenction()

    app.use(bodyParser.json());
    app.use(morgan('combined'))
    app.use(`/api`, require('./adapters/input').router);
    app.listen(PORT, () => {
        console.log(`server is listening on ${PORT}`);
    });
})()
    .catch(error => {
        console.error(`Error starting up application : ${error.message}`)
        process.exit(0)
    })



