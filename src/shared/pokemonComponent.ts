import { module } from "../app";

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
    if (window.location.href === "http://localhost:4000/") {
      console.log(this.data);
      this.parent.innerHTML += `<div id="${this.data.name}" onclick="app.module.MoveTo(this.id)" class="pokemon">
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
    } else {
      console.log(this.data);
      document.getElementById("Title")!.innerHTML = this.data.name;
      this.parent.innerHTML += `<div id="${this.data.name}" class="Spokemon">
      <div>
      <img src="${this.data.photoURL}" class="pokemon-img">
      </div>
    <div class="arrtibutes">
      <label>Pokemon Name :${this.data.name} </label>
      <label>Type : ${this.data.type[0]} </label>
      <label>height : ${this.data.height} </label>            
      <label>weight : ${this.data.weight} </label>
    </div>
    </div>`;
    }
  }
}
