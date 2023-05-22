const Description = document.getElementById('companyDescription');
const Supervisor = document.getElementById('CPsupervisor');
const SupervisorContact = document.getElementById('CPsupervisorcontact');
const Email = document.getElementById('CPemail');
const Name = document.getElementById('CPname');
const Hname = document.getElementById('comapnyName');
const Contact = document.getElementById('CPcontact');
const Manager = document.getElementById('CPmanager');
const ManagerContact = document.getElementById('CPmanagercontact');
const comapnyInfoConatiner = document.querySelector('.company-info-container');
// const Name_modal = document.getElementById('newManager');
const Email_modal = document.getElementById('newCompanyEmail');
const Contact_modal = document.getElementById('newCompanyContact');
const Description_modal = document.getElementById('newDescription');
const Password_modal = document.getElementById('newPassword');
const Manager_modal = document.getElementById('newManager');
const ManagerContact_modal = document.getElementById('newManagerContact');
const CompanyNameModal = document.getElementById('newCompanyName');

let data = sessionStorage.getItem('user');
let user = JSON.parse(data);
const company_username = user.username;
const company_id = user.id;
const company_name = user.name;
const controlCompInfo = document.querySelectorAll('.controller-bottom-section');

for (var i = 0; i < controlCompInfo.length; i++) {
  controlCompInfo[i].addEventListener('click', function (e) {
    if (e.target.textContent === 'Company Overview') {
      LoadOverView();
    } else {
      LoadInformation();
    }
  });
}

function LoadProfile(result2) {
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
  profileContainer.innerHTML = '';
  profileContainer.innerHTML += content;
  LoadModalCompany();
}

const defaultImg =
  'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg';

const EditBtn = document.getElementById('profile-submit');
EditBtn.addEventListener('click', () => {
  if (Password_modal.value.length >= 8) {
    updateInfoModal(
      'Are you sure you want to save change this information?',
      alertModalElStudent,
      async (ev) => {
        loadingModal.show();
        updateCompanyInformation();
      }
    );
  } else {
    updateDangerModal(
      'Password should be at least 8 characters',
      alertModalElStudent,
      (ev) => {
        LoadModalCompany();
      }
    );
  }
});

function LoadModalCompany() {
  CompanyNameModal.value = getUser().name ? getUser().name : 'N/A';
  Contact_modal.value = getUser().contact ? getUser().contact : 'N/A';
  Email_modal.value = getUser().email ? getUser().email : 'N/A';
  Manager_modal.value = getUser().manager ? getUser().manager : 'N/A';
  Description_modal.value = getUser().companyDescription
    ? getUser().companyDescription
    : 'N/A';
  Password_modal.value = getUser().password ? getUser().password : 'N/A';
  ManagerContact_modal.value = getUser().manager_contact
    ? getUser().manager_contact
    : 'N/A';
}

async function updateCompanyInformation() {
  let newUser = getUser();
  newUser.name = CompanyNameModal.value;
  newUser.contact = Contact_modal.value === 'N/A' ? 0 : Contact_modal.value;
  newUser.email = Email_modal.value;
  newUser.manager = Manager_modal.value;
  newUser.companyDescription = Description_modal.value;
  newUser.password = Password_modal.value;
  newUser.manager_contact = ManagerContact_modal.value;

  try {
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
              return response.json();
            })
            .then((data) => {
              newUser.imageId = data.id;
              try {
                UpdateCompanyAccInfo(newUser);
              } catch (error) {
                console.error('Error updating account information:', error);
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
        UpdateCompanyAccInfo(newUser);
      } catch (error) {
        console.error('Error updating supervisor information:', error);
      }
    }
  } catch (error) {
    console.error('Error updating capstone project:', error);
  }
}
async function UpdateCompanyAccInfo(newUser) {
  try {
    fetch(`/api/company/update/${newUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((response) => {
      sessionStorage.setItem('user', JSON.stringify(newUser));
      updateSuccessModal(
        'Information updated successfully!',
        alertModalElStudent,
        () => {
          window.location.reload();
        }
      );
    });
  } catch (error) {
    updateDangerModal(
      'Error updating information!',
      alertModalElStudent,
      () => {
        window.location.reload();
      }
    );
  }
}
async function setCompanyProfileImage() {
  const profileImage = document.getElementById('profile_img');
  if (getUser().imageId != null) {
    const imageURL = await getImage(getUser().imageId);
    profileImage.src = imageURL;
    alertModalElStudent.querySelector('.btn-close').click();
  } else {
    profileImage.src = nullImagePlacehodler;
    setTimeout(() => {
      alertModalElStudent.querySelector('.btn-close').click();
      displayWelcomMessage();
    }, 1000);
  }
}
async function onCompanyLoad() {
  LoadProfile(getUser());
  await setCompanyProfileImage();
}
onCompanyLoad();
