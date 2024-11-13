import axios from 'axios';

const API_KEY = '47057239-824e754b75c5fca36ae14ba66'; 
const BASE_URL = 'https://pixabay.com/api/';


export async function fetchImages(query, page = 1) {
  const perPage = 15;
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}