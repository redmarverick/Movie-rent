import {postComment, getComment } from './api.js';



export const popupWins = (root) => {
  const btn = document.querySelectorAll('.movie-button.mr-2');
  const modal = document.createElement('div');
  modal.className = 'popup-container';

  for (let i = 0; i < btn.length; i += 1) {

      modal.innerHTML = `
    <div class="modal-top">

        <span class="close-icon bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"></span >
        <h1>title</h1>
    </div>

            <h2>Comments</h2>
            <div class="comment-container">
            </div>
            <form method="POST" id="comment-form">
            <label for="name" aria-label="name">name*</label>
            <input aria-label="name" id="name" type="text" placeholder="Your name" maxlength="30" name="name" tabindex="16" required>
            <label for="comments" aria-label="comments">comments*</label>
            <textarea aria-label="comments" id="comments" placeholder="Enter comments here" maxlength="500" name="message" required tabindex="18"></textarea>
            <button aria-label="submit" type="submit" value="Submit" tabindex="19">Comment</button>
        </form>
    `;

    root.appendChild(modal);
      const span = document.querySelector('.close-icon');

      modal.style.display = 'flex';

      span.onclick = () => {
        console.log("enter click span")
        modal.style.display = 'none';
        modal.innerHTML = '';
      };
  }
}

const createComment = () => {
  const form = document.getElementById('comment-form');
  const formName = document.getElementById('name');
  const formComment = document.getElementById('comments');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newName = formName.value;
    const newComment = Number(formScore.value);
    const comment_obj = {
      username: newName,
      comment: newComment,
    };
    formName.value = '';
    formComment.value = '';
    postComment(comment_obj);
  });
};

createComment();

const getComments = () => {
  const form = document.getElementById('comment-form');
  const commentList = document.getElementsByClassName('comment-container');
  form.addEventListener('click', async (event) => {
    event.preventDefault();
    const refreshNewComment = await getComment();
    commentList.innerHTML = ''; // clear the list before repopulating
    refreshNewComment.sort((a, b) => a.index - b.index); // sort scores in descending order
    refreshNewComment.forEach((rnc) => {
      const newCommentx = document.createElement('li');
      newScore.innerHTML = `${rnc.user}: ${rnc.score}`;
      commentList.appendChild(newCommentx);
    });
  });
};

getComments();