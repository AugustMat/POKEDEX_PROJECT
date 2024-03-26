
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

class PokemonDetails {    
    constructor(name, number, height, weight, status = [], types = [], photo){
        this.name = name;
        this.number = number;
        this.height = height;
        this.weight = weight;
        this.status = status;
        this.types = types;
        this.photo = photo;
    }
}

// class PokemonDetails {
//     constructor(name, order, height, weight, status = [], types = [], photo){
//         this.name = name;
//         this.order = order;
//         this.height = height;
//         this.weight = weight;
//         this.status = status;
//         this.types = types;
//         this.photo = photo;
//     }
// }