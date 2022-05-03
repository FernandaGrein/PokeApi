const pokemonContainer = document.querySelector('.pokemonsContainer')

const url = 'https://pokeapi.co/api/v2/pokemon'

function appendPoke(object) {
 console.log(object)
 const li = document.createElement('li')
 const divNome = document.createElement('div');
 const divImage = document.createElement('div');
 const divImageBack = document.createElement('div');
 const img = document.createElement('img');
 const imgBack = document.createElement('img');
 const divMoves = document.createElement('div');
 
 img.src = object.image
 imgBack.src = object.backimage

 divNome.innerHTML = object.nome
 divMoves.innerHTML = `Some Moves: ${Object.values(object.moves[0])[0].name}, 
 ${Object.values(object.moves[1])[0].name}, 
 ${Object.values(object.moves[2])[0].name}, 
 ${Object.values(object.moves[3])[0].name}, 
 ${Object.values(object.moves[4])[0].name}`
 
 divImage.appendChild(img)
 divImageBack.appendChild(imgBack)

 li.appendChild(divNome)
 li.appendChild(divImage)
 li.appendChild(divImageBack)
 li.appendChild(divMoves)

 pokemonContainer.appendChild(li)   
}

const fetchPokemon = (number) => {
   fetch(`${url}/${number}`)
    .then((response) => response.json()).then((data) => {
        newObj = {
            image: data.sprites.front_default,
            backimage: data.sprites.back_default,
            nome: data.name,
            moves: data.moves,
        }
        appendPoke(newObj)
    });
}
// estrutura de requisição de API
// fetchPokemon = (nome) ={
//     const chamadaFetch = fetch (`${url}/${nome}`)
//     console.log('Fetch', chamadaFetch)
//     const fetchJson = chamadaFetch.then((response) => response.json())
//     console.log('FetchJson', fetchJson)
//     fetchJson.then((data) => console.log('fetchData', data))
// } fetchPokemon('pikachu')


function arrayGenerator() {
 cleanAll()
 document.querySelector('p').innerHTML = ''
 const pokemonArray = [];
    for (let index = 0; index < 6; index += 1) {
        const randomNumber = Math.floor(Math.random() * 151)
        pokemonArray.push(randomNumber)
    }
 pokemonArray.forEach((element) => {
 fetchPokemon(element)
 })
}

const button = document.querySelector('.btn')
button.addEventListener('click', arrayGenerator)

function cleanAll() {
    while (pokemonContainer.firstChild) {
        pokemonContainer.removeChild(pokemonContainer.lastChild);
    }
    document.querySelector('p').innerHTML = "It's time to draw your pokemons!"
}

const cleanButton = document.querySelector('.cleanBtn')
cleanButton.addEventListener('click',cleanAll)