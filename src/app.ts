
import { PokemonComponent } from "./shared/pokemonComponent";
import { PokemonData } from "./shared/pokemonComponent";

class Module {
    pokemonsPromise: Promise<any>;

    constructor() {
        this.pokemonsPromise = this.getPokemons();
    }

    async getPokemons() {
        let allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1154")
            .then(res => res.json())
            .then(data => data["results"]);
        return allPokemons.map((pokemon: { name: string }) => pokemon.name)
    }

    async getPokemonByRandom() {
        let randomNum = Math.floor(Math.random() * 1100);
        console.log(this.pokemonsPromise);
        this.pokemonsPromise.then((response) => {
            this.getPokemonByName(response[randomNum]);
        })
    }

    async getPokemonByName(name: string) {

        let wantedPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
            .then(res => res.json())
            .then(data => this.createPokemoneElement(data))
            .catch(() => { console.log('didnt work') })
    }

    createPokemoneElement(pokemonData: PokemonData) { //render with the data into the html page.
        let pokemonComponent = new PokemonComponent(pokemonData, pokemonsList);
        pokemonComponent.render()
    }

    searchPokemon() {
        let input = (<HTMLInputElement>document.getElementById("search-poke-input")).value;
        this.getPokemonByName(input);
    }
    searchRandomPokemon() {
        this.getPokemonByRandom();
    }
}



export const module = new Module();
function onLoad() {
    pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
    module.getPokemons();
    for (let i = 0; i < 40; i++) {
        module.getPokemonByRandom();
    }
}
window.addEventListener("load", () => {
    onLoad();
})
let pokemonsList: HTMLElement;