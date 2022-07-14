import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { Collection } from 'mongodb';
import { create, connect, getItems } from './mongo';

const portHttp = 3002;
const app: Express = express();
app.use(cors());
app.use(json());


// @ts-ignore
let collection: Collection;
connect(create()).then(res => collection = res);



app.use(express.static("./dist"));

// @ts-ignore
app.get('/getPokemons', (req, res) => {
  console.log("Get");
  getItems(collection)
    .then((response) => res.json(response))
    .catch(console.log)
});


app.listen(portHttp, () => {
  console.log('Hosted: http://localhost:' + portHttp);
});