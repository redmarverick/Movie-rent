const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const POST_ID = 's7btJtYhBZ65macF6zS3';
const URL = `${BASE_URL}${POST_ID}/comments`;

export const postComment = async (data) => {
  console.log(JSON.stringify(data));
  await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getComment = async (itemID) => {
  let results;
  try {
    const GET_COMMENTS_URL = `${URL}?item_id=${itemID}`;
    const response = await fetch(GET_COMMENTS_URL);
    if (!response.ok) {   
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    results = await response.json();    
  } catch (error) {
    results = [];
    console.log(results);
  }
  return results;
};