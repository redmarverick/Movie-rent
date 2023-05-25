const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const POST_ID = 's7btJtYhBZ65macF6zS3';
const URL = `${BASE_URL}${POST_ID}/scores/`;

// POST action: get scores from users
export const postComment = async (data) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const results = await response.json();
  return results.result;
};

// GET action: get scores from API
export const getComment = async () => {
  const response = await fetch(URL);
  const results = await response.json();
  return results.result;
};