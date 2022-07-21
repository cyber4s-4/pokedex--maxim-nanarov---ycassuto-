import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Client } from 'pg';
// import { start } from 'repl';

const portHttp = 3002;
const app: Express = express();
app.use(cors());
app.use(json());

let startIndex=0;
let endIndex=20;

const client = new Client({
  connectionString:
    "postgres://jlsgteqzdwurvd:260d62c8313ea6ff5b065e1daffeee15f8265eb6ef8bbf95004259d724d3c994@ec2-18-214-35-70.compute-1.amazonaws.com:5432/dbn3u135unbqt5",
  ssl: {
    rejectUnauthorized: false,
  },
});

// @ts-ignore

app.use(express.static("./dist"));

// @ts-ignore
app.get('/pokemon', (req, response) => {
  console.log("Get");
  client.query(`SELECT * FROM pokemon Where ID < ${endIndex} and ID > ${startIndex};`, (err: Error, res: any) => {
    if (err) console.log(err);
    console.log(res.rows)
    response.status(200).json(res.rows);
    endIndex += 20; 
    startIndex += 20;
  });
});


app.listen(portHttp, () => {
  console.log('Hosted: http://localhost:' + portHttp);
});