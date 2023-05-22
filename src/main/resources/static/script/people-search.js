

// const groupList = document.querySelector('#bigList');
// const Spinner = createSpinningAnimation();
// const SuperDiv = document.getElementById('SuperProfile');
// const StudentDiv = document.getElementById('account-profile');
// const SearchDiv = document.querySelector('.SearchBodyContainer');
// const StCloseBtn = document.getElementById('StcloseBTN');
// const CPCloseBtn = document.getElementById('CPcloseBTN');
// const SPCloseBtn = document.getElementById('SPcloseBTN');
// const StudentName = document.getElementById('profile_name');
// const StudentMajor = document.getElementById('profile_major');
// const StduentContact = document.getElementById('profile_contact');
// const StudentEmail = document.getElementById('profile_email');
// const StudentGroup = document.getElementById('profile_group');
// const StudentCompany = document.getElementById('profile_company');
// const StudentCapstone = document.getElementById('profile_capstoneinfo');
// // const StudentSkill;
// const StduentBib = document.getElementById('Bib');
// // const StudentImg;
// const GroupContainer = document.getElementById('seaarchByGroup');
// const CompanyContainer = document.getElementById('SearchByCompany');
// const StudentContainer = document.getElementById('SearchByStudent');
// const SupervisorContainer = document.getElementById('SearchBySupervisor');
// const selecetor = document.getElementById('peopleSelector');
// const CompanyDiv = document.getElementById('CompanyProfile');


// selecetor.addEventListener("change", onFilteredPeople);

// function onFilteredPeople() {
//     if (selecetor.value == "Student") {
//         CompanyContainer.setAttribute('hidden', 'hidden');
//         GroupContainer.setAttribute('hidden', 'hidden');
//         SupervisorContainer.setAttribute('hidden', 'hidden');
//         StudentContainer.removeAttribute('hidden');
//     } else if (selecetor.value == "Company") {
//         StudentContainer.setAttribute('hidden', 'hidden');
//         GroupContainer.setAttribute('hidden', 'hidden');
//         SupervisorContainer.setAttribute('hidden', 'hidden');
//         CompanyContainer.removeAttribute('hidden');

//     } else if (selecetor.value == "Group") {
//         CompanyContainer.setAttribute('hidden', 'hidden');
//         StudentContainer.setAttribute('hidden', 'hidden');
//         SupervisorContainer.setAttribute('hidden', 'hidden');
//         GroupContainer.removeAttribute('hidden');

//     } else if (selecetor.value == "Supervisor") {
//         CompanyContainer.setAttribute('hidden', 'hidden');
//         StudentContainer.setAttribute('hidden', 'hidden');
//         GroupContainer.setAttribute('hidden', 'hidden');
//         SupervisorContainer.removeAttribute('hidden');

//     }
// }
// SPCloseBtn.addEventListener('click', () => {
//     SuperDiv.setAttribute('hidden', 'hidden');
// })

// CPCloseBtn.addEventListener('click', () => {
//     CompanyDiv.setAttribute('hidden', 'hidden');
// })

// StCloseBtn.addEventListener('click', () => {
//     SearchDiv.removeAttribute('hidden');
//     StudentDiv.setAttribute('hidden', 'hidden');

// })

// GetAllgroup();
// createSpinningAnimation()
// function createSpinningAnimation() {
//     const spinningEl = document.createElement('div');
//     spinningEl.classList.add('loading-spinner');
//     return spinningEl;
// }
// async function GetAllgroup() {

//     const response = await fetch('/api/account/groups');
    
//     result = await response.json();
//     for (let i = 0; i < result.length; i++) {
//         DummyGroup.push(result[i]);

//     }
//     CreateGroupList(DummyGroup);
// }

