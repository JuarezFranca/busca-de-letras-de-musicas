const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')
const apiURL = `https://api.lyrics.ovh/`

const getMoreSongs = async url => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await response.json()
    insertSongsIntoPage(data)

}

const insertSongsIntoPage = songsInfo => {
    songsContainer.innerHTML = songsInfo.data.map(song => `
    <li class="song">
        <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist"${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `).join('')
    
    if (songsInfo.prev || songsInfo.next){
        prevAndNextContainer.innerHTML = `
        ${songsInfo.prev ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Anteriores</button>` : ''}
        ${songsInfo.next ? `<button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Próximas</button>` : ''}`
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

    if (!searchTerm) {
        songsContainer.innerHTML = `<li class="warning-message">por favor, digite um termo válido</li>`
        return
    }

    fetchsongsterm(searchTerm)

    
})