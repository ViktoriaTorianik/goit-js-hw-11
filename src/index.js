const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "37602273-ee76d535e0302dd8a6c170e2a"
let page = 1
let userRequest = null
const formEl = document.querySelector('.search-form')
const galleryEl = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')


loadMore.addEventListener('click', onNextPage) 

function onNextPage() {
  
  page += 1
  fetchPhoto(userRequest)
    .then((data) => {
      (galleryEl.insertAdjacentHTML("beforeend", creatMarkupCard(data.hits)))
      console.log(data.hits);
      if (data.page===data.totalHits){
        loadMore.hidden = true
      }
    })
    .catch(console.log());
  
}
function fetchPhoto(userFetch) {
  return fetch(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${userFetch}&page=${page}&per_page=40`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    });
}

function creatMarkupCard(array) {
  return array.map(({ webformatURL, largeImageURL,tags,likes,views,comments,downloads }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" class="photo" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`).join('')
}



formEl.addEventListener('submit', sendRequest)
function sendRequest(e) {
    e.preventDefault()
    userRequest = e.target.firstElementChild.value.trim()
    e.target.firstElementChild.value = ""
    if (userRequest === "") {
        return
    }
    console.log(userRequest);
  fetchPhoto(userRequest)
    .then((data) => {
      (galleryEl.innerHTML = creatMarkupCard(data.hits))
      if (data.page!==data.totalHits){
        loadMore.hidden = false
      }
    })
    .catch(console.log())
    
}