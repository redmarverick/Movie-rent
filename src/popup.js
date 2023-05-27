import { postComment, getComment } from './api.js';


const updateCount = (comments) => {
  const commentList = document.querySelector('.comment-container');
  // console.log(comments);
  const title = document.getElementById('comment-title');

  // title.textContent = `Comments (${countComments(commentList)})`;
  if(comments === undefined) {
    title.textContent = `Comments (0)`;
  }else{
    title.textContent = `Comments (${comments})`;
  }
}
const getComments = async (itemID) => {
  const commentList = document.querySelector('.comment-container');
  let refreshNewComment = await getComment(itemID);
  
  try {
    if (Array.isArray(refreshNewComment)) {
      commentList.innerHTML = ''; // clear the list before repopulating
      let numberOfComments = refreshNewComment.length;
      // title.textContent = `Comments (${refreshNewComment.length})`;
      
      refreshNewComment.forEach((rnc) => {
        const newCommentx = document.createElement('li');
        
        newCommentx.className = 'oneComment';
        newCommentx.innerHTML = `${rnc.username}: ${rnc.comment}`;
        commentList.appendChild(newCommentx);
        
        if(numberOfComments > 0) {
          
          updateCount(numberOfComments);
        }else{          
          title.textContent = 'Comments (0)';    
        }


      });
    }else {
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

const popupWins = (root, title, img, genre, status, premiered, lang, movieElementId) => {
  if (root.querySelector('.popup-container')) { root.lastElementChild.remove(); }
  const modal = document.createElement('div');
  modal.className = 'popup-container';

  modal.innerHTML = `
      <div>
        <div class="modal-top">
          <span class="absolute top-4 right-4 text-white text-xl cursor-pointer close-icon bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"></span >
          <h1>${title}</h1>
          <img src="${img}" alt="${title}" class="mr-4 w-1/2">
          <p>Genre: ${genre}</p>
          <p>Status: ${status}</p>
          <p>Premiered: ${premiered}</p>
          <p>Language: ${lang}</p>
        </div>


        <h2 id="comment-title"></h2>

        <ul class="comment-container w-2/3 bg-gray-900 rounded-lg p-4 overflow-auto">
        </ul>
        <form method="POST" id="comment-form">
          <label for="name" aria-label="name">name*</label>
          <input aria-label="name" id="name" type="text" placeholder="Your name" maxlength="30" name="name" tabindex="16" required>
          <label for="comments" aria-label="comments">comments*</label>
          <textarea aria-label="comments" id="comments" placeholder="Enter comments here" maxlength="500" name="message" required tabindex="18"></textarea>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4" aria-label="submit" type="submit" value="Submit" tabindex="19">Comment</button>
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