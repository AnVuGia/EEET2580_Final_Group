const url = '/capstone';

let currentPage = 1;
let pageSize = 5;
async function getCapstoneList() {
  const capstoneList = await fetch(
    `${url}/getAll?page=${currentPage}&size=${pageSize}`
  );
  return capstoneList;
}
async function updateUI() {
  const capstoneList = await getCapstoneList();
  console.log(capstoneList);
  const capstoneListElement = document.querySelector('#capstone_list');
  capstoneListElement.innerHTML = '';
  capstoneList.forEach((capstone) => {
    const capstoneElement = document.createElement('li');
    capstoneElement.innerHTML = `
        <div class="capstone_container">
      <div class="capstone_item">
        <img
          src="https://via.placeholder.com/300x200.png?text=Item+1"
          alt="Item 1"
        />
        <h3>${capstone.getName()}</h3>
        <p>${capstone.getDescription()}</p>
      </div>
    </div>
        `;
    capstoneListElement.appendChild(capstoneElement);
  });
}
async function nextPage() {
  currentPage++;
  await updateUI();
}
async function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    await updateUI();
  }
}
document.querySelector('#next_page_btn').addEventListener('click', nextPage);
document
  .querySelector('#prev_page_btn')
  .addEventListener('click', previousPage);
window.onload = updateUI;
