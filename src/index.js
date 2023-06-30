
import Notiflix from 'notiflix';
import refs from './serves/refs';
import { creatMarkupCard } from './crateMarcup';
import { fetchPhoto } from './serves/fetch';
import { perPage } from './serves/fetch';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

var lightbox = new SimpleLightbox('.gallery a', 
{ captionDelay: "250"})
const { formEl, galleryEl, loadMore } = refs

let page = 0
let userRequest = null

formEl.addEventListener('submit', sendRequest)
function sendRequest(e) {
  e.preventDefault()
  userRequest = e.target.firstElementChild.value.trim()
  e.target.firstElementChild.value = ""
  if (userRequest === "") {
    return
  }
  page=1
  fetchPhoto(userRequest, page).then((data) => 
  {
    (galleryEl.innerHTML = creatMarkupCard(data.hits))
    if (perPage < data.totalHits) {
      loadMore.hidden = false;
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
    }
    if(perPage > data.totalHits & data.totalHits!==0) {
      loadMore.hidden = true;
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
    }
    if (data.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
    loadMore.hidden = true
    };
     lightbox.refresh()
    }).catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
 
};
loadMore.addEventListener('click', onNextPage) 

function onNextPage() {
 
   page += 1
  fetchPhoto(userRequest, page)
    .then((data) => {
      galleryEl.insertAdjacentHTML("beforeend", creatMarkupCard(data.hits))
      if (data.totalHits<=perPage*page){
        loadMore.hidden = true
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }
      lightbox.refresh()
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
  
}
export { userRequest };