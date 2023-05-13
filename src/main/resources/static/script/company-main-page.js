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
  const endpoint = `api/capstone-project/${currCompany.username}/approved`;
  const url = `${endpoint}?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
async function getPendingCapstoneProject(page, size) {
  const endpoint = `api/capstone-project/${currCompany.username}/pending`;
  const url = `${endpoint}?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
async function getRejectCapstoneProject(page, size) {
  const endpoint = `api/capstone-project/${currCompany.username}/rejected`;
  const url = `${endpoint}?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
async function updateApproveSectionUI() {
  const approveSectionEl = document.querySelector('.company-approved-list');
  approveSectionEl.innerHTML = '';

  const approveCapstoneProject = await getApproveCapstoneProject(
    approveSectionPage.currPage,
    approveSectionPage.currSize
  );
  const data = approveCapstoneProject.content;
  if (data.length === 0) {
    approveSectionEl.innerHTML =
      '<p style="font-size: 1.6rem; text-align:center">No approved capstone project</p>';
  } else {
    data.forEach((capstone) => {
      const capItem = createCapstoneCard(capstone);
      const capContainer = document.createElement('div');
      capContainer.classList.add('col-lg-4', 'col-md-12');
      capContainer.appendChild(capItem);

      capItem.addEventListener('click', () => {
        updateCapstoneModal(capstone);
      });
      approveSectionEl.appendChild(capContainer);
    });
    approveSectionPage.totalPages = approveCapstoneProject.totalPages;
    const approvePagination = document.querySelector('#approve-pagination');
    approvePagination.innerHTML = '';
    createPagination(
      approveSectionPage,
      approvePagination,
      updateApproveSectionUI
    );
  }

  // approveSectionEl.removeChild(spinner1);
}
async function updatePendingSectionUI() {
  const pendingSectionEl = document.querySelector('.company-pending-list');

  pendingSectionEl.innerHTML = '';

  const pendingCapstoneProject = await getPendingCapstoneProject(
    pendingSectionPage.currPage,
    pendingSectionPage.currSize
  );
  const data = pendingCapstoneProject.content;
  if (data.length === 0) {
    pendingSectionEl.innerHTML =
      '<p style="font-size: 1.6rem; text-align:center"> No pending capstone project</p>';
  } else {
    data.forEach((capstone) => {
      const capItem = createCapstoneCard(capstone);
      const capContainer = document.createElement('div');
      capContainer.classList.add('col-lg-4', 'col-md-12');
      capContainer.appendChild(capItem);
      const deleteButton = createDeleteCapstoneButton(
        capstone,
        updateRejectSectionUI
      );
      capItem.appendChild(deleteButton);
      const deleteButtonEl = capItem.querySelector('.btn-danger');
      capItem.addEventListener('click', (event) => {
        if (event.target === deleteButtonEl) {
          event.stopPropagation();
        } else {
          updateCapstoneModal(capstone);
        }
      });
      pendingSectionEl.appendChild(capContainer);
    });
  }
  pendingSectionPage.totalPages = pendingCapstoneProject.totalPages;
  const pendingPagination = document.querySelector('#pending-pagination');
  pendingPagination.innerHTML = '';
  createPagination(
    pendingSectionPage,
    pendingPagination,
    updatePendingSectionUI
  );
  // pendingSectionEl.removeChild(spinner2);
}
async function updateRejectSectionUI() {
  const rejectSectionEl = document.querySelector('.company-rejected-list');

  rejectSectionEl.innerHTML = `
  <div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
  `;

  const rejectCapstoneProject = await getRejectCapstoneProject(
    rejectSectionPage.currPage,
    rejectSectionPage.currSize
  );
  const data = rejectCapstoneProject.content;
  if (data.length === 0) {
    rejectSectionEl.innerHTML =
      '<p style="font-size: 1.6rem; text-align:center">No rejected capstone project</p>';
  } else {
    rejectSectionEl.innerHTML = '';
    data.forEach((capstone) => {
      const capItem = createCapstoneCard(capstone);
      const capContainer = document.createElement('div');
      capContainer.classList.add('col-lg-4', 'col-md-12');
      capContainer.appendChild(capItem);

      const deleteButton = createDeleteCapstoneButton(
        capstone,
        updateRejectSectionUI
      );
      capItem.appendChild(deleteButton);
      const deleteButtonEl = capItem.querySelector('.btn-danger');
      capItem.addEventListener('click', (event) => {
        if (event.target === deleteButtonEl) {
          event.stopPropagation();
        } else {
          updateCapstoneModal(capstone);
        }
      });
      rejectSectionEl.appendChild(capContainer);
    });
  }
  rejectSectionPage.totalPages = rejectCapstoneProject.totalPages;
  const rejectPagination = document.querySelector('#reject-pagination');
  rejectPagination.innerHTML = '';
  createPagination(rejectSectionPage, rejectPagination, updateRejectSectionUI);
}
function createDeleteCapstoneButton(capstone, updateUI) {
  const alertModal = document.querySelector('#alert-modal');
  const div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-center');
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.innerText = 'Delete';
  button.addEventListener('click', async () => {
    updateDangerModal(
      'Are you sure you want to delete this capstone project?',
      alertModal,
      async () => {
        try {
          await deleteCapstone(capstone.id);
          updateUI();
        } catch (err) {
          updateDangerModal(err.message, alertModal);
        }
      }
    );
  });
  div.appendChild(button);
  return div;
}
async function deleteCapstone(id) {
  const endpoint = `api/capstone-project?id=${id}`;
  const url = `${endpoint}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
}
async function updateUI() {
  updatePendingSectionUI();
  updateApproveSectionUI();
  updateRejectSectionUI();
}
updateUI();
