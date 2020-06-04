//consts que armazenam tags html inseridas no index como tambem o endereço http da api
const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')
const apiURL = `https://api.lyrics.ovh/`

//function responsavel por trazer as informações da API
const getMoreSongs = async url => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await response.json()
    insertSongsIntoPage(data)

}

// mostra na pagina o nome da musica e nome do artista linkando com o cod HTML
const insertSongsIntoPage = songsInfo => {
    songsContainer.innerHTML = songsInfo.data.map(song => `
    <li class="song">
        <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist"${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `).join('')
    
    // insire os botoes e invoca suas determinadas funções 
    if (songsInfo.prev || songsInfo.next){
        prevAndNextContainer.innerHTML = `
        ${songsInfo.prev ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Anteriores</button>` : ''}
        ${songsInfo.next ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Próximas</button>` : ''}
        `
        return
    }

    prevAndNextContainer.innerHTML = ''
}

const fetchsongsterm = async term => {
    const response = await fetch(`${apiURL}/suggest/${term}`)
    const data = await response.json()
    insertSongsIntoPage(data)
}



form.addEventListener('submit', event => { // executa uma ação quando o formulario for enviado 
    event.preventDefault() // evita o envio do formulario

    const searchTerm = searchInput.value.trim() // trim; remove caracteres em branco antes ou depois
    
    // function que avalia se o usuario inseriu um termo valido
    if (!searchTerm) {
        songsContainer.innerHTML = `<li class="warning-message">por favor, digite um termo válido</li>`
        return
    }

    fetchsongsterm(searchTerm)
})

const fetchLyrics = async (artist, songTitle) => {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
    const data = await response.json()  
}

songsContainer.addEventListener('click', event => {
    const clickedElement = event.target

    if (clickedElement.tagname === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist')
        const songTitle = clickedElement.getAttribute('data-song-title')
        fetchLyrics(artist, songTitle)
    }
})