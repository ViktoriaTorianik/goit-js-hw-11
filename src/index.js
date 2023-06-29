
import Notiflix from 'notiflix';
import refs from './serves/refs';
import { creatMarkupCard } from './crateMarcup';
import { fetchPhoto } from './serves/fetch';
import { perPage } from './serves/fetch';
const{formEl,galleryEl,loadMore}=refs
let page = 1
let userRequest = null


formEl.addEventListener('submit', sendRequest)
function sendRequest(e) {
  e.preventDefault()
  userRequest = e.target.firstElementChild.value.trim()
  e.target.firstElementChild.value = ""
  if (userRequest === "") {
    return
  }
  console.log(userRequest);
  fetchPhoto(userRequest).then((data) => 
  {(galleryEl.innerHTML = creatMarkupCard(data.hits))  
    if (perPage < data.totalHits) {
      loadMore.hidden = false;
     Notiflix.Notify.success("Hooray! We found totalHits images.")
    }
    if (data.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
    loadMore.hidden = true
    }
    })
  
};
loadMore.addEventListener('click', onNextPage) 

function onNextPage() {
 
   page += 1
  fetchPhoto(userRequest, page)
    .then((data) => {
      galleryEl.insertAdjacentHTML("beforeend", creatMarkupCard(data.hits))
      console.log(data.hits.length);
      console.log(data.totalHits);
      console.log(perPage*page);
      if (data.totalHits<=perPage*page){
        loadMore.hidden = true
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }
    })
    .catch(console.log());
  
    
}
export { userRequest };