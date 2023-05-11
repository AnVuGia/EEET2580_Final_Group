const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');
const groupNameInput = document.querySelector('.group-name-input');
const groupSubmit = document.querySelector('#submit-group');
const groupInfoSection = document.querySelector('.group-info-section');
const groupSubmitButton = document.querySelector('.join-group-btn');
const leaveGroupBtn = document.getElementById('leave-group-btn');
const createGroupBtn = document.querySelector('.create-group-btn');
const registerCapstoneBtn = document.querySelector('#register-btn');
const capstoneContainer = document.querySelector('.capstone-list-dashboard');
const alertModalElStudent = document.querySelector('#alert-modal');
const alertModalInstanceStudent = new bootstrap.Modal(alertModalElStudent);

async function updateStudentDashBoardUI() {
  console.log('updateStudentDashBoardUI');
  console.log(capstoneContainer);
  let groupInfo = JSON.parse(sessionStorage.getItem('current-group'));
  if (groupInfo == null) {
    await getCurrentGroup();
    groupInfo = JSON.parse(sessionStorage.getItem('current-group'));
  }

  if (groupInfo.id == null) {
    capstoneContainer.innerHTML = `
        <div
                class="alert alert-primary d-flex align-items-center"
                role="alert"
              >
                <i class="fas fa-info fs-3" style="margin-right: 8px"></i>
                <div style="font-size: 1.6rem" class="inform-modal">
                  You are not in a group yet!
                </div>
              </div>
    `;
  } else if (groupInfo.capstone == null) {
    capstoneContainer.innerHTML = `
        <div
                class="alert alert-primary d-flex align-items-center"
                role="alert"
              >
                <i class="fas fa-info fs-3" style="margin-right: 8px"></i>
                <div style="font-size: 1.6rem" class="inform-modal">
                  You are not in a capstone yet!
                </div>
              </div>
    `;
  } else {
    capstoneContainer.innerHTML = '';
    const capstone = createCapstoneCard(groupInfo.capstone);
    capstoneContainer.appendChild(capstone);
    capstone.addEventListener('click', async function (ev) {
      await updateCapstoneModal(groupInfo.capstone);
      studentCapstoneModal.show();
    });
  }
}

async function onLeave(ev) {
  updateDangerModal(
    'Are you sure you want to leave the group?',
    alertModalElStudent,
    async () => {
      loadingModal.show();
      let group = JSON.parse(sessionStorage.getItem('current-group'));
      let index = findObjectIndex(group.studentList, getUser());
      group.studentList.splice(index, 1);
      await fetch('api/group', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
      });
      loadingModal.show();
      await displayGroupInfo();
      await updateGroup(0);
      updateSuccessModal(
        'You successfully left the group!',
        alertModalElStudent,
        () => {
          window.location.reload();
        }
      );
    }
  );
}

alertModalElStudent.addEventListener('shown.bs.modal', function (ev) {
  loadingModal.hide();
});
//click this button to join the group in search
if (groupSubmitButton) {
  groupSubmitButton.addEventListener('click', async function (ev) {
    loadingModal.show();
    let groupToBeApplied = JSON.parse(sessionStorage.getItem('group'));
    groupToBeApplied.studentList.push(getUser());
    await fetch('api/group', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupToBeApplied),
    });
    successAnnouncmentInstance.show();
    await updateGroup(0);
    await getCurrentGroup();
    await displayGroupInfo();
    await getCurrentGroup();
    await updateStudentDashBoardUI();
  });
}

groupSubmit.addEventListener('click', async function (ev) {
  groupInfoSection.innerHTML = '';
  groupInfoSection.appendChild(createSpinningAnimation());
  await createGroup();
  await displayGroupInfo();
});
modalCancelBtn.addEventListener('click', function () {
  modalPage.setAttribute('hidden', 'hidden');
});
const paginationInfo = {
  currPage: 0,
  totalPages: 0,
  currSize: 5,
};

async function getAllApprovedCapstones(page, size) {
  const url = `/api/capstone-projects/approved?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
}
async function updateDashboardUI() {}

async function getCurrentGroup() {
  let url = `api/group/${getUser().id}`;
  const response = await fetch(url);
  const groupInfo = await response.json();
  sessionStorage.setItem('current-group', JSON.stringify(groupInfo));
}

const displayGroupInfo = async function () {
  await getCurrentGroup();

  const groupInfoSection = document.querySelector('.group-info-section');
  groupInfoSection.innerHTML = '';
  groupInfoSection.appendChild(createSpinningAnimation());
  const groupInfo = JSON.parse(sessionStorage.getItem('current-group'));
  if (groupInfo.id == undefined) {
    groupInfoSection.innerHTML = ` <p class="empty-message">You have not registered to any group yet</p>`;
  } else {
    groupInfoSection.innerHTML = '';
    createGroupBtn.classList.add('lock-cursor');
    createGroupBtn.removeAttribute('data-bs-target');
    createGroupBtn.removeAttribute('data-bs-toggle');

    const infoTop = document.createElement('div');
    infoTop.classList.add('info-top');
    infoTop.innerHTML = `
          <div class="right-side">
            <p class="group-name group-title">Group Name: ${groupInfo.groupName}</p>
          </div>
      `;

    const leftSide = document.createElement('div');
    leftSide.classList.add('left-side');

    const leavGroupBtn = document.createElement('button');
    leavGroupBtn.classList.add('btn');
    leavGroupBtn.textContent = 'Leave Group';
    leftSide.innerHTML += `
          <p class="group-capacity group-title" style ="margin-right: 8px;">${
            !!groupInfo.capstone
              ? `${groupInfo.studentList.length}/4 people`
              : ''
          }</p>
      `;
    leavGroupBtn.addEventListener('click', async function (ev) {
      await onLeave(ev);
    });
    leftSide.appendChild(leavGroupBtn);
    infoTop.appendChild(leftSide);
    groupInfoSection.append(infoTop);

    const bottomSection = document.createElement('div');
    bottomSection.classList.add('info-bottom');
    const memberList = document.createElement('div');
    memberList.classList.add('member-list');

    for (var i = 0; i < groupInfo.studentList.length; i++) {
      const memberItem = document.createElement('li');
      memberItem.classList.add('member-item');
      memberItem.textContent = groupInfo.studentList[i].name;
      memberList.append(memberItem);
    }
    bottomSection.appendChild(memberList);
    groupInfoSection.append(bottomSection);
  }
};

const createGroup = async function () {
  updateSessionStorage();
  let studentList = getUser();

  console.log(groupNameInput);

  let groupObject = {
    groupName: groupNameInput.value,
    studentList: studentList,
    capstone: null,
  };
  console.log(groupObject);
  const url = 'api/group';

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // if sending JSON data
    },
    body: JSON.stringify(groupObject), // if sending data in the request body
  })
    .then((response) => response.json()) // handle the response
    .then((data) => {
      // do something with the response data
    })
    .catch((error) => {
      // handle any errors
    });
  await getCurrentGroup();
};
updateStudentDashBoardUI();
displayGroupInfo();
