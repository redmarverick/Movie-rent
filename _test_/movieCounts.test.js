/**
 * @jest-environment jsdom
 */

import countmovies from '../src/countMovies.js';


describe('item count test', () => {
  

  beforeEach(() => { 
    document.body.innerHTML = `
    <div id="moviesContainer" class="flex flex-wrap gap-4 justify-center">
      <div id="item1" class="movie-card w-64 p-4 bg-gray-800 text-white rounded" style="display: flex; flex-flow: column;">
      <div id="item2" class="movie-card w-64 p-4 bg-gray-800 text-white rounded" style="display: flex; flex-flow: column;">
      <div id="item3" class="movie-card w-64 p-4 bg-gray-800 text-white rounded" style="display: flex; flex-flow: column;">
      <div id="item4" class="movie-card w-64 p-4 bg-gray-800 text-white rounded" style="display: flex; flex-flow: column;">
  </div>
  `;
  });


  afterEach(() => {
    document.body.innerHTML = ''; 
  });


  // first test
  test('returns 4 if we have 4 movies in the movies container', () => {
    const moveiItems = document.getElementById('moviesContainer');

    expect(moveiItems.childElementCount).toBe(4)
    
  });


  // second test
  test('returns 0 when there are not movies in the container', () => {

    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = '';

    expect(moviesContainer.childElementCount).toBe(0)


  });



});