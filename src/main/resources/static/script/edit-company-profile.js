let CPDescription;
let CPName;
let CPContact;
let CPEmail;
let CPSupervisor;
let CPSupervisorContact;


const Description = document.getElementById('companyDescription');
const Supervisor = document.getElementById('CPsupervisor');
const SupervisorContact = document.getElementById('CPsupervisorcontact');
const Email = document.getElementById('CPemail');
const Name = document.getElementById('CPname');
const Hname = document.getElementById('comapnyName');
const Contact = document.getElementById('CPcontact');
const Manager = document.getElementById('CPmanager');
const ManagerContact = document.getElementById('CPmanagercontact');


// const Name_modal = document.getElementById('newManager');
const Email_modal = document.getElementById('newCompanyEmail');
const Contact_modal = document.getElementById('newCompanyContact');
const Description_modal = document.getElementById('newDescription');
const Password_modal = document.getElementById('newPassword');
const Manager_modal = document.getElementById('newManager');
const ManagerContact_modal = document.getElementById('newManagerContact');

let data = sessionStorage.getItem('user');
let user = JSON.parse(data);
const company_username = user.username;
console.log(company_username);
const company_id = user.id;
const company_name = user.name;

async function View() {


  try {
    const response = await fetch(`/api/account/company/username/${company_username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.text();

    if (!responseBody) {
      throw new Error('Empty response body!');
    }

    const result = JSON.parse(responseBody);
    console.log(result);
    LoadData(result);
    LoadModal(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function LoadData(result) {

  let CPDesc = result.companyDescription;
  let CPName = result.name;
  let CPContact = result.contact;
  let CPEmail = result.email;
  let CPManager = result.manager;
  let CPManagerContact = result.manager_contact;

  // let CPSupervisor= result3.companyDescription;
  // let CPSupervisorContact= result3.contact;
  Name.innerHTML = CPName;
  Email.innerHTML = CPEmail;
  Contact.innerHTML = CPContact;
  // Supervisor.innerHTML = CPSupervisor;
  // SupervisorContact.innerHTML = CPSupervisorContact;
  Description.innerHTML = CPDesc;
  Hname.innerHTML = CPName;

  Manager.innerHTML = CPManager;
  ManagerContact.innerHTML = CPManagerContact;

}

function LoadModal(result) {
  let CPDescription = result.companyDescription;
  let CPContact = result.contact;
  let CPEmail = result.email;
  let CPpassword = result.password;
  let CPManager = result.manager;
  let CPManagerContact = result.manager_contact;

  Email_modal.value = CPEmail;
  Contact_modal.value = CPContact;
  Description_modal.value = CPDescription;
  Password_modal.value = CPpassword;
  Manager_modal.value = CPManager;
  ManagerContact_modal.value = CPManagerContact;

}

const EditBtn = document.getElementById('submit-btn');
EditBtn.addEventListener('click', () => {
  if (Description_modal.value.length < 99) {
    UpdateCompany();
  } else {
    alert("Description length is too long");
  }

});


async function UpdateCompany() {
  let newCPDescription = Description_modal.value;
  let newContact = Contact_modal.value;
  let newEmail = Email_modal.value;
  let newPassword = Password_modal.value;
  let newManager = Manager_modal.value;
  let newManagerContact = ManagerContact_modal.value;

  const NewCompanyInfo = {
    name: company_name,
    contact: newContact,
    companyDescription: newCPDescription,
    email: newEmail,
    password: newPassword,
    manager:newManager,
    manager_contact:newManagerContact
  };

  try {
    const response = await fetch(`/api/company/update/${company_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(NewCompanyInfo),
    });

    if (response.ok) {
      console.log('Capstone project updated successfully');

      Email.innerHTML = newEmail;
      Contact.innerHTML = newContact;
      Description.innerHTML = newCPDescription;
      Manager.innerHTML = newManager;
      ManagerContact.innerHTML = newManagerContact;


    } else {
      console.error('Error updating capstone project. Response status:', response.status);
    }
  } catch (error) {
    console.error('Error updating capstone project:', error);
  }
}


View();