// function updateLoadingModal(msg, modal) {
//     const modalBody = modal.querySelector('.modal-body');
//     modalBody.innerHTML = `
// <div
//             class="alert alert-info d-flex align-items-center"
//             role="alert"
//           >
//             <i style="margin-right: 10px" class="fas fa-sync-alt fa-spin fs-3"></i>
//             <div style="font-size: 1.6rem" class="loading-modal">
//               ${msg}
//             </div>
//           </div>
// `;
//     const modalFooter = modal.querySelector('.modal-footer');
//     modalFooter.innerHTML = `
//           <button
//             type="button"
//             class="btn btn-secondary"
//             data-bs-dismiss="modal"
//           >
//             Cancel
//           </button>
// `;
//     const newModal = new bootstrap.Modal(modal);
//     newModal.show();
// }
// function OpenStudent(id) {
  
//     return function () {
//         findStudent(id);
//         SearchDiv.setAttribute('hidden', 'hidden');
//         StudentDiv.removeAttribute('hidden');
//     };
// }

// async function findStudent(id) {

//     let DummyStudent;
//     let FoundStudent;
//     const StudentProfileEndPoint = `/api/account/student/id/${id}`;
//     const response = await fetch(StudentProfileEndPoint, {
//         method: 'Get',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     await response.json().then((data) => {
//         DummyStudent = data;
//     });
   
//     for (let i = 0; i < DummyStudent.length; i++) {
//         if (DummyStudent[i].name == SStudentName) {
//             StudentName.innerHTML = DummyStudent[i].name;
//             StudentMajor.innerHTML = DummyStudent[i].major;
//             StduentContact.innerHTML = DummyStudent[i].contact;
//             StudentEmail.innerHTML = DummyStudent[i].email;
//             StduentBib.innerHTML = DummyStudent[i].bib;
//             const SkillUL = document.getElementById('capability');
//             SkillUL.innerHTML = '';
//             for (let j = 0; j < DummyStudent[i].skills.length; j++) {

//                 const li = document.createElement('li');
//                 li.className = 'profile_li';
//                 li.textContent = DummyStudent[i].skills[j];
               
//                 SkillUL.appendChild(li);
//             }
//         }
//     }
//     StudentDiv.removeAttribute('hidden');
  
// }






// function OpenStudent(GroupName, StudentName) {
//     return function () {
//         findStudent(GroupName, StudentName);
//         SearchDiv.setAttribute('hidden', 'hidden');
//         StudentDiv.removeAttribute('hidden');
//     };
// }

// async function findStudent(GroupName, SStudentName) {

//     let DummyStudent;
//     let FoundStudent;
//     const StudentProfileEndPoint = "http://localhost:8000/api/account/students";
//     const response = await fetch(StudentProfileEndPoint, {
//         method: 'Get',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     await response.json().then((data) => {
//         DummyStudent = data;
//     });
    
    
//     StudentName.innerHTML = DummyStudent.name;
//     StudentMajor.innerHTML = DummyStudent.major;
//     StduentContact.innerHTML = DummyStudent.contact;
//     StudentEmail.innerHTML = DummyStudent.email;
//     StduentBib.innerHTML = DummyStudent.bib;
//     const SkillUL = document.getElementById('capability');
//     SkillUL.innerHTML = '';
//     if (DummyStudent.skills){
//         for (let j = 0; j < DummyStudent.skills.length; j++) {
    
//             const li = document.createElement('li');
//             li.className = 'profile_li';
//             li.textContent = DummyStudent.skills[j];
        
//             SkillUL.appendChild(li);
//         }
//     }
 
        
    

// }

// let DummyGroup = [];
// let DummyCompany = [];
// let DummyStudent = [];
// let DummySpervisor = [];

// function CreateGroupList(DummyGroup) {

//     for (let i = 0; i < DummyGroup.length; i++) {
//         const div = document.createElement("div");
//         div.className = 'btn-group';

//         const button = document.createElement("button");
//         button.type = 'button';
//         button.className = 'btn btn-primary dropdown-toggle list-group-item';
//         button.setAttribute('data-bs-toggle', 'dropdown');
//         button.setAttribute('aria-expanded', 'false');
//         button.setAttribute('id', "StudentInGroup");
//         button.innerText =  DummyGroup[i].groupName;

