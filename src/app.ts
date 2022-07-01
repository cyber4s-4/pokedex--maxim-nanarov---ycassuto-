import { PokemonComponent } from "./shared/pokemonComponent";
import { PokemonData } from "./shared/pokemonComponent";

class Module {
  pokemonsPromise: Promise<any>;

  constructor() {
    this.pokemonsPromise = this.getPokemons();
  }

  async getPokemons() {
    let allPokemons = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1154"
    )
      .then((res) => res.json())
      .then((data) => data["results"]);
    return allPokemons.map((pokemon: { name: string }) => pokemon.name);
  }

  async getPokemonByRandom() {
    let randomNum = Math.floor(Math.random() * 1100);
    this.pokemonsPromise.then((response) => {
      this.getPokemonByName(response[randomNum]);
    });
  }

  async getPokemonByName(name: string) {
    let wantedPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then((res) => res.json())
      .then((data) => this.createPokemoneElement(data))
      .catch(() => {
        console.error("pokemon dosen't exsist");
      });
  }

  createPokemoneElement(pokemonData: PokemonData) {
    //render with the data into the html page.
    let pokemonComponent = new PokemonComponent(pokemonData, pokemonsList);
    pokemonComponent.render();
  }

  MoveTo(str: any) {
    console.log(str);
    let quarry = "name="+str;
    window.location.href = "http://localhost:4000/Specific.html?"+quarry;
  }

  searchPokemon() {
    let input = (<HTMLInputElement>document.getElementById("search-poke-input"))
      .value;
    this.getPokemonByName(input);
  }

  searchRandomPokemon() {
    this.getPokemonByRandom();
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
  module.pokemonsPromise.then((response) => {
    let arr = response.filter((name: string) => name.startsWith(input));
    arr.forEach((pokemonName: string) => {
      module.getPokemonByName(pokemonName);
    });
  });
}
function onlyLetters(str: string) {
  return /^[a-zA-Z]+$/.test(str);
}

export const module = new Module();
function onLoad() {
  //main page
  console.log(window.location.href);
  pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
  module.getPokemons();
  document
    .getElementById("search-poke-input")!
    .addEventListener("keyup", filterPokemonsByInputValue);
  for (let i = 0; i < 50; i++) {
    module.getPokemonByRandom();
  }
}

function onLoadSpecific() {
  //Specific pokemon page
    pokemonsList = document.getElementById("pokemons-list") as HTMLElement;
    module.getPokemons();
    // document
    //   .getElementById("search-poke-input")!
    //   .addEventListener("keyup", filterPokemonsByInputValue);
    const myURL = new URL(window.location.href);
    console.log(myURL.search)
    let name = 'none'
    myURL.search.replace('?','').split('&').forEach(query =>{
        let key = query.split('=')[0];
        if(key === 'name'){
            name = query.split('=')[1];
        }
    })
    console.log(name);
    module.getPokemonByName(name);
}
window.addEventListener("load", () => {
    if(window.location.href === "http://localhost:4000/") {onLoad();}
    else if (window.location.href.includes("http://localhost:4000/Specific.html")) {onLoadSpecific()}
});
let pokemonsList: HTMLElement;
