const headerSelect = document.querySelectorAll('.nav-header-item');
// const searchPage = document.querySelector(".search-section");
const capstoneInfoSection = document.querySelector('.capstone-project-info');
const capstoneSearchSection = document.querySelector('.search-section');
const headerLogo = document.querySelector('.navbar-brand');
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

const colorList = ["#BD3C14", "#FF2717","#4554A4","#0B9BE3","#06A3B7","#009688","#009606","#8D9900",
                    "#FD5D10","#65499D"];


let page = 0;
let sort = 'asc';
headerLogo.addEventListener("click",function(ev){
    window.locaiton.href = "/main";
})
function headerBar() {
  for (var i = 0; i < headerSelect.length; i++)
    headerSelect[i].addEventListener('click', function (ev) {
      oldTarget.classList.remove('active');

      setVisibiltySearchPage(ev.target);
      ev.target.classList.add('active');
      oldTarget = ev.target;
    });
}
function setVisibiltySearchPage(target) {
  if (target.textContent === 'Dashboard') {
    disSection.textContent = 'Dashboard';
    window.location.href = '/main';
  }

  if (target.textContent === 'Search') {
    disSection.textContent = 'Search';
    capstoneInfoSection.setAttribute('hidden', 'hidden');
    capstoneSearchSection.removeAttribute('hidden');
  } else if (target.textContent === 'Dashboard') {
    disSection.textContent = 'Dashboard';
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    capstoneInfoSection.removeAttribute('hidden');
  }else if (target.textContent === 'Announcment') {
    disSection.textContent = 'Recent Announcement';
    // capstoneSearchSection.setAttribute('hidden', 'hidden');
    // capstoneInfoSection.removeAttribute('hidden');
  }
}

modalCancelBtn.addEventListener('click', function () {
  modalPage.setAttribute('hidden', 'hidden');
});
createGroupBtn.addEventListener('click', function () {
  modalPage.removeAttribute('hidden');
});

async function getCapstoneList() {
    const url = `api/capstone-project/all`;
    const capstoneList = await fetch(
      `${url}/${page}/${numCapstonePerPage}/${sort}`
    );
    const capstoneListJson = await capstoneList.json();
    updateUI(capstoneListJson);
    
}

async function updateUI(capstoneList) {
    console.log('updateUI');
    const capstoneListData = capstoneList.content;
    const capstones = document.querySelector(".capstone-list-search");
    console.log(capstones);
    for (let i = 0; i < capstoneListData.length; i++) {
        const capstone = capstoneListData[i];
        const capstoneCard = createCapstoneCard(capstone);
        capstones.appendChild(capstoneCard);
    }
}

const getRandomColor = function (){
    return colorList[Math.floor(Math.random() * colorList.length)];
}
function createCapstoneCard(capstone) {
    console.log('createCapstoneCard');
    const capItem = document.createElement('li');
    capItem.classList.add("capstone-item");
    capItem.innerHTML = `  
                            <div style ="background-color: ${getRandomColor()}" class="capstone-item-color"></div>
                                <div class="capstone-item-info">
                                <p class="item-name">${capstone.projectTitle}</p>
                                <p class="course-code">COSC2753</p>
                                <p class="time-enrolled">Semester 1 2023</p>
                            </div>  
    `;
    return capItem;
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
