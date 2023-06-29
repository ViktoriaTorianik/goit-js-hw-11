import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "37602273-ee76d535e0302dd8a6c170e2a"
let page = 1
// let userRequest = null
const perPage = 5
async function fetchPhoto(userFetch) {
     try {
     const response = await axios.get(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${userFetch}&page=${page}&per_page=${perPage}`)
     console.log(response.data);
          return response.data

} catch (error) {
 console.log(error.message)
}
}

 console.log(fetchPhoto('cat'));
export { fetchPhoto, perPage };