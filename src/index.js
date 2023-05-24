const moviesData = {
  movieIndex: ['169', '82', '431'],
  likes: [],
};

let index = 0;
const appId = 's7btJtYhBZ65macF6zS3';
const baseUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi";

async function saveMoviesData() {
  const url = `${baseUrl}/apps/${appId}/likes`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: moviesData.movieIndex,
        likes: moviesData.likes,
      }),
    });

    if (response.status === 201) {
      console.log("Movies data saved successfully");
    } else {
      console.error(`Failed to save movies data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error saving movies data:", error);
  }
}

async function getMoviesData() {
  const url = `${baseUrl}/apps/${appId}/likes`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      // Update the existing likes in moviesData.likes
      moviesData.likes = moviesData.movieIndex.map((movieId) => {
        const item = data.find((item) => item.item_id === movieId);
        return item ? item.likes : 0;
      });

      console.log("Movies data retrieved successfully");
      console.log(moviesData);
    } else {
      console.error(`Failed to get movies data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error getting movies data:", error);
  }
}

async function toggleLike(itemId) {
  const heartIcon = document.getElementById(`${itemId}-heart`);
  const likeCount = document.getElementById(`${itemId}-likes`);
  const movieId = itemId.substring(4);
  const movieIndex = moviesData.movieIndex.indexOf(movieId);
  const isLiked = heartIcon.classList.contains('fas');

  if (isLiked) {
    heartIcon.classList.remove('fas');
    heartIcon.classList.add('far');
    moviesData.likes[movieIndex]--;
  } else {
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas');
    moviesData.likes[movieIndex]++;
  }
  likeCount.textContent = moviesData.likes[movieIndex];

  await saveMoviesData();
}

async function fetchMovieData(movieId) {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${movieId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

function createMovieElement(movieData, itemId) {
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

function updateMovieDetails(movieId) {
  fetchMovieData(movieId)
    .then((data) => {
      const itemId = `item${movieId}`;
      const movieElement = createMovieElement(data, itemId);
      const gridContainer = document.querySelector('.grid');
      gridContainer.appendChild(movieElement);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

async function initializeApp() {
  await getMoviesData();

  moviesData.movieIndex.forEach((movieId) => {
    updateMovieDetails(movieId);
  });
}

initializeApp();
