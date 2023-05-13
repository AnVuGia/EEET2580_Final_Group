const currUser = JSON.parse(sessionStorage.getItem('user'));
const paginationSection = document.querySelector('#sup-pagination');
const capstoneContainer = document.querySelector('.request-capstone');
const submitProfileBtn = document.getElementById("submit-sup-porfile");
const loadingSpinner = createSpinningAnimation();
submitProfileBtn.addEventListener("click", async function(ev){
  updateInfoModal("Are you sure you want to save change this information?",
  alertModalElStudent,
  async()=>{
    loadingModal.show();
    await updateProfile();
    loadSupModal();
    displayWelcomMessage();
    updateProfileUI();
  })
})
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

const nullImagePlacehodler = "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg";
function updateProfileUI(updatedProfile) {
  imgPlacHolder.src = getUser().imgId?getUser().imgID:nullImagePlacehodler;
  supervisorName.textContent = getUser().name?getUser().name:"N/A";
  supervisorBio.textContent = getUser().bio?getUser().bio:"N/A";
  supervisorEmail.textContent = getUser().email?getUser().email:"N/A";
  supervisorContact.textContent = getUser().contact?getUser().contact:"N/A";
}
updateProfileUI();

function loadSupModal(){
  const imgIdDiv = document.querySelector("profile-image");
  const subProfileName = document.getElementById("sup-profile-name");
  const subProfileBio = document.getElementById("sup-profile-bio");
  const subProfileContact = document.getElementById("sup-profile-contact");
  const subProfileEmail = document.getElementById("sup-profile-email");


  subProfileName.value = getUser().name?getUser().name:"N/A";
  subProfileBio.value = getUser().bio?getUser().bio:"N/A";
  subProfileContact.value = getUser().contact?getUser().contact:"N/A";
  subProfileEmail.value = getUser().email?getUser().email:"N/A"; 
  if(getUser().imgId){
    imgIdDiv.value = getUser().imgId;
  }
}

loadSupModal();

async function updateProfile(supervisorID) {
  let newUser = getUser();
    
    if (document.getElementById("profile-image").files.length !=0){
      newUser.imgID = document.querySelector("profile-image").files[0].name;
    }
    newUser.name = document.querySelector('#sup-profile-name').value;
    newUser.bio = document.querySelector('#sup-profile-bio').value;
    newUser.email = document.querySelector('#sup-profile-email').value;
    newUser.contact = document.querySelector('#sup-profile-contact').value?null:document.querySelector('#sup-profile-contact').value;
    sessionStorage.setItem("user",JSON.stringify(newUser));
  try {
    const response = await fetch(
      `/api/supervisor/update-profile/${getUser().id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      }
    );
    if (response.ok) {
      updateSuccessModal("You have successfully updated the account information!",
      alertModalElStudent,
      ()=>{});
    } else {
      console.error(
        'Error updating capstone project. Response status:',
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
