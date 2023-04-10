const url = '/capstone';
async function getDataById() {
  const itemID = document.querySelector('#capstone-id').value;
  console.log(itemID);
  const endPoints = '/findById?id=' + itemID;
  const res = await fetch(`${url}${endPoints}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemID }),
  });
  const data = await res.json();
  return data;
}
async function getDataByTitle() {
  const itemTitle = document.querySelector('#capstone-title').value;
  console.log(itemTitle);
  const endPoints = '/findByTitle?title=' + itemTitle;
  const res = await fetch(`${url}${endPoints}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemTitle }),
  });
  const data = await res.json();
  return data;
}
function displayData(data) {
  console.log(data);
  const capstoneEl = document.querySelector('#capstone');
  capstoneEl.innerHTML = '';
  const capstone = document.createElement('div');
  capstone.innerHTML = `
    <h3>Title: ${data.projectTitle}</h3>
    <p>Introduction: ${data.projectIntroduction}</p>
    <p>Description: ${data.projectDescription}</p>
  `;
  capstoneEl.appendChild(capstone);
}
async function onFindById(event) {
  event.preventDefault();
  const data = await getDataById(event);
  displayData(data);
}
async function onFindByTitle(event) {
  event.preventDefault();
  const data = await getDataByTitle(event);
  displayData(data);
}
document
  .querySelector('#findByid-capstone-btn')
  .addEventListener('click', onFindById);
document
  .querySelector('#findByTitle-capstone-btn')
  .addEventListener('click', onFindByTitle);
