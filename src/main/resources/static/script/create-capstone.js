const currUser = JSON.parse(sessionStorage.getItem('user'));
const capstoneLogo = document.querySelector('#logo');
const submitBtn = document.querySelector('#submit-btn');
async function updateUI() {}
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
async function setCapstoneImage(capstoneProject) {
  const fileInput = document.querySelector('#logo');
  if (fileInput.files.length === 0) {
    fetch('/api/capstone-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(capstoneProject),
    });
    window.location.href = 'company-main-page.html';
    return;
  }

  console.log('change');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, 300, 300);
      const compressedImageData = canvas.toDataURL('image/jpeg', 0.5);
      console.log(compressedImageData);
      const formData = new FormData();
      formData.append('file', dataURItoBlob(compressedImageData));

      fetch('/api/images', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log('Image uploaded successfully.');
          return response.json();
        })
        .then((data) => {
          console.log(data);
          capstoneProject.imageId = data.id;
          console.log(capstoneProject);
          return capstoneProject;
        })
        .then((capstoneProject) => {
          fetch('/api/capstone-project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(capstoneProject),
          })
            .then((response) => {
              console.log('Capstone project created successfully.');
            })
            .then((data) => {
              console.log(data);
              window.location.href = 'company-main-page.html';
            });
        })

        .catch((error) => {
          console.error(error);
        });
    };

    image.src = reader.result;
    reader.readAsDataURL(file);
  };

  return capstoneProject;
}
async function setCapstoneProject() {
  const capstoneProject = {
    company: {
      username: currUser.username,
    },
    supervisor: {},
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


}

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  await setCapstoneProject();
});

