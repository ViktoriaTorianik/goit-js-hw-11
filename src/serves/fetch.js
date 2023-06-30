import axios from "axios";
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "37602273-ee76d535e0302dd8a6c170e2a";

const perPage = 40;

async function fetchPhoto(userFetch, page) {
     try {
     const response = await axios.get(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${userFetch}&page=${page}&per_page=${perPage}`)
     
          return response.data

} catch (error) {
 Notiflix.Notify.info(`server not responding, please try again later`)
}
}

export { fetchPhoto, perPage };