//         const ul = document.createElement("ul");
//         ul.className = "dropdown-menu";
//         ul.setAttribute('id', "StudentNameInGroupUl");
//         const St = document.createElement("li");
//         St.className = 'dropdown-item St';
//         St.innerText = "Student"
//         const hr = document.createElement("hr");

//         for (let j = 0; j < DummyGroup[i].studentList.length; j++) {
//             const li = document.createElement("li");
//             const StudentNameButton = document.createElement("button");
//             li.className = 'dropdown-item';
//             li.setAttribute('id', "StudentNameInGroup");
//             li.innerText = "Student " + [j + 1] + " : " + DummyGroup[i].studentList[j].name;
//             li.addEventListener('click', OpenStudent(DummyGroup[i], DummyGroup[i].studentList[j].name));
//             ul.appendChild(li);
//         }
//         if (DummyGroup[i].capstone != null) {
//             const Cp = document.createElement("li");
//             Cp.className = 'dropdown-item St';
//             Cp.innerText = "Capstone Project : " + DummyGroup[i].capstone.projectTitle
//             ul.appendChild(hr);
//             ul.appendChild(Cp);

//         }
//         div.appendChild(button);
//         div.appendChild(ul);
//         groupList.appendChild(div);
//     }
//     // groupList.removeChild(SpinnerContainer);
// }

// getAllCompany();
// async function getAllCompany() {
//     const ComEndPoint = "http://localhost:8000/api/account/companies";

//     const response = await fetch(ComEndPoint);
//     result = await response.json();
//     for (let i = 0; i < result.length; i++) {
//         DummyCompany.push(result[i]);

//     }
//     CreateCompanyList(DummyCompany);
// }


// function CreateCompanyList(DummyCompany) {

//     const CompanyGroupUL = document.getElementById('CompanybigList');
    
//     for (let i = 0; i < DummyCompany.length; i++) {
//         const Companyli = document.createElement("li");
//         Companyli.className = 'list-group-item';
//         Companyli.setAttribute('id', "CompanyLi");
//         Companyli.innerHTML = DummyCompany[i].name;
//         Companyli.addEventListener('click', ShowCompany.bind(null, DummyCompany[i].id));

//         CompanyGroupUL.appendChild(Companyli);
//     }
//     // CompanyGroupUL.removeChild(SpinnerContainer2);
// }

// async function ShowCompany(id) {
//     const end3 = "http://localhost:8000/api/account/company/" + id;
//     const response = await fetch(end3);
//     result = await response.json();
//     const CPname = document.getElementById('CPname');
//     const CPemail = document.getElementById('CPemail');
//     const CPcontact = document.getElementById('CPcontact');
//     const CPmanager = document.getElementById('Manager');
//     const CPmanagerContact = document.getElementById('ManagerContact');
//     const CPdesc = document.getElementById('CPdesc');

//     CPname.innerHTML = result.name ? result.name : "N/A";
//     CPemail.innerHTML = result.email ? result.email : "N/A";
//     CPcontact.innerHTML = result.contact ? result.contact : "N/A";
//     CPmanager.innerHTML = result.manager ? result.manager : "N/A";
//     CPmanagerContact.innerHTML = result.manager_contact ? result.manager_contact : "N/A";
//     CPdesc.innerHTML = result.companyDescription ? result.companyDescription : "N/A";
//     CompanyDiv.removeAttribute('hidden');


// }


// getAllStudent();
// getAllSupervisor();
// async function getAllSupervisor() {
//     const superEnd = "http://localhost:8000/api/account/supervisors";
//     const response = await fetch(superEnd);
//     result = await response.json();
//     for (let i = 0; i < result.length; i++) {
//         DummySpervisor.push(result[i]);
//     }
//     CreateSupervisorList(DummySpervisor);
// }

