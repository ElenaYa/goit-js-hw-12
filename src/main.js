'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const buttonLoadMore= document.querySelector('.btn-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const per_page = 40;
let page = 1;
let userSearch = '';

form.addEventListener('submit', handleSubmit);
buttonLoadMore.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  userSearch = form.search.value.trim();

  buttonLoadMore.classList.add('hide');
  const images = await fetchImages();

  if (images.hits.length === 0) {
    iziToast.error({
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: '#ef4040',
                    messageSize: '16px',
                    messageColor: '#fafafb',
    });
  } else if (images.hits.length < per_page) {
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
       backgroundColor: '#ef4040',
                    messageSize: '16px',
                    messageColor: '#fafafb',
    });
  } else {
    buttonLoadMore.classList.remove('hide');
  }

  form.reset();
  renderImages(images);
}

async function handleLoadMore() {
  page += 1;

  buttonLoadMore.classList.add('hide');
  const images = await fetchImages();

  if (page >= Math.ceil(images.totalHits / per_page)) {
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
       backgroundColor: '#ef4040',
       messageSize: '16px',
       messageColor: '#fafafb',
    });
  } else {
    buttonLoadMore.classList.remove('hide');
  }

  renderImages(images);
  moveCard();
}
async function fetchImages() {
  loader.classList.remove('hide');
  try {
    const images = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '41563330-08ed4e1341b4edecabdae7272',
        q: userSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: page,
      },
    });
    return images.data;
  } catch (error) {
    console.log(error.message);
    iziToast.error({
      position: 'topRight',
      message: 'Sorry, service unavailable.',
       backgroundColor: '#ef4040',
                    messageSize: '16px',
                    messageColor: '#fafafb',
    });
  } finally {
    loader.classList.add('hide');
  }
}

function renderImages(images) {
  const markup = images.hits.reduce(
    (
      html,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) => {
      return (
        html +
        `<li class='gallery-item'>
              <a class='gallery-link' href='${largeImageURL}'>
                <img
                    class='gallery-image'
                    src='${webformatURL}'
                    alt='${tags}'
                    width='360'
                    height='200'
                    />
              </a>
              <p class='gallery-tags'>Tags: ${tags}</p>
              <ul class='gallery-statistic'>
                  <li><p class='statistic'>💗 Likes<span>${likes}</span></p></li>
                  <li><p class='statistic'>👁️ Views<span>${views}</span></p></li>
                  <li><p class='statistic'>💬 Comments<span>${comments}</span></p></li>
                  <li><p class='statistic'>💌 Downloads<span>${downloads}</span></p></li>
              </ul>
            </li>`
      );
    },
    ''
  );
   gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
function moveCard() {
  const card = document.querySelector('.gallery-item');
  const domRect = card.getBoundingClientRect().height;

  window.scrollBy({
    top: domRect * 2,
    behavior: 'smooth',
  });
}
