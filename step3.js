const formEl = document.getElementById('form');

// Display selected add ons from storage
function displayFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem('addOns'));

  console.log(items);
  items.forEach((item) => {
    const selected = document.getElementById(item);

    selected.setAttribute('checked', true);
  });
}

// Add Eventlistener
function init() {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedAddOns = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const addOns = Array.from(selectedAddOns).map((item) => {
      return (item = item.id);
    });

    localStorage.setItem('addOns', JSON.stringify(addOns));
    window.location.href = 'summary.html';
  });

  displayFromLocalStorage();
}

init();
