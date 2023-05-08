const headerSelect = document.querySelectorAll('.nav-header-item');
const dashboardView = document.querySelector('.dashboard-view');
const capstoneInfoSection = document.querySelector('.nav-header-item');
const capstoneSearchSection = document.querySelector('.search-section');
const headerLogo = document.querySelector('.navbar-brand');
const createGroupBtn = document.querySelector('.create-group-btn');
const disSection = document.querySelector('.display-section');
const displayResult = document.querySelector('.display-result-search');
const groupListContainer = document.querySelector('.group-list');

const groupInfoContainer = document.querySelector('.group-info-section');
const role = sessionStorage.getItem('role');

const loadingModal = new bootstrap.Modal(
  document.getElementById('loading-modal'),
  {
    keyboard: false,
    backdrop: 'static',
  }
);
studentCapstoneModal = new bootstrap.Modal(
  document.getElementById('student-capstone-modal'),
  {
    keyboard: false,
    backdrop: 'static',
  }
);

const profileController = document.querySelectorAll('.profile-list-item');
const capstonePageInfo = {
  currPage: 0,
  totalPages: 0,
  currSize: 5,
};
var oldTarget = document.querySelector('.active');
let sort = 'asc';
let currentPage = 0;
const convertString = function (string) {
  var temp = string.split(' ');
  return temp.join('%20');
};

headerLogo.addEventListener('click', function (ev) {
  ev.preventDefault();
  const currView = JSON.parse(role);
  window.location.href = `/${currView}`;
});

