const { MongoClient } = require('mongodb')
const {path} = require('path');
const {fs} = require('fs');
const {Client} = require('pg');

//import { password } from '../backend/MongoPassword';

const filePath = path.join(__dirname, "../data/data.json");
const readFileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

const client = new Client({
	connectionString:
		"postgres://ixqgwpzjkngfvp:5060912c37a63cd887c221e19f2fcfa987508925f68fd09367061e60d12f7652@ec2-44-206-214-233.compute-1.amazonaws.com:5432/d35sbb6gqckhco",
	ssl: {
		rejectUnauthorized: false,
	},
});



// const uri = `mongodb+srv://yuvalDB:${password}@cluster0.j7ixv.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);

// client.connect((err) => {
//     const db = client.db("M&Y-pokeDex").collection("pokemons-data");

//     db.insertMany(readFileData, (err) => {
//         if (err) throw err;
//         client.close()
//     })
// })


export async function createTable(client) {
    client.query("Drop TABLE IF EXISTS agents");
    let text = "CREATE TABLE agents (licenseNumber SERIAL PRIMARY KEY,licenseDate VARCHAR(255) NOT NULL,name VARCHAR(255) NOT NULL,surname VARCHAR(255) NOT NULL,city VARCHAR(255) NOT NULL,status VARCHAR(255) NOT NULL);"
    client.query(text, (err) => {
        if (err) throw err;
    })
}

export async function insertTable(client) {
    let text = "INSERT INTO agents (licenseNumber,licenseDate ,name, surname, city, status) VALUES ";
    let statements = await csvToJson()
    
    for (let i = 0; i < statements.length; i++) {
        let row = (Object.values((statements[i])).slice(0, 6));
        text += `(${row[0]},'${row[1]}','${row[2]}','${row[3]}','${row[4]}','${row[5]}'),`
    }
    text = text.slice(0,text.length -1) + ";";
    client.query(text).catch();
}