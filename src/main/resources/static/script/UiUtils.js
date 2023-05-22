const profileContainer = document.getElementById('account-profile-main');
let nullImagePlacehodler =
  'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg';
const loadingModal = new bootstrap.Modal(
  document.getElementById('loading-modal'),
  {
    keyboard: false,
    backdrop: 'static',
  }
);
const alertModalElStudent = document.querySelector('#alert-modal');
alertModalElStudent.addEventListener('shown.bs.modal', function (ev) {
  loadingModal.hide();
});

function findObjectIndex(list, object) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === object.id) {
      return i;
    }
  }
}
function createCapstoneCard(capstone) {
  // if (!company || !supervisor) {
  //   company = { name: 'No company' };
  //   supervisor = { name: 'No supervisor' };
  // }

  const capItem = document.createElement('div');
  capItem.classList.add('capstone-item');
  capItem.innerHTML = `  
        <div style ="background-color: ${
          !!capstone.capstoneColor ? capstone.capstoneColor : '#BD3C14'
        }" class="capstone-item-color"></div>
            <div class="capstone-item-info">
            <p class="item-name fs-3">${capstone.projectTitle}</p>
            <p class="course-code text-primary">${capstone.company.name}</p>
            <p class="time-enrolled text-secondary">${
              capstone.supervisor.name
            }</p>
        </div>  
    `;
  const titleEl = capItem.querySelector('.item-name');
  titleEl.style.color = capstone.capstoneColor;
  return capItem;
}
function createSpinningAnimation() {
  const spinningEl = document.createElement('div');
  spinningEl.classList.add('loading-spinner');
  return spinningEl;
}

