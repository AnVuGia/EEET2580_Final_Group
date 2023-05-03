const headerSelect = document.querySelectorAll('.nav-header-item');
const dashboardView = document.querySelector('.dashboard-view');
const capstoneInfoSection = document.querySelector('.nav-header-item');
const capstoneSearchSection = document.querySelector('.search-section');
const headerLogo = document.querySelector('.navbar-brand');
const createGroupBtn = document.querySelector('.create-group-btn');
const disSection = document.querySelector('.display-section');
const displayResult = document.querySelector('.display-result-search');
const groupListContainer = document.querySelector('.group-list');
const profileController = document.querySelectorAll(".profile-list-item");
var oldTarget = document.querySelector('.active');

let sort = 'asc';
let currentPage = 0;
const convertString = function (string) {
  var temp = string.split(' ');
  return temp.join('%20');
};

headerLogo.addEventListener('click', function (ev) {
  ev.preventDefault();
  const role = sessionStorage.getItem('role');
  const currView = JSON.parse(role);
  window.location.href = `/${currView}`;
});

function listenProfileBehave(){
    for (var i  = 0; i < profileController.length;i++){
        profileController[i].addEventListener("click",function(ev){
            if(ev.target.textContent ==="Log out"){
                window.location.href = "/sign-in-page"
            }else if (profileController[i].textContent === "Account Information"){
                //to be filled
            }
        });
    }
}

function headerBar() {
  for (var i = 0; i < headerSelect.length; i++)
    headerSelect[i].addEventListener('click', function (ev) {
      oldTarget.classList.remove('active');

      setVisibiltySearchPage(ev.target);
      ev.target.classList.add('active');
      oldTarget = ev.target;
    });
}
headerBar();
function setVisibiltySearchPage(target) {
  if (target.textContent === 'Search') {
    disSection.textContent = 'Search';
    dashboardView.setAttribute('hidden', 'hidden');
    capstoneSearchSection.removeAttribute('hidden');
  } else if (target.textContent === 'Dashboard') {
    disSection.textContent = 'Dashboard';
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    dashboardView.removeAttribute('hidden');
  } else if (target.textContent === 'Announcment') {
    disSection.textContent = 'Recent Announcement';
  } else if (target.textContent === 'Group Info') {
    disSection.textContent = 'Group Info';
  }
}

async function getCapstoneList(
  capstone_name,
  company_name,
  supervisor_name,
  page,
  size,
  sort
) {
  displayResult.innerHTML ="";
  displayResult.appendChild(createSpinningAnimation());
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const url = `api/approved-capstone-projects?`;

  //if the param contains space, join them with %20
  var capstone_name = !!capstone_name
    ? capstone_name.includes(' ')
      ? convertString(capstone_name)
      : capstone_name
    : '';
  var company_name = !!company_name
    ? company_name.includes(' ')
      ? convertString(company_name)
      : company_name
    : '';
  var supervisor_name = !!supervisor_name
    ? supervisor_name.includes(' ')
      ? convertString(supervisor_name)
      : supervisor_name
    : '';
  var page = !!page ? page : '';
  var size = !!size ? size : '';
  var sort = !!sort ? sort : '';
  //generate the query url
  var paraList = [
    capstone_name,
    company_name,
    supervisor_name,
    page,
    size,
    sort,
  ];
  var nameList = [
    'capstone_name',
    'company_name',
    'supervisor_name',
    'page',
    'size',
    'sort',
  ];
  var temp = '';

  for (var i = 0; i < paraList.length; i++) {
    if (!!paraList[i]) {
      if (temp.length > 0) {
        temp += `&${nameList[i]}=${paraList[i]}`;
      } else {
        temp += `${nameList[i]}=${paraList[i]}`;
      }
    }
  }

  let endpoint = url + temp;
  response = await fetch(endpoint);
  result = await response.json();
  await updateCapstoneListUI(result.content);
  await displayPagination(result);
}

async function updateCapstoneListUI(capstoneListData) {
  displayResult.innerHTML = '';
  for (let i = 0; i < capstoneListData.length; i++) {
    const capstone = capstoneListData[i];
    const capstoneCard = createCapstoneCard(capstone);
    displayResult.appendChild(capstoneCard);
  }
}



