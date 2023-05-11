const SaveChangeBtn = document.getElementById('submit-btn');

const SaveBib = document.getElementById('SaveBib');
const CapabilityCreateBtn = document.getElementById('CapabilityCreateBtn');
const name = document.getElementById('profile_name');
const major = document.getElementById('profile_major');
const contact = document.getElementById('profile_contact');
const email = document.getElementById('profile_email');
// const gorup= document.getElementById('profile_group');
const session = sessionStorage.getItem('user');
const user = JSON.parse(session);

let testing;
let StudentName;
let StudentMajor;
let StudentContact;
let StudentEmail;
let StudentBib;


async function ViewAll() {

    const endpoint = user.username;
    console.log(endpoint);
    const responsee = await fetch(`/api/account/student/username/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result2 = await responsee.json();
    console.log(result2);
    console.log("user id ", user.id);
    LoadData(result2);
}

ViewAll();

function LoadData(result2) {
    let StudentName = result2.name;
    console.log(result2.name);
    let StudentMajor = result2.major;
    let StudentContact = result2.contact;
    let StudentEmail = result2.email;
    let StudentBib = result2.bib;
   

    const name = document.getElementById('profile_name');
    const major = document.getElementById('profile_major');
    const contact = document.getElementById('profile_contact');
    const email = document.getElementById('profile_email');
    const Bib = document.getElementById('Bib');

    name.innerHTML = StudentName;
    major.innerHTML = StudentMajor;
    contact.innerHTML = StudentContact;
    email.innerHTML = StudentEmail;
    Bib.innerHTML = StudentBib;
    LoadSkills(result2);
    LoadModal(result2);
}

function DeleteAllSkills() {
    
    const Capabilityul = document.querySelector('#capability');

    while (Capabilityul.firstChild) {
        Capabilityul.removeChild(Capabilityul.firstChild);
    }

}
async function RewriteAllSkills(){
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
    for (let i = 0; i < result2.skills.length; i++) {
        const li = document.createElement("li");
        li.className = 'profile_li';
        li.textContent = result2.skills[i];
        Capabilityul.appendChild(li);
    }
}

function LoadModal(result2) {
    console.log("Load Modal");
    const Modalname = document.getElementById('NewName');
    const Modalmajor = document.getElementById('NewMajor');
    const Modalcontact = document.getElementById('NewContact');
    const Modalemail = document.getElementById('NewEmail');
    const Modalpassword = document.getElementById('NewPassword');
    const ModalBib = document.getElementById('NewBib');

    Modalname.value = result2.name;
    Modalmajor.value = result2.major;
    Modalcontact.value = result2.contact;
    Modalemail.value = result2.email;
    Modalpassword.value = result2.password;
    ModalBib.value = result2.bib;

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
        modalLi.className = 'list-group-item'
        const DelteBtn = document.createElement('Button');
        DelteBtn.id = 'deleteBtn'
        DelteBtn.classList.add("btn", "btn-danger");
        DelteBtn.innerHTML = "Delete";
        DelteBtn.addEventListener('click', DeleteSkill(skill));
        modalLi.appendChild(DelteBtn);
        modalUl.appendChild(modalLi);
    }
}

CapabilityCreateBtn.addEventListener('click', () => {
    const CapabilitiesCreateInput = document.getElementById('CapabilitiesCreateInput');

    if (CapabilitiesCreateInput.value != "") {
         const newSkill = CapabilitiesCreateInput.value;
      
        const modalUl = document.querySelector('#ModalCapability');
        const modalLi = document.createElement('li');
        modalLi.textContent = newSkill;
        modalLi.className = 'list-group-item'
        const DelteBtn = document.createElement('Button');
        DelteBtn.id = 'deleteBtn'
        DelteBtn.classList.add("btn", "btn-danger");
        DelteBtn.innerHTML = "Delete";
        DelteBtn.addEventListener('click', DeleteSkill(newSkill));
        modalLi.appendChild(DelteBtn);
        modalUl.appendChild(modalLi);
    }
})



function DeleteSkill(skill) {
    return function () {
        const modalUl = document.querySelector('#ModalCapability');
        const modalli = modalUl.querySelectorAll('li');
        const liCount = modalUl.querySelectorAll('li').length;
        for(let i = 0 ; i < liCount; i++){
            const text = modalli[i].textContent.trim();
            const deleteIndex = text.indexOf('Delete');
            const oldSkill = text.substring(0, deleteIndex).trim();
            if(oldSkill === skill){
                modalUl.removeChild(modalli[i]);
            }   
        }
    }

}


SaveChangeBtn.addEventListener('click', () => {
    UpdateStudentPersona(user.id);
    UpdateStudentSkills();

});

async function UpdateStudentPersona(studentID) {

    const profile_name = document.getElementById('profile_name');
    const profile_major = document.getElementById('profile_major');
    const profile_contact = document.getElementById('profile_contact');
    const profile_email = document.getElementById('profile_email');
    const profile_bib = document.getElementById('Bib');

    let NewName = document.getElementById('NewName').value;
    let NewMajor = document.getElementById('NewMajor').value;
    let NewContact = document.getElementById('NewContact').value;
    let NewEmail = document.getElementById('NewEmail').value;
    let NewPassword = document.getElementById('NewPassword').value;
    let NewBib = document.getElementById('NewBib').value;

    const newStudentPersona = {
        studentName: NewName,
        email: NewEmail,
        major: NewMajor,
        contact: NewContact,
        password :NewPassword,
        bib:NewBib
    };

    try {
        const response = await fetch(`/api/student/update/${studentID}/persona`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudentPersona),
        });

        if (response.ok) {
            console.log('Capstone project updated successfully');
            profile_name.innerHTML = NewName;
            profile_major.innerHTML = NewMajor;
            profile_contact.innerHTML = NewContact;
            profile_email.innerHTML = NewEmail;
            profile_bib.innerHTML = NewBib;
        } else {
            console.error('Error updating capstone project. Response status:', response.status);
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
        skills: NewSkills
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
            console.error('Error updating capstone project. Response status:', response.status);
        }
    } catch (error) {
        console.error('Error updating capstone project:', error);
    }
}




