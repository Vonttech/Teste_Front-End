const url = 'https://itunes.apple.com/search?term=sia&entity=album'

//Lidando com as requisições

//Recuperando os dados
let titulo_1 = document.querySelector('#titulo-1')
let titulo_2 = document.querySelector('#titulo-2')

let rlDate_1 = document.querySelector('#releaseDate-1')
let rlDate_2 = document.querySelector('#releaseDate-2')


fetch(url)
    .then(resp => resp.json())
    .then(function (data) {
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
        console.log(results)
    })
    .catch(function (error) {
        console.log(error)
    });

//Função para setar apenas o ano do album
function trataAno(releaseDate) {
    var str = String(releaseDate)
    var ano = str.slice(0, 4)
    return ano
}