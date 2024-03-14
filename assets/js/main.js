


const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 12
let offset = 0;



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
    
                    <div class="detail">
                        <ol class="types">
                           ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    
                        </ol>
    
                        <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                    </div>
                    
                </li>
    `).join('')

    pokemonList.innerHTML += newHtml
    }) 
}

loadPokemonItens(offset, limit)
     
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const nextPageRecords = offset + limit
 
    if (nextPageRecords >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.innerText = 'No more pages for now =D'
    } else {
        loadPokemonItens(offset, limit)
    }
})

// pokeCard.addEventListener('click', () => {

// })

document.addEventListener('DOMContentLoaded', function() {
    var listaItems = document.querySelectorAll('#pokemonList, .pokemon')
  
    listaItems.forEach(function(pokemon) {
        pokemon.addEventListener('click', function() {
        listaItems.forEach(function(pokemon) {`
        .pokemon{
            
        }`
            ;
        });
        this.classList.add('editing');
        var textoAtual = this.textContent;
        var novoTexto = prompt('Editar item:', textoAtual);
        if (novoTexto !== null) {
          this.textContent = novoTexto;
        }
        this.classList.remove('editing');
      });
    });
  });
