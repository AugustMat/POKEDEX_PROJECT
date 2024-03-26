

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRecords = 151
const limit = 12
let offset = 0;



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" onclick="viewDetails(${pokemon.number})">
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

// const pokeCard = document.getElementById('modal')

// pokeCard.addEventListener('click', () => {
    

// })

pokeApi.convertDetails = (pokemon) => {
    // pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    const imagePokemon = pokemon.sprites.other.dream_world.front_default
    const pokemonDetail = new PokemonDetails(
        pokemon.name,
        pokemon.number,
        pokemon.height,
        pokemon.weight,
        pokemon.stats,
        pokemon.types,
        imagePokemon)
    
    return pokemonDetail
}

let viewDetails = (idPoke) => {
    const modalPoke = document.querySelector('.modalPoke')
    if(modalPoke) { // Se existir o modal, ele ira tirar quando o usuario clicar no botao novamente
        modalPoke.remove()
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${idPoke}`)
        .then((response) => response.json())
        .then((responseJson) => pokeApi.convertDetails(responseJson))
        .then((convertPokemon) => {
            const bodyDoc = document.querySelector('body')
            bodyDoc.innerHTML += pokeApi.viewDetails(convertPokemon)
        })
        
}

pokeApi.viewDetails = (pokemon) => {
    const typeColor = pokemon.types[0].type.name
    
    pokemon.weight = pokemon.weight / 10 
    pokemon.height = pokemon.height / 10

    return `
        <section class="modalPoke ${typeColor}">
            <div class="header">
                <span class="number">#${pokemon.number}</span>
                <h1 class="namePoke">${pokemon.name}</h1>
            </div>

            <div class="image">
                <img class="imagePoke" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="detailsAndPower">
                <div class="detailsBox">
                    <h2 class="detailsTitle">
                        Details
                    </h2>
                    
                    <div class="detailsWidth">
                        <span class="detailText ${typeColor}" id="width">
                            ${pokemon.height} M
                        </span>
                        <span class="detailText ${typeColor}" id="height">
                            ${pokemon.weight} KG
                        </span>
                    </div>
                </div>

                <div class="types">
                    <h2>
                        Powers Pokemon
                    </h2>
                    <ul class="typesList">
                        ${viewPower(pokemon.types)}
                    </ul>
                </div>
            </div>


            <div class="statusPoke">
                <h1 class="namePoke">
                    Status ${pokemon.name}
                </h1>
                ${viewStatus(pokemon.status)}
            </div>
            
    `, function fecharModal() {
        const modal = document.querySelector('.modalPoke.show');
        if (modal) {
            modal.classList.remove('show');
            modal.remove();
            document.removeEventListener('keydown', fecharComEsc);
            document.removeEventListener('click', fecharClicandoFora);
        }
    }

    function fecharComEsc(event) {
        if (event.key === 'Escape') {
            fecharModal();
        }
    }

    function fecharClicandoFora(event) {
        const modal = document.querySelector('.modalPoke.show');
        if (modal && event.target === modal) {
            fecharModal();
        }
    }
}

// let removePokeDetails = () => { // Remove modal
//     const modalPoke = document.querySelector('.modalPoke')
//     modalPoke.remove()
// }

let viewStatus = (statusPoke) => { // View status poke
    return statusPoke.map((statusI) => {
        const valueStatus = statusI.base_stat
        const nameStatus = statusI.stat.name
        
        return `
        <div class="statusBox">
            <h3 class="titleStatus">${nameStatus}</h3>
            <div class="box ${nameStatus}">${valueStatus}%</div>
        </div>`
    }).join('')
}

let viewPower = (typePokemon) => { // View powers poke
    return typePokemon.map((typePoke) => {
        const typeName = typePoke.type.name;
        return `
        <li class="typeItem ${typeName}">
            ${typeName}
        </li>`
    }).join('')
}



