const formEl = document.getElementById('form');
const planDetails = document.querySelectorAll('.plan-details');
const switchEl = document.getElementById('switch');

console.log(switchEl);

console.log(formEl, planDetails);

// Update UI
function updateUI() {
  updateDetails();
}

// Update Details
function updateDetails() {
  planDetails.forEach((plan) => {
    if (switchEl.classList.contains('toggled')) {
      if (plan.classList.contains('monthly')) {
        plan.style.display = 'none';
      } else {
        plan.style.display = 'block';
      }
    } else {
      if (plan.classList.contains('monthly')) {
        plan.style.display = 'block';
      } else {
        plan.style.display = 'none';
      }
    }
  });
}

// Display selected plan
function displaySelectedPlan() {
  const selectedPlanObject = JSON.parse(localStorage.getItem('selectedPlan'));

  const { yearly, selectedPlan } = selectedPlanObject;

  const selected = document.getElementById(selectedPlan);
  selected.setAttribute('checked', true);
  console.log(selected);
}

// Add Eventlistener
function init() {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedPlan = document.querySelector('input[type="radio"]:checked');
    console.log(selectedPlan);

    let yearly = false;

    if (switchEl.classList.contains('toggled')) {
      yearly = true;
    } else {
      yearly = false;
    }

    const selectedPlanObject = {
      selectedPlan: selectedPlan.id,
      yearly: yearly,
    };

    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlanObject));

    window.location.href = 'add-on.html';
  });

  switchEl.addEventListener('click', () => {
    switchEl.classList.toggle('toggled');

    updateUI();
  });

  displaySelectedPlan();
}

init();
