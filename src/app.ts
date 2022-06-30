
import { PokemonComponent } from "./shared/pokemonComponent";
import { PokemonData } from "./shared/pokemonComponent";

class Module {
    pokemonsPromise: Promise<any>;

    constructor() {
        this.pokemonsPromise = this.getPokemons();
    }

    async getPokemons() {
        let allPokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
            .then(res => res.json())
            .then(data => data["results"]);
        return allPokemons.map((pokemon: { name: string }) => pokemon.name)
    }


    async getPokemonByName(name: string) {

        let wantedPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
            .then(res => res.json())
            .then(data => this.createPokemoneElement(data))
            .catch(() => {/*TODO:ERROR MESSAGE  */ })
    }

    createPokemoneElement(pokemonData: PokemonData) { //render with the data into the html page.
        let pokemonComponent = new PokemonComponent(pokemonData, pokemonsList);
        pokemonComponent.render()
    }

    searchPokemon() {
        let input = (<HTMLInputElement>document.getElementById("search-poke-input")).value;
        this.getPokemonByName(input);
    }
}



export const module = new Module();
function onLoad() {
    pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
    console.log("pokemonsList");
    module.getPokemons();
}
document.addEventListener("load", () => {
    onLoad();
})
let pokemonsList: HTMLElement;