const headerSelect = document.querySelectorAll('.nav-header-item');
const dashboardView = document.querySelector('.dashboard-view');
const capstoneInfoSection = document.querySelector('.nav-header-item');
const capstoneSearchSection = document.querySelector('.search-section');
const peopleSearchSection = document.querySelector('.people-section');
const headerLogo = document.querySelector('.navbar-brand');
const disSection = document.querySelector('.display-section');
const displayResult = document.querySelector('.display-result-search');
const groupListContainer = document.querySelector('.group-list');
const filterContainer = document.querySelector('.search-filter');
const searchPagePagination = document.getElementById('main-pagination');
const accountProfileSection = document.getElementById('account-profile');
const studentCapstoneModalEl = document.querySelector(
  '#student-capstone-modal'
);
function displayWelcomMessage() {
  const user = getUser();

  if (!user.name) {
    updateInfoModal(
      'Please complete your account profile!',
      alertModalElStudent,
      () => {
        accountProfileSection.removeAttribute('hidden', 'hidden');
        dashboardView.setAttribute('hidden', 'hidden');
        alertModalElStudent.querySelector('.btn-close').click();
      }
    );
  }

  const greetingText = document.querySelector('.welcome-message');
  greetingText.textContent = `Welcome, ${user.name ? user.name : 'N/A'}!`;
}
if (JSON.parse(sessionStorage.getItem('role')) !== 'student') {
  displayWelcomMessage();
}
const groupInfoContainer = document.querySelector('.group-info-section');
const role = sessionStorage.getItem('role');
const studentCapstoneModal = new bootstrap.Modal(
  document.getElementById('student-capstone-modal'),
  {
    keyboard: false,
    backdrop: 'static',
  }
);
studentCapstoneModalEl.addEventListener('shown.bs.modal', function (event) {
  loadingModal.hide();
});
const profileController = document.querySelectorAll('.profile-list-item');
const capstonePageInfo = {
  currPage: 0,
  totalPages: 0,
  currSize: 5,
};
var oldTarget = document.querySelector('.active');
let sort = 'asc';
let currentPage = 0;
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
        disSection.textContent = 'Account Information';
        const Role = JSON.parse(role);
        accountProfileSection.removeAttribute('hidden');
        capstoneSearchSection.setAttribute('hidden', 'hidden');
        dashboardView.setAttribute('hidden', 'hidden');
        groupInfoContainer.setAttribute('hidden', 'hidden');
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
async function setProfileImage() {
  let user = getUser();
  if (user.imageId != null) {
    const profileImageEl = document.querySelector('.img-thumbnail');
    updateLoadingModal('Loading...', alertModalElStudent, () => {});
    const imgURL = await getImage(user.imageId);
    profileImageEl.src = imgURL;
  }
}
setProfileImage();
headerBar();
function setVisibiltySearchPage(target) {
  const user = getUser();
  if (target.textContent === 'Search') {
    if (getUser().role !== 'admin') {
      accountProfileSection.setAttribute('hidden', 'hidden');
    }
    disSection.textContent = 'Search';
    dashboardView.setAttribute('hidden', 'hidden');
    if (user.role === 'student') {
      groupInfoContainer.setAttribute('hidden', 'hidden');
    }
    if (getUser().role === 'admin') {
      peopleSearchSection.setAttribute('hidden', 'hidden');
    }
    capstoneSearchSection.removeAttribute('hidden');
  } else if (target.textContent === 'Dashboard') {
    if (getUser().role !== 'admin') {
      accountProfileSection.setAttribute('hidden', 'hidden');
    }
    if (user.role === 'admin') {
      disSection.textContent = 'Request Capstone List';
    } else if (user.role === 'company') {
      disSection.textContent = 'Pending Capstone List';
    } else if (user.role === 'student') {
      disSection.textContent = 'Registered Capstone';
    } else if (user.role === 'supevisor') {
      disSection.textContent = 'Supervised Capstone List';
    }
    if (getUser().role === 'admin') {
      peopleSearchSection.setAttribute('hidden', 'hidden');
    }
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    if (user.role === 'student') {
      groupInfoContainer.setAttribute('hidden', 'hidden');
    }
    dashboardView.removeAttribute('hidden');
  } else if (target.textContent === 'Group Info') {
    accountProfileSection.setAttribute('hidden', 'hidden');
    disSection.textContent = 'Group Info';
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    dashboardView.setAttribute('hidden', 'hidden');
    groupInfoContainer.removeAttribute('hidden');
  } else if (target.textContent === 'People') {
    disSection.textContent = 'People';
    dashboardView.setAttribute('hidden', 'hidden');
    capstoneSearchSection.setAttribute('hidden', 'hidden');
    peopleSearchSection.removeAttribute('hidden');
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
    capContainer.classList.add('col-xl-4', 'col-md-6', 'col-md-12');
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
async function getAccList(name, type, page, size, sort) {
  const url = `api/${type}/search?`;

  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  var name = !!name ? (name.includes(' ') ? convertString(name) : name) : '';
  var page = !!page ? page : '';
  var size = !!size ? size : '';
  var sort = !!sort ? sort : '';

  var paraList = [name, page, size, sort];
  var nameList = ['acc_name', 'page', 'size', 'sort'];
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

  await updateCompanyUI(type, result.content);
  await displayPagination(result);
}
async function updateCompanyUI(type, accList) {
  displayResult.innerHTML = '';
  for (let i = 0; i < accList.length; i++) {
    const acc = accList[i];
    if (type === 'company') {
      const compContainer = document.createElement('div');
      compContainer.classList.add('col-xl-4', 'col-md-6', 'col-md-12');
      if (acc.imageId != null) {
        const spinning = createSpinningAccCard();
        compContainer.appendChild(spinning);
        displayResult.appendChild(compContainer);

        const card = await createCompanyCard(acc);
        compContainer.removeChild(spinning);
        compContainer.appendChild(card);
      } else {
        const card = await createCompanyCard(acc);
        compContainer.appendChild(card);
        displayResult.appendChild(compContainer);
      }
    } else {
      const accContainer = document.createElement('div');
      accContainer.classList.add('col-xl-4', 'col-md-6', 'col-md-12');
      if (acc.imageId != null) {
        const spinning = createSpinningAccCard();
        accContainer.appendChild(spinning);
        displayResult.appendChild(accContainer);

        const card = await createAccCard(acc);
        accContainer.removeChild(spinning);
        accContainer.appendChild(card);
        // displayResult.appendChild(accContainer);
      } else {
        const card = await createAccCard(acc);
        accContainer.appendChild(card);
        displayResult.appendChild(accContainer);
      }
    }
  }
}
async function createCompanyCard(companyInfo) {
  let placeholder;
  placeholder = document.createElement('i');
  placeholder.className = 'fas fa-building';
  if (companyInfo.imageId !== null) {
    const placeholderURL = await getImage(companyInfo.imageId);
    placeholder = document.createElement('img');
    placeholder.src = placeholderURL;
    placeholder.className = 'tag-icon my-auto ms-4';
  }
  placeholder.classList.add('icon');

  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add('p-3');
  div.classList.add('mb-3');
  div.classList.add('mt-3');

  div.innerHTML += `
       <i class="company-banner fas fa-pennant"></i>
            <div class="d-flex justify-content-between mt-2">
                <div class="d-flex flex-row align-items-center">
                  ${placeholder.outerHTML}
                    <div class="ms-2 c-details">
                        <h5 class="company-title">${companyInfo.name}</h5> <span>1 days ago</span>
                    </div>
                </div>
            </div>
    `;

  const div1 = document.createElement('div');
  div1.className = 'mt-2';
  div1.innerHTML = `<div class="mt-2">
      <div class="sub-overview">
          <i class="bi bi-briefcase"> <span><span>Contact Info: ${
            !!companyInfo.email ? companyInfo.email : 'N/A'
          }</span></span></i>
      </div>
  </div>
  `;
  const div2 = document.createElement('div');
  div2.className = 'mt-2';
  const button = document.createElement('button');
  button.textContent = 'Show Info';
  button.classList.add('btn', 'read-more');
  button.setAttribute('id', companyInfo.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#searchAccountInfo');
  button.addEventListener('click', async function (ev) {
    await displaySearchInfo('company', ev.target.id);
  });
  div2.appendChild(button);
  div1.appendChild(div2);
  div.appendChild(div1);
  return div;
}

async function createAccCard(accInfo) {
  let placeholder;
  placeholder = document.createElement('i');
  placeholder.className = 'fas fa-user-graduate';
  if (accInfo.imageId !== null) {
    const placeholderURL = await getImage(accInfo.imageId);
    placeholder = document.createElement('img');
    placeholder.src = placeholderURL;
    placeholder.className = 'tag-icon my-auto ms-4';
  }
  placeholder.classList.add('icon');
  const div = document.createElement('div');

  div.setAttribute('id', accInfo.id);
  div.classList.add('card');
  div.classList.add('p-3');
  div.classList.add('mb-3');
  div.classList.add('mt-3');
  div.innerHTML = `
            <div class="d-flex justify-content-between mt-2">
                <div class="d-flex flex-row align-items-center">
                    ${placeholder.outerHTML}
                    <div class="ms-2 c-details">
                        <h5 class="company-title">${accInfo.name}</h5> 
                    </div>
                </div>
            </div>
            </div>
    `;
  const div1 = document.createElement('div');
  div1.className = 'mt-2';
  div1.innerHTML = `<div class="mt-2">
    <div class="sub-overview">
        <i class="bi bi-briefcase"> <span><span>Contact Info: ${
          !!accInfo.email ? accInfo.email : 'N/A'
        }</span></span></i>
    </div>
</div>
  `;
  const div2 = document.createElement('div');
  div2.className = 'mt-2';
  const button = document.createElement('button');
  button.textContent = 'Show Info';
  button.classList.add('btn', 'read-more');
  button.setAttribute('id', accInfo.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#searchAccountInfo');
  button.addEventListener('click', async function (ev) {
    if (searchSelection.value === 'student') {
      await displaySearchInfo('student', ev.target.id);
      return;
    }
    await displaySearchInfo('supervisor', ev.target.id);
  });
  div2.appendChild(button);
  div1.appendChild(div2);
  div.appendChild(div1);
  return div;
}
async function displaySearchInfo(type, id) {
  const content = document.getElementById('search-account-body-id');
  content.innerHTML = ``;
  content.appendChild(createSpinningAnimation());
  let endpoint = `api/account/${type}/id/${id}`;
  console.log(endpoint);
  let response = await fetch(endpoint);
  let info = await response.json();
  console.log(info);
  if (type === 'company') {
    let result = await loadCompany(info);
    content.innerHTML = result;
  } else if (type === 'student') {
    let result = await loadStudent(info);
    content.innerHTML = result;
  } else {
    let result = await loadSupervisor(info);
    content.innerHTML = result;
  }
}

function createSpinningAccCard() {
  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add('p-3');
  div.classList.add('mb-3');
  div.classList.add('mt-3');
  div.classList.add('d-flex');
  div.classList.add('justify-content-center');
  div.classList.add('align-items-center');
  div.style.height = '154px';
  div.innerHTML = `
    <div class="loading-spinner">
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
  await updateGroupUI(result.content);
  await displayPagination(result);
}
async function updateGroupUI(groupList) {
  displayResult.innerHTML = '';
  for (let i = 0; i < groupList.length; i++) {
    const group = groupList[i];
    const groupCard = createGroupCard(group);

    const groupContainer = document.createElement('div');
    groupContainer.classList.add('col-xl-4', 'col-md-6', 'col-md-12');
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
                    <div class="icon"><i class="fas fa-users"></i> </div>
                    <div class="ms-2 c-details">
                        <h5 class="mb-0">${groupInfo.groupName}</h5>
                    </div>
                </div>
            </div>
    `;

  const bottom = document.createElement('div');
  bottom.classList.add('mt-3');
  bottom.innerHTML = `
        <h3 class="heading">Capstone: ${
          !!groupInfo.capstone
            ? groupInfo.capstone.projectTitle
            : 'Have not register for Capstone'
        }</h3>
        <h4 class="heading">Supervisor: ${
          !!groupInfo.capstone
            ? groupInfo.capstone.supervisor.name
            : 'Have not register for Capstone'
        }</h4>
    `;

  const bottom2 = document.createElement('div');
  bottom2.classList.add('mt-3');
  bottom2.innerHTML = `
      <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: ${
        (groupInfo.studentList.length / 4) * 100
      }%" aria-valuenow="${
    groupInfo.studentList.length
  }" aria-valuemin="0" aria-valuemax="4"></div>
      </div>
      <div class="mt-3"> 
          <span class="text1"> ${
            groupInfo.studentList.length
          } Applied <span class="text2">of 4</span></span> 
      </div>
    `;

  if (getUser().role === 'student') {
    const button = document.createElement('button');
    button.classList.add('btn', 'join-group-btn');
    button.textContent = 'JOIN';
    button.setAttribute('id', groupInfo.id);
    button.addEventListener('click', async function (ev) {
      let response = await fetch(`api/group/id/${ev.target.id}`);
      let group = await response.json();
      sessionStorage.setItem('group', JSON.stringify(group));
      let currentGroup = JSON.parse(sessionStorage.getItem('current-group'));
      if (currentGroup.id) {
        // modalJoinedGroupInstance.show();
        updateDangerModal(
          'You have already joined a group!',
          alertModalElStudent,
          (ev) => {}
        );
        return;
      } else if (group.studentList.length == 4) {
        // modalGroupFullInstance.show();
        updateDangerModal(
          'This group is full!',
          alertModalElStudent,
          (ev) => {}
        );

        return;
      }
      // confirmMcodalInstance.show();
      updateInfoModal(
        'Are you sure you want to join this group?',
        alertModalElStudent,
        async (ev) => {
          try {
            group.studentList.push(getUser());
            let response = await fetch(`api/group`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(group),
            });

            updateSuccessModal(
              'Join group successfully!',
              alertModalElStudent,
              (ev) => {
                sessionStorage.setItem('current-group', JSON.stringify(group));
                window.location.reload();
              }
            );
          } catch (error) {
            updateDangerModal(
              'Join group failed!',
              alertModalElStudent,
              (ev) => {}
            );
          }
        }
      );
    });
    bottom2.appendChild(button);
  }

  div.appendChild(bottom);
  div.appendChild(bottom2);
  return div;
}

const displayPagination = async function (pageable) {
  //don't change the query selector, if something is wrong, change the html file instead
  const pagination = document.querySelector('#main-pagination');
  pagination.innerHTML = '';
  let maxPage = pageable.totalPages;

  for (let i = 0; i < maxPage; i++) {
    const page = document.createElement('li');
    page.className = 'page-item';
    const pageLink = document.createElement('div');
    pageLink.classList.add('page-link');
    if (i === currentPage) {
      pageLink.classList.add('active');
    }
    pageLink.textContent = i + 1;
    pageLink.addEventListener('click', (e) => {
      const page = Number.parseInt(e.target.textContent) - 1;
      currentPage = page;
      if (searchSelection.value === 'capstone') {
        searchPagePagination.innerHTML = '';
        updateCapstone(currentPage);
      } else if (searchSelection.value === 'group') {
        searchPagePagination.innerHTML = '';
        updateGroup(currentPage);
      } else if (searchSelection.value === 'company') {
        searchPagePagination.innerHTML = '';
        updateCompany(currentPage);
      } else if (searchSelection.value === 'student') {
        searchPagePagination.innerHTML = '';
        updateStudent(currentPage);
      } else if (searchSelection.value === 'supervisor') {
        searchPagePagination.innerHTML = '';
        updateSupervisor(currentPage);
      }
    });
    page.appendChild(pageLink);
    pagination.appendChild(page);
  }
  const prevLiEl = document.createElement('li');
  prevLiEl.classList.add('page-item');
  const prevAEl = document.createElement('a');
  prevAEl.classList.add('page-link');
  prevAEl.textContent = 'Previous';
  prevLiEl.appendChild(prevAEl);
  pagination.insertBefore(prevLiEl, pagination.firstChild);
  prevAEl.addEventListener('click', () => {
    if (currentPage >= 1) {
      currentPage--;
      if (searchSelection.value === 'capstone') {
        searchPagePagination.innerHTML = '';
        updateCapstone(currentPage);
      } else if (searchSelection.value === 'group') {
        searchPagePagination.innerHTML = '';
        updateGroup(currentPage);
      } else if (searchSelection.value === 'company') {
        searchPagePagination.innerHTML = '';
        updateCompany(currentPage);
      } else if (searchSelection.value === 'student') {
        searchPagePagination.innerHTML = '';
        updateStudent(currentPage);
      } else if (searchSelection.value === 'supervisor') {
        searchPagePagination.innerHTML = '';
        updateSupervisor(currentPage);
      }
    }
  });
  const nextLiEl = document.createElement('li');
  nextLiEl.classList.add('page-item');
  const nextAEl = document.createElement('a');
  nextAEl.classList.add('page-link');
  nextAEl.textContent = 'Next';
  nextLiEl.appendChild(nextAEl);
  pagination.appendChild(nextLiEl);
  nextAEl.addEventListener('click', () => {
    if (currentPage < maxPage - 1) {
      currentPage++;
      if (searchSelection.value === 'capstone') {
        searchPagePagination.innerHTML = '';
        updateCapstone(currentPage);
      } else if (searchSelection.value === 'group') {
        searchPagePagination.innerHTML = '';
        updateGroup(currentPage);
      } else if (searchSelection.value === 'company') {
        searchPagePagination.innerHTML = '';
        updateCompany(currentPage);
      } else if (searchSelection.value === 'student') {
        searchPagePagination.innerHTML = '';
        updateStudent(currentPage);
      } else if (searchSelection.value === 'supervisor') {
        searchPagePagination.innerHTML = '';
        updateSupervisor(currentPage);
      }
    }
  });
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
  displayResult.innerHTML = '';
  displayResult.appendChild(createSpinningAnimation());
  await getAccList(searchInput.value, 'company', curPage);
};
const updateStudent = async function (curPage) {
  displayResult.innerHTML = '';
  displayResult.appendChild(createSpinningAnimation());
  await getAccList(searchInput.value, 'student', curPage);
};
const updateSupervisor = async function (curPage) {
  displayResult.innerHTML = '';
  displayResult.appendChild(createSpinningAnimation());
  await getAccList(searchInput.value, 'supervisor', curPage);
};
const onFiltered = async function () {
  if (searchSelection.value === 'capstone') {
    searchInput.placeholder = 'Please enter Capstone Name';
    filterContainer.removeAttribute('style');
    await updateCapstone(0);
  } else if (searchSelection.value === 'group') {
    searchInput.placeholder = 'Please enter Group Name';
    filterContainer.setAttribute('style', 'height: 125px');

    await updateGroup(0);
  } else if (searchSelection.value === 'company') {
    searchInput.placeholder = 'Please enter Company Name';
    filterContainer.setAttribute('style', 'height: 125px');
    await updateCompany(0);
  } else if (searchSelection.value === 'student') {
    searchInput.placeholder = 'Please enter Student Name';
    filterContainer.setAttribute('style', 'height: 125px');
    await updateStudent(0);
  } else if (searchSelection.value === 'supervisor') {
    searchInput.placeholder = 'Please enter Supervisor Name';
    filterContainer.setAttribute('style', 'height: 125px');
    await updateSupervisor(0);
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
    if (selectedOption === 'capstone') {
      searchInput.style.display = 'block';
      superVisorSelection.style.display = 'block';
      companySelection.style.display = 'block';
    } else {
      searchInput.style.display = 'block';
      superVisorSelection.style.display = 'none';
      companySelection.style.display = 'none';
    }
  });
}

// Call the function to enable the filter behavior
handleCollapsibleFilter();

searchSelection.addEventListener('change', function () {
  searchInput.value = '';
  searchPagePagination.innerHTML = '';
  onFiltered();
});

superVisorSelection.addEventListener('change', function () {
  searchPagePagination.innerHTML = '';
  onFiltered();
});
companySelection.addEventListener('change', function () {
  searchPagePagination.innerHTML = '';
  onFiltered();
});
searchInput.addEventListener('keyup', function () {
  searchPagePagination.innerHTML = '';
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
  const companyProfilePicEl = document.querySelector(
    '#company-profile-pic img'
  );
  companyProfilePicEl.innerHTML = '';
  if (capstone.imageId !== null) {
    const src = await getImage(capstone.imageId);
    companyProfilePicEl.src = src;
  } else {
    companyProfilePicEl.src = 'images/login-signup/capstone-logo.png';
  }
  studentCapstoneModal.hide();
  companyProfilePicEl.addEventListener('load', async function () {
    studentCapstoneModal.show();
  });
  await updateGroupSection(capstone);
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
}
async function updateGroupSection(capstone) {
  const groupSection = document.querySelector('#group-modal-container');
  groupSection.innerHTML = ``;
  groupSection.innerHTML = `<h3 class="text-center">Loading...</h3>`;

  const groupList = await fetch(`api/group/capstone/${capstone.id}`);
  const groupListResult = await groupList.json();
  if (groupListResult.content.length === 0) {
    groupSection.innerHTML = `<h3 class="text-center">No Group Found</h3>`;
    if (getUser().role === 'student') {
      groupSection.appendChild(createApplyButton(capstone));
    }
    return;
  }
  groupSection.innerHTML = ``;
  const groupListResultContent = groupListResult.content;
  groupListResultContent.forEach((group) => {
    const groupSectionCard = createGroupCard(group);
    groupSection.appendChild(groupSectionCard);
  });

  if (getUser().role === 'student') {
    groupSection.appendChild(createApplyButton(capstone));
  }
  return;
}
function createApplyButton(capstone) {
  const div = document.createElement('div');
  div.classList.add('text-center');
  let currentGroup = JSON.parse(sessionStorage.getItem('current-group'));
  const applyButton = document.createElement('button');
  applyButton.classList.add('btn', 'btn-primary', 'apply-button');
  applyButton.textContent = 'Apply';
  applyButton.addEventListener('click', async function () {
    let currentGroup = JSON.parse(sessionStorage.getItem('current-group'));
    if (currentGroup.id === null) {
      updateDangerModal(
        'You are not in a group',
        alertModalElStudent,
        () => {}
      );
      return;
    }
    updateInfoModal(
      'You want to apply for this capstone?',
      alertModalElStudent,
      async function () {
        let currentGroup = JSON.parse(sessionStorage.getItem('current-group'));

        const currentGroupInProjectResponse = await fetch(
          `api/group/capstone/${capstone.id}`
        );
        const currentGroupInProjectResult =
          await currentGroupInProjectResponse.json();
        let groupMemberCount = 0;

        for (let i = 0; i < currentGroupInProjectResult.content.length; i++) {
          if (currentGroupInProjectResult.content[i].id === currentGroup.id) {
            updateDangerModal(
              'You are already in this capstone',
              alertModalElStudent,
              () => {}
            );
            return;
          }
          groupMemberCount +=
            currentGroupInProjectResult.content[i].studentList.length;
        }
        let currLength =
          currentGroup.id === null ? currentGroup.studentList.length : 0;
        if (groupMemberCount + currLength > capstone.noStudents) {
          updateDangerModal(
            'This capstone is full',
            alertModalElStudent,
            () => {}
          );
          return;
        }
        currentGroup.capstone = capstone;
        const response = await fetch(`api/group`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentGroup),
        });

        if (response.status === 200) {
          updateSuccessModal(
            'You have applied for this capstone',
            alertModalElStudent,
            () => {
              updateGroupSection(capstone);
            }
          );
          // updateCapstoneModal(capstone);
        } else {
          updateDangerModal('Something went wrong', alertModalElStudent, () => {
            window.location.reload();
          });
        }
      }
    );
  });
  div.appendChild(applyButton);
  return div;
}
searchSelection.dispatchEvent(new Event('change'));
// onFiltered();

updateCompanyList();
updateSupervisorList();
listenProfileBehave();
