import { PokemonComponent } from "./shared/pokemonComponent";

async function getPokemons() {
    let allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
        .then(res => res.json())
        .then(data => data["results"]);
    return allPokemons.map((pokemon: { name: string }) => pokemon.name)
}


function getPokemonByName(name: string) {
    getPokemons().then((pokemonsArrayNames) => {
        pokemonsArrayNames.forEach((poke:string) => {
            if (poke === name) {
                console.log(poke);
            }
        });
    })
}

getPokemonByName("alakazam")
