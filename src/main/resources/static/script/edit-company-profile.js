const Description = document.getElementById('companyDescription');
const Supervisor = document.getElementById('CPsupervisor');
const SupervisorContact = document.getElementById('CPsupervisorcontact');
const Email = document.getElementById('CPemail');
const Name = document.getElementById('CPname');
const Hname = document.getElementById('comapnyName');
const Contact = document.getElementById('CPcontact');
const Manager = document.getElementById('CPmanager');
const ManagerContact = document.getElementById('CPmanagercontact');
const comapnyInfoConatiner = document.querySelector(".company-info-container");
// const Name_modal = document.getElementById('newManager');
const Email_modal = document.getElementById('newCompanyEmail');
const Contact_modal = document.getElementById('newCompanyContact');
const Description_modal = document.getElementById('newDescription');
const Password_modal = document.getElementById('newPassword');
const Manager_modal = document.getElementById('newManager');
const ManagerContact_modal = document.getElementById('newManagerContact');
const CompanyNameModal = document.getElementById("newCompanyName");

let data = sessionStorage.getItem('user');
let user = JSON.parse(data);
const company_username = user.username;
const company_id = user.id;
const company_name = user.name;
const controlCompInfo = document.querySelectorAll(".controller-bottom-section");

for (var i = 0; i < controlCompInfo.length; i++) {
  controlCompInfo[i].addEventListener("click", function (e) {
    if (e.target.textContent === "Company Overview") {
      LoadOverView();
    } else {
      console.log("a");
      LoadInformation();
    }
  })
}

function LoadInformation() {
  comapnyInfoConatiner.innerHTML = ""
  comapnyInfoConatiner.innerHTML = `
      <div class="p-5">
      <div class="company-info1">
        <p>Company Information: </p>
        <ul class="companyInfoList">
          <li class="company-info-item mb-2">Company Name: ${getUser().name ? getUser().name : "N/A"} </li>
          <li class="company-info-item mb-2">Contact: ${getUser().contact ? getUser().contact : "N/A"}  </li>
          <li class="company-info-item mb-2">Email: ${getUser().email ? getUser().email : "N/A"} </li>
        </ul>
      </div>
      <div class="company-info1 mt-2">
        <p>Manager Information: </p>
        <ul class="companyInfoList">
          <li class="company-info-item mb-2">Manager's Name: ${getUser().manager ? getUser().manager : "N/A"}</li>
          <li class="company-info-item mb-2">Contact: ${getUser().manager_contact ? getUser().manager_contact : "N/A"}</li>
        </ul>
      </div>
    </div>
  `
}

const defaultImg = "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg";
function LoadOverView() {
  const imgDiv = document.getElementById("company-img");
  imgDiv.src = getUser().imgId ? getUser().imgId : defaultImg;
  comapnyInfoConatiner.innerHTML = `
    <div class="p-5">
    <div class="company-info1">
        <p>Description: ${getUser().companyDescription ? getUser().companyDescription : "N/A"}</p>
    </div>
  `
}

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
    updateDangerModal("Password should be at least 8 characters",
      alertModalElStudent,
      (ev) => { LoadModalCompany();});
  }
});

function LoadModalCompany() {
  CompanyNameModal.value = getUser().name ? getUser().name : "N/A";
  Contact_modal.value = getUser().contact ? getUser().contact : "N/A";
  Email_modal.value = getUser().email ? getUser().email : "N/A";
  Manager_modal.value = getUser().manager ? getUser().manager : "N/A";
  Description_modal.value = getUser().companyDescription ? getUser().companyDescription : "N/A";
  Password_modal.value = getUser().password ? getUser().password : "N/A";
  ManagerContact_modal.value = getUser().manager_contact ? getUser().manager_contact : "N/A";
}

async function updateCompanyInformation() {
  let newUser = getUser();
  newUser.name = CompanyNameModal.value;
  newUser.contact = Contact_modal.value === "N/A" ? 0 : Contact_modal.value;
  newUser.email = Email_modal.value;
  newUser.manager = Manager_modal.value;
  newUser.companyDescription = Description_modal.value;
  newUser.password = Password_modal.value;
  newUser.manager_contact = ManagerContact_modal.value;

  try {
    const response = await fetch(`/api/company/update/${company_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      sessionStorage.setItem("user", JSON.stringify(newUser));
      LoadOverView();
      LoadModalCompany();
      displayWelcomMessage();
      updateSuccessModal("You have successfully change you account info!",
        alertModalElStudent,
        (ev) => { });

    } else {
      console.error('Error updating capstone project. Response status:', response.status);
    }
  } catch (error) {
    console.error('Error updating capstone project:', error);
  }


}
LoadModalCompany();
LoadOverView();