function createPagination(sectionObj, sectionEl, updateSectionUI) {
  if (sectionObj.totalPages <= 1) {
    return;
  }
  const paginationEl = document.createElement('nav');
  paginationEl.setAttribute('aria-label', 'Page navigation');
  const ulEl = document.createElement('ul');
  ulEl.classList.add('pagination');
  ulEl.classList.add('justify-content-center');
  for (let i = 0; i < sectionObj.totalPages; i++) {
    const liEl = document.createElement('li');
    liEl.classList.add('page-item');
    const aEl = document.createElement('a');
    aEl.classList.add('page-link');
    aEl.textContent = i + 1;
    liEl.appendChild(aEl);
    ulEl.appendChild(liEl);
    if (i === sectionObj.currPage) {
      aEl.classList.add('active');
    }
    aEl.addEventListener('click', () => {
      sectionObj.currPage = i;
      updateSectionUI();
    });
  }
  const prevLiEl = document.createElement('li');
  prevLiEl.classList.add('page-item');
  const prevAEl = document.createElement('a');
  prevAEl.classList.add('page-link');
  prevAEl.textContent = 'Previous';
  prevLiEl.appendChild(prevAEl);
  ulEl.insertBefore(prevLiEl, ulEl.firstChild);
  prevAEl.addEventListener('click', () => {
    if (sectionObj.currPage > 0) {
      sectionObj.currPage--;
      updateSectionUI();
    }
  });
  const nextLiEl = document.createElement('li');
  nextLiEl.classList.add('page-item');
  const nextAEl = document.createElement('a');
  nextAEl.classList.add('page-link');
  nextAEl.textContent = 'Next';
  nextLiEl.appendChild(nextAEl);
  ulEl.appendChild(nextLiEl);
  nextAEl.addEventListener('click', () => {
    if (sectionObj.currPage < sectionObj.totalPages - 1) {
      sectionObj.currPage++;
      updateSectionUI();
    }
  });
  paginationEl.appendChild(ulEl);
  sectionEl.appendChild(paginationEl);
}
async function getImage(imageId) {
  if (imageId === null) {
    return;
  }
  const url = `api/images/${imageId}`;
  const response = await fetch(url);
  return response.url;
}
const convertString = function (string) {
  var temp = string.split(' ');
  return temp.join('%20');
};
function updateSuccessModal(msg, modal, buttonAction) {
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
  <div
                class="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <i class="fas fa-shield-check fs-3" style="color: #1dd510"></i>
                <div style="font-size: 1.6rem">
                  ${msg}
                </div>
              </div>
  `;
  const modalFooter = modal.querySelector('.modal-footer');
  modalFooter.innerHTML = `
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
  `;
  const confirmBtn = modal.querySelector('.btn-success');
  confirmBtn.addEventListener('click', buttonAction);
  const newModal = new bootstrap.Modal(modal);
  newModal.show();
}
function updateDangerModal(msg, modal, buttonAction) {
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
  <div
                class="alert alert-warning d-flex align-items-center"
                role="alert"
              >
                <i
                  class="fas fa-exclamation-circle fs-3"
                  style="margin-right: 8px"
                ></i>
                <div style="font-size: 1.6rem" class="danger-modal">
                  ${msg}
                </div>
              </div>
  `;
  const modalFooter = modal.querySelector('.modal-footer');
  modalFooter.innerHTML = `
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
  `;
  const confirmBtn = modal.querySelector('.btn-success');
  confirmBtn.addEventListener('click', buttonAction);
  const newModal = new bootstrap.Modal(modal);
  newModal.show();
}
function updateInfoModal(msg, modal, buttonAction) {
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
  <div
                class="alert alert-primary d-flex align-items-center"
                role="alert"
              >
                <i class="fas fa-info fs-3" style="margin-right: 8px"></i>
                <div style="font-size: 1.6rem" class="inform-modal">
                  ${msg}
                </div>
              </div>
  `;
  const modalFooter = modal.querySelector('.modal-footer');
  modalFooter.innerHTML = `
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
  `;
  const confirmBtn = modal.querySelector('.btn-success');
  confirmBtn.addEventListener('click', buttonAction);
  const newModal = new bootstrap.Modal(modal);
  newModal.show();
}
function updateLoadingModal(msg, modal) {
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `
  <div
                class="alert alert-info d-flex align-items-center"
                role="alert"
              >
                <i style="margin-right: 10px" class="fas fa-sync-alt fa-spin fs-3"></i>
                <div style="font-size: 1.6rem" class="loading-modal">
                  ${msg}
                </div>
              </div>
  `;
  const modalFooter = modal.querySelector('.modal-footer');
  modalFooter.innerHTML = `
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
  `;
  const newModal = new bootstrap.Modal(modal);
  newModal.show();
}
function getUser() {
  return JSON.parse(sessionStorage.getItem('user'));
}
function getCurrentGroup() {
  return JSON.parse(sessionStorage.getItem('current-group'));
}
async function getCurrentGroupUti(id) {
  let url = `api/group/${id}`;
  const response = await fetch(url);
  const groupInfo = await response.json();
  sessionStorage.setItem('group-display', JSON.stringify(groupInfo));
}
function LoadSkills(result2) {
  // const Capabilityul = document.getElementById('capability');
  const skills = document.createElement('ul');
  // Capabilityul.innerHTML = '';
  if (result2.skills) {
    for (let i = 0; i < result2.skills.length; i++) {
      const li = document.createElement('li');
      li.className = 'profile_li';
      li.textContent = result2.skills[i];
      skills.appendChild(li);
    }
  }
  return skills;
}
async function loadCompany(result2) {
  let imageContent = `<img src="${nullImagePlacehodler}" alt="" id="acc-ava">`;
  if (result2.imageId != null) {
    const imageURL = await getImage(result2.imageId);
    imageContent = `<img src="${imageURL}" alt="" id="acc-ava">`;
  }
  let sName = result2.name ? result2.name : 'N/A';
  let contact = result2.contact ? result2.contact : 'N/A';
  let email = result2.email ? result2.email : 'N/A';
  let Bib = result2.bio ? result2.bio : 'N/A';

  let holder = document.createElement('div');
  const content = `
  <div class="row mt-3">
  <div class="col-12 col-lg-4 d-flex justify-content-center my-auto">
      <div class="avatar-container d-flex flex-column">
         ${imageContent}
          <p class="user-namee mx-auto mt-2"  style="font-size: 1.7rem;">${sName}</p>
      </div>
  </div>
  <div class="d-none d-lg-block col-lg-8 d-flex flex-column">
      <div class="basic-info-container mx-auto">
          <div class="basic-info-element d-flex mt-2">
              <div class ="mt-2" style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Full Name</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${sName}</p>
          </div>
          <hr style="width: 95%;" class="mx-auto">
          <div class="basic-info-element d-flex">
              <div style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Email</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${email}</p>
          </div>
          <hr style="width: 95%;" class="mx-auto">
          <div class="basic-info-element d-flex">
              <div style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Contact</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${contact}</p>
          </div>
          <hr style="width: 95%;" class="mx-auto">
          <div class="basic-info-element d-flex">
              <div style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Password</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${
                getUser().password
              }</p>
          </div>
          <hr>
      </div>
      <div class="special-info mx-auto p-2" style="font-size: 1.6rem;">
          <div class="row">
              <div class="bio-container col-6 d-flex flex-column me-auto">
                  <div class="titlee mx-auto" style ="font-size: 1.9rem; font-weight;700">Overview</div>
                  <p class="p-2"> ${
                    getUser().companyDescription
                      ? getUser().companyDescription
                      : 'N/A'
                  }</p>
              </div>
          
              <div class="bio-container col-5 d-flex flex-column">
                  <div class="titlee mx-auto" style ="font-size: 1.9rem; font-weight;700">Manager Contact</div>
                  <ul class="companyInfoList">
                    <li class="company-info-item mb-2">Name: ${
                      getUser().manager ? getUser().manager : 'N/A'
                    }</li>
                    <li class="company-info-item mb-2">Contact: ${
                      getUser().manager_contact
                        ? getUser().manager_contact
                        : 'N/A'
                    }</li>
                  </ul>
              </div>
          </div>
          
      </div>
  </div>
</div> 
`;
  return content;
}
async function loadSupervisor(result2) {
  let imageContent = `<img src="${nullImagePlacehodler}" alt="" id="acc-ava">`;
  if (result2.imageId != null) {
    const imageURL = await getImage(result2.imageId);
    imageContent = `<img src="${imageURL}" alt="" id="acc-ava">`;
  }
  let sName = result2.name ? result2.name : 'N/A';
  let contact = result2.contact ? result2.contact : 'N/A';
  let email = result2.email ? result2.email : 'N/A';
  let Bib = result2.bio ? result2.bio : 'N/A';

  let holder = document.createElement('div');
  const content = `
    <div class="row mt-3">
    <div class="col-12 col-lg-4 d-flex justify-content-center my-auto">
        <div class="avatar-container d-flex flex-column">
            ${imageContent}
            <p class="user-namee mx-auto mt-2"  style="font-size: 1.7rem;">${sName}</p>
        </div>
    </div>
    <div class="d-none d-lg-block col-lg-8 d-flex flex-column">
        <div class="basic-info-container mx-auto">
            <div class="basic-info-element d-flex mt-2">
                <div class ="mt-2" style="width: 200px; display: flex;">
                    <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Full Name</p>
                </div>
                <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${sName}</p>
            </div>
            <hr style="width: 95%;" class="mx-auto">
            <div class="basic-info-element d-flex">
                <div style="width: 200px; display: flex;">
                    <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Email</p>
                </div>
                <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${email}</p>
            </div>
            <hr style="width: 95%;" class="mx-auto">
            <div class="basic-info-element d-flex">
                <div style="width: 200px; display: flex;">
                    <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Contact</p>
                </div>
                <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${contact}</p>
            </div>
            <hr style="width: 95%;" class="mx-auto">
            <div class="basic-info-element d-flex">
                <div style="width: 200px; display: flex;">
                    <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Password</p>
                </div>
                <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${
                  getUser().password
                }</p>
            </div>
            <hr>
        </div>
        <div class="special-info mx-auto p-2" style="font-size: 1.6rem;">
            <div class="row">
                <div class="bio-container col-12 d-flex flex-column me-auto">
                    <div class="titlee mx-auto" style ="font-size: 1.9rem; font-weight;700">Biography</div>
                    <p class="p-2">${Bib}</p>
                </div>
            </div>
            
        </div>
    </div>
  </div> 
`;
  return content;
}
async function loadStudent(result2) {
  console.log(result2);
  let imageContent = `<img src="${nullImagePlacehodler}" alt="" id="acc-ava">`;
  if (result2.imageId != null) {
    const imageURL = await getImage(result2.imageId);
    imageContent = `<img src="${imageURL}" alt="" id="acc-ava">`;
  }
  console.log(imageContent);
  await getCurrentGroupUti(result2.id);
  let group_to_display = sessionStorage.getItem('group-display');
  let company = group_to_display.capstone
    ? group_to_display.capstone.company.name
      ? group_to_display.capstone.company.name
      : 'N/A'
    : 'N/A';
  let projectTitle = group_to_display.capstone
    ? group_to_display.capstone.projectTitle
      ? group_to_display.capstone.projectTitle
      : 'N/A'
    : 'N/A';
  let sName = result2.name ? result2.name : 'N/A';
  let major = result2.major ? result2.major : 'N/A';
  let studentInfoGroup = group_to_display.id
    ? group_to_display.groupName
    : 'N/A';
  let contact = result2.contact ? result2.contact : 'N/A';
  let email = result2.email ? result2.email : 'N/A';
  let Bib = result2.bib ? result2.bib : 'N/A';

  let holder = document.createElement('div');
  holder.appendChild(LoadSkills(result2));

  const content = `
  <div class="row mt-3">
  <div class="col-12 col-lg-4 d-flex justify-content-center my-auto">
      <div class="avatar-container d-flex flex-column">
          ${imageContent}
          <p class="user-namee mx-auto mt-2"  style="font-size: 1.7rem;">${sName}</p>
          <p class="user-namee mx-auto"  style="font-size: 1.7rem;">Group: ${studentInfoGroup}</p>
          <p class="user-namee mx-auto"  style="font-size: 1.7rem;">Company: ${company}</p>
          <p class="user-namee mx-auto"  style="font-size: 1.7rem;">Capstone: ${projectTitle}</p>
          <p class="user-namee mx-auto"  style="font-size: 1.7rem;">Major: ${major}</p>
      </div>
  </div>
  <div class="d-none d-lg-block col-lg-8 d-flex flex-column">
      <div class="basic-info-container mx-auto">
          <div class="basic-info-element d-flex mt-2">
              <div class ="mt-2" style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Full Name</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${sName}</p>
          </div>
          <hr style="width: 95%;" class="mx-auto">
          <div class="basic-info-element d-flex">
              <div style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Email</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${email}</p>
          </div>
          <hr style="width: 95%;" class="mx-auto">
          <div class="basic-info-element d-flex">
              <div style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Contact</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${contact}</p>
          </div>
          <hr style="width: 95%;" class="mx-auto">
          <div class="basic-info-element d-flex">
              <div style="width: 200px; display: flex;">
                  <p class="lable" style="margin: auto 0px auto 30px; font-size: 1.8rem; font-weight: 800; ">Password</p>
              </div>
              <p class="lable my-auto" style="font-size: 1.6rem; margin-left: 250px;">${
                getUser().password
              }</p>
          </div>
          <hr>
      </div>
      <div class="special-info mx-auto p-2" style="font-size: 1.6rem;">
          <div class="row">
              <div class="bio-container col-6 d-flex flex-column me-auto">
                  <div class="titlee mx-auto" style ="font-size: 1.9rem; font-weight;700">Biography</div>
                  <p class="p-2">${Bib}</p>
              </div>
              <div class="bio-container col-5 d-flex flex-column">
                  <div class="titlee mx-auto" style ="font-size: 1.9rem; font-weight;700" >Skills</div>
                  <p class="p-2">${holder.innerHTML}</p>
              </div>
          </div>
          
      </div>
  </div>
</div> 
`;
  return content;
}
