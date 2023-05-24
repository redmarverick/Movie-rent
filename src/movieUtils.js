let index = 0;

const moviesData = {
  movieIndex: ['169', '82', '431'],
  likes: [0, 0, 0],
};

export function createMovieElement(movieData, itemId, toggleLike) {
  const movieElement = document.createElement('div');
  const moviesContainer = document.getElementById('moviesContainer');
  index = moviesContainer.childElementCount;
  const movieId = moviesData.movieIndex[index];
  movieElement.id = `item${movieId}`;
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
  heartIcon.id = `${itemId}-heart`;
  heartIcon.className = 'far fa-heart';
  heartIconElement.appendChild(heartIcon);
  likesElement.appendChild(heartIconElement);

  const likesCountElement = document.createElement('span');
  likesCountElement.id = `${itemId}-likes`;
  likesCountElement.textContent = moviesData.likes[index] !== undefined ? moviesData.likes[index].toString() : '';
  likesElement.appendChild(likesCountElement);
  movieElement.appendChild(likesElement);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'movie-buttons mt-2 flex';

  const commentsButton = document.createElement('button');
  commentsButton.className = 'movie-button mr-2';
  commentsButton.textContent = 'Comments';
  buttonContainer.appendChild(commentsButton);

  const reservationsButton = document.createElement('button');
  reservationsButton.className = 'movie-button';
  reservationsButton.textContent = 'Reservations';
  buttonContainer.appendChild(reservationsButton);

  movieElement.appendChild(buttonContainer);

  heartIcon.addEventListener('click', () => toggleLike(itemId));

  return movieElement;
}