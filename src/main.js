import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a');

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.getElementById('loader');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

async function onSearch(event) {
  event.preventDefault();
  clearGallery();
  currentQuery = event.currentTarget.elements.query.value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  showLoader();
  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found. Please try a different query.',
      });
      loadMoreButton.classList.add('hidden');
      return;
    }
    renderImages(data.hits);
    lightbox.refresh();
    loadMoreButton.classList.remove('hidden');
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();
  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);
    lightbox.refresh();
    smoothScroll();

    if (data.hits.length < 15 || data.totalHits <= currentPage * 15) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

