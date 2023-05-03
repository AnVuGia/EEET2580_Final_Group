const currUser = JSON.parse(sessionStorage.getItem('user'));

const capstoneContainer = document.querySelector('.request-capstone');
const superviseCapstoneSection = {
  currPage: 0,
  currSize: 3,
  totalPages: 0,
};
async function getCapstoneList(page, size) {
  console.log(currUser.name);
  const endpoint = `api/capstone-project/supervisor?name=${currUser.name}&page=${page}&size=${size}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);
  return result;
}
async function updateUI() {
  capstoneContainer.innerHTML = '';
  const capstoneList = await getCapstoneList(
    superviseCapstoneSection.currPage,
    superviseCapstoneSection.currSize
  );
  const capstoneListData = capstoneList.content;
  capstoneContainer.innerHTML = '';
  capstoneListData.forEach((capstone) => {
    const capstoneEl = createCapstoneCard(capstone);
    capstoneContainer.appendChild(capstoneEl);
  });
  superviseCapstoneSection.totalPages = capstoneList.totalPages;
  createPagination(superviseCapstoneSection, capstoneContainer, updateUI);
}
updateUI();
