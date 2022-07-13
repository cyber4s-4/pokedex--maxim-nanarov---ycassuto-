const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const portHttp = 4002;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("./dist"));

const filePath = path.join(__dirname, "../data/data.json");
const readFileData = fs.readFileSync(filePath, "utf8");

app.get("/getPokemons", (req, res) => {
    res.status(200).send(readFileData);
});


app.listen(portHttp, () => {
    console.log('Hosted: http://localhost:' + portHttp);
});