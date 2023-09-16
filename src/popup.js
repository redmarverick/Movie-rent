import { postComment, getComment } from './api.js';

const updateCount = (comments) => {
  const title = document.getElementById('comment-title');
  if (comments === undefined) {
    title.textContent = 'Comments (0)';
  } else {
    title.textContent = `Comments (${comments})`;
  }
};
const getComments = async (itemID) => {
  const title = document.getElementById('comment-title');
  const commentList = document.querySelector('.comment-container');
  let refreshNewComment = await getComment(itemID);
  try {
    if (Array.isArray(refreshNewComment)) {
      commentList.innerHTML = '';
      const numberOfComments = refreshNewComment.length;
      refreshNewComment.forEach((rnc) => {
        const newCommentx = document.createElement('li');
        newCommentx.className = 'oneComment';
        newCommentx.innerHTML = `
        <p class="text-gray-400 text-xs">${rnc.creation_date} - ${rnc.username}</p>
        <p class="text-white">${rnc.comment}</p>`;
        commentList.appendChild(newCommentx);
        if (numberOfComments > 0) {
          updateCount(numberOfComments);
        } else {
          title.textContent = 'Comments (0)';
        }
      });
    } else {
      title.textContent = 'Comments (0)';
    }
  } catch (error) {
    refreshNewComment = [];
  }
};

const createComment = (movieElementId) => {
  const form = document.getElementById('comment-form');
  const formName = document.getElementById('name');
  const formComment = document.getElementById('comments');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const createDate = new Date();
    const newName = formName.value;
    const newComment = formComment.value;
    const commentObj = {
      item_id: movieElementId,
      username: newName,
      comment: newComment,
      creation_date: createDate,
    };
    formName.value = '';
    formComment.value = '';
    await postComment(commentObj);
    getComments(movieElementId);
  });
};

const popupWins = (root, title, img, genre, status, premiered, lang, movieElementId) => {
  if (root.querySelector('.popup-container')) { root.lastElementChild.remove(); }
  document.body.classList.add('overflow-hidden');
  const overlay = document.createElement('div');
  overlay.className = 'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-20';
  const modal = document.createElement('div');
  modal.className = 'popup-container max-h-screen overflow-auto fixed h-max w-11/12 md:h-5/6 md:w-1/2 z-30 bg-gray-800 rounded-lg p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col';

  modal.innerHTML = `
      <div>
        <div class="modal-top">
          <span class="absolute top-4 right-4 text-white text-xl cursor-pointer close-icon"><i class="fas fa-times" aria-hidden="true"></i></span >
          <div class="text-white flex flex-col items-start">
            <h1 class="text-2xl">${title}</h1>
            <div class="my-3 flex items-start w-full">
              <img class="md:h-72 h-64" src="${img}" alt="${title}" class="mr-4 w-">
              <div class="ml-3 bg-gray-900 rounded-lg w-full md:h-72 h-64 p-4 overflow-auto">
                <h2 id="comment-title"></h2>
                <ul class="comment-container w-full bg-gray-900 rounded-lg p-4 overflow-auto">
                </ul>
              </div>
          </div>
          <p>Genre: ${genre}</p>
          <p>Status: ${status}</p>
          <p>Premiered: ${premiered}</p>
          <p>Language: ${lang}</p>
        </div>
        <form class="mt-4 w-full" method="POST" id="comment-form">
          <label class="text-white text-lg mb-2 text-center flex items-center justify-center" for="name" aria-label="name">Add a comment:</label>
          <input class="w-full text-black" aria-label="name" id="name" type="text" placeholder="Your name" maxlength="30" name="name" tabindex="16" required>
          <textarea class="h-28 w-full mt-2 text-black" aria-label="comments" id="comments" placeholder="Enter comments here" maxlength="500" name="message" required tabindex="18"></textarea>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4" aria-label="submit" type="submit" value="Submit" tabindex="19">Comment</button>
        </form>
      </div>
    `;
  root.appendChild(overlay);
  root.appendChild(modal);
  updateCount();
  const span = document.querySelector('.close-icon');

  modal.style.display = 'flex';

  span.onclick = () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
    modal.innerHTML = '';
  };

  getComments(movieElementId);
  createComment(movieElementId);
};

export default popupWins;