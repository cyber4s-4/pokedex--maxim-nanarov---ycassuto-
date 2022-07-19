import { MongoClient, Db, Collection } from 'mongodb';
import { password } from "./MongoPassword";

let skipIndex = 0;

export function create() {
    const uri = `mongodb+srv://yuvalDB:${password}@cluster0.j7ixv.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    return client;
}

export async function connect(client: MongoClient) {
    await client.connect();
    const db: Db = client.db('M&Y-pokeDex');
    const collection: Collection = db.collection('pokemons-data');
    return collection;
}

// @ts-ignore
export async function getItems(collection: Collection<Item>) {
    let result = await collection.find({}).skip(skipIndex).limit(20).toArray();
    skipIndex += 20;
    return result;
}
