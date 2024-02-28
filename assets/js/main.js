/*  
    OBS: Arrow function é uma forma de criar uma função sem a necessidade de chamar o metodo "function". \Sendo assim o declado da seguinte forma:
    .then((response))=> {
        bla bla bla
    }
    o código abaixo esta consumindo a API do site pokeapi, trazendo uma lista com 10 pokemons como foi definido em "limit". A partir de "fetch(url)" nós fazemos a requisição do site pokeapi fazendo a busca trazendo as informações dessa lista de 10 pokemons que pode ser exibida no devtools do navegador. 
    appendChild(): com appendChild eu estou dizendo que desejo pegar essa lista e concatenar +1 filho a ela.
     
*/


const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?pokemon?offset=${offset}&limit=${limit}`

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>

                    </ol>

                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
                </div>
                
            </li>
            `
}

const pokemonList = document.getElementById('pokemonList')


// Usado geralmente para um callback ou um contexto mais isolado, é uma sintaxe mais reduzida.
// função MAP ajuda a manipular lista dentro do JS. Transforma um elmento em outro. Forma menos verbosa de executar o código abaixo:

pokeApi.getPokemons().then((pokemons = []) => {

    const newList = pokemons.map((pokemon) => {
        return pokemon.name
    })

    console.log(newList)

        const listItens = []

        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            listItens.push(convertPokemonToLi(pokemon)) 
            debugger
            console.log(listItens)
        }
    })  
    // Com isso estou convertendo a lista de pokemons onde se fazia uma busca de cada vez em um elemente de HTML completo onde ele faz uma unica leitura.

    // O resultado é o mesmo da execução abaixo porém menos verboso e mais limpo.


// - Façamos algo menos verboso:

//     .then(function (response) {
//         return response.json() 
// })
//     .then(function (jsonBody) {
//         console.log(jsonBody)
// })
//     .catch(function (error) {
//         console.log(error)
// })
//     .finally(function () {
//         console.log('Requisição conluida')
// })