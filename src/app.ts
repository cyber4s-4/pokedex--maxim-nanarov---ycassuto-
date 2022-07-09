import { PokemonComponent } from "./shared/pokemonComponent";
import { PokemonData } from "./shared/pokemonComponent";
import { data } from "./data/data";


const pokemonDataArray: PokemonData[] = data
class Module {

    getRandomPokemon() {
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

    MoveTo(str: any) {
        let quarry = "name=" + str;
        window.location.href = "http://localhost:4000/Specific.html?" + quarry;
    }
    
    GoBack() {
        window.location.href = "http://localhost:4000/";
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
    for (let i = 0; i < 5; i++) {
        module.getRandomPokemon();
    }
}

//Specific pokemon page load
function onSpecificPokemonLoad() {
    pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
    const myURL = new URL(window.location.href);
    let name = "none";
    myURL.search
        .replace("?", "")
        .split("&")
        .forEach((query) => {
            let key = query.split("=")[0];
            if (key === "name") {
                name = query.split("=")[1];
            }
        });
    module.getPokemonByName(name);
}

window.addEventListener("load", () => {
    if (window.location.href.includes("Specific")) {
        onSpecificPokemonLoad();
    } else {
        onMainLoad();
    }
});
let pokemonsList: HTMLElement;