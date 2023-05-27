import { moviesData } from './index.js';

export function popupWins(moviesContainer, movieData) {
  // Create the overlay element
  const overlay = document.createElement('div');
  overlay.className = 'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-20';

  // Create the popup container element
  const popupContainer = document.createElement('div');
  popupContainer.className = 'fixed h-5/6 w-1/2 z-30';

  // Set the height and width of the popup container based on screen size
  if (window.innerWidth <= 768) {
    // Mobile screen size
    popupContainer.classList.remove('h-80vh', 'w-1/2');
    popupContainer.classList.add('h-5/6', 'w-11/12');
  }

  popupContainer.classList.add('bg-gray-800', 'rounded-lg', 'p-8');

  // Add dark theme background color
  popupContainer.classList.add('bg-gray-800');

  // Center the popup container horizontally and vertically
  popupContainer.classList.add('top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2');

  // Flexbox for centering content
  popupContainer.classList.add('flex', 'flex-col');

  const footer = document.getElementById('footer');

  // Create the close button element
  const closeButton = document.createElement('span');
  closeButton.className = 'absolute top-4 right-4 text-white text-xl cursor-pointer';
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.addEventListener('click', () => {
    moviesContainer.removeChild(overlay); // Remove the overlay from the movies container
    moviesContainer.removeChild(popupContainer); // Remove the popup container from the movies container
    document.body.classList.remove('overflow-hidden'); // Enable scrolling on the body
    footer.classList.remove('z-10');
  });

  // Append the close button to the popup container
  popupContainer.appendChild(closeButton);

  // Create the movie information element
  const movieInfo = document.createElement('div');
  movieInfo.className = 'text-white flex flex-col items-start';

  // Display the movie information
  const title = document.createElement('h2');
  title.textContent = movieData.name;
  title.className = 'text-2xl';
  movieInfo.appendChild(title);

  // Create a nested div for the image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'flex items-start w-full';

  const image = document.createElement('img');
  image.src = movieData.image;
  image.alt = movieData.name;
  image.className = 'mr-4';
  imageContainer.appendChild(image);

  // Create a nested div for the comment list and title
  const commentSection = document.createElement('div');
  commentSection.className = 'bg-gray-900 rounded-lg w-full h-full p-4 overflow-auto';

  // Create the comment title
  const commentTitle = document.createElement('h3');
  commentTitle.textContent = 'Comments';
  commentTitle.className = 'text-white text-2xl flex justify-center items-center';
  commentSection.appendChild(commentTitle);

  // Create the comment list
  const commentList = document.createElement('ul');
  commentList.className = 'comment-list overflow-auto h-56';

  // Loop through the stored comments and create list items for each comment
  moviesData.comments.forEach((comment) => {
    const commentItem = document.createElement('li');

    // Create a paragraph element to display the comment details
    const commentDetails = document.createElement('p');
    commentDetails.className = 'text-gray-400 text-xs';
    commentDetails.textContent = `${comment.date} - ${comment.name}`;

    // Create a paragraph element to display the comment text
    const commentText = document.createElement('p');
    commentText.className = 'text-white';
    commentText.textContent = comment.comment;

    // Append the comment details and comment text to the comment item
    commentItem.appendChild(commentDetails);
    commentItem.appendChild(commentText);

    // Append the comment item to the comment list
    commentList.appendChild(commentItem);
  });

  // Append the comment list to the comment section
  commentSection.appendChild(commentList);

  // Append the image container and comment section to the movie info
  movieInfo.appendChild(imageContainer);
  imageContainer.appendChild(commentSection);

  const genre = document.createElement('p');
  genre.textContent = `Genre: ${movieData.genre}`;
  movieInfo.appendChild(genre);

  const status = document.createElement('p');
  status.textContent = `Status: ${movieData.status}`;
  movieInfo.appendChild(status);

  const premiered = document.createElement('p');
  premiered.textContent = `Premiered: ${movieData.premiered}`;
  movieInfo.appendChild(premiered);

  const language = document.createElement('p');
  language.textContent = `Language: ${movieData.language}`;
  movieInfo.appendChild(language);

  // Append the movie information to the popup container
  popupContainer.appendChild(movieInfo);

  // Create a wrapper div for the comment form
  const formWrapper = document.createElement('div');
  formWrapper.className = 'flex justify-center';
  popupContainer.appendChild(formWrapper);

  // Create the comment form
  const commentForm = document.createElement('form');
  commentForm.className = 'mt-4 w-full';

  // Create the label for the comment input
  const commentLabel = document.createElement('label');
  commentLabel.textContent = 'Add a comment';
  commentLabel.className = 'text-white text-lg mb-2 text-center flex items-center justify-center'; // Add flex and items-center, justify-center classes
  commentForm.appendChild(commentLabel);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'nameInput';
  nameInput.name = 'nameInput';
  nameInput.placeholder = 'Name';
  nameInput.className = 'w-full';
  commentForm.appendChild(nameInput);

  // Create the comment textarea
  const commentTextArea = document.createElement('textarea');
  commentTextArea.id = 'commentInput';
  commentTextArea.name = 'commentInput';
  commentTextArea.rows = '4';
  commentTextArea.placeholder = 'Write your insights...';
  commentTextArea.className = 'w-full mt-2';
  commentForm.appendChild(commentTextArea);

  // Create the submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.className = 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4';
  commentForm.appendChild(submitButton);

  // Append the comment form to the form wrapper
  formWrapper.appendChild(commentForm);

  // Append the overlay and popup container to the movies container
  moviesContainer.appendChild(overlay);
  moviesContainer.appendChild(popupContainer);

  footer.classList.add('z-10');

  document.body.classList.add('overflow-hidden'); // Disable scrolling on the body
}
