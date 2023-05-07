const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');

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
    const div = document.querySelector(".group-info-section");
    // div.innerHTML = '';
    // div.appendChild(createSpinningAnimation());
    const user = JSON.parse(sessionStorage.getItem("user"));

    let url  = `api/group/${user.id}`;
    const response = await fetch(url);
    const groupInfo = await response.json();
    
    console.log(groupInfo);
    if (groupInfo.id == undefined){
      div.innerHTML =  ` <p class="empty-message">You have not registered to any group yet</p>`;
    }else{
      const groupNameCotainer = document.querySelector(".group-name");
      groupNameCotainer.textContent = groupInfo.groupName;
      console.log(div);
      const groupCapcity = document.querySelector(".group-capacity");
      groupCapcity.textContent = !!groupInfo.capstone?`${groupInfo.studentList.leng}/${groupInfo.capstone.noStudents}people`:"";
  
      const memberList = document.querySelector(".member-list");
      
      for (var i = 0 ; i < groupInfo.studentList.length;i++){
        const memberItem = document.createElement("li");
        memberItem.classList.add("member-item");
        memberItem.textContent = groupInfo.studentList[i].name;
        memberList.append(memberItem);
      }
    }
}
displayGroupInfo();