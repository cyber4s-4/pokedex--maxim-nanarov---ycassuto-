
const fs = require("fs");
const path = require("path");



let pokemonPromise = getPokemonPromise();

let dataArr = [];
const filePath = path.join(__dirname, "../data/data.json");
//home/student/Desktop/pokedex-maxim-nanarov-ycassuto/src/dataGetter/getData.js

async function getPokemonPromise() {
    let allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then(res => res.json())
        .then(data => data["results"]);
    return allPokemons.map((pokemon) => pokemon.name)
}

async function addToData() {
    await pokemonPromise.then(res => res.forEach(name => {
        fetch("https://pokeapi.co/api/v2/pokemon/" + name)
            .then(res => res.json())
            .then(data => {
                let obj = {
                    photoURL: data.sprites.front_default,
                    name: data.name,
                    type: data.types[0].type.name,
                    height: data.height,
                    weight: data.weight,
                    abilities: data.abilities, //array of objects with name and url
                    heldItems: data.held_items, //array of items which is an object with name and url
                    moves: data.moves, //array of objects
                    stats: data.stats // array of objects
                }
                dataArr.push(obj)
                fs.writeFileSync(filePath, JSON.stringify(dataArr));
            })
            .catch(() => { console.log('didnt work') })
    }))
}
addToData();
