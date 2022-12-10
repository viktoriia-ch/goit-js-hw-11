import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31874825-b26954bf3f9b68024b47f53ce';

export const fetchImages = async (value, page) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: KEY,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 100,
        page: page,
      },
    });
    const data = await response.data;

    return data;
  } catch (error) {
    Notify.failure(`Sorry, cannot get a data! Error: ${error.name}`);
  }
};
