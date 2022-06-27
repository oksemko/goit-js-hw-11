import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ServiceAPI from './service-api';
import markup from './markup';

const form = document.querySelector('.search-form');
const searchButton = document.querySelector('[type=submit]');
const gallery = document.querySelector('.gallery');

const options = {
  simpleLightBox: {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  },
  intersectionObserver: {
    root: null,
    threshold: 1,
  },
};

const loadService = new ServiceAPI();

form.addEventListener('submit', onFormSubmit);

const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    observer.unobserve(entries[0].target);
    loadPictures();
  }
};
const observer = new IntersectionObserver(callback, options.intersectionObserver);

let galleryLightBox = new SimpleLightbox('.gallery a', options.simpleLightBox);

function onFormSubmit(e) {
  e.preventDefault();

  const isFilled = e.currentTarget.elements.searchQuery.value;
  if (isFilled) {
    searchButton.disabled = true;
    loadService.searchQuery = isFilled;
    loadService.resetPage();
    gallery.innerHTML = '';
    loadPictures();
  }
}
