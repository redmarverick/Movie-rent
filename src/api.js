const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const POST_ID = 's7btJtYhBZ65macF6zS3';
const URL = `${BASE_URL}${POST_ID}/comments`;

// POST action: get scores from users
export const postComment = async (data) => {
  await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// GET action: get scores from API
export const getComment = async (itemID) => {
  const GET_COMMENTS_URL = `${URL}?item_id=${itemID}`;
  const response = await fetch(GET_COMMENTS_URL);
  const results = await response.json();
  return results;
};