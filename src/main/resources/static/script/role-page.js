const studentButton = document.querySelector('#student-selector');

studentButton.addEventListener('click', () => {
  console.log('student button clicked');
  window.location.href = '/sign-up-page';
});
