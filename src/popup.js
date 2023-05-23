const btn = document.querySelectorAll('.popup-trigger');
const modal = document.getElementById('popup-container');
for (let i = 0; i < btn.length; i += 1) {
  btn[i].addEventListener('click', () => {
    modal.innerHTML = `
    <div class="modal-top">

        <span class="close" ><img src="./img/close-icon.png" /></span >
        <h1>${data[i].title}</h1>
        </div>
        <ul>${data[i].technologies}</ul>
        <div class="popup-div">
              <img src="${data[i].image}"></img>
              <div class="modal-bottom">

            <p>${data[i].description}</p>
            <div class="btn-div">
                <button type="button" aria-label="project live demo" tabindex="-13"><a href="${data[i].liveDemoLink}">See live<img src="./img/live-demo.png" alt="live demo icon" /></a></button>
                <button type="button" aria-label="project source code" tabindex="-14"><a href="${data[i].sourceCodeLink}">See source<img src="./img/github-button.png" alt="github icon" /></a></button>
                </div>
                </div>
                </div>
    `;
    const span = document.getElementsByClassName('close')[0];
    modal.style.display = 'flex';
    span.onclick = () => {
      modal.style.display = 'none';
      modal.innerHTML = '';
    };
  });
}