const currUser = JSON.parse(sessionStorage.getItem('user'));
const paginationSection = document.querySelector('#sup-pagination');
const capstoneContainer = document.querySelector('.request-capstone');
const loadingSpinner = createSpinningAnimation();
const superviseCapstoneSection = {
  currPage: 0,
  currSize: 3,
  totalPages: 0,
};


async function getCapstoneList(page, size) {
  console.log(currUser.name);
  const endpoint = `api/capstone-project/supervisor?name=${currUser.name}&page=${page}&size=${size}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);
  return result;
}

async function updateUI() {
  capstoneContainer.innerHTML = '';
  paginationSection.innerHTML = '';
  capstoneContainer.appendChild(loadingSpinner);
  const capstoneList = await getCapstoneList(
    superviseCapstoneSection.currPage,
    superviseCapstoneSection.currSize
  );
  const capstoneListData = capstoneList.content;
  capstoneContainer.innerHTML = '';
  capstoneListData.forEach((capstone) => {
    const capstoneEl = createCapstoneCardWithEditButton(capstone);
    const div = document.createElement("div");
    div.classList.add("col","col-lg-12","col-xl")
    div.appendChild(capstoneEl);
    capstoneContainer.appendChild(div);
  });
  superviseCapstoneSection.totalPages = capstoneList.totalPages;

  createPagination(superviseCapstoneSection, paginationSection, updateUI);

  console.log('Capstone list from server:', capstoneList);

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
          <button class="edit-button">Edit</button> 
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
      const studentCapstoneModal = new bootstrap.Modal(document.querySelector('#student-capstone-modal'));
      studentCapstoneModal.show();
    }
  });

  return capItem;
}

function closeModal() {
  document.addEventListener("DOMContentLoaded", () => {
    const closeModalBtn = document.querySelector("#close-modal-btn");

    closeModalBtn.addEventListener("click", () => {
      const studentCapstoneModal = new bootstrap.Modal(document.querySelector("#student-capstone-modal"));
      studentCapstoneModal.hide();

      // Add this line to remove the 'modal-open' class from the body
      document.body.classList.remove("modal-open");
      // Add this line to remove the 'modal-backdrop' element
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    });
  });
}

closeModal();

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
        Groups are a good place to collaborate on projects or to figure
        out schedules for study sessions and the like. Every group gets
        a calendar, a wiki, discussions, and a little bit of space to
        store files. Groups can collaborate on documents, or even
        schedule web conferences. It's really like a mini-course where
        you can work with a smaller number of students on a more focused
        project.
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
        <input type="text" id="supervisor-name" value="${
          capstone.supervisor.name
        }"/>
        
        <input type="hidden" id="supervisor-id" name="supervisor-id" value="${
          capstone.supervisor.id
        }"/>
        
        <label for="company-name">Company Name</label>
        <input type="text" id="company-name" value="${capstone.company.name}"/>
        
        <input type="hidden" id="company-id" name="company-id" value="${
          capstone.company.id
        }"/>
        <input type="hidden" id="company-username" name="company-username" value="${
          capstone.company.username
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
    const updateSuccess = await updateCapstoneProject(capstone.id);

    if (updateSuccess) {
      updateUI();
      document.body.removeChild(editFormContainer);
    }
  });

  return editFormContainer;
}

async function updateCapstoneProject(capstoneID) {
  const updatedCapstoneData = {
    company: {
      name: document.querySelector('#company-name').value,
      id: document.querySelector('#company-id').value,
      username: document.querySelector('#company-username').value,
    },
    supervisor: {
      name: document.querySelector('#supervisor-name').value,
      id: document.querySelector('#supervisor-id').value,
      username: currUser.username,
    },
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
    capstoneStatus: 'approved',
    imageId: '',
  };

  try {
    const response = await fetch(`/api/capstone-project/${capstoneID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCapstoneData),
    });

    if (response.ok) {
      console.log('Capstone project updated successfully');
      return true;
    } else {
      console.error(
        'Error updating capstone project. Response status:',
        response.status
      );
      return false;
    }
  } catch (error) {
    console.error('Error updating capstone project:', error);
    return false;
  }

  console.log(updatedCapstoneData);
}


//This part is for edit supervisor profile
const supervisorName = document.querySelector('#profile-supervisor-name');
const supervisorBio = document.querySelector('#profile-supervisor-bio');
const supervisorEmail = document.querySelector('#profile-supervisor-email');
const supervisorContact = document.querySelector('#profile-supervisor-contact');

