const profileContainer = document.getElementById("account-profile-main");
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
  for (var i =0 ;i < list.length;i++){
      if (list[i].id === object.id){
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
async function getCurrentGroupUti() {
  let url = `api/group/${getUser().id}`;
  const response = await fetch(url);
  const groupInfo = await response.json();
  sessionStorage.setItem('current-group', JSON.stringify(groupInfo));
}