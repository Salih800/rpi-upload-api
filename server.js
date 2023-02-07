import express from 'express';
import cors from 'cors';

const app = express();

global.__basedir = process.cwd();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

import {routes as initRoutes} from"./src/routes/index.js";

app.use(express.urlencoded({extended: true}));
initRoutes(app);

let host = "localhost"
let port = 8081;
global.__baseUrl = `http://${host}:${port}/`

app.listen(port, host, () => {
    console.log(`Running at ${host}:${port}`);
});