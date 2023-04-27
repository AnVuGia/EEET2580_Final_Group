const userName = document.querySelector('.user-name');
const userNameEl = document.querySelector('.error-uname');
const password = document.querySelector('.password');
const passwordEl = document.querySelector('.error-password');
const reEnterPass = document.querySelector('.re-enter-password');
const reEnterPassEl = document.querySelector('.error-re-password');
const submit = document.querySelector('#btn-sign-up');
const back = document.querySelector('#btn-back');
const role = document.querySelector('#sign-up-role');

back.addEventListener('click', () => {
  window.location.href = 'sign-in.html';
});

console.log(submit);
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
reEnterPass.addEventListener('change', () => {
  if (reEnterPass.validity.valid) {
    reEnterPass.textContent = '';
    reEnterPassEl.textContent = '';
    reEnterPass.classList.remove('invalid');
  } else {
    reEnterPasswordError();
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
  if (!reEnterPass.validity.valid) {
    event.preventDefault();
    reEnterPasswordError();
  }
  if (cnt == 0) {
    if (role.value == 'Student') {
      onStudentSubmit(userName.value, password.value);
    } else if (role.value == 'Company') {
      onCompanySubmit(userName.value, password.value);
    } else if (role.value == 'Supervisor') {
      onSupervisorSubmit(userName.value, password.value);
    }
  }
});

async function onStudentSubmit(userName, password) {
  console.log('onStudentSubmit');
  const userData = {
    username: userName,
    password: password,
    email: 'user1@gmial.com 2',
    name: 'user 1 2',
  };
  const res = await fetch('/api/account/student/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

async function onCompanySubmit(userName, password) {
  console.log('onCompanySubmit');
  const userData = {
    username: userName,
    password: password,
    name: 'test company',
    //    company_description: 'test',
    email: 'user1@gmial.com 2',
  };
  const res = await fetch('/api/account/company/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

async function onSupervisorSubmit(userName, password) {
  console.log('onStudentSubmit');
  const userData = {
    username: userName,
    password: password,
    supervisor_bio: 'test supervisor bio',
    email: 'user1@gmial.com 2',
    supervisor_name: 'user 1 2',
  };
  const res = await fetch('/api/account/supervisor/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
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
function reEnterPasswordError() {
  if (reEnterPass.validity.valueMissing || reEnterPass.validity.tooShort) {
    reEnterPass.classList.add('invalid');
    reEnterPass.placeholder = '';
  }

  if (reEnterPass.validity.valueMissing) {
    reEnterPassEl.textContent = 'Password cannot be empty';
  } else if (reEnterPass.validity.tooShort) {
    reEnterPassEl.textContent = 'Password should be at least 8 characters';
  }
}
