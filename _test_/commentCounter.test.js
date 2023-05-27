import countComments from '../src/commentCounter.js';

describe('test if counter works properly', () => {
  let comments = [
    {
      comment: 'This is my favorite one!',
      creation_date: '2023-05-23',
      username: 'abc',
    },
    {
      comment: 'No idea why people like it',
      creation_date: '2023-05-23',
      username: 'Gs',
    },
    {
      comment: 'Worth to watch!',
      creation_date: '2023-05-23',
      username: 'AS',
    },
  ];

  test('test if counter is able to count the amount of comments', () => {
    expect(countComments(comments)).toBe(3);
  });

  test('it should return 0 when there are no comment', () => {
    comments = [];
    expect(countComments(comments)).toBe(0);
  });
});