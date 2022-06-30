
export interface PokemonData {
    name: string;
    sprites: Sprites
    height: number;
    weight: number;
    types: Type[];
}

interface Sprites {
    front_default: string;
}
interface Type {
    name: string;
}



export class PokemonComponent {
    data: PokemonData;
    parent: HTMLElement;
    constructor(data: PokemonData, parent: HTMLElement) {
        this.data = data;
        this.parent = parent;
    }

    render() {
        console.log(this.data);
        console.log(this.parent);


        this.parent.innerHTML += `<div class="pokemon">
            <div class="stat">
              <img src="${this.data.sprites.front_default}" class="pokemon-img">
            </div>
            <div class="stat">
              <label>Pokemon Name:${this.data.name} </label>
            </div>
            <div class="stat">
              <label>Type: ${this.data.types[0]} </label>
            </div>
          </div>`;
    }
}