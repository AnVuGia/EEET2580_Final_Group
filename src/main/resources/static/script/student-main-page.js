const modalCancelBtn = document.querySelector('#cancel-btn');
const modalPage = document.querySelector('.modal');

modalCancelBtn.addEventListener('click', function () {
  modalPage.setAttribute('hidden', 'hidden');
});
createGroupBtn.addEventListener('click', function () {
  modalPage.removeAttribute('hidden');
});