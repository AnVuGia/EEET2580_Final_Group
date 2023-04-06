const url = '/capstone';
function onSaveCapstone() {
  const capstoneName = document.querySelector('#capstone_name');
  const capstoneDescription = document.querySelector('#capstone_des');
  const capstoneProject = {
    name: capstoneName.value,
    description: capstoneDescription.value,
  };
  fetch(`${url}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(capstoneProject),
  });
}
async function deleteCapstone() {
  const capstoneId = document.querySelector('#delete_capstone_id').value;
  await fetch(`${url}/delete?id=${capstoneId}`, { method: 'POST' });
}
async function updateCapstone() {
  const capstoneId = document.querySelector('#update_capstone_id').value;
  const capstoneName = document.querySelector('#update_capstone_name').value;
  const capstoneDescription = document.querySelector(
    '#update_capstone_des'
  ).value;
  const capstoneProject = {
    id: capstoneId,
    name: capstoneName,
    description: capstoneDescription,
  };
  await fetch(`${url}/update?id=${capstoneId}`, {
    method: 'POST',
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