// function CreateSupervisorList(DummySpervisor) {
//     const SuperUl = document.getElementById('SupervisorBigUl');
//     for (let i = 0; i < DummySpervisor.length; i++) {
//         const Superli = document.createElement("li");

//         Superli.className = 'list-group-item';
//         Superli.setAttribute('id', "Studentli");
//         Superli.addEventListener('click', ShowSupervis.bind(null, DummySpervisor[i].username));
//         let StName = DummySpervisor[i].name;
//         if (StName == null) {
//             StName = "N/A";
//         }
//         Superli.innerHTML = StName;
//         SuperUl.appendChild(Superli);
//     }
// }

// async function ShowSupervis(username){
//     const superEnd = "http://localhost:8000/api/account/supervisor/username/"+username;
//     const response = await fetch(superEnd);
//     result = await response.json();

//     const Supername= document.getElementById('profile-supervisor-name');
//     const superEmain= document.getElementById('profile-supervisor-email');
//     const SuperContact= document.getElementById('profile-supervisor-contact');
//     const SuperBio = document.getElementById('profile-supervisor-bio');
//     Supername.innerHTML = result.name ? result.name :"N/A";
//     superEmain.innerHTML = result.email ? result.email :"N/A";
//     SuperContact.innerHTML = result.contact ? result.contact :"N/A";
//     SuperBio.innerHTML = result.bio ? result.bio :"N/A";
//     SuperDiv.removeAttribute('hidden');
// }



// async function getAllStudent() {
//     const StuEndPoint = "http://localhost:8000/api/account/students";

//     const response = await fetch(StuEndPoint);
//     result = await response.json();
//     for (let i = 0; i < result.length; i++) {
//         DummyStudent.push(result[i]);
//     }
//     CreateStudentList(DummyStudent);
// }

// function CreateStudentList(DummyStudent) {
//     const StuGroupUL = document.getElementById('StudentbigList');
//     for (let i = 0; i < DummyStudent.length; i++) {
//         const Studentli = document.createElement("li");
//         Studentli.className = 'list-group-item';
//         Studentli.setAttribute('id', "Studentli");
//         Studentli.addEventListener('click', ShowStudent.bind(null, DummyStudent[i].id));
//         let StName = DummyStudent[i].name;
//         if (StName == null) {
//             StName = "N/A";
//         }
//         Studentli.innerHTML = StName;
//         StuGroupUL.appendChild(Studentli);
//     }
// }

// async function ShowStudent(id) {
//     const endpoint1 = "http://localhost:8000/api/account/student/id/" + id;
//     const endpoint2 = "http://localhost:8000/api/group/" + id;

//     const response2 = await fetch(endpoint2);
//     result2 = await response2.json();
//     const response = await fetch(endpoint1);
//     result = await response.json();
//     StudentName.innerHTML = result.name ? result.name : "N/A";
//     StudentMajor.innerHTML = result.major ? result.major : "N/A";
//     StduentContact.innerHTML = result.contact ? result.contact : "N/A";
//     StudentEmail.innerHTML = result.email ? result.email : "N/A";
//     StduentBib.innerHTML = result.bib ? result.bib : "N/A";
//     if(result2.id !== null){
//         StudentGroup.innerHTML = result2.groupName ? result2.groupName : "N/A";
//         StudentCompany.innerHTML = result2.capstone.company.name ? result2.capstone.company.name : "N/A";
//         StudentCapstone.innerHTML = result2.capstone.projectTitle ? result2.capstone.projectTitle : "N/A";
//     }else{
//         StudentGroup.innerHTML = "N/A";
//         StudentCompany.innerHTML =  "N/A";
//         StudentCapstone.innerHTML =  "N/A";
//     }
    


//     const SkillUL = document.getElementById('capability');
//     SkillUL.innerHTML = '';
//     if (result.skills.length > 0) {
//         for (let j = 0; j < result.skills.length; j++) {
//             const li = document.createElement('li');
//             li.className = 'profile_li';
//             li.textContent = result.skills[j];
//             SkillUL.appendChild(li);
//         }
//     } else {
//         const li = document.createElement('li');
//         li.className = 'profile_li';
//         li.textContent = "N/A";
//         SkillUL.appendChild(li);
//     }
//     StudentDiv.removeAttribute('hidden');
// }


