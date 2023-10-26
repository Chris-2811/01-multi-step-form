const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');
const formHome = document.getElementById('form-home');
const nextBtn = document.getElementById('next');

// Utility functions
const isRequired = (value) => (value === '' ? false : true);
const isBetween = (length, min, max) => {
  return length < min || length > max ? false : true;
};
const isEmailAddressValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

// Check name
function checkName() {
  let valid = false;
  const min = 3;
  const max = 25;

  const name = nameInput.value.trim();

  if (!isRequired(name)) {
    showError(nameInput, 'This field is required');
  } else if (!isBetween(name.length, min, max)) {
    showError(nameInput, `Name must be between ${min} and ${max} characters}`);
  } else {
    showSuccess(nameInput);
    valid = true;
  }

  return valid;
}

// Check email
function checkEmail() {
  let valid = false;

  const email = emailInput.value.trim();

  if (!isRequired(email)) {
    showError(emailInput, 'This field is required');
  } else if (!isEmailAddressValid(email)) {
    console.log('hello');
    showError(emailInput, 'Email is not valid');
  } else {
    showSuccess(emailInput);
    valid = true;
  }

  return valid;
}

// Check phone number
function checkPhoneNumber() {
  let valid = false;

  const number = phoneInput.value.trim();
  const re = /^\d{10}$/;

  if (!isRequired(number)) {
    showError(phoneInput, 'This field is required');
  } else if (!re.test(number)) {
    showError(phoneInput, 'Phone number is not valid');
  } else {
    showSuccess(phoneInput);
    valid = true;
  }

  return valid;
}

// Show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');

  const small = formControl.querySelector('small');
  small.textContent = message;
}

// Show success
function showSuccess(input) {
  console.log('Hello');
  const formControl = input.parentElement;
  formControl.classList.remove('error');
}

// Update input value
function updateInputValues() {
  const formDataObject = JSON.parse(localStorage.getItem('personalData'));

  nameInput.value = formDataObject.name;
  emailInput.value = formDataObject.email;
  phoneInput.value = formDataObject.phone;
}

// Add Eventlistener
function init() {
  formHome.addEventListener('submit', (e) => {
    e.preventDefault();

    let isNameValid = checkName();
    let isEmailValid = checkEmail();
    let isPhoneNumberValid = checkPhoneNumber();

    let isFormValid = isNameValid && isEmailValid && isPhoneNumberValid;

    if (isFormValid) {
      const formData = new FormData(formHome);
      console.log(formData);

      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');

      const formDataObject = {
        name: name,
        email: email,
        phone: phone,
      };

      localStorage.setItem('personalData', JSON.stringify(formDataObject));

      window.location.href = 'plan.html';
    }
  });

  updateInputValues();
}

init();
