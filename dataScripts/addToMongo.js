const { MongoClient } = require('mongodb')
const {path} = require('path');
const {fs} = require('fs');

//import { password } from '../backend/MongoPassword';

const filePath = path.join(__dirname, "../data/newPokemons.json");
const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));


const uri = `mongodb+srv://yuvalDB:${password}@cluster0.j7ixv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

client.connect((err) => {
    const db = client.db("M&Y-pokeDex").collection("pokemons-data");

    db.insertMany(readFileData, (err) => {
        if (err) throw err;
        client.close()
    })
})