const userName = document.querySelector('.user-name');
const userNameEl = document.querySelector('.error-uname');
const password = document.querySelector('.password');
const passwordEl = document.querySelector('.error-password');
const signUp = document.querySelector('#btn-sign-up');
const submit = document.querySelector('#btn-sign-in');
const role = document.querySelector('#sign-in-role');

signUp.addEventListener('click', () => {
  window.location.href = 'sign-up-page';
});

userName.addEventListener('change', () => {
  if (userName.validity.valid) {
    userName.textContent = '';
    userNameEl.textContent = '';
    userName.classList.remove('invalid');
  } else {
    userNameError();
  }
});

password.addEventListener('change', () => {
  if (password.validity.valid) {
    password.textContent = '';
    passwordEl.textContent = '';
    password.classList.remove('invalid');
  } else {
    passwordError();
  }
});

// FORM VALIDATION WHEN USER PRESSES SUBMIT //

submit.addEventListener('click', (event) => {
  let count = 0;
  if (!userName.validity.valid) {
    event.preventDefault();
    userNameError();
    count++;
  }
  if (!password.validity.valid) {
    event.preventDefault();
    passwordError();
    count++;
  }
  if (count > 0) {
    return;
  }
  authenticate(userName.value, password.value);
});

async function authenticate(username, password) {
  console.log('sign in');
  const alertModal = document.querySelector('#alert-modal');
  updateLoadingModal('Signing in...', alertModal);
  const response = await fetch(
    `/authenticate?username=${username}&password=${password}`
  );
  console.log(response);
  try {
    const result = await response.json();
    console.log(result);
    if (result.role === 'admin') {
      window.location.href = '/admin';
      sessionStorage.setItem('role', JSON.stringify('admin'));
    } else if (result.role === 'student') {
      window.location.href = '/student';
      sessionStorage.setItem('role', JSON.stringify('student'));
    }
    if (result.role === 'company') {
      window.location.href = '/company';
      sessionStorage.setItem('role', JSON.stringify('company'));
    }
    if (result.role === 'supervisor') {
      window.location.href = '/supervisor';
      sessionStorage.setItem('role', JSON.stringify('supervisor'));
    }
    sessionStorage.setItem('user', JSON.stringify(result));
  } catch (error) {
    console.log('Wrong username or password');
    updateDangerModal('Wrong username or password', alertModal, () => {
      window.location.href = '/sign-in-page';
    });
    return;
  }
}

// FORM VALIDATION FORMULAS //

function userNameError() {
  if (userName.validity.valueMissing) {
    userNameEl.textContent = 'User Name cannot be empty';
    userName.classList.add('invalid');
    userName.placeholder = '';
  }
}
function passwordError() {
  if (password.validity.valueMissing || password.validity.tooShort) {
    password.classList.add('invalid');
    password.placeholder = '';
  }
  if (password.validity.valueMissing) {
    passwordEl.textContent = 'Password cannot be empty';
  } else if (password.validity.tooShort) {
    passwordEl.textContent = 'Password should be at least 8 characters';
  }
}
password.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    submit.click();
  }
});
userName.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    submit.click();
  }
});
userName.addEventListener('click', () => {
  userNameEl.textContent = '';
  if (userName.classList.contains('invalid')) {
    userName.classList.remove('invalid');
  }
});
password.addEventListener('click', () => {
  passwordEl.textContent = '';
  if (password.classList.contains('invalid')) {
    password.classList.remove('invalid');
  }
});
