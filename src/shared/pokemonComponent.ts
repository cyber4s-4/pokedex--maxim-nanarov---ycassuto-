export class PokemonComponent {
    photoURL: string;
    number: number;
    name: string;
    type: string;
    parent: HTMLElement;
    constructor(photoURL: string, number: number, name: string, type: string, parent: HTMLElement) {
        this.photoURL = photoURL;
        this.number = number;
        this.name = name;
        this.type = type;
        this.parent = parent;
    }

    render() {
        
    }
}