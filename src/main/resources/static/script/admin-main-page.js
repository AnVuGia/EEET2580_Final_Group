const displayPendingList = document.querySelector('.row');
const approvedButton = document.querySelector('#approve-btn');
const rejectButton = document.querySelector('#reject-btn');
const loadingSpinner = document.querySelector('.loading-spinner');
function extractNumberFromString(str) {
  const match = str.match(/\d+/);
  if (match) {
    return parseInt(match[0], 10);
  }
  return null;
}

async function getRequestList() {
  console.log('getRequestList');
  displayPendingList.appendChild(createSpinningAnimation());
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const endpoint = `api/pending-capstone-projects`;
  response = await fetch(endpoint);
  result = await response.json();

  console.log(result);

  updateRequestUI(result.content);
  // await displayPagination(result);
}

async function updateRequestUI(capstoneListData) {
  // console.log(capstoneListData);
  displayPendingList.innerHTML = '';
  for (let i = 0; i < capstoneListData.length; i++) {
    const capstone = capstoneListData[i];
    const capstoneCard = createRequestCapstoneCard(capstone);
    displayPendingList.appendChild(capstoneCard);
  }
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

  itemInfo.innerHTML += ` <p class="course-code">COSC2753</p>
                            <p class="time-enrolled">Semester 1 2023</p>`;

  itemInfo.appendChild(cardButton);

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
    loadingSpinner.style.display = 'block';
    imageURL = await getImage(capstone.projectImage);
    loadingSpinner.style.display = 'none';
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
                  placeholder="${capstone.projectTitle}"
                  required
                  class="information-section-element input-modal"
                  disabled
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
                  placeholder="${capstone.projectIntroduction}"
                  required
                  disabled
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
                  placeholder="${capstone.projectObjectives}"
                  required
                  disabled
                />
                <label for="" class="information-section-element input-label"
                  >Interview Requirements</label
                >
                <input
                    type="text"
                    class="information-section-element input-modal"
                    id="interview-requirements"
                    placeholder="${capstone.interviewReqs}"
                    required
                    disabled
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
                    placeholder="${capstone.multiTeam ? 'Yes' : 'No'}"
                    required
                    disabled
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
                  placeholder="${capstone.academicBackground}"
                  required
                    disabled
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
                  placeholder="${capstone.noStudents}"
                  required
                    disabled
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
                  placeholder="${capstone.projectSuccessCriteria}"
                  required
                    disabled
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
                  placeholder="${capstone.projectDescription}"
                  disabled
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
                    placeholder="${capstone.technicalRequirements}"
                    disabled
                ></textarea>
                <label
                  for="supervisor-select"
                  class="information-section-element input-label"
                  >Supervisor Name</label
                >
                <input
                    type="text"
                    class="information-section-element input-modal"
                    id="supervisor-select"
                    placeholder="${capstone.supervisor.name}"
                    required
                    disabled
                    />
              </div>`;
};

approvedButton.addEventListener('click', async function (ev) {
  let id = JSON.parse(sessionStorage.getItem('more-info'));
  await setCapstoneStatus(id, 'approved');
  await getRequestList();
});
rejectButton.addEventListener('click', async function (ev) {
  let id = JSON.parse(sessionStorage.getItem('more-info'));
  await setCapstoneStatus(id, 'reject');
  await getRequestList();
});
const setCapstoneStatus = async function (id, status) {
  let url = `/api/capstone-project/id/${id}`;
  let reponse = await fetch(url);
  let capstone = await reponse.json();

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

getRequestList();
