const userName = document.querySelector('.user-name');
const userNameEl = document.querySelector('.error-uname');
const password = document.querySelector('.password');
const passwordEl = document.querySelector('.error-password');
const signUp = document.querySelector('#btn-sign-up');
const submit = document.querySelector('#btn-sign-in');
const role = document.querySelector('#sign-in-role');

signUp.addEventListener('click', () => {
  window.location.href = 'sign-up.html';
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
  let cnt = 0;
  if (!userName.validity.valid) {
    event.preventDefault();
    userNameError();
    cnt++;
  }

  if (!password.validity.valid) {
    event.preventDefault();
    passwordError();
    cnt++;
  }
  if (cnt == 0) {
    if (role.value == 'Student') {
      onSignInStudent(userName.value, password.value);
    } else if (role.value == 'Company') {
      onSignInCompany(userName.value, password.value);
    } else if (role.value == 'Supervisor') {
      onSignInSupervisor(userName.value, password.value);
    }
  }
});
async function onSignInStudent(username, password) {
  console.log('sign in');

  const endpoint = '?username=' + username;
  const response = await fetch(`/api/account/student/username${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataResponse = await response.json();
  if (dataResponse.password === password) {
    setCookiesForRole('student');
    console.log('success');
  } else {
    console.log('fail');
  }

  setCookiesForUser(dataResponse);
  // const dataJson = sessionStorage.getItem('user').;
}

async function onSignInCompany(username, password) {
  console.log('sign in');

  const endpoint = '?username=' + username;
  const response = await fetch(`/api/account/company/username${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataResponse = await response.json();
  if (dataResponse.password === password) {
    setCookiesForRole('company');
    console.log('success');
  } else {
    console.log('fail');
  }

  setCookiesForUser(dataResponse);
  // const dataJson = sessionStorage.getItem('user').;
}

async function onSignInSupervisor(username, password) {
  console.log('sign in');

  const endpoint = '?username=' + username;
  const response = await fetch(`/api/account/supervisor/username${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataResponse = await response.json();
  if (dataResponse.password === password) {
    setCookiesForRole('supervisor');
    console.log('success');
  } else {
    console.log('fail');
  }

  setCookiesForUser(dataResponse);
  // const dataJson = sessionStorage.getItem('user').;
}

function setCookiesForUser(user) {
  const encodedUser = JSON.stringify(user);
  document.cookie = `user=${encodeURIComponent(encodedUser)}; path=/`;
}
function setCookiesForRole(role) {
  document.cookie = `role=${encodeURIComponent(role)}; path=/`;
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
