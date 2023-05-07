const SaveChangeBtn = document.getElementById('SaveProfile');
const EditBtn = document.getElementById('EditBtn');
const SaveBib = document.getElementById('SaveBib');
const CapabilityCreateBtn = document.getElementById('CapabilityCreateBtn');
const name = document.getElementById('profile_name');
const major = document.getElementById('profile_major');
const contact = document.getElementById('profile_contact');
const email = document.getElementById('profile_email');
// const gorup= document.getElementById('profile_group');
let StudentName;
let StudentMajor;
let StudentContact;
let StudentEmail;

async function ViewAll() {
    const endpoint = "hbtest";
    const responsee = await fetch(`/api/account/student/username/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result2 = await responsee.json();
    console.log(result2);
    LoadData(result2);

    const responsee3 = await fetch(`/api/account/company/username/company`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result3 = await responsee3.json();
    console.log(result3);
    
    const responsee4 = await fetch(`/api/account/supervisor/username/thanh123`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result4 = await responsee4.json();
    console.log(result4);


}

function LoadData(result2) {
    let StudentName = result2.studentName;
    let StudentMajor = result2.major;
    let StudentContact = result2.contact;
    let StudentEmail = result2.email;

    const name = document.getElementById('profile_name');
    const major = document.getElementById('profile_major');
    const contact = document.getElementById('profile_contact');
    const email = document.getElementById('profile_email');

    name.innerHTML = StudentName;
    major.innerHTML = StudentMajor;
    contact.innerHTML = StudentContact;
    email.innerHTML = StudentEmail;
}

CapabilityCreateBtn.addEventListener('click', () => {
    const CapabilitiesCreateInput = document.getElementById('CapabilitiesCreateInput');

    if (CapabilitiesCreateInput.value != "") {
        const newSkill = CapabilitiesCreateInput.value;
        const ul = document.querySelector('#capability');
        const newli = document.createElement('li');
        newli.textContent = newSkill;
        newli.className = 'profile_li'
        ul.appendChild(newli);
        reloadSkills();
    }


})

SaveBib.addEventListener('click', () => {
    const newBib = document.getElementById('Bibliography').value;
    const Bib = document.getElementById('Bib');
    if (newBib != "") {
        Bib.innerHTML = newBib;
    }
})
EditBtn.addEventListener('click', () => {
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
})

function DeleteSkill(skill) {
    return function () {
        const ul = document.querySelector('#capability');
        const li = ul.querySelectorAll('li');
        const liCount = ul.querySelectorAll('li').length;
        for (let i = 0; i < liCount; i++) {
            const oldSkill = li[i].textContent;
            if (oldSkill === skill) {
                ul.removeChild(li[i]);
                break;
            }
        }
        reloadSkills();

    }
}
function reloadSkills() {
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
SaveChangeBtn.addEventListener('click', () => {

    const profile_name = document.getElementById('profile_name');
    const profile_major = document.getElementById('profile_major');
    const profile_contact = document.getElementById('profile_contact');
    const profile_email = document.getElementById('profile_email');

    let NewName = document.getElementById('NewName').value;
    let NewMajor = document.getElementById('NewMajor').value;
    let NewContact = document.getElementById('NewContact').value;
    let NewEmail = document.getElementById('NewEmail').value;

    if (NewName != "") {
        profile_name.innerHTML = NewName;
    }
    if (NewMajor != "") {
        profile_major.innerHTML = NewMajor;
    }
    if (NewContact != "") {
        profile_contact.innerHTML = NewContact;
    }
    if (NewEmail != "") {
        profile_email.innerHTML = NewEmail;
    }
});

ViewAll();

