let currCompany = sessionStorage.getItem('user');
currCompany = JSON.parse(currCompany);
//loading spinner
const spinner1 = createSpinningAnimation();
const spinner2 = createSpinningAnimation();
const spinner3 = createSpinningAnimation();
//
const approveSectionPage = {
  currPage: 0,
  currSize: 3,
  totalPages: 0,
};
const rejectSectionPage = {
  currPage: 0,
  currSize: 3,
  totalPages: 0,
};
const pendingSectionPage = {
  currPage: 0,
  currSize: 3,
  totalPages: 0,
};
async function getApproveCapstoneProject(page, size) {
  console.log(currCompany.name);
  const endpoint = `api/capstone-project/${currCompany.name}/approved`;
  const url = `${endpoint}?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
}
async function getPendingCapstoneProject(page, size) {
  const endpoint = `api/capstone-project/${currCompany.name}/pending`;
  const url = `${endpoint}?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
}
async function getRejectCapstoneProject(page, size) {
  const endpoint = `api/capstone-project/${currCompany.name}/rejected`;
  const url = `${endpoint}?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
}

async function updateApproveSectionUI() {
  const approveSectionEl = document.querySelector('.company-approved-list');
  approveSectionEl.innerHTML = '';
  approveSectionEl.appendChild(spinner1);
  const approveCapstoneProject = await getApproveCapstoneProject(
    approveSectionPage.currPage,
    approveSectionPage.currSize
  );
  const data = approveCapstoneProject.content;
  if (data.length === 0) {
    approveSectionEl.innerHTML = '<p>No approved capstone project</p>';
  } else {
    data.forEach((capstone) => {
      const capItem = createCapstoneCard(capstone);
      approveSectionEl.appendChild(capItem);
    });
    approveSectionPage.totalPages = approveCapstoneProject.totalPages;
    createPagination(
      approveSectionPage,
      approveSectionEl,
      updateApproveSectionUI
    );
  }

  approveSectionEl.removeChild(spinner1);
}
async function updatePendingSectionUI() {
  const pendingSectionEl = document.querySelector('.company-pending-list');

  pendingSectionEl.innerHTML = '';
  pendingSectionEl.appendChild(spinner2);
  const pendingCapstoneProject = await getPendingCapstoneProject(
    pendingSectionPage.currPage,
    pendingSectionPage.currSize
  );
  const data = pendingCapstoneProject.content;
  if (data.length === 0) {
    pendingSectionEl.innerHTML = '<p>No pending capstone project</p>';
  } else {
    data.forEach((capstone) => {
      const capItem = createCapstoneCard(capstone);
      pendingSectionEl.appendChild(capItem);
    });
  }
  pendingSectionPage.totalPages = pendingCapstoneProject.totalPages;
  createPagination(
    pendingSectionPage,
    pendingSectionEl,
    updatePendingSectionUI
  );
  pendingSectionEl.removeChild(spinner2);
}
async function updateRejectSectionUI() {
  const rejectSectionEl = document.querySelector('.company-rejected-list');

  rejectSectionEl.innerHTML = '';
  rejectSectionEl.appendChild(spinner3);
  const rejectCapstoneProject = await getRejectCapstoneProject(
    rejectSectionPage.currPage,
    rejectSectionPage.currSize
  );
  const data = rejectCapstoneProject.content;
  if (data.length === 0) {
    rejectSectionEl.innerHTML = '<p>No rejected capstone project</p>';
  } else {
    data.forEach((capstone) => {
      const capItem = createCapstoneCard(capstone);
      rejectSectionEl.appendChild(capItem);
    });
  }
  rejectSectionPage.totalPages = rejectCapstoneProject.totalPages;
  createPagination(rejectSectionPage, rejectSectionEl, updateRejectSectionUI);
  rejectSectionEl.removeChild(spinner3);
}

async function updateUI() {
  updatePendingSectionUI();
  updateApproveSectionUI();
  updateRejectSectionUI();
}
updateUI();
