
export interface PokemonData {
  photoURL: string;
  name: string
  type: string;
  height: number;
  weight: number;
}



export class PokemonComponent {
  data: PokemonData;
  parent: HTMLElement;
  constructor(data: PokemonData, parent: HTMLElement) {
    this.data = data;
    this.parent = parent;
  }

  render() {
    this.parent.innerHTML += `<div class="pokemon">
            <div class="stat">
              <img src="${this.data.photoURL}" class="pokemon-img">
            </div>
            <div class="stat">
              <label>Pokemon Name:${this.data.name} </label>
            </div>
            <div class="stat">
              <label>Type: ${this.data.type[0]} </label>
            </div>
            <div class="stat">
              <label>height: ${this.data.height} </label>
            </div>

            <div class="stat">
              <label>weight: ${this.data.weight} </label>
            </div>
          </div>`;
  }
}