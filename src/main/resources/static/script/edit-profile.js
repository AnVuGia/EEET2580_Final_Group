const SaveChangeBtn = document.getElementById('submit-btn');
const SaveBib = document.getElementById('SaveBib');
const currentGroupStudent = JSON.parse(sessionStorage.getItem('current-group'));
const CapabilityCreateBtn = document.getElementById('CapabilityCreateBtn');
const name = document.getElementById('profile_name');
const major = document.getElementById('profile_major');
const contact = document.getElementById('profile_contact');
const profileComStudent = document.getElementById('profile_company');
const profileCapInfo = document.getElementById('profile_capstoneinfo');
const email = document.getElementById('profile_email');
// const studentInfoGroup = document.getElementById('profile_group');
const session = sessionStorage.getItem('user');
const user = JSON.parse(session);

let testing;
let StudentName;
let StudentMajor;
let StudentContact;
let StudentEmail;
let StudentBib;

async function ViewAll() {
  await setUserProfileImage(getUser());
  LoadData(getUser());
}

function LoadData(result2) {
  let company = currentGroupStudent.capstone
    ? currentGroupStudent.capstone.company.name
      ? currentGroupStudent.capstone.company.name
      : 'N/A'
    : 'N/A';
  let projectTitle = currentGroupStudent.capstone
    ? currentGroupStudent.capstone.projectTitle
      ? currentGroupStudent.capstone.projectTitle
      : 'N/A'
    : 'N/A';
  let sName = getUser().name ? getUser().name : 'N/A';
  let major = getUser().major ? getUser().major : 'N/A';
  let studentInfoGroup = currentGroupStudent.id
    ? currentGroupStudent.groupName
    : 'N/A';
  let contact = getUser().contact ? getUser().contact : 'N/A';
  let email = getUser().email ? getUser().email : 'N/A';
  let Bib = getUser().bib ? getUser().bib : 'N/A';

  let holder = document.createElement('div');
  holder.appendChild(LoadSkills(getUser()));
  const content = `
  <div class="row mt-3">
  <div class="col-12 col-lg-4 d-flex justify-content-center my-auto">
      <div class="avatar-container d-flex flex-column">
          <img id="#profile_img" src="${nullImagePlacehodler}" alt="" id="acc-ava">
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
  profileContainer.innerHTML = '';
  profileContainer.innerHTML += content;
  LoadModal(result2);
}

function DeleteAllSkills() {
  const Capabilityul = document.querySelector('#capability');
  while (Capabilityul.firstChild) {
    Capabilityul.removeChild(Capabilityul.firstChild);
  }
}
async function RewriteAllSkills() {
  const endpoint = user.username;
  const responsee = await fetch(`/api/account/student/username/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result2 = await responsee.json();
  LoadSkills(result2);
}


function LoadModal(result2) {
  const Modalname = document.getElementById('NewName');
  const Modalmajor = document.getElementById('NewMajor');
  const Modalcontact = document.getElementById('NewContact');
  const Modalemail = document.getElementById('NewEmail');
  const Modalpassword = document.getElementById('NewPassword');
  const ModalBib = document.getElementById('NewBib');
  Modalname.value = getUser().name ? getUser().name : 'N/A';
  Modalmajor.value = getUser().major ? getUser().major : 'N/A';
  Modalpassword.value = getUser().password ? getUser().password : 'N/A';
  Modalcontact.value = getUser().contact ? getUser().contact : 'N/A';
  Modalemail.value = getUser().email ? getUser().email : 'N/A';
  ModalBib.value = getUser().bib ? getUser().bib : 'N/A';

  // const ul = document.querySelector('#capability');
  // const li = ul.querySelectorAll('li');
  // const liCount = ul.querySelectorAll('li').length;

  const modalUl = document.querySelector('#ModalCapability');
  modalUl.innerHTML = ``;
  const ModalLi = modalUl.getElementsByTagName('li');

  for (let i = ModalLi.length - 1; i >= 0; i--) {
    modalUl.removeChild(ModalLi[i]);
  }
  if (getUser().skills) {
    for (let i = 0; i < getUser().skills.length; i++) {
      skill = getUser().skills[i];
      const modalLi = document.createElement('li');
      modalLi.textContent = skill;
      modalLi.className = 'list-group-item';
      const DelteBtn = document.createElement('Button');
      DelteBtn.id = 'deleteBtn';
      DelteBtn.classList.add('btn', 'btn-danger');
      DelteBtn.innerHTML = 'Delete';
      DelteBtn.addEventListener('click', DeleteSkill(skill));
      modalLi.appendChild(DelteBtn);
      modalUl.appendChild(modalLi);
    }
  }
}

CapabilityCreateBtn.addEventListener('click', () => {
  const CapabilitiesCreateInput = document.getElementById(
    'CapabilitiesCreateInput'
  );

  if (CapabilitiesCreateInput.value != '') {
    const newSkill = CapabilitiesCreateInput.value;

    const modalUl = document.querySelector('#ModalCapability');
    const modalLi = document.createElement('li');
    modalLi.textContent = newSkill;
    modalLi.className = 'list-group-item';
    const DelteBtn = document.createElement('Button');
    DelteBtn.id = 'deleteBtn';
    DelteBtn.classList.add('btn', 'btn-danger');
    DelteBtn.innerHTML = 'Delete';
    DelteBtn.addEventListener('click', DeleteSkill(newSkill));
    modalLi.appendChild(DelteBtn);
    modalUl.appendChild(modalLi);
  }
});

