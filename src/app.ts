import { PokemonComponent } from "./shared/pokemonComponent";
import { PokemonData } from "./shared/IPokemonData";


let pokemonDataArray: PokemonData[] = [];
class Module {

    getRandomPokemon() {
        pokemonsList.innerHTML = "";
        let randomNum = Math.floor(Math.random() * pokemonDataArray.length);
        this.createPokemoneElement(pokemonDataArray[randomNum]);
    }

    //search pokemon by name, if exist render it to the page.
    getPokemonByName(name: string) {
        pokemonDataArray.forEach((pokeData) => {
            if (pokeData.name === name) {
                this.createPokemoneElement(pokeData);
            }
        });
    }

    //render with the data into the html page.
    createPokemoneElement(pokemonData: PokemonData) {
        let pokemonComponent = new PokemonComponent(pokemonData, pokemonsList);
        pokemonComponent.render();
    }

    searchRandomPokemon() {
        this.getRandomPokemon();
    }
}

function filterPokemonsByInputValue() {
    let input = (<HTMLInputElement>document.getElementById("search-poke-input"))
        .value;
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

//main page load
function onMainLoad() {
    pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
    document.getElementById("search-poke-input")!.addEventListener("keyup", filterPokemonsByInputValue);
    for (let i = 0; i < 20; i++) {
        module.createPokemoneElement(pokemonDataArray[i]);
    }
}

async function onLoad() {
    await fetch('/getPokemons')
        .then(res => res.json().then(data => {
            pokemonDataArray.push(...data);
        }))

    onMainLoad();

}

window.addEventListener("load", onLoad);
let pokemonsList: HTMLElement;