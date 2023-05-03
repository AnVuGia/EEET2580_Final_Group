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
function createPagination(sectionObj, sectionEl, updateSectionUI) {
  if (sectionObj.totalPages <= 1) {
    return;
  }
  const paginationEl = document.createElement('div');
  paginationEl.className = 'pagination';
  const prevBtn = document.createElement('button');
  prevBtn.className = 'prev-next-btn';
  prevBtn.innerHTML = 'Prev';
  const nextBtn = document.createElement('button');
  nextBtn.className = 'prev-next-btn';
  nextBtn.innerHTML = 'Next';
  paginationEl.appendChild(prevBtn);
  paginationEl.appendChild(nextBtn);
  sectionEl.appendChild(paginationEl);
  prevBtn.addEventListener('click', () => {
    if (sectionObj.currPage > 0) {
      sectionObj.currPage -= 1;
      updateSectionUI();
    }
  });
  nextBtn.addEventListener('click', () => {
    if (sectionObj.currPage < sectionObj.totalPages - 1) {
      sectionObj.currPage += 1;
      updateSectionUI();
    }
  });
}
