const url = 'https://itunes.apple.com/search?term=sia&entity=album'
const url_musicas = 'https://itunes.apple.com/search?term=sia&entity=album&entity=song&limit=200'

//Lidando com as requisições

//Recuperando os dados dos titulos e data
let titulo_1 = document.querySelector('#titulo-1')
let titulo_2 = document.querySelector('#titulo-2')

let rlDate_1 = document.querySelector('#releaseDate-1')
let rlDate_2 = document.querySelector('#releaseDate-2')

fetch(url)
    .then(resp => resp.json())
    .then(function (data) {
        //Dados retornados da url
        let results = data.results
        results.forEach(element => {
            if (element.collectionName == 'Everyday Is Christmas') {
                titulo_1.innerHTML = element.collectionName
                rlDate_1.innerHTML = trataAno(element.releaseDate)
            }
            if (element.collectionName == 'This Is Acting (Deluxe Version)') {
                titulo_2.innerHTML = element.collectionName
                rlDate_2.innerHTML = trataAno(element.releaseDate)
            }
        });
    })
    .catch(error => console.log(error))

//Função para setar apenas o ano do album
function trataAno(releaseDate) {
    var str = String(releaseDate)
    var ano = str.slice(0, 4)
    return ano
}


//Recuperando as musicas dos albuns
fetch(url_musicas)
    .then(resp => resp.json())
    .then(function (data) {
        //Dados retornados da url
        let results = data.results
        results.forEach(element => {
            if (element.collectionName == 'Everyday Is Christmas') {
                criaElementos('coluna-musicas-1', element)
            }
            if (element.collectionName == 'This Is Acting (Deluxe Version)') {
                criaElementos('coluna-musicas-2', element)
            }
        });
    })
    .catch(error => console.log(error))

/**
 * Função para criar os elementos no html referente a música do album
 * Tratar o tempo da música
 */
function criaElementos(id, element) {
    let div_pai = document.getElementById(id)

    let trackName = element.trackName
    //Conversão de milisegundos para minutos e segundos
    let min = Math.floor(element.trackTimeMillis / 1000 / 60 << 0)
    let sec = Math.floor((element.trackTimeMillis / 1000) % 60)

    //Criação de elementos
    let div = document.createElement('DIV')
    let div_col_esquerda = document.createElement('DIV')
    let div_col_direita = document.createElement('DIV')

    //Classes
    div.className = 'row border-top border-bottom pt-2 pb-2'
    div_col_esquerda.className = 'col-10'
    div_col_direita.className = 'col tempo'

    //Inner
    div_col_esquerda.innerHTML = trackName
    div_col_direita.innerHTML = `${min}:${sec}`

    div.appendChild(div_col_esquerda)
    div.appendChild(div_col_direita)
    div_pai.appendChild(div)
}