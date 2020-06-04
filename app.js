const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')
const apiURL = `https://api.lyrics.ovh/`

const fetchsongsterm = async term => {
    const response = await fetch(`${apiURL}/suggest/${term}`)
    const data = await response.json()
    console.log(data)
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