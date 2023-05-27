import { createMovieElement } from './movieUtils.js';

export const moviesData = {
  movieIndex: ['169', '82', '431', '1824', '28276', '41007', '11538', '38052', '43031', '15299'],
  likes: [],
  comments: [{
    date: '2023-05-28',
    name: 'John Doe',
    comment: 'This movie is fantastic!',
  }],
};

const appId = 's7btJtYhBZ65macF6zS3';
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

async function getMoviesData() {
  const url = `${baseUrl}/apps/${appId}/likes`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      // Initialize likes array with 0 values
      moviesData.likes = Array(moviesData.movieIndex.length).fill(0);

      data.forEach((item) => {
        for (let i = 0; i < moviesData.movieIndex.length; i++) {
          const movieId = moviesData.movieIndex[i];
          if (item.item_id === movieId) {
            moviesData.likes[i] = item.likes;
          }
        }
      });
    } else {
      throw new Error('Error fetching likes data');
    }
  } catch (error) {
    throw new Error('Error fetching likes data');
  }
}

async function saveMoviesData(movieId, value) {
  const url = `${baseUrl}/apps/${appId}/likes`;

  try {
    const index = moviesData.movieIndex.indexOf(movieId);
    if (index !== -1) {
      const likesC = [];
      const movieIdWa = [];
      likesC[0] = moviesData.likes[index];
      movieIdWa[0] = movieId;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: movieIdWa,
          likes: value,
        }),
      });
      getMoviesData();
    } else {
      throw new Error('erro');
    }
  } catch (error) {
    throw new Error('erro');
  }
}

async function toggleLike(itemId) {
  const heartIcon = document.getElementById(`${itemId}-heart`);
  const likeCount = document.getElementById(`${itemId}-likes`);
  const movieId = itemId.substring(4);
  const movieIndex = moviesData.movieIndex.indexOf(movieId);
  const isLiked = heartIcon.classList.contains('fas');
  let value = 0;
  if (isLiked) {
    moviesData.likes[movieIndex] += 1;
    value = +1;
  } else {
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas');
    moviesData.likes[movieIndex] += 1;
    value = +1;
  }
  likeCount.textContent = moviesData.likes[movieIndex];
  await saveMoviesData(movieId, value);
}

async function fetchMovieData(movieId) {
  const response = await fetch(`https://api.tvmaze.com/shows/${movieId}`);
  const data = await response.json();
  
  const genres = data.genres.join(', ');

  const movieData = {
    id: data.id,
    name: data.name,
    image: data.image.medium,
    genre: genres,
    status: data.status,
    premiered: data.premiered,
    language: data.language,
  };

  return movieData;
}

function updateMovieDetails(movieId) {
  fetchMovieData(movieId)
    .then((data) => {
      const itemId = `item${movieId}`;
      const movieElement = createMovieElement(data, itemId, toggleLike);
      const gridContainer = document.getElementById('moviesContainer');
      gridContainer.appendChild(movieElement);
    })
    .catch((error) => {
      throw error;
    });
}

async function initializeApp() {
  await getMoviesData();
  moviesData.movieIndex.forEach((movieId) => {
    updateMovieDetails(movieId);
  });
}

initializeApp();

export default { moviesData };