// // search button and function

// // group search
// const SearchBtn = document.getElementById('SearchBtn');
// SearchBtn.addEventListener('click', () => {
//     const SearchGroupInput = document.getElementById('SearchGroupInput');
//     const modalUl = document.querySelector('#ResultGroupMemberUL');
//     const ModalLi = modalUl.getElementsByTagName('li');
//     for (let k = ModalLi.length - 1; k >= 0; k--) {
//         modalUl.removeChild(ModalLi[k]);
//     }
//     if (SearchGroupInput.value.length > 0) {
       
//         let searchGroup = SearchGroupInput.value;
//         let cnt = 0;
//         let Button;
//         if (searchGroup !== "") {
//             let buttons = document.querySelectorAll(".dropdown-toggle");
//             for (let i = 0; i < buttons.length; i++) {
//                 if (buttons[i].textContent.trim().toLowerCase() === searchGroup.toLowerCase()) {
//                     cnt = 1;
//                     break;
//                 }
//                 let lis = buttons[i].nextElementSibling.querySelectorAll("li");

//             }
//             if (cnt == 1) {
//                 writeModalByID(searchGroup);
//             } else {
//                 const ModalBodyHeader = document.querySelector("#ResultHeader h5");
//                 ModalBodyHeader.innerHTML = "Sorry there is no " + searchGroup;
//             }
//         }

//     } else {
//         const modalUl = document.querySelector('#ResultGroupMemberUL');
//         const modalLi = document.createElement('li');
//         modalLi.textContent = 'Sorry You must enter at least 1 charater';
//         modalLi.className = 'list-group-item'
//         modalLi.setAttribute('id', "modalli");
//         modalUl.appendChild(modalLi);
//     }

// })


// function writeModalByID(searchGroup) {
//     let buttons = document.querySelectorAll(".dropdown-toggle");
//     const ModalBodyHeader = document.querySelector("#ResultHeader h5");

//     for (let i = 0; i < buttons.length; i++) {
//         if (buttons[i].textContent.trim().toLowerCase() === searchGroup.toLowerCase()) {
//             ModalBodyHeader.innerHTML = buttons[i].textContent;
//             let lis = buttons[i].nextElementSibling.querySelectorAll("li");
//             const modalUl = document.querySelector('#ResultGroupMemberUL');
//             const ModalLi = modalUl.getElementsByTagName('li');

//             for (let j = 0; j < lis.length; j++) {
//                 const modalLi = document.createElement('li');
//                 modalLi.textContent = lis[j].textContent;
//                 modalLi.className = 'list-group-item'
//                 modalLi.setAttribute('id', "modalli");
//                 modalUl.appendChild(modalLi);
//             }
//             break;
//         }
//     }
// }
// //STUDENT SEARCH
// const StudentSearchBtn = document.getElementById('StudentSearchBtn');
// const SearchStudentInput = document.getElementById('SearchStudentInput');
// StudentSearchBtn.addEventListener('click', () => {
//     const SearchValue = SearchStudentInput.value;
//     const modalUl = document.querySelector('#ResultStudentUL');
//     const ModalLi = modalUl.getElementsByTagName('li');
//     for (let k = ModalLi.length - 1; k >= 0; k--) {
//         modalUl.removeChild(ModalLi[k]);
//     }
//     if (SearchValue.length > 0) {

       
//         let cnt = 0;
//         let Stli = document.querySelectorAll(".list-group-item");
//         for (let i = 0; i < Stli.length; i++) {
//             if (Stli[i].textContent.trim().toLowerCase() === SearchValue.toLowerCase()) {
//                 cnt++;
//                 const modalLi = document.createElement('li');
//                 modalLi.textContent = Stli[i].textContent.trim();
//                 modalLi.className = 'list-group-item'
//                 modalLi.setAttribute('id', "modalli");
//                 modalUl.appendChild(modalLi);

