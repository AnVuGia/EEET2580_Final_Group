const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');

modalCancelBtn.addEventListener('click', function () {
  modalPage.setAttribute('hidden', 'hidden');
});
const paginationInfo = {
  currPage: 0,
  totalPages: 0,
  currSize: 5,
};
// createGroupBtn.addEventListener('click', function () {
//   modalPage.removeAttribute('hidden');
// });
async function getAllApprovedCapstones(page, size) {
  const url = `/api/capstone-projects/approved?page=${page}&size=${size}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  return result;
}
async function updateDashboardUI() {}
