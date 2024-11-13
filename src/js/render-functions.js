export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images
      .map(
        ({ webformatURL, largeImageURL, tags, likes = 0, views = 0, comments = 0, downloads = 0 }) => `
        <div class="photo-card">
          <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
         <div class="info">
          <p class="info-item"><b>Likes:</b> ${likes}</p>
          <p class="info-item"><b>Views:</b> ${views}</p>
          <p class="info-item"><b>Comments:</b> ${comments}</p>
          <p class="info-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </div>
      `
      )
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
  }
  
  export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
  }
  