//Company Search
async function getCompanyList(companyName, page, size, sort) {
  const url = `api/company/search?`;

  displayResult.innerHTML ="";
  displayResult.appendChild(createSpinningAnimation());
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  var companyName = !!companyName
    ? companyName.includes(' ')
      ? convertString(companyName)
      : companyName
    : '';
  var page = !!page ? page : '';
  var size = !!size ? size : '';
  var sort = !!sort ? sort : '';

  var paraList = [companyName, page, size, sort];
  var nameList = ['company_name', 'page', 'size', 'sort'];
  var temp = '';

  for (var i = 0; i < paraList.length; i++) {
    if (!!paraList[i]) {
      if (temp.length > 0) {
        temp += `&${nameList[i]}=${paraList[i]}`;
      } else {
        temp += `${nameList[i]}=${paraList[i]}`;
      }
    }
  }

  let endpoint = url + temp;
  response = await fetch(endpoint);
  result = await response.json();
  updateCompanyUI(result.content);
  await displayPagination(result);
}
async function updateCompanyUI(companyList) {
  displayResult.innerHTML = '';
  for (let i = 0; i < companyList.length; i++) {
    const company = companyList[i];
    const companyCard = createCompanyCard(company);
    displayResult.appendChild(companyCard);
  }
}
function createCompanyCard(companyInfo) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add('p-3');
  div.classList.add('mb-3');
  div.classList.add('mt-3');
  div.innerHTML = `
            <img class="company-banner" src="images/BANNER-01.png" alt="company-banner">
            <div class="d-flex justify-content-between mt-2">
                <div class="d-flex flex-row align-items-center">
                    <div class="logo"> 
                       <img src="" alt="company-logo">
                    </div>
                    <div class="ms-2 c-details">
                        <h5 class="company-title">${companyInfo.companyName}</h5> <span>1 days ago</span>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <div class="mt-2">
                    <div class="sub-overview">
                        <i class="bi bi-briefcase"> <span><span>Company Sub Overview</span></span></i>
                    </div>
                </div>
                <div class="mt-2">
                    <button class="btn read-more">Read more</button>
                </div>
            </div>
    `;
  return div;
}

//Group Search
async function getGroupList(groupName, page, size, sort) {
  const url = `api/group/search?`;

  displayResult.innerHTML ="";
  displayResult.appendChild(createSpinningAnimation());
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  var groupName = !!groupName
    ? groupName.includes(' ')
      ? convertString(groupName)
      : groupName
    : '';
  var page = !!page ? page : '';
  var size = !!size ? size : '';
  var sort = !!sort ? sort : '';

  var paraList = [groupName, page, size, sort];
  var nameList = ['groupName', 'page', 'size', 'sort'];
  var temp = '';

  for (var i = 0; i < paraList.length; i++) {
    if (!!paraList[i]) {
      if (temp.length > 0) {
        temp += `&${nameList[i]}=${paraList[i]}`;
      } else {
        temp += `${nameList[i]}=${paraList[i]}`;
      }
    }
  }

  let endpoint = url + temp;
  response = await fetch(endpoint);
  result = await response.json();
  updateGroupUI(result.content);
  await displayPagination(result);
}
async function updateGroupUI(groupList) {
  displayResult.innerHTML = '';
  for (let i = 0; i < groupList.length; i++) {
    const group = groupList[i];
    const groupCard = createGroupCard(group);
    displayResult.appendChild(groupCard);
  }
}
function createGroupCard(groupInfo) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add('p-3');
  div.classList.add('mb-3');
  div.classList.add('mt-3');
  div.innerHTML = `
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <div class="icon"> <i class="bi bi-people"></i> </div>
                    <div class="ms-2 c-details">
                        <h5 class="mb-0">${groupInfo.groupName}</h5> <span>1 days ago</span>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <h3 class="heading">Enterprise Web Development</h3>
                <div class="mt-3">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5"></div>
                    </div>
                    <div class="mt-3"> 
                        <span class="text1">3 Applied <span class="text2">of 5</span></span> 
                    </div>
                    <div class="mt-3">
                        <button class="join-group-btn">JOIN</button>
                    </div>
                </div>
            </div>
    `;
  return div;
}

