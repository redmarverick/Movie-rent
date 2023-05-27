import 'index.js';

describe('item count test', () => {
  let counter;

  beforeEach(() => {
    counter = { showsTotal: 0 };
    document.body.innerHTML = `
    <nav class="space-x-4">
      <a id="moviesLink" href="#" class="text-white">Movies</a>
      <a href="#" class="text-white">Actors</a>
      <a href="#" class="text-white">Directors</a>
    </nav>
  `;
  });

  test('item count check', () => {
    const moveiItems = document.getElementById('moviesLink');

    expect(moveiItems.textContent).toBe('Movies(1)');
  });
});
