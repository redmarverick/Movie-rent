import { moviesData } from './index.js';
import { popupWins } from './popup.js';

let index = 0;

export function createMovieElement(movieData, itemId, toggleLike) {
  const movieElement = document.createElement('div');
  const moviesContainer = document.getElementById('moviesContainer');
  index = moviesContainer.childElementCount;
  const movieLink = document.getElementById('moviesLink');
  movieLink.textContent = `Movies (${index + 1})`;
  const movieId = moviesData.movieIndex[index];
  movieElement.id = `item${movieId}`;
  movieElement.className = 'movie-card w-64 p-4 bg-gray-800 text-white rounded';
  movieElement.style.display = 'flex';
  movieElement.style.flexFlow = 'column';

  const infoContainer = document.createElement('div');
  infoContainer.className = 'flex';

  const imgElement = document.createElement('img');
  imgElement.src = movieData.image.medium;
  imgElement.alt = movieData.name;
  imgElement.className = 'movie-image rounded-md';
  movieElement.appendChild(imgElement);

  const titleElementHolder = document.createElement('div');
  titleElementHolder.className = 'flex-grow';
  const titleElement = document.createElement('h2');
  titleElement.textContent = movieData.name;
  titleElement.className = 'movie-title mt-2 text-lg overflow-hidden';
  titleElementHolder.appendChild(titleElement);
  infoContainer.appendChild(titleElementHolder);

  const likesElement = document.createElement('div');
  likesElement.className = 'movie-likes flex mt-3';

  const heartIconElement = document.createElement('span');
  heartIconElement.className = 'movie-heart-icon text-red-500 mr-1';
  const heartIcon = document.createElement('i');
  heartIcon.id = `${itemId}-heart`;
  heartIcon.className = 'far fa-heart';
  heartIconElement.appendChild(heartIcon);
  likesElement.appendChild(heartIconElement);
  infoContainer.appendChild(likesElement);

  movieElement.appendChild(infoContainer);

  const likesCountElement = document.createElement('span');
  likesCountElement.id = `${itemId}-likes`;
  likesCountElement.textContent = moviesData.likes[index] !== undefined ? moviesData.likes[index].toString() : '';
  likesElement.appendChild(likesCountElement);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'movie-buttons mt-2 flex';

  const commentsButton = document.createElement('button');
  commentsButton.className = 'bg-blue-800 text-white py-2 px-4 rounded-md mt-2 mx-auto';
  commentsButton.textContent = 'Comments';
  buttonContainer.appendChild(commentsButton);
  commentsButton.addEventListener('click', () => popupWins(moviesContainer));

  movieElement.appendChild(buttonContainer);

  heartIcon.addEventListener('click', () => toggleLike(itemId));

  return movieElement;
}
