const headerSelect = document.querySelectorAll('.nav-header-item');
// const searchPage = document.querySelector(".search-section");
const capstoneInfoSection = document.querySelector('.capstone-project-info');
const capstoneSearchSection = document.querySelector('.search-section');
const headerLogo = document.querySelector('.header-logo');
const createGroupBtn = document.querySelector('.create-group-btn');
const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');
const disSection = document.querySelector('.display-section');
var oldTarget = document.querySelector('.active');
const numCapstonePerPage = 6;
let page = 1;
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
    window.location.href = 'main-page.html';
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
async function updateUI() {
  const url = `/capstone-project/all`;
  const capstoneList = await fetch(
    `${url}/${page}/${numCapstonePerPage}/${sort}`
  );
  const capstoneListJson = await capstoneList.json();
  const capstoneListData = capstoneListJson.data;
  console.log(capstoneListData);
}
headerBar();
