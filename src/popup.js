export const popupWins = () => {
  const btn = document.querySelectorAll('.movie-button.mr-2');
  const modal = document.createElement('div');
  modal.className = 'popup-container';

  for (let i = 0; i < btn.length; i += 1) {
    btn[i].addEventListener('click', () => {

      modal.innerHTML = `
    <div class="modal-top">

        <span class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"></span >
        <h1>title</h1>
    </div>

            <h2>Comments</h2>
            <div class="comment-container">
            </div>
            <form action="https://formspree.io/f/mjvdabnn" method="POST" id="comment-form">
            <label for="name" aria-label="name">name*</label>
            <input aria-label="name" id="name" type="text" placeholder="Your name" maxlength="30" name="name" tabindex="16" required>
            <label for="comments" aria-label="comments">comments*</label>
            <textarea aria-label="comments" id="comments" placeholder="Enter comments here" maxlength="500" name="message" required tabindex="18"></textarea>
            <button aria-label="submit" type="submit" value="Submit" tabindex="19">Get in touch</button>
        </form>
    `;

      console.log("start click span")
      const span = document.querySelector('span');
      modal.style.display = 'flex';
      span.onclick = () => {

        console.log("enter click span")
        modal.style.display = 'none';
        modal.innerHTML = '';
      };
    });
  }
}