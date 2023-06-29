import refs from "./serves/refs";
import { userRequest } from ".";
const{galleryEl,loadMore}=refs


function creatMarkupCard(creatCards) {
  
    // console.log(creatCards);
    // if (creatCards.length === 0) {
    //     console.log('Sorry, there are no images matching your search query. Please try again.');
    // } else {
  
  return creatCards
        .map(creatCard => `<div class="photo-card">
  <img src="${creatCard.webformatURL}" alt="${creatCard.tags}" class="photo" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${creatCard.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${creatCard.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${creatCard.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${creatCard.downloads}</b>
    </p>
  </div>
</div>`).join('')
     
      // loadMore.hidden = false;
      //   console.log(`Hooray! We found ${userRequest} images.`);
  }
  


export { creatMarkupCard };
