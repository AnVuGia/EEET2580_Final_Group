const headerSelect = document.querySelectorAll('.nav-header-item');
// const searchPage = document.querySelector(".search-section");
const capstoneInfoSection = document.querySelector('.capstone-project-info');
const capstoneSearchSection = document.querySelector('.search-section');
const headerLogo = document.querySelector('.header-logo');
const createGroupBtn = document.querySelector('.create-group-btn');
const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');
const disSection = document.querySelector('.display-section');
const capstoneListContainer = document.querySelector('.capstone-list');
const groupListContainer = document.querySelector('.group-list');
var oldTarget = document.querySelector('.active');
const groupPageSelector = document.querySelector('#group-info');
const dashboardSelector = document.querySelector('#dashboard');
const numCapstonePerPage = 3;
let page = 0;
let sort = 'asc';
function headerBar() {
  for (var i = 0; i < headerSelect.length; i++)
    headerSelect[i].addEventListener('click', function (ev) {
      console.log(1);
      oldTarget.classList.remove('active');

      setVisibiltySearchPage(ev.target);
      ev.target.classList.add('active');
      oldTarget = ev.target;
    });
}
function setVisibiltySearchPage(target) {
  if (target.textContent === 'Dashboard') {
    disSection.textContent = 'Dashboard';
    // window.location.href = 'main-page.html';
  }

  if (target.textContent === 'Search') {
    disSection.textContent = 'Search';
    capstoneInfoSection.setAttribute('hidden', 'hidden');
    capstoneSearchSection.removeAttribute('hidden');
  } else {
    disSection.textContent = 'Dashboard';
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    capstoneInfoSection.removeAttribute('hidden');
  }
}

modalCancelBtn.addEventListener('click', function () {
  modalPage.setAttribute('hidden', 'hidden');
});
createGroupBtn.addEventListener('click', function () {
  modalPage.removeAttribute('hidden');
});
async function updateUI(capstoneList) {
  capstoneListContainer.innerHTML = '';
  console.log('updateUI');
  const capstoneListData = capstoneList.content;
  for (let i = 0; i < capstoneListData.length; i++) {
    const capstone = capstoneListData[i];
    const capstoneCard = createCapstoneCard(capstone);
    capstoneListContainer.appendChild(capstoneCard);
  }
  console.log(capstoneListContainer);
  console.log(capstoneListData);
}
async function getCapstoneList() {
  const url = `api/capstone-project/all`;
  const capstoneList = await fetch(
    `${url}/${page}/${numCapstonePerPage}/${sort}`
  );
  const capstoneListJson = await capstoneList.json();

  updateUI(capstoneListJson);
}
function createCapstoneCard(capstone) {
  console.log('createCapstoneCard');
  const div = document.createElement('div');
  div.innerHTML = `
                        <div class="capstone-item">
                            <div class="capstone-item-color"></div>
                            <div class="capstone-item-info">
                                <p class="item-name">${capstone.projectTitle}</p>
                                <p class="course-code">COSC2753</p>
                                <p class="time-enrolled">Semester 1 2023</p>
                            </div>
                        </div>
    `;
  return div;
}
//Group page
function createGroupCard(group) {
  console.log('createGroupCard');
  const div = document.createElement('div');
  div.innerHTML = `
        <h2>${group.groupName}</h2>
`;
  return div;
}
async function getGroupList() {
  const url = `api/group/all`;
  const groupList = await fetch(url);
  const groupListJson = await groupList.json();
  updateGroupUI(groupListJson);
}
async function updateGroupUI(groupList) {
  console.log(groupList);
  capstoneListContainer.innerHTML = '';
  console.log('updateGroupUI');
  for (let i = 0; i < groupList.length; i++) {
    const group = groupList[i];
    const groupCard = createGroupCard(group);
    capstoneListContainer.appendChild(groupCard);
  }
}
groupPageSelector.addEventListener('click', function () {
  getGroupList();
});
dashboardSelector.addEventListener('click', function (event) {
  getCapstoneList();
});

headerBar();
