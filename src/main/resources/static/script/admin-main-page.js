const displayPendingList = document.querySelector('.row');
const approvedButton = document.querySelector('#approve-btn');
const rejectButton = document.querySelector('#reject-btn');
const paginationEl = document.querySelector('#ad-pag');
const alertModal = new bootstrap.Modal(document.getElementById('alert-modal'));
const alertModalEl = document.querySelector('#alert-modal');
const infoModal = new bootstrap.Modal(
  document.getElementById('staticBackdrop')
);
const pageInfo = {
  currPage: 0,
  currSize: 3,
  totalPages: 0,
};
function extractNumberFromString(str) {
  const match = str.match(/\d+/);
  if (match) {
    return parseInt(match[0], 10);
  }
  return null;
}

async function getRequestList(page, size) {
  console.log('getRequestList');

  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const endpoint = `api/pending-capstone-projects?page=${page}&size=${size}`;
  response = await fetch(endpoint);
  result = await response.json();

  return result;
}

async function updateRequestUI() {
  displayPendingList.innerHTML = '';
  displayPendingList.appendChild(createSpinningAnimation());
  const capstoneListData = await getRequestList(
    pageInfo.currPage,
    pageInfo.currSize
  );
  displayPendingList.innerHTML = '';
  const capstoneListDataContent = capstoneListData.content;
  for (let i = 0; i < capstoneListDataContent.length; i++) {
    const capstone = capstoneListDataContent[i];
    const capstoneCard = createRequestCapstoneCard(capstone);
    displayPendingList.appendChild(capstoneCard);
  }
  pageInfo.totalPages = capstoneListData.totalPages;
  paginationEl.innerHTML = '';
  createPagination(pageInfo, paginationEl, updateRequestUI);
}

