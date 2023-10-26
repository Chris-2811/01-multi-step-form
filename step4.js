const formEl = document.getElementById('form');
const selectedPlanEl = document.getElementById('selected-plan');
const durationEl = document.getElementById('duration');

let price = 0;
let totalPriceAddOns = 0;
let yearlyPrice = 0;
let monthlyPrice = 0;

function updateUI() {
  const addOns = JSON.parse(localStorage.getItem('addOns'));
  const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'));

  addPlanToDOM(selectedPlan);
  addToDOM(addOns, selectedPlan);
}

// Add to DOM
function addToDOM(addOns, selectedPlan) {
  addOns.forEach((addOn) => {
    if (addOn === 'online-services') {
      price = selectedPlan.yearly ? 10 : 1;
    } else if (addOn === 'larger-storage' || addOn === 'customizable-profile') {
      price = selectedPlan.yearly ? 20 : 2;
    }

    addOn = addOn.charAt(0).toUpperCase() + addOn.slice(1);

    const div = document.createElement('div');
    div.classList.add('selectedService');

    div.innerHTML = `
    <div class="selected-service">
    <div class="service" >${addOn}</div>
    <p class="service-price" >+$${price}/${
      selectedPlan.yearly ? 'yr' : 'mo'
    }</p>
    </div>
    `;

    document.getElementById('summary-bottom').appendChild(div);
    totalPriceAddOns += price;
  });

  const totalPriceContainer = document.getElementById('total-price-container');

  totalPriceContainer.innerHTML = `
      <p>Total(${selectedPlan.yearly ? 'per year' : 'per month'})</p>
      <div id="total-price" class="total-price">+${
        selectedPlan.yearly
          ? totalPriceAddOns + yearlyPrice
          : totalPriceAddOns + monthlyPrice
      }/${selectedPlan.yearly ? 'yr' : 'mo'}</div>
  `;
}

// Add selected Plan to DOM
function addPlanToDOM(plan) {
  if (plan.selectedPlan === 'arcade') {
    yearlyPrice = 90;
    monthlyPrice = 9;
  } else if (plan.selectedPlan === 'advanced') {
    yearlyPrice = 120;
    monthlyPrice = 12;
  } else {
    yearlyPrice = 150;
    monthlyPrice = 15;
  }

  document.getElementById('summary-top').innerHTML = `
  <div>
    <div class="selected-plan" id="selected-plan">
    Arcade <span id="duration">${plan.yearly ? '(Yearly)' : '(Monthly)'}</span>
    </div>
    <a href="/plan.html">Change</a>
  </div>
  <p id="total-price-plan" class="total-price-plan">$${
    plan.yearly ? yearlyPrice : monthlyPrice
  }/${plan.yearly ? 'yr' : 'mo'}</p>
  `;
}

// Add Eventlistener
function init() {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    localStorage.clear();
    window.location.href = 'confirmation.html';
  });

  updateUI();
}

init();
