const url = '/capstone';

let currentPage = 0;
let pageSize = 5;
let capstoneList = [];
const nextPageBtn = document.querySelector('#next_page_btn');
const PrevPageBtn = document.querySelector('#prev_page_btn');
async function getCapstoneList() {
  const endpoint = 'getPaginated';
  capstoneList = await fetch(
    `${url}/${endpoint}?page=${currentPage}&size=${pageSize}`
  );
  const capstoneListJson = await capstoneList.json();
  console.log(capstoneListJson);
  return capstoneListJson;
}
async function updateUI() {
  capstoneList = await getCapstoneList();
  console.log(capstoneList);
  const capstoneListElement = document.querySelector('.capstone_container');
  capstoneListElement.innerHTML = '';
  capstoneList.content.forEach((capstone) => {
    const capstoneElement = document.createElement('div');
    capstoneElement.innerHTML = `
        <div class="capstone_container">
      <div class="capstone_item">
        <h3>${capstone.projectTitle}</h3>
        <p>${capstone.projectDescription}</p>
      </div>
    </div>
        `;
    capstoneListElement.appendChild(capstoneElement);
  });
  if (currentPage === capstoneList.totalPages - 1) {
    nextPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
  }
  if (currentPage === 0) {
    PrevPageBtn.disabled = true;
  } else {
    PrevPageBtn.disabled = false;
  }
}
async function nextPage() {
  currentPage++;
  await updateUI();
}
async function previousPage() {
  currentPage--;
  await updateUI();
}

nextPageBtn.addEventListener('click', nextPage);

PrevPageBtn.addEventListener('click', previousPage);
window.onload = updateUI;
