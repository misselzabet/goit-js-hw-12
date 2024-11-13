import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  console.log('Форма надіслана');
  clearGallery();
  currentQuery = event.currentTarget.elements.query.value.trim();
  if (!currentQuery) return;
  currentPage = 1;
  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      alert('No images found. Please try a different query.');
      loadMoreButton.classList.add('hidden');
      return;
    }
    renderImages(data.hits);
    loadMoreButton.classList.remove('hidden');
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  currentPage += 1;
  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);

    if (data.hits.length < 15 || data.totalHits <= currentPage * 15) {
      loadMoreButton.classList.add('hidden');
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
  }
}
