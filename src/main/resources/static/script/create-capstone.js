const currUser = JSON.parse(sessionStorage.getItem('user'));
const capstoneLogo = document.querySelector('#logo');
const submitBtn = document.querySelector('#submit-btn');
const supervisorSelect = document.querySelector('#supervisor-select');

async function updateUI() {}

async function setCapstoneImage(capstoneProject) {
  const fileInput = document.querySelector('#logo');
  if (fileInput.files.length === 0) {
    return capstoneProject;
  }
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
  const capstoneProject = {
    company: {
      username: currUser.username,
    },
    supervisor: {
      username: supervisorSelect.value,
    },
    projectTitle: document.querySelector('#capstone-title').value,
    projectIntroduction: document.querySelector('#introduction').value,
    projectObjectives: document.querySelector('#capstone-objectives').value,
    projectSuccessCriteria: document.querySelector('#success-criteria').value,
    technicalRequirements: document.querySelector('#capstone-requirements')
      .value,
    projectDescription: document.querySelector('#capstone-description').value,
    academicBackground: document.querySelector('#academic-background').value,
    noStudents: document.querySelector('#no-students').value,
    interviewReqs: document.querySelector('#interview-reqs').value,
    multiTeamAllow: document.querySelector('#multi-team').value,
    capstoneStatus: 'pending',
    imageId: '',
  };
  const res = await setCapstoneImage(capstoneProject);
  const resJson = JSON.stringify(res);
  console.log(resJson);
  await fetch('/api/capstone-project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: resJson,
  });
}
async function getSupervisors() {
  supervisorSelect.innerHTML = '';
  const response = await fetch('/api/account/supervisors');
  const supervisors = await response.json();
  console.log(supervisors);
  supervisors.forEach((supervisor) => {
    const option = document.createElement('option');
    option.value = supervisor.username;
    option.innerHTML = `${supervisor.name} - ${supervisor.email}`;
    supervisorSelect.appendChild(option);
  });
}
// async function onChangeSupervisor() {
//   const supervisorId = supervisorSelect.value;
//   const response = await fetch(`/api/account/supervisor/id/${supervisorId}`);
//   const supervisor = await response.json();
//   supervisorEmail.value = supervisor.email;
//   console.log(supervisor);
// }

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  await setCapstoneProject();
});
getSupervisors();
// supervisorSelect.addEventListener('change', onChangeSupervisor);
