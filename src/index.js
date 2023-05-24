import './index.css';
import { popupWins } from './popup.js';
let index = 0;
function toggleLike(itemId) {
  const heartIcon = document.getElementById(`${itemId}-heart`);
  const likeCount = document.getElementById(`${itemId}-likes`);

  // Check if the item is liked
  const isLiked = heartIcon.classList.contains('fas');

  if (isLiked) {
    heartIcon.classList.remove('fas');
    heartIcon.classList.add('far');
    likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
  } else {
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas');
    likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
  }
}

// List of movie IDs
const movieIds = ['169', '82', '431'];

// Function to fetch movie data from TVmaze API
async function fetchMovieData(movieId) {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${movieId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error; // Re-throw the error to reject the promise
  }
}

// Function to create movie elements
function createMovieElement(movieData) {
  const movieElement = document.createElement('div');
  const moviesContainer = document.getElementById('moviesContainer');
  index = moviesContainer.childElementCount;
  movieElement.id = `item${index + 1}`;
  movieElement.className = 'movie-item flex flex-col items-center mx-4 my-4 justify-between';

  const imgElement = document.createElement('img');
  imgElement.src = movieData.image.medium;
  imgElement.alt = movieData.name;
  imgElement.className = 'movie-image w-1/2 rounded-md';
  movieElement.appendChild(imgElement);

  const titleElement = document.createElement('h2');
  titleElement.textContent = movieData.name;
  titleElement.className = 'movie-title mt-2 text-lg h-14 overflow-hidden';
  movieElement.appendChild(titleElement);

  const likesElement = document.createElement('div');
  likesElement.className = 'movie-likes flex items-center mt-1';

  const heartIconElement = document.createElement('span');
  heartIconElement.className = 'movie-heart-icon text-red-500 mr-1';
  const heartIcon = document.createElement('i');
  heartIcon.id = `item${index + 1}-heart`;
  heartIcon.className = 'far fa-heart';
  heartIconElement.appendChild(heartIcon);
  likesElement.appendChild(heartIconElement);

  const likesCountElement = document.createElement('span');
  likesCountElement.id = `item${index + 1}-likes`;
  likesCountElement.textContent = '0';
  likesElement.appendChild(likesCountElement);
  movieElement.appendChild(likesElement);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'movie-buttons mt-2 flex'; // Added 'flex' class for flex display

  const commentsButton = document.createElement('button');
  commentsButton.className = 'movie-button mr-2';
  commentsButton.textContent = 'Comments';
  buttonContainer.appendChild(commentsButton);
  commentsButton.addEventListener('click', () => popupWins);

  const popupWin = document.createElement('div');
  popupWin.className = 'popup-container';

  const reservationsButton = document.createElement('button');
  reservationsButton.className = 'movie-button';
  reservationsButton.textContent = 'Reservations';
  buttonContainer.appendChild(reservationsButton);
  
  movieElement.appendChild(buttonContainer);

  heartIcon.addEventListener('click', () => toggleLike(movieElement.id));

  return movieElement;
}

// Function to update the movie details in the DOM
function updateMovieDetails(movieId) {
  fetchMovieData(movieId)
    .then((data) => {
      const movieElement = createMovieElement(data);
      const gridContainer = document.querySelector('.grid');
      gridContainer.appendChild(movieElement);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

movieIds.forEach((movieId) => {
  updateMovieDetails(movieId);
});
