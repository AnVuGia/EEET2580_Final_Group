const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');
const groupNameInput = document.querySelector(".group-name-input");
const groupSubmit = document.querySelector("#submit-group");
const groupInfoSection = document.querySelector(".group-info-section");
const groupSubmitButton = document.querySelector('.join-group-btn');
const leaveGroupBtn = document.getElementById('leave-group-btn');
const createGroupBtn = document.querySelector(".create-group-btn")
const registerCapstoneBtn = document.querySelector("#register-btn");

var modalJoinedGroup = document.getElementById("alertModal");  // Query the modal element
var modalJoinedGroupInstance = new bootstrap.Modal(modalJoinedGroup);

var modalGroupFull = document.getElementById("groupFullAlert");  // Query the modal element
var modalGroupFullInstance = new bootstrap.Modal(modalGroupFull);

var confirmModal = document.getElementById("group-apply-confirm");  // Query the modal element
var confirmModalInstance = new bootstrap.Modal(confirmModal);

var successAnnouncment = document.getElementById("successful");  // Query the modal element
var successAnnouncmentInstance = new bootstrap.Modal(successAnnouncment);

var successLeaveAnnouncment = document.getElementById("group-left-successful");  // Query the modal element
var successLeaveAnnouncmentInstance = new bootstrap.Modal(successLeaveAnnouncment);

var groupLeavConfirm = document.getElementById("group-leave-confirm");  // Query the modal element
var groupLeavConfirmInstance = new bootstrap.Modal(groupLeavConfirm);




leaveGroupBtn.addEventListener("click", async function(ev){
        loadingModal.show();
        let index = findObjectIndex(group.studentList,user);
        group.studentList.splice(index,1);
        await fetch('api/group', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(group)
          });
        loadingModal.show();
        await displayGroupInfo();
        await updateGroup(0);
        updateSuccessModal("You successfully left the group!");
        successAnnouncmentInstance.show();
})
successAnnouncment.addEventListener("shown.bs.modal",function(ev){
  loadingModal.hide();
})
//click this button to join the group in search
groupSubmitButton.addEventListener("click", async function(ev){
  updateSessionStorage();
  loadingModal.show();
  let groupToBeApplied = JSON.parse(sessionStorage.getItem("group"));
  groupToBeApplied.studentList.push(user);
  await fetch('api/group', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(groupToBeApplied)
  });
  successAnnouncmentInstance.show();
  await updateGroup(0);
  await getCurrentGroup();
  await displayGroupInfo();
  await getCurrentGroup();
})
successAnnouncment.addEventListener("shown.bs.modal",function(ev){
    loadingModal.hide();
})
groupSubmit.addEventListener("click", async function(ev){
  groupInfoSection.innerHTML = '';
  groupInfoSection.appendChild(createSpinningAnimation());
  await createGroup();
  await displayGroupInfo();
})
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

async function getCurrentGroup(){
  updateSessionStorage();
  let url  = `api/group/${user.id}`;
  const response = await fetch(url);
  const groupInfo = await response.json();
  sessionStorage.setItem("current-group",JSON.stringify(groupInfo));
}

const displayGroupInfo = async function(){
    await getCurrentGroup();
    updateSessionStorage();
    const groupInfoSection = document.querySelector(".group-info-section");
    groupInfoSection.innerHTML = '';
    groupInfoSection.appendChild(createSpinningAnimation());
    const groupInfo = group;
    if (groupInfo.id == undefined){
      groupInfoSection.innerHTML =  ` <p class="empty-message">You have not registered to any group yet</p>`;
    }else{
      groupInfoSection.innerHTML = '';
      createGroupBtn.classList.add("lock-cursor");
      createGroupBtn.removeAttribute("data-bs-target");
      createGroupBtn.removeAttribute("data-bs-toggle");

      const infoTop = document.createElement("div");
      infoTop.classList.add("info-top");
      infoTop.innerHTML = `
          <div class="right-side">
            <p class="group-name group-title">Group Name: ${groupInfo.groupName}</p>
          </div>
      `;
      
      const leftSide = document.createElement("div");
      leftSide.classList.add("left-side");

      const leavGroupBtn = document.createElement("button");
      leavGroupBtn.classList.add("btn");
      leavGroupBtn.textContent = "Leave Group";
      leavGroupBtn.addEventListener("click", function(ev){
        groupLeavConfirmInstance.show();
      });
      leftSide.innerHTML += `
          <p class="group-capacity group-title" style ="margin-right: 8px;">${!!groupInfo.capstone?`${groupInfo.studentList.leng}/4 people`:""}</p>
      `;
      leftSide.appendChild(leavGroupBtn);
      infoTop.appendChild(leftSide);
      groupInfoSection.append(infoTop);


      const bottomSection = document.createElement("div");
      bottomSection.classList.add("info-bottom");
      const memberList = document.createElement("div");
      memberList.classList.add("member-list");
      
      for (var i = 0 ; i < groupInfo.studentList.length;i++){
        const memberItem = document.createElement("li");
        memberItem.classList.add("member-item");
        memberItem.textContent = groupInfo.studentList[i].name;
        memberList.append(memberItem);
      }
      bottomSection.appendChild(memberList);
      groupInfoSection.append(bottomSection);
    }
}

const createGroup  = async function (){
  updateSessionStorage()
  let studentList =user;

  console.log(groupNameInput);

  let groupObject =  {
    groupName : groupNameInput.value,
    studentList: studentList,
    capstone: null
  }
  console.log(groupObject);
  const url  = "api/group";

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // if sending JSON data
    },
    body: JSON.stringify(groupObject), // if sending data in the request body
  })
    .then(response => response.json()) // handle the response
    .then(data => {
      // do something with the response data
    })
    .catch(error => {
      // handle any errors
    });
    await getCurrentGroup();
}


displayGroupInfo();