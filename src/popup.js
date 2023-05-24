export const popupWins = () =>{
  const btn = document.querySelectorAll('.movie-button.mr-2');
  const modal = document.createElement('div');
  modal.className = 'popup-container';

  for (let i = 0; i < btn.length; i += 1) {
    console.log("in loop[@!")
    btn[i].addEventListener('click', () => {
      modal.innerHTML = `
    <div class="modal-top">

        <span class="close" ><img src="./img/close-icon.png" /></span >
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
      const span = document.getElementsByClassName('close')[0];
      modal.style.display = 'flex';
      span.onclick = () => {
        modal.style.display = 'none';
        modal.innerHTML = '';
      };
    });
  }
}