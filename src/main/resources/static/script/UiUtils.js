function createCapstoneCard(capstone) {
  const capItem = document.createElement('div');
  capItem.classList.add('capstone-item');
  capItem.innerHTML = `  
        <div style ="background-color: ${
          !!capstone.capstoneColor ? capstone.capstoneColor : '#BD3C14'
        }" class="capstone-item-color"></div>
            <div class="capstone-item-info">
            <p class="item-name">${capstone.projectTitle}</p>
            <p class="course-code">COSC2753</p>
            <p class="time-enrolled">Semester 1 2023</p>
        </div>  
    `;
  return capItem;
}
function createSpinningAnimation() {
  const spinningEl = document.createElement('div');
  spinningEl.classList.add('loading-spinner');
  return spinningEl;
}

function displayWelcomMessage() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const greetingText = document.querySelector('.welcome-message');
  greetingText.textContent = `Welcome, ${user.name}!`;
}
displayWelcomMessage();

function createPagination(sectionObj, sectionEl, updateSectionUI) {
  if (sectionObj.totalPages <= 1) {
    return;
  }
  const paginationEl = document.createElement('nav');
  paginationEl.setAttribute('aria-label', 'Page navigation');
  const ulEl = document.createElement('ul');
  ulEl.classList.add('pagination');
  ulEl.classList.add('justify-content-center');
  for (let i = 0; i < sectionObj.totalPages; i++) {
    const liEl = document.createElement('li');
    const aEl = document.createElement('a');
    aEl.classList.add('page-link');
    aEl.textContent = i + 1;
    liEl.appendChild(aEl);
    ulEl.appendChild(liEl);
    if (i === sectionObj.currPage) {
      aEl.classList.add('active');
    }
    aEl.addEventListener('click', () => {
      sectionObj.currPage = i;
      updateSectionUI();
    });
  }
  const prevLiEl = document.createElement('li');
  const prevAEl = document.createElement('a');
  prevAEl.classList.add('page-link');
  prevAEl.textContent = 'Previous';
  prevLiEl.appendChild(prevAEl);
  ulEl.insertBefore(prevLiEl, ulEl.firstChild);
  prevAEl.addEventListener('click', () => {
    if (sectionObj.currPage > 0) {
      sectionObj.currPage--;
      updateSectionUI();
    }
  });
  const nextLiEl = document.createElement('li');
  const nextAEl = document.createElement('a');
  nextAEl.classList.add('page-link');
  nextAEl.textContent = 'Next';
  nextLiEl.appendChild(nextAEl);
  ulEl.appendChild(nextLiEl);
  nextAEl.addEventListener('click', () => {
    if (sectionObj.currPage < sectionObj.totalPages - 1) {
      sectionObj.currPage++;
      updateSectionUI();
    }
  });
  paginationEl.appendChild(ulEl);
  sectionEl.appendChild(paginationEl);
}
