const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');
const groupNameInput = document.querySelector(".group-name-input");
const groupSubmit = document.querySelector("#submit-group");
const groupInfoSection = document.querySelector(".group-info-section");


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
// createGroupBtn.addEventListener('click', function () {
//   modalPage.removeAttribute('hidden');
// });
async function getAllApprovedCapstones(page, size) {
  const url = `/api/capstone-projects/approved?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
}
async function updateDashboardUI() {}

const displayGroupInfo = async function(){
    const groupInfoSection = document.querySelector(".group-info-section");
    groupInfoSection.innerHTML = '';
    groupInfoSection.appendChild(createSpinningAnimation());
    const user = JSON.parse(sessionStorage.getItem("user"));

    let url  = `api/group/${user.id}`;
    const response = await fetch(url);
    const groupInfo = await response.json();

    if (groupInfo.id == undefined){
      groupInfoSection.innerHTML =  ` <p class="empty-message">You have not registered to any group yet</p>`;
    }else{
      createGroupBtn.classList.add("lock-cursor");
      createGroupBtn.removeAttribute("data-bs-target");
      createGroupBtn.removeAttribute("data-bs-toggle");
      groupInfoSection.innerHTML = `
      <div class="info-top">
        <div class="right-side">
          <p class="group-name group-title">${groupInfo.groupName}</p>
        </div>
        <div class="left-side">
          <p class="group-capacity group-title">${!!groupInfo.capstone?`${groupInfo.studentList.leng}/${groupInfo.capstone.noStudents}people`:""}</p>
        </div>
      </div>
      `;
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
  let studentList =[JSON.parse(sessionStorage.getItem("user"))];

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
}
displayGroupInfo();