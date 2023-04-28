const currUser = getUserFromCookie();
const capstoneLogo = document.querySelector('#logo');
const submitBtn = document.querySelector('.submit-btn');
const logoForm = document.querySelector('#logo-form');
const supervisorSelect = document.querySelector('#supervisor-select');
const supervisorEmail = document.querySelector('#supervisor-email');
async function updateUI() {}

async function setCapstoneImage(capstoneProject) {
  const fileInput = document.querySelector('#logo');
  const formData = new FormData();

  formData.append('file', fileInput.files[0]);

  let response = await fetch('/api/images', {
    method: 'POST',
    body: formData,
  });
  response = await response.json();
  console.log(response);
  capstoneProject.imageId = response.id;
  console.log('save image');
  return capstoneProject;
}
async function setCapstoneProject() {
  // const capstoneProject = {
  //   projectTitle: document.querySelector('#title').value,
  //   company: {
  //     id: currUser.id,
  //   },
  //   projectIntroduction: document.querySelector('#introduction').value,
  //   projectDescription: document.querySelector('#capstone-description').value,
  //   projectObjectives: document.querySelector('#capstone-outcome').value,
  //   projectSuccessCriteria: document.querySelector('#criteria').value,
  //   noStudents: document.querySelector('#members').value,
  //   interviewReqs: document.querySelector('#interview-req').value,
  //   // multiTeamAllow: document.querySelector('#multi-team').value,
  //   multiTeamAllow: false,
  //   capstoneStatus: 'pending',
  //   technicalRequirements: document.querySelector('#capstone-requirements')
  //     .value,
  //   supervisor: {
  //     id: supervisorSelect.value,
  //   },
  // };
  const capstoneProject = {
    company: {
      id: 5,
    },
    supervisor: {
      id: 5,
    },
    projectTitle: 'My Capstone Project',
    projectIntroduction: 'This is my capstone project.',
    projectObjectives: 'My project objectives.',
    projectSuccessCriteria: 'My project success criteria.',
    technicalRequirements: 'My technical requirements.',
    projectDescription: 'My project description.',
    academicBackground: 'My academic background.',
    noStudents: 2,
    interviewReqs: 'My interview requirements.',
    multiTeamAllow: true,
    capstoneStatus: 'Pending',
    imageId: '',
  };
  const res = await setCapstoneImage(capstoneProject);
  const resJson = JSON.stringify(res);
  console.log(resJson);
  const response = await fetch('/api/capstone-project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: resJson,
  });
  console.log(response);
}
async function getSupervisors() {
  supervisorSelect.innerHTML = '';
  const response = await fetch('/api/account/supervisor/all');
  const supervisors = await response.json();
  supervisors.forEach((supervisor) => {
    const option = document.createElement('option');
    option.value = supervisor.id;
    option.innerHTML = `${supervisor.supervisorName}`;
    supervisorSelect.appendChild(option);
  });
}
async function onChangeSupervisor() {
  const supervisorId = supervisorSelect.value;
  const response = await fetch(`/api/account/supervisor/id/${supervisorId}`);
  const supervisor = await response.json();
  supervisorEmail.value = supervisor.email;
  console.log(supervisor);
}
function getUserFromCookie() {
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('user=')
  );
  if (userCookie) {
    const user = userCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(user));
  }
  return null;
}
function getRoleFromCookie() {
  const cookies = document.cookie.split(';');
  const roleCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('role=')
  );
  if (roleCookie) {
    const role = roleCookie.split('=')[1];
    return decodeURIComponent(role);
  }
  return null;
}
getSupervisors();
submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  await setCapstoneProject();
});
supervisorSelect.addEventListener('change', onChangeSupervisor);
