const API = 'LSeH0tYcods9y0e9cVgvUClaagBcVhq0oQHvAH9H3TCHyA4Y6p2rd4nm'
const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.search-form')
let searchValue;
const more = document.querySelector('.more')
let page = 1;
let fetchLink;
let currentSearch;

//Event listeners 
searchInput.addEventListener('input', updateInput);

form.addEventListener('submit', (e) => {
  e.preventDefault()
  currentSearch = searchValue
  searchPhotos(searchValue)
})

more.addEventListener('click', loadmore)

function updateInput(e) {
  searchValue = e.target.value
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: API
    }
  })
  const data = await dataFetch.json();
  return data;
}

function generatePics(data) {
    data.photos.forEach(photo => { 
    console.log(photo)
    const galleryImg = document.createElement('div')
    galleryImg.classList.add('gallery-img')
      galleryImg.innerHTML = `
    <div class='gallery-info'>
      <p>${photo.photographer}</p>
      <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large}></img>
    `
    gallery.appendChild(galleryImg)
  })
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
  const data = await fetchApi(fetchLink)
  generatePics(data);
}

async function searchPhotos(query) {
  Clear()
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  const data = await fetchApi(fetchLink)
  generatePics(data)
}

function Clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function loadmore() {
  page++;
  if (currentSearch) {
    `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
  } else {
    `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
  }
  const data = await fetchApi(fetchLink)
  generatePics(data)
}

curatedPhotos()