//             }
//         }
//         if (cnt == 0) {
//         }

//     } else {
//         const modalUl = document.querySelector('#ResultStudentUL');
//         const modalLi = document.createElement('li');
//                 modalLi.textContent ='Sorry You must enter at least 1 charater';
//                 modalLi.className = 'list-group-item'
//                 modalLi.setAttribute('id', "modalli");
//                 modalUl.appendChild(modalLi);
//     }
// })

// //COMPANY SEARCH
// const SuperSearchBtn = document.getElementById('SuperSearchBtn');
// const SuperInput = document.getElementById('SuperInput');
// SuperSearchBtn.addEventListener('click', () => {
//     const SearchValue = SuperInput.value;
//     const modalUl = document.querySelector('#ResultSuperUL');
//     const ModalLi = modalUl.getElementsByTagName('li');
//     for (let k = ModalLi.length - 1; k >= 0; k--) {
//         modalUl.removeChild(ModalLi[k]);
//     }
//     if (SearchValue.length > 0) {
//         let cnt = 0;
//         let Cpli = document.querySelectorAll(".list-group-item");
//         for (let i = 0; i < Cpli.length; i++) {
//             if (Cpli[i].textContent.trim().toLowerCase() === SearchValue.toLowerCase()) {
//                 cnt++;
//                 const modalLi = document.createElement('li');
//                 modalLi.textContent = Cpli[i].textContent.trim();
//                 modalLi.className = 'list-group-item'
//                 modalLi.setAttribute('id', "modalli");
//                 modalUl.appendChild(modalLi);
//                 break;
//             }
//         }

        

//     } else {
//         const modalUl = document.querySelector('#ResultSuperUL');
//         const modalLi = document.createElement('li');
//         modalLi.textContent = 'Sorry You must enter at least 1 charater';
//         modalLi.className = 'list-group-item'
//         modalLi.setAttribute('id', "modalli");
//         modalUl.appendChild(modalLi);
//     }
// })

// //supervisor search  

// const CompanySearchBtn = document.getElementById('CompanySearchBtn');
// const SearchCompanyInput = document.getElementById('SearchCompanyInput');
// CompanySearchBtn.addEventListener('click', () => {
//     const SearchValue = SearchCompanyInput.value;
//     const modalUl = document.querySelector('#ResultCompanyUL');
//     const ModalLi = modalUl.getElementsByTagName('li');
//     for (let k = ModalLi.length - 1; k >= 0; k--) {
//         modalUl.removeChild(ModalLi[k]);
//     }
//     if (SearchValue.length > 0) {

//         let cnt = 0;
//         let Cpli = document.querySelectorAll(".list-group-item");
//         for (let i = 0; i < Cpli.length; i++) {
//             if (Cpli[i].textContent.trim().toLowerCase() === SearchValue.toLowerCase()) {
//                 cnt++;
//                 const modalLi = document.createElement('li');
//                 modalLi.textContent = Cpli[i].textContent.trim();
//                 modalLi.className = 'list-group-item'
//                 modalLi.setAttribute('id', "modalli");
//                 modalUl.appendChild(modalLi);
//                 break;
//             }
//         }


//     } else {
//         const modalUl = document.querySelector('#ResultCompanyUL');
//         const modalLi = document.createElement('li');
//         modalLi.textContent = 'Sorry You must enter at least 1 charater';
//         modalLi.className = 'list-group-item'
//         modalLi.setAttribute('id', "modalli");
//         modalUl.appendChild(modalLi);
//     }
// })
// // show supervisor profile



// //Company profile js
// const defaultImg = "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg";

// function LoadCompanyProfile() {
//     const imgDiv = document.getElementById("company-img");
//     imgDiv.src = defaultImg;
// }

// LoadCompanyProfile();


// //show Student Profile from Student Search 

