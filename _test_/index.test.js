const { toggleLike } = require('../src/index.js');

describe('like test', () => {
  let counter;

  beforeEach(() => {
    document.body.innerHTML = '<div id="nav-counter"></div>';
  });

  test('toggleLike to add movie likes', () => {
    const movieLike = document.getElementById('item82-likes');
    toggleLike('82');

    expect(movieLike.textContent).toBe('1');
  });
});