function listenProfileBehave() {
  for (var i = 0; i < profileController.length; i++) {
    profileController[i].addEventListener('click', function (ev) {
      if (ev.target.textContent === 'Log out') {
        window.location.href = '/sign-in-page';
      } else if (ev.target.textContent === 'Account Information') {
        const Role = JSON.parse(role);

        if (Role == 'student') {
          window.location.href = '/account-page';
        } else if (Role == 'company') {
          window.location.href = '/edit-company-profile';
        }
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
    if (JSON.parse(sessionStorage.getItem("user")).role === "student"){
       groupInfoContainer.setAttribute('hidden', 'hidden');
    }
   
    capstoneSearchSection.removeAttribute('hidden');
  } else if (target.textContent === 'Dashboard') {
    disSection.textContent = 'Dashboard';
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    if (JSON.parse(sessionStorage.getItem("user")).role === "student"){
      groupInfoContainer.setAttribute('hidden', 'hidden');
   }
    dashboardView.removeAttribute('hidden');
  } else if (target.textContent === 'Announcment') {
    disSection.textContent = 'Recent Announcement';
  } else if (target.textContent === 'Group Info') {
    disSection.textContent = 'Group Info';
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    dashboardView.setAttribute('hidden', 'hidden');
    groupInfoContainer.removeAttribute('hidden');
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
  displayResult.innerHTML = '';
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
//set modal here later
async function updateCapstoneListUI(capstoneListData) {
  displayResult.innerHTML = '';
  for (let i = 0; i < capstoneListData.length; i++) {
    const capstone = capstoneListData[i];
    const capstoneCard = createCapstoneCard(capstone);

    const capContainer = document.createElement('div');
    capContainer.classList.add('col-xl-4', 'col-md-6','col-md-12');
    capContainer.appendChild(capstoneCard);
    

    capstoneCard.addEventListener('click', async function (ev) {
      ev.preventDefault();
      await updateCapstoneModal(capstone);
    });

    displayResult.appendChild(capContainer);
    // createPagination(capstonePageInfo, displayResult, updateCapstoneListUI);
  }
}

//Company Search
async function getCompanyList(companyName, page, size, sort) {
  const url = `api/company/search?`;

  displayResult.innerHTML = '';
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

    const compContainer = document.createElement('div');
    compContainer.classList.add('col-xl-4', 'col-md-6','col-md-12');
    compContainer.appendChild(companyCard);
    displayResult.appendChild(compContainer);
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

  displayResult.innerHTML = '';
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

    const groupContainer = document.createElement('div');
    groupContainer.classList.add('col-xl-4', 'col-md-6','col-md-12');
    groupContainer.appendChild(groupCard);

    displayResult.appendChild(groupContainer);
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
  console.trace();
  pagination.innerHTML ="";
  console.log("display pagination");
  let maxPage = pageable.totalPages;

  for (let i = 0; i < maxPage; i++) {
    const page = document.createElement('li');
    page.className = 'page-item';

    const pageLink = document.createElement('div');
    pageLink.classList.add('page-link');
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
  if (searchSelection.value === 'capstone') {
    searchInput.placeholder = 'Please enter Capstone Name';
    filterContainer.removeAttribute("style");
    await updateCapstone(0);
  } else if (searchSelection.value === 'group') {
    searchInput.placeholder = 'Please enter Group Name';
    filterContainer.setAttribute("style","height: 125px")
    await updateGroup(0);
  } else if (searchSelection.value === 'company') {
    searchInput.placeholder = 'Please enter Company Name';
    filterContainer.setAttribute("style","height: 125px")
    await updateCompany(0);
  }
};
const searchSelection = document.querySelector('#by-group-or-capstone');
const superVisorSelection = document.querySelector('#supervior-selection');
const companySelection = document.querySelector('#company-selection');
const searchInput = document.querySelector('.search-input');

//Handle the collapsible filter
function handleCollapsibleFilter() {
  searchSelection.addEventListener('change', function () {
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
  searchInput.value = "";
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

async function updateCapstoneModal(capstone) {
  loadingModal.show();
  const capstoneDescriptionEl = document.querySelector(
    '#capstone-description-p'
  );
  const capstoneOutcomEl = document.querySelector('#capstone-outcome-p');
  const capstoneRequirementsEl = document.querySelector(
    '#capstone-requirement-p'
  );
  const capstoneCriteriaEl = document.querySelector('#success-criteria-p');
  const capstoneNoStudentEl = document.querySelector('#no-students-i');
  const capstoneIntroductionEl = document.querySelector(
    '#capstone-introduction-i'
  );
  const academicBackgroundEl = document.querySelector(
    '#academic-background-h3'
  );
  const supervisorNameEl = document.querySelector('#supervisor-name');
  const supervisorMailEl = document.querySelector('#supervisor-mail');
  const groupNumberEl = document.querySelector('#group-number');
  const companyNameEl = document.querySelector('#company-name-a');
  const capstoneTitleEl = document.querySelector('#capstone-title-h2');
  const companyProfilePicEl = document.querySelector('#company-profile-pic');
  companyProfilePicEl.innerHTML = '';
  if (capstone.imageId !== null) {
    const src = await getImage(capstone.imageId);
    companyProfilePicEl.innerHTML = `<img src="${src}" alt="company profile picture" />`;
  } else {
    companyProfilePicEl.innerHTML = `<img src="https://via.placeholder.com/150" alt="company profile picture" />`;
  }
  studentCapstoneModal.hide();

  while (companyProfilePicEl.innerHTML === '') {}
  loadingModal.hide();
  studentCapstoneModal.show();
  capstoneDescriptionEl.textContent = capstone.projectDescription;
  capstoneOutcomEl.textContent = capstone.projectObjectives;
  capstoneRequirementsEl.textContent = capstone.technicalRequirements;
  capstoneCriteriaEl.textContent = capstone.projectSuccessCriteria;
  capstoneNoStudentEl.innerHTML = `<span>${capstone.noStudents} member(s)</span>`;
  capstoneIntroductionEl.innerHTML = `<span>${capstone.projectIntroduction}</span>`;
  academicBackgroundEl.textContent = capstone.academicBackground;
  supervisorNameEl.innerHTML = `<span>Name: ${capstone.supervisor.name}</span>`;
  supervisorMailEl.innerHTML = `<span>Email: ${capstone.supervisor.email}</span>`;
  companyNameEl.textContent = capstone.company.name;
  capstoneTitleEl.textContent = capstone.projectTitle;

  console.log(capstone);
}

searchSelection.dispatchEvent(new Event('change'));
// onFiltered();

updateCompanyList();
updateSupervisorList();
listenProfileBehave();
