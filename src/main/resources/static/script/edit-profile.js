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
const studentInfoGroup = document.getElementById('profile_group');
const session = sessionStorage.getItem('user');
const user = JSON.parse(session);

let testing;
let StudentName;
let StudentMajor;
let StudentContact;
let StudentEmail;
let StudentBib;

const nullImagePlacehodler =
  'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg';
async function ViewAll() {
    loadingModal.show();
  await setUserProfileImage(getUser());
  LoadData(getUser());
}

function LoadData(result2) {
    const profile_img = document.getElementById('profile_img');
    const name = document.getElementById('profile_name');
    const major = document.getElementById('profile_major');
    const contact = document.getElementById('profile_contact');
    const email = document.getElementById('profile_email');
    const Bib = document.getElementById('Bib');

    profileComStudent.textContent = currentGroupStudent.capstone?(currentGroupStudent.capstone.company.name?currentGroupStudent.capstone.company.name:"N/A"):"N/A";
    profileCapInfo.textContent = currentGroupStudent.capstone?(currentGroupStudent.capstone.projectTitle?currentGroupStudent.capstone.projectTitle:"N/A"):"N/A";
    profile_img.src = getUser().imgId?getUser().imgId:nullImagePlacehodler;
    name.innerHTML = getUser().name?getUser().name: "N/A";
    major.innerHTML = getUser().major?getUser().major: "N/A";
    studentInfoGroup.textContent = currentGroupStudent.id?currentGroupStudent.groupName: "N/A";
    contact.innerHTML = getUser().contact?getUser().contact: "N/A";
    email.innerHTML = getUser().email?getUser().email: "N/A";
    Bib.innerHTML = getUser().bib?getUser().bib: "N/A";
    LoadSkills(result2);
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
  console.log(endpoint);
  const responsee = await fetch(`/api/account/student/username/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result2 = await responsee.json();
  LoadSkills(result2);
}

function LoadSkills(result2) {
  const Capabilityul = document.getElementById('capability');
  Capabilityul.innerHTML="";
  if (result2.skills) {
    for (let i = 0; i < result2.skills.length; i++) {
      const li = document.createElement('li');
      li.className = 'profile_li';
      li.textContent = result2.skills[i];
      Capabilityul.appendChild(li);
    }
  }
}

function LoadModal(result2) {
  console.log('Load Modal');
  const Modalname = document.getElementById('NewName');
  const Modalmajor = document.getElementById('NewMajor');
  const Modalcontact = document.getElementById('NewContact');
  const Modalemail = document.getElementById('NewEmail');
  const Modalpassword = document.getElementById('NewPassword');
  const ModalBib = document.getElementById('NewBib');
  console.log(getUser());
  Modalname.value = getUser().name ? getUser().name : 'N/A';
  Modalmajor.value = getUser().major ? getUser().major : 'N/A';
  studentInfoGroup.textContent = currentGroupStudent.id
    ? currentGroupStudent.groupName
    : 'N/A';
  Modalpassword.value = getUser().password ? getUser().password : 'N/A';
  Modalcontact.value = getUser().contact ? getUser().contact : 'N/A';
  Modalemail.value = getUser().email ? getUser().email : 'N/A';
  ModalBib.value = getUser().bib ? getUser().bib : 'N/A';

  const ul = document.querySelector('#capability');
  const li = ul.querySelectorAll('li');
  const liCount = ul.querySelectorAll('li').length;

  const modalUl = document.querySelector('#ModalCapability');
  const ModalLi = modalUl.getElementsByTagName('li');

  for (let i = ModalLi.length - 1; i >= 0; i--) {
    modalUl.removeChild(ModalLi[i]);
  }

  for (let i = 0; i < liCount; i++) {
    const skill = li[i].textContent;
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
      displayWelcomMessage();
      LoadData(getUser());
      LoadSkills(getUser());
      LoadModal();
      loadingModal.hide();
    }
  );
});

async function UpdateStudentPersona() {
  const profile_image = document.getElementById('profile_img');
  const profile_name = document.getElementById('profile_name');
  const profile_major = document.getElementById('profile_major');
  const profile_contact = document.getElementById('profile_contact');
  const profile_email = document.getElementById('profile_email');
  const profile_bib = document.getElementById('Bib');

    let NewName = document.getElementById('NewName').value;
    let NewMajor = document.getElementById('NewMajor').value;
    let NewContact = document.getElementById('NewContact').value === "N/A"?0: document.getElementById('NewContact').value;
    let NewEmail = document.getElementById('NewEmail').value;
    let NewPassword = document.getElementById('NewPassword').value;
    let NewBib = document.getElementById('NewBib').value;

  let newUser = getUser();
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
      updateSuccessModal(
        'You have successfully updated your account info!',
        alertModalElStudent,
        () => {}
      );
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
  console.log(NewSkills);

  const StudentNewSkills = {
    skills: NewSkills,
  };

  try {
    const response = await fetch(`/api/student/update/${user.id}/skills`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(StudentNewSkills),
    });

    if (response.ok) {
      DeleteAllSkills();
      RewriteAllSkills();
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
  const fileInput = document.querySelector('#EditPictureInput');
  if (fileInput.files.length === 0) {
    updateDangerModal('Please select a file to upload.', alertModalElStudent);
    return;
  }
  console.log('change');
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(reader);
  reader.addEventListener('load', async () => {
    const image = new Image();
    image.src = reader.result;
    image.addEventListener('load', () => {
      console.log('image loaded');
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, 300, 300);
      const compressedImageData = canvas.toDataURL('image/jpeg', 0.5);
      console.log(compressedImageData);
      const formData = new FormData();
      formData.append('file', dataURItoBlob(compressedImageData));
      try {
        updateLoadingModal('Uploading image...', alertModalElStudent);
        fetch('/api/images', {
          method: 'POST',
          body: formData,
        }).then((response) => {
          response
            .json()
            .then((data) => {
              const user = getUser();
              const newUser = {
                ...user,
                imageId: data.id,
              };
              sessionStorage.setItem('user', JSON.stringify(newUser));
            })
            .then(() => {
              const newUser = getUser();
              fetch(`/api/student/update/${newUser.id}/profile-pic`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
              });
            });
        });

        updateSuccessModal(
          'Image uploaded successfully!',
          alertModalElStudent,
          async () => {
            alertModalElStudent.querySelector('.btn-close').click();
            location.reload();
          }
        );
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
    imgProfileEl.src = imgURL;
  } else {
    imgProfileEl.src = nullImagePlacehodler;
  }
  alertModalElStudent.querySelector('.btn-close').click();
}
document
  .querySelector('#EditPictureBtn')
  .addEventListener('click', async () => {
    await uploadProfileImage();
  });

ViewAll();
