import { fetchImages, perPage } from './js/fetchImages';
import { getTemplate } from './js/getTemplate';
import { Notify } from 'notiflix';
import { icons } from 'feather-icons';
import SimpleLightbox from 'simplelightbox';

import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imagesContainer: document.querySelector('.gallery'),
  btnSearcher: document.querySelector('.btn'),
  btnLoader: document.querySelector('.load-more'),
};

let page = 1;
let valueTrim = '';

// ARROW fUNCTIONS
const createLightbox = () => {
  const lightbox = new SimpleLightbox('.gallery a', {
    scrollZoom: false,
  });
  return lightbox;
};

const renderImages = images => {
  const image = images.map(image => getTemplate(image)).join('');
  refs.imagesContainer.insertAdjacentHTML('beforeend', image);
};

const createSmoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const onLoadMore = () => {
  fetchImages(valueTrim, page).then(images => {
    console.log('onLoadMore виконується', page);
    const totalPages = images.totalHits / perPage;

    renderImages(images.hits);
    createLightbox().refresh();
    createSmoothScroll();
    page += 1;
    console.log('onLoadMore записалась і порівнюється', page);

    if (totalPages < page) {
      refs.btnLoader.classList.remove('is-visibility');
      return;
    }
  });
};

const clearContainer = () => {
  refs.btnLoader.classList.remove('is-visibility');
  refs.imagesContainer.innerHTML = '';
};

const onFormSubmit = event => {
  event.preventDefault();
  page = 1;

  const { value } = event.target.elements.searchQuery;
  valueTrim = value.trim();

  if (valueTrim === '') {
    clearContainer();
    Notify.info('Please, enter some name');
    return;
  }

  clearContainer();

  fetchImages(valueTrim, page).then(images => {
    console.log(page);
    const totalPages = images.totalHits / images.hits.length;

    if (images.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${images.totalHits} images.`);
    if (totalPages > page) {
      refs.btnLoader.classList.add('is-visibility');
    }

    renderImages(images.hits);
    createLightbox();
    page += 1;
  });
};

const transformBtn = () => {
  refs.btnSearcher.innerHTML = icons.search.toSvg({ color: 'grey' });
};

transformBtn();

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.btnLoader.addEventListener('click', onLoadMore);
