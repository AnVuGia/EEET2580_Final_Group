const currUser = JSON.parse(sessionStorage.getItem('user'));
const capstoneLogo = document.querySelector('#logo');
const submitBtn = document.querySelector('.submit-btn');
const logoForm = document.querySelector('#logo-form');
async function updateUI() {}
async function setCapstoneImage(capstoneProject) {
  const response = await logoForm.submit();
  response = await response.json();
  capstoneProject.capstone_image = response.id;
}
function setCapstoneProject() {
    const capstoneProject = {
        projectTitle: document.querySelector('#title').value,
        company = {
            id : currUser.id
        },
        projectIntroduction: document.querySelector('#introduction').value,
        projectDescription: document.querySelector('#description').value,
}
submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  setCapstoneImage();
});
