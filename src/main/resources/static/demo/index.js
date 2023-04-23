const url = '/api/capstone-project';
//function to save the capstone project
function onSaveCapstone() {
  const capstoneName = document.querySelector('#capstone_name');
  const capstoneDescription = document.querySelector('#capstone_des');

  const capstoneProject = {
    title: capstoneName.value,
    description: capstoneDescription.value,
  };
  fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(capstoneProject),
  });
}
//function to delete the capstone project
async function deleteCapstone() {
  const capstoneId = document.querySelector('#delete_capstone_id').value;
  await fetch(`${url}?id=${capstoneId}`, { method: 'DELETE' });
}
//function to update the capstone project
async function updateCapstone() {
  const capstoneId = document.querySelector('#update_capstone_id').value;
  const capstoneName = document.querySelector('#update_capstone_name').value;
  const capstoneDescription = document.querySelector(
    '#update_capstone_des'
  ).value;
  const capstoneProject = {
    id: capstoneId,
    title: capstoneName,
    description: capstoneDescription,
  };
  await fetch(`${url}?id=${capstoneId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(capstoneProject),
  });
}
document
  .querySelector('#add_capstone_btn')
  .addEventListener('click', onSaveCapstone);
document
  .querySelector('#delete_capstone_btn')
  .addEventListener('click', deleteCapstone);
document
  .querySelector('#update_capstone_btn')
  .addEventListener('click', updateCapstone);
