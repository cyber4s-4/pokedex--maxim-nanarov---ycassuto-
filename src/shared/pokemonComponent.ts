import { module } from "../app";

export interface PokemonData {
  name: string;
  sprites: Sprites;
  height: number;
  weight: number;
  base_experience: number;
  types: Types[];
  stats: stats[];
}

interface stats{
  stat: stat;
  base_stat: number;
  effort: number;
}

interface stat{
  name: string;
}

interface Sprites {
  front_default: string;
}
interface Types {
  type: Type;
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
    if (window.location.href === "http://localhost:4000/") {
      console.log(this.data);
      this.parent.innerHTML += `<div id="${this.data.name}" onclick="app.module.MoveTo(this.id)" class="pokemon">
            <div class="stat">
              <img src="${this.data.sprites.front_default}" class="pokemon-img">
            </div>
            <div class="stat">
              <label>Pokemon Name:${this.data.name} </label>
            </div>
            <div class="stat">
              <label>Type: ${this.data.types[0].type.name} </label>
            </div>
            <div class="stat">
              <label>height: ${this.data.height} </label>
            </div>

            <div class="stat">
              <label>weight: ${this.data.weight} </label>
            </div>
          </div>`;
    } else {
      console.log(this.data);
      document.getElementById("Title")!.innerHTML = this.data.name;
      this.parent.innerHTML += `<div id="${this.data.name}" class="Spokemon">
    <div class="stat">
      <img src="${this.data.sprites.front_default}" class="pokemon-img">
    </div>
    <div class="stat">
      <label>Pokemon Name:${this.data.name} </label>
    </div>
    <div class="stat">
      <label>Type: ${this.data.types[0].type.name} </label>
    </div>
    <div class="stat">
      <label>height: ${this.data.height} </label>            
    </div>
    <div class="stat">
      <label>weight: ${this.data.weight} </label>
    </div>
    </div>`;
  this.renderStat();
    }
  }

  renderStat(){
    this.data.stats.forEach((stat) =>{
      document.getElementById('pokemon-stats')!.innerHTML += `<div class="stat">
      <label>${stat.stat.name} : ${stat.base_stat} </label>
    </div>`
    });
  }
}