function updateProfileUI(updatedProfile) {
  supervisorName.textContent = updatedProfile.name;
  supervisorBio.textContent = updatedProfile.bio;
  supervisorEmail.textContent = updatedProfile.email;
  supervisorContact.textContent = updatedProfile.contact;
}

async function getSupervisorProfile() {
  const endpoint = `api/account/supervisor/username/${currUser.username}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);

  supervisorName.textContent = result.name;
  supervisorBio.textContent = result.bio;
  supervisorEmail.textContent = result.email;
  supervisorContact.textContent = result.contact;

  return result;
}

async function displayProfile() {
  const capstonePanel = document.querySelector('.capstone-panel');
  const profileController = document.querySelector('.profile-controller');
  const profileSection = document.querySelector('.profile-section');
  const closeProfileBtn = document.querySelector('#close-profile-section-btn');
  const editProfileBtn = document.querySelector('#edit-profile-button');

// Add a click event listener to the list item
  profileController.addEventListener('click', (event) => {
    if (event.target.classList.contains('profile-list-item')) {
      // Toggle the hidden attribute on the profile section element
      profileSection.hidden = !profileSection.hidden;

      // Toggle the hidden attribute on the pagination section and capstone container elements
      paginationSection.style.display = 'none';
      capstoneContainer.style.display = 'none';
      capstonePanel.style.display = 'none';
    }
  });

  closeProfileBtn.addEventListener('click', () => {
    profileSection.hidden = true;
    paginationSection.style.display = 'block';
    capstoneContainer.style.display = 'flex';
    capstonePanel.style.display = 'flex';

  });

  const supervisor = await getSupervisorProfile();

  editProfileBtn.addEventListener('click', () => {
    const editForm = createEditProfileForm(supervisor);
    document.body.appendChild(editForm);
  });
}

function createEditProfileForm(supervisor) {
  // Create a form container element
  const editProfileFormContainer = document.createElement('div');
  editProfileFormContainer.classList.add('edit-form-container');

  // Create the form overlay element
  const formOverlay = document.createElement('div');
  formOverlay.classList.add('form-overlay');
  editProfileFormContainer.appendChild(formOverlay);

  // Create the form element
  const form = document.createElement('form');
  form.classList.add('edit-form');
  form.innerHTML = `
    <h3>Edit Profile</h3>
    
    <div class="profile-information">
        <label for="profile-image">Profile Image</label>
        <input type="file" id="profile-image" accept="image/*" />
        
        <label for="sup-profile-name"> Supervisor Name</label>
        <input type="text" id="sup-profile-name" value="${supervisor.name}"/>

        <label for="sup-profile-bio">Supervisor Bio</label>
        <input type="text" id="sup-profile-bio" value="${supervisor.bio}"/>
        
        <label for="sup-profile-email">Supervisor Email</label>
        <input type="text" id="sup-profile-email" value="${supervisor.email}"/>
        
        <label for="sup-profile-contact">Supervisor Contact</label>
        <input type="text" id="sup-profile-contact" value="${supervisor.contact}"/>

        <button type="submit">Save</button>
        <button type="button" class="close-button">Close</button> 
    </div>
  `;
  editProfileFormContainer.appendChild(form);

  // Close button functionality
  const closeButton = form.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(editProfileFormContainer);
  });

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Update the capstone data and close the form
      await updateProfile(supervisor.id);

    document.body.removeChild(editProfileFormContainer);
  });

  return editProfileFormContainer;
}

async function updateProfile(supervisorID) {
  const updatedProfileSupervisor = {
    name: document.querySelector('#sup-profile-name').value,
    bio: document.querySelector('#sup-profile-bio').value,
    email: document.querySelector('#sup-profile-email').value,
    contact: document.querySelector('#sup-profile-contact').value
  };

  try {
    const response = await fetch(`/api/supervisor/update-profile/${supervisorID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfileSupervisor),
    });

    if (response.ok) {
      console.log('Capstone project updated successfully');
      updateProfileUI(updatedProfileSupervisor)
    } else {
      console.error(
          'Error updating capstone project. Response status:',
          response.status
      );
    }
  } catch (error) {
    console.error('Error updating capstone project:', error);
  }

  console.log(updatedProfileSupervisor);
}


getSupervisorProfile();
displayProfile();
