import { postComment, getComment } from './api.js';
import countComments from './commentCounter.js';

const updateCount = () => {
  const commentList = document.querySelector('.comment-container');
  const title = document.getElementById('comment-title');

  title.textContent = `Comments (${countComments(commentList)})`;
};
const getComments = async (itemID) => {
  const title = document.getElementById('comment-title');
  const commentList = document.querySelector('.comment-container');
  let refreshNewComment = await getComment(itemID);
  try {
    if (Array.isArray(refreshNewComment)) {
      commentList.innerHTML = ''; // clear the list before repopulating
      refreshNewComment.forEach((rnc) => {
        const newCommentx = document.createElement('li');

        newCommentx.className = 'oneComment';
        newCommentx.innerHTML = `${rnc.username}: ${rnc.comment}`;
        commentList.appendChild(newCommentx);

        updateCount();
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
    const newName = formName.value;
    const newComment = formComment.value;
    const commentObj = {
      item_id: movieElementId,
      username: newName,
      comment: newComment,
    };
    formName.value = '';
    formComment.value = '';
    await postComment(commentObj);
    getComments(movieElementId);
  });
};

const popupWins = (root, title, movieElementId) => {
  if (root.querySelector('.popup-container')) { root.lastElementChild.remove(); }
  const modal = document.createElement('div');
  modal.className = 'popup-container';

  modal.innerHTML = `
      <div>
        <div class="modal-top">
          <span class="close-icon bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"></span >
          <h1>${title}</h1>
        </div>


        <h2 id="comment-title"></h2>

        <ul class="comment-container"></ul>
        <form method="POST" id="comment-form">
          <label for="name" aria-label="name">name*</label>
          <input aria-label="name" id="name" type="text" placeholder="Your name" maxlength="30" name="name" tabindex="16" required>
          <label for="comments" aria-label="comments">comments*</label>
          <textarea aria-label="comments" id="comments" placeholder="Enter comments here" maxlength="500" name="message" required tabindex="18"></textarea>
          <button aria-label="submit" type="submit" value="Submit" tabindex="19">Comment</button>
        </form>
      </div>
    `;

  root.appendChild(modal);
  updateCount();
  const span = document.querySelector('.close-icon');

  modal.style.display = 'flex';

  span.onclick = () => {
    modal.style.display = 'none';
    modal.innerHTML = '';
  };

  getComments(movieElementId);
  createComment(movieElementId);
};

export default popupWins;