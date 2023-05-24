import { createMovieElement } from './movieUtils.js';

export const moviesData = {
  movieIndex: ['169', '82', '431'],
  likes: [0,0,0],
};

const appId = 's7btJtYhBZ65macF6zS3';
const baseUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi";

async function saveMoviesData(movieId,value) {
  const url = `${baseUrl}/apps/${appId}/likes`;

  try {
    const index = moviesData.movieIndex.indexOf(movieId);
    console.log(index);
    if (index !== -1) {
      let likesC = [];
      let movieIdWa = [];
      likesC[0] = moviesData.likes[index];
      movieIdWa[0] = movieId;
      console.log(movieId,' : ',moviesData.likes[index]);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: movieIdWa,
          likes: value,
        }),
      });
      getMoviesData();

      if (response.status === 201) {
        console.log(`Movie ${movieId} data saved successfully`);
      } else {
        console.error(`Failed to save movie ${movieId} data. Status: ${response.status}`);
      }
    } else {
      console.error(`Movie ${movieId} not found in the movie index`);
    }
  } catch (error) {
    console.error("Error saving movie data:", error);
  }
}

async function getMoviesData() {
  const url = `${baseUrl}/apps/${appId}/likes`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      // Update the existing likes in moviesData.likes
      moviesData.likes = [0,0,0]; // Set initial likes count to 0

      for (var i = 0; i < moviesData.movieIndex.length; i++) {
        var movieId = moviesData.movieIndex[i];
        var count = 0;
      
        data.forEach(function(item) {
          for(let j=0; j<moviesData.movieIndex.length; j += 1)
          {
            if (item.item_id[j] === movieId) {
              moviesData.likes[i] += item.likes;
            }
          }
        });
        //console.log(moviesData.movieIndex[i],' = ',moviesData.likes[i]);
      }
      

      console.log("Movies data retrieved successfully");
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
  let value = 0;
  if (isLiked) {
    moviesData.likes[movieIndex]++;
    value = +1;
  } else {
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas');
    console.log(moviesData.likes[movieIndex]);
    moviesData.likes[movieIndex]++;
    console.log(moviesData.likes[movieIndex]);
    value = +1;
  }
  likeCount.textContent = moviesData.likes[movieIndex];
  await saveMoviesData(movieId,value);
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

function updateMovieDetails(movieId) {
  fetchMovieData(movieId)
    .then((data) => {
      const itemId = `item${movieId}`;
      const movieElement = createMovieElement(data, itemId, toggleLike);
      const gridContainer = document.querySelector('.grid');
      gridContainer.appendChild(movieElement);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

async function initializeApp() {
  try {
    await getMoviesData();

    moviesData.movieIndex.forEach((movieId) => {
      updateMovieDetails(movieId);
    });
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

initializeApp();