function createRequestCapstoneCard(capstone) {
  const capItem = document.createElement('div');
  capItem.classList.add('capstone-item');
  capItem.classList.add('col-lg-6');
  capItem.classList.add('col-md-12');

  capItem.innerHTML += `<div style ="background-color: ${capstone.capstoneColor}" class="capstone-item-color"></div>`;

  const itemInfo = document.createElement('div');
  itemInfo.classList.add('capstone-item-info');

  const itemName = document.createElement('p');
  itemName.classList.add('item-name');
  itemName.style.color = capstone.capstoneColor;
  itemName.textContent = capstone.projectTitle;

  itemInfo.appendChild(itemName);

  const cardButton = document.createElement('button');
  cardButton.classList.add('btn', 'card-button', 'mb-2', 'mx-auto');
  cardButton.setAttribute('data-bs-target', '#staticBackdrop');
  cardButton.setAttribute('data-bs-toggle', 'modal');
  cardButton.setAttribute('type', 'button');
  cardButton.setAttribute('style', 'display: margin: 0px auto');
  cardButton.textContent = 'Review';

  cardButton.setAttribute('id', `${capstone.id}`);
  cardButton.addEventListener('click', async function (ev) {
    sessionStorage.setItem(
      'more-info',
      JSON.stringify(extractNumberFromString(ev.target.id))
    );

    console.log('click on item title');
    console.log(ev.target);
    let url = `api/capstone-project/id/${ev.target.id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    updateModal(data);
  });
  const buttonContainer = document.createElement('div');
  buttonContainer.appendChild(cardButton);
  itemInfo.innerHTML += ` <p class="course-code text-primary">${capstone.company.name}</p>
                            <p class="time-enrolled text-secondary">${capstone.supervisor.name}</p>`;

  itemInfo.appendChild(buttonContainer);
  buttonContainer.classList.add('d-flex', 'justify-content-center');
  capItem.appendChild(itemInfo);
  return capItem;
}

const updateModal = async function (capstone) {
  console.log(capstone);
  console.log('update modal');
  let imageURL = capstone.projectImage;
  if (capstone.projectImage == null) {
    imageURL = 'images/login-signup/capstone-logo.png';
  } else {
    loadingSpinner.show();
    imageURL = await getImage(capstone.projectImage);
    loadingSpinner.hide();
  }

  const div = document.querySelector('.information-section');
  div.innerHTML = `<div class="information-section">
                <label for="" class="information-section-element input-label"
                  >Capstone image</label
                >
                <img src="${imageURL}" alt="" class="logo" />
                <label
                  for="capstone-title"
                  class="information-section-element input-label"
                  >Capstone Project Title</label
                >
                <input
                  type="text"
                  id="capstone-title"
                  value="${capstone.projectTitle}"
                  required
                  class="information-section-element input-modal"
                  readonly
                />

                <label
                  for="capstone-intro"
                  class="information-section-element input-label"
                  >Project Introduction</label
                >
                <input
                  type="text"
                  class="information-section-element input-modal"
                  id="introduction"
                  value="${capstone.projectIntroduction}"
                  required
                  readonly
                />
                <label
                  for="capstone-objectives"
                  class="information-section-element input-label"
                  >Project Objectives</label
                >
                <input
                  type="text"
                  class="information-section-element input-modal"
                  id="capstone-objectives"
                  value="${capstone.projectObjectives}"
                  required
                  readonly
                />
                <label for="" class="information-section-element input-label"
                  >Interview Requirements</label
                >
                <input
                    type="text"
                    class="information-section-element input-modal"
                    id="interview-requirements"
                    value="${capstone.interviewReqs}"
                    required
                    readonly
                    />

                <label
                  for="multi-team"
                  class="information-section-element input-label"
                  >Allow Multiteam?</label
                >
                <input
                    type="text"
                    class="information-section-element input-modal"
                    id="multi-team"
                    value="${capstone.multiTeam ? 'Yes' : 'No'}"
                    required
                    readonly
                    />
                
                <label
                  for="academic-background"
                  class="information-section-element input-label"
                  >Academic Background</label
                >
                <input
                  type="text"
                  class="information-section-element input-modal"
                  id="academic-background"
                  value="${capstone.academicBackground}"
                  required
                    readonly
                />
                <label
                  for="no-students"
                  class="information-section-element input-label"
                  >Number of Members in a Group</label
                >
                <input
                  type="number"
                  class="information-section-element input-modal"
                  id="no-students"
                  value="${capstone.noStudents}"
                  required
                    readonly
                />
                <label
                  for="success-criteria"
                  class="information-section-element input-label"
                  >Success criteria</label
                >
                <input
                  type="text"
                  class="information-section-element input-modal"
                  id="success-criteria"
                  value="${capstone.projectSuccessCriteria}"
                  required
                    readonly
                />
                <label
                  for="capstone-description"
                  class="information-section-element input-label"
                  >Capstone Description</label
                >
                <textarea
                  type="text"
                  class="information-section-textarea input-modal"
                  id="capstone-description"
                  required
                  value="${capstone.projectDescription}"
                  readonly
                ></textarea>
                <label
                  for="capstone-requirements"
                  class="information-section-element input-label"
                  >Capstone Requirements</label
                >
                <textarea
                  type="text"
                  class="information-section-textarea input-modal"
                  id="capstone-requirements"
                  required
                    value="${capstone.technicalRequirements}"
                    readonly
                ></textarea>
                <label
                  for="supervisor-select"
                  class="information-section-element input-label"
                  >Supervisor Name</label
                >
                <select
                    type="text"
                    class="information-section-element input-modal"
                    id="supervisor-select"
                    value="${capstone.supervisor.name}"
                    required
                    readonly
                    > </select>
              </div>`;

  document.querySelector('#capstone-description').innerHTML =
    capstone.projectDescription;
  document.querySelector('#capstone-requirements').innerHTML =
    capstone.technicalRequirements;
  await getSuperVisorAdminPage(capstone);
};

approvedButton.addEventListener('click', async function (ev) {
  let id = JSON.parse(sessionStorage.getItem('more-info'));
  try {
    setLoadingModal();
    await setCapstoneStatus(id, 'approved');
    setSuccessAlertModal();
  } catch (error) {
    console.log('error');
    setErrorAlertModal();
  }
});
rejectButton.addEventListener('click', async function (ev) {
  let id = JSON.parse(sessionStorage.getItem('more-info'));
  try {
    setLoadingModal();
    await setCapstoneStatus(id, 'reject');
    setRejectAlertModal();
  } catch (error) {
    console.log('error');
    setErrorAlertModal();
  }
});
const setCapstoneStatus = async function (id, status) {
  let url = `/api/capstone-project/id/${id}`;
  let reponse = await fetch(url);
  let capstone = await reponse.json();

  const supervisorSelect = document.querySelector('#supervisor-select');
  let supervisorUrl = `/api/account/supervisor/id/${supervisorSelect.value}`;
  let supervisorResponse = await fetch(supervisorUrl);
  let supervisor = await supervisorResponse.json();
  capstone.supervisor = supervisor;

  url = `api/capstone-project/${capstone.id}`;
  capstone.capstoneStatus = status;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(capstone),
    });
  } catch (error) {
    console.error(error);
  }
};
function setSuccessAlertModal() {
  console.log('setSuccessAlertModal');
  const alertModalBody = document.querySelector('#alert-modal .modal-body');
  console.log(alertModalBody);
  alertModalBody.innerHTML = `
    <div class="alert-modal-body">
      <div class="alert-modal-body-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <div class="alert-modal-body-text">
        <h3 class ="information-section-element input-label">Success</h3>
        <p class="information-section-element input-label">Capstone project has been approved</p>
      </div>
    </div>
  `;

  alertModal.show();
}
function setRejectAlertModal() {
  console.log('setRejectAlertModal');
  const alertModalBody = document.querySelector('#alert-modal .modal-body');
  console.log(alertModalBody);
  alertModalBody.innerHTML = `

    <div class="alert-modal-body">
      <div class="alert-modal-body-icon"> 
        <i class="fas fa-times-circle"></i>
      </div>
      <div class="alert-modal-body-text"> 
        <h3>Reject</h3>
        <p class ="">Capstone project has been rejected</p> 
      </div>
    </div>  
  `;
  alertModal.show();
}
function setLoadingModal() {
  console.log('setLoadingModal');
  const alertModalBody = document.querySelector('#alert-modal .modal-body');
  console.log(alertModalBody);
  alertModalBody.innerHTML = `
    <div class="alert-modal-body">
      <div class="alert-modal-body-icon">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <div class="alert-modal-body-text">
        <h3>Loading</h3>
        <p>Please wait</p> 
      </div>
    </div>
  `;
  alertModal.show();
}
function setErrorAlertModal() {
  console.log('setErrorAlertModal');
  const alertModalBody = document.querySelector('#alert-modal .modal-body');
  console.log(alertModalBody);
  alertModalBody.innerHTML = `
    <div class="alert-modal-body">
      <div class="alert-modal-body-icon">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <div class="alert-modal-body-text">
        <h3>Error</h3>
        <p>Something went wrong</p> 
      </div>
    </div>
  `;
  alertModal.show();
}
async function getSuperVisorAdminPage(capstone) {
  let url = '/api/account/supervisor/all';
  let response = await fetch(url);
  let supervisors = await response.json();
  let supervisorSelect = document.querySelector('#supervisor-select');
  supervisorSelect.innerHTML = '';
  console.log(supervisors);
  supervisors.forEach((supervisor) => {
    supervisorSelect.innerHTML += `<option ${
      supervisor.id === capstone.supervisor.id ? 'selected' : ''
    } value="${supervisor.id}">${supervisor.name} - ${
      supervisor.email
    }</option>`;
  });
}
alertModalEl.addEventListener('hidden.bs.modal', function (event) {
  updateRequestUI();
});
/
updateRequestUI();
