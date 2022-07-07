
import { PokemonComponent } from "./shared/pokemonComponent";
import { PokemonData } from "./shared/pokemonComponent";
import { data } from "./data/data";


const pokemonDataArray: PokemonData[] = data

class Module {

    getRandomPokemon() {
        let randomNum = Math.floor(Math.random() * pokemonDataArray.length);
        this.createPokemoneElement(pokemonDataArray[randomNum]);
    }

    getPokemonByName(name: string) {
        pokemonDataArray.forEach((pokeData) => {
            if (pokeData.name === name) {
                return pokeData;
            }
        })
    }

    createPokemoneElement(pokemonData: PokemonData) { //render with the data into the html page.
        let pokemonComponent = new PokemonComponent(pokemonData, pokemonsList);
        pokemonComponent.render()
    }

    searchPokemon() {
        let input = (<HTMLInputElement>document.getElementById("search-poke-input")).value;
        let data = this.getPokemonByName(input);
        if (data != undefined) {
            this.createPokemoneElement(data);
        }
    }

    searchRandomPokemon() {
        this.getRandomPokemon();
    }
}

function filterPokemonsByInputValue() {
    let input = (<HTMLInputElement>document.getElementById("search-poke-input")).value;
    if (input === "") {
        return;
    }

    if (!onlyLetters(input)) {
        return;
    }

    pokemonsList.innerHTML = "";
    let arr = pokemonDataArray.filter(pokemonData => pokemonData.name.startsWith(input));
    arr.forEach((pokemonData) => { module.getPokemonByName(pokemonData.name) });
}

function onlyLetters(str: string) {
    return /^[a-zA-Z]+$/.test(str);
}


export const module = new Module();
function onLoad() {
    pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
    document.getElementById("search-poke-input")!.addEventListener("keyup", filterPokemonsByInputValue);
    for (let i = 0; i < 5; i++) {
        module.getRandomPokemon();
    }
}
window.addEventListener("load", () => {
    onLoad();
})
let pokemonsList: HTMLElement;