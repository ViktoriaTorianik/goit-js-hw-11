function creatMarkupCard(creatCards,page) {
  
  return creatCards
    .map(creatCard => `<a href="${creatCard.largeImageURL}" class="gallery__link"> 
        <div class="photo-card">
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
  }
  
export { creatMarkupCard };
