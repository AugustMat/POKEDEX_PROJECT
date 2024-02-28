/*  
    OBS: Arrow function é uma forma de criar uma função sem a necessidade de chamar o metodo "function". \Sendo assim o declado da seguinte forma:
    .then((response))=> {
        bla bla bla
    }

    Usado geralmente para um callback ou um contexto mais isolado, é uma sintaxe mais reduzida. 
*/


const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?pokemon?offset=${offset}&limit=${limit}`

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => console.log(jsonBody))
    .catch((error) => console.log(error))
    .finally(() => console.log('Requisição conluida'))

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