function DeleteSkill(skill) {
  return function () {
    const modalUl = document.querySelector('#ModalCapability');
    const modalli = modalUl.querySelectorAll('li');
    const liCount = modalUl.querySelectorAll('li').length;
    for (let i = 0; i < liCount; i++) {
      const text = modalli[i].textContent.trim();
      const deleteIndex = text.indexOf('Delete');
      const oldSkill = text.substring(0, deleteIndex).trim();
      if (oldSkill === skill) {
        modalUl.removeChild(modalli[i]);
      }
    }
  };
}

SaveChangeBtn.addEventListener('click', () => {
  updateInfoModal(
    'Are you sure that you want to save change this information?',
    alertModalElStudent,
    async (ev) => {
      loadingModal.show();
      await UpdateStudentPersona();
      await UpdateStudentSkills();
      await uploadProfileImage();
      await setUserProfileImage(getUser());
      displayWelcomMessage();
      LoadData(getUser());
      LoadSkills(getUser());
      LoadModal();
      loadingModal.hide();
    }
  );
});

async function UpdateStudentPersona() {
  // const profile_image = document.getElementById('profile_img');
  // const profile_name = document.getElementById('profile_name');
  // const profile_major = document.getElementById('profile_major');
  // const profile_contact = document.getElementById('profile_contact');
  // const profile_email = document.getElementById('profile_email');
  // const profile_bib = document.getElementById('Bib');

  let NewName = document.getElementById('NewName').value;
  let NewMajor = document.getElementById('NewMajor').value;
  let NewContact =
    document.getElementById('NewContact').value === 'N/A'
      ? 0
      : document.getElementById('NewContact').value;
  let NewEmail = document.getElementById('NewEmail').value;
  let NewPassword = document.getElementById('NewPassword').value;
  let NewBib = document.getElementById('NewBib').value;

  let newUser = getUser();

  if (NewPassword.length > 8) {
    newUser.name = NewName;
    newUser.major = NewMajor;
    newUser.contact = NewContact;
    newUser.email = NewEmail;
    newUser.password = NewPassword;
    newUser.bib = NewBib;

    sessionStorage.setItem('user', JSON.stringify(newUser));
    try {
      const response = await fetch(
        `/api/student/update/${getUser().id}/persona`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
      } else {
        console.error(
          'Error updating capstone project. Response status:',
          response.status
        );
      }
    } catch (error) {
      console.error('Error updating capstone project:', error);
    }
  } else {
    updateDangerModal(
      'Password should be at least 8 characters',
      alertModalElStudent,
      (ev) => {}
    );
  }
}

async function UpdateStudentSkills() {
  const modalUl = document.getElementById('ModalCapability');
  const numLi = modalUl.childElementCount;
  let NewSkills = [];

  for (let i = 0; i < numLi; i++) {
    const li = modalUl.children[i];
    const text = li.textContent.trim();
    const deleteIndex = text.indexOf('Delete');
    const skill = text.substring(0, deleteIndex).trim();
    NewSkills.push(skill);
  }

  const StudentNewSkills = {
    skills: NewSkills,
  };
  console.log(StudentNewSkills);

  try {
    const response = await fetch(`/api/student/update/${user.id}/skills`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(StudentNewSkills),
    });

    if (response.ok) {
      // DeleteAllSkills();
      // RewriteAllSkills();
      const data = await fetch(`api/account/student/id/${getUser().id}`);
      const info = await data.json();
      sessionStorage.setItem('user', JSON.stringify(info));
      LoadData(info);
      LoadModal(info);
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

async function uploadProfileImage() {
  const fileInput = document.querySelector('#profile-image');

  if (fileInput.files.length === 0) {
    // updateDangerModal('Please select a file to upload.', alertModalElStudent);
    return;
  }
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', async () => {
    const image = new Image();
    image.src = reader.result;
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, 300, 300);
      const compressedImageData = canvas.toDataURL('image/jpeg', 0.5);
      const formData = new FormData();
      formData.append('file', dataURItoBlob(compressedImageData));
      try {
        updateLoadingModal('Uploading image...', alertModalElStudent);
        fetch('/api/images', {
          method: 'POST',
          body: formData,
        }).then((response) => {
          response.json().then((data) => {
            const user = getUser();
            const newUser = {
              ...user,
            };
            newUser.imageId = data.id;
            sessionStorage.setItem('user', JSON.stringify(newUser));
            fetch(`/api/student/update/${newUser.id}/profile-pic`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            }).then((response) => {
              updateSuccessModal(
                'Image uploaded successfully!',
                alertModalElStudent,
                async () => {
                  alertModalElStudent.querySelector('.btn-close').click();
                  location.reload();
                }
              );
            });
          });
        });
      } catch {
        updateDangerModal('Error uploading image.', alertModalElStudent);
      }
    });
  });
}
async function deleteOldProfileImage(imageId) {
  const response = await fetch(`/api/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user = getUser();
  const newUser = {
    ...user,
    imageId: null,
  };
  sessionStorage.setItem('user', JSON.stringify(newUser));
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
async function setUserProfileImage(user) {
  const imgProfileEl = document.querySelector('#profile_img');
  updateLoadingModal('Loading...', alertModalElStudent);
  if (user.imageId != null) {
    const imgURL = await getImage(user.imageId);
    // imgProfileEl.src = imgURL;
    nullImagePlacehodler = imgURL;
    alertModalElStudent.querySelector('.btn-close').click();
    displayWelcomMessage();
  } else if (user.imageId === null) {
    // imgProfileEl.src = nullImagePlacehodler;
    setTimeout(() => {
      alertModalElStudent.querySelector('.btn-close').click();
      displayWelcomMessage();
    }, 1000);
  }
}
// document
//   .querySelector('#EditPictureBtn')
//   .addEventListener('click', async () => {
//     await uploadProfileImage();
//   });

ViewAll();
