const currUser = JSON.parse(sessionStorage.getItem('user'));
const paginationSection = document.querySelector('#sup-pagination');
const capstoneContainer = document.querySelector('.request-capstone');
const submitProfileBtn = document.getElementById('submit-sup-porfile');
const loadingSpinner = createSpinningAnimation();
const newPassword = document.querySelector('#sup-profile-password');

submitProfileBtn.addEventListener('click', async function (ev) {
  if (newPassword.value.length >= 8) {
    updateInfoModal(
      'Are you sure you want to save change this information?',
      alertModalElStudent,
      async () => {
        loadingModal.show();
        await updateProfile();
        loadSupModal();
        displayWelcomMessage();
        updateProfileUI();
      }
    );
  } else {
    updateDangerModal(
      'Password should be at least 8 characters',
      alertModalElStudent,
      (ev) => {
        loadSupModal();
      }
    );
  }
});
const superviseCapstoneSection = {
  currPage: 0,
  currSize: 3,
  totalPages: 0,
};

async function getSupCapstoneList(page, size) {
  const endpoint = `api/capstone-project/supervisor?name=${currUser.name}&page=${page}&size=${size}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

async function updateUI() {
  capstoneContainer.innerHTML = '';
  paginationSection.innerHTML = '';
  capstoneContainer.appendChild(loadingSpinner);
  const capstoneList = await getSupCapstoneList(
    superviseCapstoneSection.currPage,
    superviseCapstoneSection.currSize
  );
  const capstoneListData = capstoneList.content;
  capstoneContainer.innerHTML = '';
  capstoneListData.forEach((capstone) => {
    const capstoneEl = createCapstoneCardWithEditButton(capstone);
    const div = document.createElement('div');
    div.classList.add('col', 'col-lg-12', 'col-xl');
    div.appendChild(capstoneEl);
    capstoneContainer.appendChild(div);
  });
  superviseCapstoneSection.totalPages = capstoneList.totalPages;

  createPagination(superviseCapstoneSection, paginationSection, updateUI);
}
updateUI();

function createCapstoneCardWithEditButton(capstone) {
  const capItem = document.createElement('div');
  capItem.classList.add('capstone-item');
  capItem.innerHTML = `  
        <div style ="background-color: ${
          !!capstone.capstoneColor ? capstone.capstoneColor : '#BD3C14'
        }" class="capstone-item-color"></div>
          <div class="capstone-item-info">
          <p class="item-name">${capstone.projectTitle}</p>
          <p class="course-code">${capstone.company.name}</p>
          <p class="time-enrolled">${capstone.supervisor.name}</p>
          <button class="edit-button btn">Edit</button> 
        </div>  
    `;

  // Add event listener for the Edit button
  const editButton = capItem.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    const editForm = createEditCapstoneForm(capstone);
    document.body.appendChild(editForm);
  });

  capItem.addEventListener('click', async function (ev) {
    ev.preventDefault();

    if (ev.target !== editButton) {
      await updateCapstoneModal(capstone);
      studentCapstoneModal.show();
    }
  });

  return capItem;
}

function closeModal() {
  document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.querySelector('#close-modal-btn');

    closeModalBtn.addEventListener('click', () => {
      const studentCapstoneModal = new bootstrap.Modal(
        document.querySelector('#student-capstone-modal')
      );
      studentCapstoneModal.hide();

      // Add this line to remove the 'modal-open' class from the body
      document.body.classList.remove('modal-open');
      // Add this line to remove the 'modal-backdrop' element
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    });
  });
}

function createEditCapstoneForm(capstone) {
  // Create a form container element
  const editFormContainer = document.createElement('div');
  editFormContainer.classList.add('edit-form-container');

  // Create the form overlay element
  const formOverlay = document.createElement('div');
  formOverlay.classList.add('form-overlay');
  editFormContainer.appendChild(formOverlay);

  // Create the form element
  const form = document.createElement('form');
  form.classList.add('edit-form');
  form.innerHTML = `
    <h3>Edit Capstone Project</h3>
    <p>
      Please fill in the form below to edit the capstone project.
    </p>
    <div class="capstone-information">
        <label for="project-image">Capstone Image</label>
        <input type="file" id="project-image" accept="image/*" />

        <label for="project-title">Capstone Project Title</label>
        <input type="text" id="project-title" value="${
          capstone.projectTitle
        }" />
        
        <label for="project-introduction"> Capstone Project Introduction</label>
        <textarea type="text" id="project-introduction">${
          capstone.projectIntroduction
        }</textarea>

        <label for="project-objectives">Capstone Project Objectives</label>
        <textarea type="text" id="project-objectives">${
          capstone.projectObjectives
        }</textarea>

        <label for="project-interview-requirements">Interview Requirements</label>
        <input type="text" id="project-interview-requirements" value="${
          capstone.interviewReqs
        }" />

        <label for="project-multi-team">Allow Multiteam?</label>
        <select id="project-multi-team">
           <option value="true" ${
             capstone.multiTeamAllow ? 'selected' : ''
           }>Yes</option>
           <option value="false" ${
             !capstone.multiTeamAllow ? 'selected' : ''
           }>No</option>
        </select>
        
        <label for="project-academic-background">Academic Background</label>
        <input type="text" id="project-academic-background" value="${
          capstone.academicBackground
        }"/>
        
        <label for="project-no-students">Number of Members in a Group</label>
        <input type="number" id="project-no-students" value="${
          capstone.noStudents
        }"/>

        <label for="project-success-criteria">Success criteria</label>
        <input type="text" id="project-success-criteria" value="${
          capstone.projectSuccessCriteria
        }"/>

        <label for="project-description">Capstone Description</label>
        <textarea type="text" id="project-description">${
          capstone.projectDescription
        }</textarea>
        
        <label for="project-requirements">Capstone Requirements</label>
        <textarea type="text" id="project-requirements">${
          capstone.technicalRequirements
        }</textarea>
        
        <label for="supervisor-name">Company Name</label>
        <input readonly type="text" id="supervisor-name" value="${
          capstone.supervisor.name
        }"/>
        
      
        
        <label for="company-name">Company Name</label>
        <input readonly type="text" id="company-name" value="${
          capstone.company.name
        }"/>
        
       
        <button type="submit">Save</button>
        <button type="button" class="close-button">Close</button>
        
        
    </div>
  `;
  editFormContainer.appendChild(form);

  // Close button functionality
  const closeButton = form.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(editFormContainer);
  });

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Update the capstone data and close the form
    const updateSuccess = await updateCapstoneProject(capstone);

    if (updateSuccess) {
      updateUI();
      document.body.removeChild(editFormContainer);
    }
  });

  return editFormContainer;
}
async function setCapstoneImage(capstoneProject) {
  const fileInput = document.querySelector('#project-image');
  if (fileInput.files.length === 0) {
    await fetch(`/api/capstone-project/id/${capstoneProject.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(capstoneProject),
    });
    return capstoneProject;
  }
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, 300, 300);
      const compressedImageData = canvas.toDataURL('image/jpeg', 0.5);
      const formData = new FormData();
      formData.append('file', dataURItoBlob(compressedImageData));

      fetch('/api/images', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log('Image uploaded successfully.');
          return response.json();
        })
        .then((data) => {
          capstoneProject.imageId = data.id;

          return capstoneProject;
        })
        .then((capstoneProject) => {
          fetch(`/api/capstone-project/id/${capstoneProject.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(capstoneProject),
          })
            .then((response) => {
              console.log('Capstone project update successfully.');
            })
            .then((data) => {
              console.log(data);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    image.src = reader.result;
  };
  reader.readAsDataURL(file);
  return capstoneProject;
}
async function updateCapstoneProject(capstone) {
  const updatedCapstoneData = {
    id: capstone.id,
    company: capstone.company,
    supervisor: capstone.supervisor,
    projectTitle: document.querySelector('#project-title').value,
    projectIntroduction: document.querySelector('#project-introduction').value,
    projectObjectives: document.querySelector('#project-objectives').value,
    interviewReqs: document.querySelector('#project-interview-requirements')
      .value,
    multiTeamAllow: document.querySelector('#project-multi-team').value,
    academicBackground: document.querySelector('#project-academic-background')
      .value,
    noStudents: document.querySelector('#project-no-students').value,
    projectSuccessCriteria: document.querySelector('#project-success-criteria')
      .value,
    projectDescription: document.querySelector('#project-description').value,
    projectRequirement: document.querySelector('#project-requirements').value,
    capstoneStatus: capstone.capstoneStatus,
    imageId: capstone.imageId,
  };
  try {
    await setCapstoneImage(updatedCapstoneData);
    return true;
  } catch (error) {
    console.error('Error updating capstone project:', error);
    return false;
  }
}

//This part is for edit supervisor profile
const supervisorName = document.querySelector('#profile-supervisor-name');
const supervisorBio = document.querySelector('#profile-supervisor-bio');
const supervisorEmail = document.querySelector('#profile-supervisor-email');
const supervisorContact = document.querySelector('#profile-supervisor-contact');

const imgPlacHolder = document.querySelector('.rounded-circle');

const nullImagePlacehodler =
  'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg';

function updateProfileUI(result2) {
  let sName = getUser().name ? getUser().name : 'N/A';
  let contact = getUser().contact ? getUser().contact : 'N/A';
  let email = getUser().email ? getUser().email : 'N/A';
  let Bib = getUser().bio ? getUser().bio : 'N/A';

  let holder = document.createElement('div');
  const content = `
  <div class="row mt-3">
  <div class="col-12 col-lg-4 d-flex justify-content-center my-auto">
      <div class="avatar-container d-flex flex-column">
          <img id="profile_img" src="${nullImagePlacehodler}" alt="" id="acc-ava">
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
  profileContainer.innerHTML = '';
  profileContainer.innerHTML += content;
  loadSupModal();
}
updateProfileUI();

async function loadSupModal() {
  const imgIdDiv = document.getElementById('profile_img');
  console.log(imgIdDiv);
  const subProfileBio = document.getElementById('sup-profile-bio');
  const subProfileContact = document.getElementById('sup-profile-contact');
  const subPassword = document.getElementById('sup-profile-password');
  const subProfileEmail = document.getElementById('sup-profile-email');
  subProfileBio.value = getUser().bio ? getUser().bio : 'N/A';
  subProfileContact.value = getUser().contact ? getUser().contact : 'N/A';
  subProfileEmail.value = getUser().email ? getUser().email : 'N/A';
  subPassword.value = getUser().password ? getUser().password : 'N/A';

  if (getUser().imageId) {
    const imgURL = await getImage(getUser().imageId);
    imgIdDiv.src = imgURL;
    alertModalElStudent.querySelector('.btn-close').click();
  } else {
    imgIdDiv.src = nullImagePlacehodler;
    setTimeout(() => {
      alertModalElStudent.querySelector('.btn-close').click();
      displayWelcomMessage();
    }, 1000);
  }
}
async function onSupervisorLoad() {
  updateLoadingModal('Loading...', document.querySelector('#alert-modal'));
  await loadSupModal();
}
onSupervisorLoad();
async function updateProfile(supervisorID) {
  let newUser = getUser();
  console.log(newUser);
  newUser.bio = document.querySelector('#sup-profile-bio').value;
  newUser.email = document.querySelector('#sup-profile-email').value;
  newUser.contact = document.querySelector('#sup-profile-contact').value;
  newUser.password = document.querySelector('#sup-profile-password').value;
  sessionStorage.setItem('user', JSON.stringify(newUser));
  if (document.getElementById('profile-image').files.length != 0) {
    const image = new Image();
    const file = document.getElementById('profile-image').files[0];
    const reader = new FileReader();
    reader.onload = () => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, 300, 300);
        const compressedImageData = canvas.toDataURL('image/jpeg', 0.5);
        const formData = new FormData();
        formData.append('file', dataURItoBlob(compressedImageData));

        fetch('/api/images', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            console.log('Image uploaded successfully.');
            return response.json();
          })
          .then((data) => {
            newUser.imageId = data.id;
            sessionStorage.setItem('user', JSON.stringify(newUser));
            try {
              UpdateSupervisorInfo(newUser);
            } catch (error) {
              console.error('Error updating supervisor information:', error);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    try {
      UpdateSupervisorInfo(newUser);
    } catch (error) {
      console.error('Error updating supervisor information:', error);
    }
  }
}
async function UpdateSupervisorInfo(newUser) {
  try {
    const response = await fetch(
      `/api/supervisor/update-profile/${newUser.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      }
    );
    if (response.ok) {
      updateSuccessModal(
        'You have successfully updated the account information!',
        alertModalElStudent,
        () => {
          window.location.reload();
        }
      );
    } else {
      console.error(
        'Error updating account information. Response status:',
        response.status
      );
    }
  } catch (error) {
    console.error('Error updating capstone project:', error);
  }
}
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
