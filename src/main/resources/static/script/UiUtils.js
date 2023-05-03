
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