const displayPagination = async function (pageable) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = `<li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>`;

  let maxPage = pageable.totalPages;

  for (let i = 0; i < maxPage; i++) {
    const page = document.createElement('li');
    page.className = 'page-item';

    const pageLink = document.createElement('div');

    pageLink.className = 'page-link';
    pageLink.textContent = i + 1;
    pageLink.addEventListener('click', (e) => {
      const page = Number.parseInt(e.target.textContent) - 1;
      currentPage = page;

      if (searchSelection.value === 'capstone') {
        updateCapstone(currentPage);
      } else if (searchSelection.value === 'group') {
        updateGroup(currentPage);
      } else if (searchSelection.value === 'company') {
        updateCompany(currentPage);
      }
    });
    page.appendChild(pageLink);
    pagination.appendChild(page);
  }
  pagination.innerHTML += `<li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
     </li>`;
};

const updateCapstone = async function (curPage) {
  const supervisor_name =
    superVisorSelection.value === 'all' ? undefined : superVisorSelection.value;
  const company_name =
    companySelection.value === 'all' ? undefined : companySelection.value;
  await getCapstoneList(
    searchInput.value,
    company_name,
    supervisor_name,
    curPage
  );
};
const updateGroup = async function (curPage) {
  await getGroupList(searchInput.value, curPage);
};
const updateCompany = async function (curPage) {
  await getCompanyList(searchInput.value, curPage);
};
const onFiltered = async function () {
  console.trace();

  if (searchSelection.value === 'capstone') {
    searchInput.placeholder = 'Please enter Capstone Name';
    await updateCapstone(0);
  } else if (searchSelection.value === 'group') {
    searchInput.placeholder = 'Please enter Group Name';
    await updateGroup(0);
  } else if (searchSelection.value === 'company') {
    searchInput.placeholder = 'Please enter Company Name';
    await updateCompany(0);
  }
};
const searchSelection = document.querySelector('#by-group-or-capstone');
const superVisorSelection = document.querySelector('#supervior-selection');
const companySelection = document.querySelector('#company-selection');
const searchInput = document.querySelector('.search-input');

//Handle the collapsible filter
function handleCollapsibleFilter() {
  searchSelection.addEventListener('change', function() {
    const selectedOption = this.value;

    if (selectedOption === 'group' || selectedOption === 'company') {
      searchInput.style.display = 'block';
      superVisorSelection.style.display = 'none';
      companySelection.style.display = 'none';
    } else if (selectedOption === 'capstone') {
      searchInput.style.display = 'block';
      superVisorSelection.style.display = 'block';
      companySelection.style.display = 'block';
    }
  });
}

// Call the function to enable the filter behavior
handleCollapsibleFilter();


searchSelection.addEventListener('change', function () {
  onFiltered();
});

superVisorSelection.addEventListener('change', function () {
  onFiltered();
});
companySelection.addEventListener('change', function () {
  onFiltered();
});
searchInput.addEventListener('keyup', function () {
  onFiltered();
});

const updateSupervisorList = async function () {
  let endpoint = 'api/account/supervisors';
  superVisorSelection.innerHTML = `<option value="all">Select Supervisor</option>`;

  const response = await fetch(endpoint);
  const result = await response.json();

  for (var i = 0; i < result.length; i++) {
    const option = document.createElement('option');
    option.textContent = result[i].name;
    option.value = result[i].name;
    superVisorSelection.appendChild(option);
  }
};

const updateCompanyList = async function () {
  companySelection.innerHTML = '<option value="all">Select Company</option>';

  let endpoint = 'api/account/companies';

  const response = await fetch(endpoint);
  const result = await response.json();

  for (var i = 0; i < result.length; i++) {
    const option = document.createElement('option');
    option.textContent = result[i].name;
    option.value = result[i].name;
    companySelection.appendChild(option);
  }
};


updateCompanyList();
updateSupervisorList();
searchSelection.dispatchEvent(new Event('change'));
listenProfileBehave();

