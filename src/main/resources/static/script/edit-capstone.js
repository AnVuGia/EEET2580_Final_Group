const editForm = document.getElementById('edit-capstone-form');
const projectId = 1; // Replace this with the actual project ID you want to edit
const capstoneTitle = document.querySelector('#capstone-title');
const companyName = document.querySelector('#company-name');
const capstoneIntroduction = document.querySelector('#capstone-intro');
const capstoneDescription = document.querySelector('#capstone-description');
const capstoneRequirements = document.querySelector('#capstone-requirements');
const capstoneObjective = document.querySelector('#capstone-objective');
const supervisorName = document.querySelector('#supervisor');
const supervisorEmail = document.querySelector('#supervisor-email');


async function fetchCapstoneProject() {
    const capstoneResponse = await fetch(`http://localhost:8000/api/capstone-project/id/${projectId}`);
    let capstoneData = await capstoneResponse.json();

    capstoneTitle.value = capstoneData.projectTitle;
    capstoneDescription.value = capstoneData.projectDescription;
    capstoneIntroduction.value = capstoneData.projectIntroduction;
    capstoneObjective.value = capstoneData.projectObjectives;
    capstoneRequirements.value = capstoneData.technicalRequirements;

}

async function updateCapstoneProject(event) {
    event.preventDefault();
    const updatedData = {
        projectTitle: document.getElementById('capstone-title').value,
        projectDescription: document.getElementById('capstone-description').value,
        projectIntroduction: document.getElementById('capstone-intro').value,
        projectObjectives: document.getElementById('capstone-objective').value,
        technicalRequirements: document.getElementById('capstone-requirements').value,
    };

    try {
        await fetch(`http://localhost:8000/api/capstone-project/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        console.log('Capstone project updated successfully');
    } catch (error) {
        console.error('Error updating capstone project:', error);
    }
}

fetchCapstoneProject();
editForm.addEventListener('submit', updateCapstoneProject);


