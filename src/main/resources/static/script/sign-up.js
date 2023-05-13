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
  window.location.href = 'sign-in-page';
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
  if (!userName.value||!password.value||!reEnterPass.value){
    updateDangerModal("All the fields must be completed",
    alertModalElStudent,
    (ev)=>{});
    return;
  }else if (reEnterPass.value !==password.value){
    updateDangerModal("Your password must be the same!",
    alertModalElStudent,
    (ev)=>{});
    return;
  }
  if (cnt == 0) { 
      onSignUpSubmit(userName.value, password.value,role.value);
  }
});

async function onSignUpSubmit(userName, password,type) {
  const userData = {
    username: userName,
    password: password
  };
  try{

    const res = await fetch(`/api/account/${type}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      const responseData = await res.json();
  
      if (responseData.id == null) {
        updateDangerModal("User name has already been taken!",
        alertModalElStudent,
        ()=>{});
      } else {
        updateSuccessModal("You have successfully register the account!",
        alertModalElStudent,
        ()=>{window.location.href="sign-in-page"});
          }
    } else {
      console.log('Request failed with status:', res.status);
    }
  } catch (error) {
    console.log('Request failed with error:', error);
  }
  
}

// FORM VALIDATION FORMULAS //

function userNameError() {
  if (userName.validity.valueMissing) {
    userNameEl.textContent = 'User Name cannot be empty';
    userName.classList.add('invalid');
    userName.placeholder = '';
  }
  if (userName.value.contains(' ')) {
    userNameEl.textContent = 'User Name cannot contain spaces';
    userName.classList.add('invalid');
    userName.placeholder = '';
  }
}
function passwordError() {
  if (password.validity.valueMissing || password.validity.tooShort) {
    password.classList.add('invalid');
    password.placeholder = '';
  }
  if (password.value.contains(' ')) {
    passwordEl.textContent = 'Password cannot contain spaces';
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
userName.addEventListener('click', () => {
  userNameEl.textContent = '';
  if (userName.classList.contains('invalid')) {
    userName.classList.remove('invalid');
  }
  userName.placeholder = 'User Name';
});
password.addEventListener('click', () => {
  passwordEl.textContent = '';
  if (password.classList.contains('invalid')) {
    password.classList.remove('invalid');
  }
  password.placeholder = 'Password';
});
reEnterPass.addEventListener('click', () => {
  reEnterPassEl.textContent = '';
  if (reEnterPass.classList.contains('invalid')) {
    reEnterPass.classList.remove('invalid');
  }
  reEnterPass.placeholder = 'Re-enter Password';
});
document.querySelector('#show-password1').addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
});
document.querySelector('#show-password2').addEventListener('click', () => {
  if (reEnterPass.type === 'password') {
    reEnterPass.type = 'text';
  } else {
    reEnterPass.type = 'password';
  }
});
