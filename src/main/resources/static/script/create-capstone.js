const currUser = JSON.parse(sessionStorage.getItem('user'));
const capstoneLogo = document.querySelector('#logo');
const submitBtn = document.querySelector('#submit-btn');
const supervisorSelect = document.querySelector('#supervisor-select');

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
  const capstoneProject = {
    company: {
      id: 1,
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
    capstoneStatus: 'pending',
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
  const response = await fetch('/api/account/supervisors');
  const supervisors = await response.json();
  console.log(supervisors);
  supervisors.forEach((supervisor) => {
    const option = document.createElement('option');
    option.value = supervisor.name;
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
