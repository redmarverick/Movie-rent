const countMovies = () => {
  const moviesContainer = document.querySelectorAll('.movie-card');
  return moviesContainer.length;
};

export default countMovies;