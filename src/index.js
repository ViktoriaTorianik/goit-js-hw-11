
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
    (galleryEl.innerHTML = creatMarkupCard(data.hits)))

  loadMore.hidden = false
}
loadMore.addEventListener('click', onNextPage) 

function onNextPage() {
  
   page += 1
  fetchPhoto(userRequest)
    .then((data) => {
      galleryEl.insertAdjacentHTML("beforeend", creatMarkupCard(data.hits))
      console.log(data.hits);
      if (data.page===data.totalHits){
        loadMore.hidden = true
      }
    })
    .catch(console.log());
  
    
}
export { userRequest };