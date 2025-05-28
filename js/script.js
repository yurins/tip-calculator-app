// script.js

const billInput = document.querySelector('.bill_input');
const personInput = document.querySelector('.person_input');
const tipButtons = document.querySelectorAll('.tip-button');
const customInput = document.querySelector('.customInput');
const tipResult = document.getElementById('tipResult');
const totalResult = document.getElementById('totalResult');
const resetButton = document.querySelector('.reset');
const errorMessage = document.querySelector('.error-message');


// calculation
function calculateTip(tipPercent) {
  const bill = parseFloat(billInput.value);
  const people = parseInt(personInput.value);

  if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
    errorMessage.style.display = 'block'; // エラーメッセージ表示
    tipResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
    return;
  } else {
    errorMessage.style.display = 'none'; // エラーメッセージ非表示
  }

  const tipAmount = (bill * (tipPercent / 100)) / people;
  const totalAmount = (bill / people) + tipAmount;

  tipResult.textContent = `$${tipAmount.toFixed(2)}`;
  totalResult.textContent = `$${totalAmount.toFixed(2)}`;
}

// tip button
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tipPercent = parseFloat(button.getAttribute('data-tip'));
    customInput.value = '';
    calculateTip(tipPercent);
  });
});

personInput.addEventListener('input', () => {
  const tip = parseFloat(customInput.value) || 0;
  calculateTip(tip);
});


// custom tip
customInput.addEventListener('input', () => {
  const customTip = parseFloat(customInput.value);
  if (!isNaN(customTip)) {
    calculateTip(customTip);
  }
});

// reset button
resetButton.addEventListener('click', () => {
  billInput.value = '';
  personInput.value = '';
  customInput.value = '';
  tipResult.textContent = '$0.00';
  totalResult.textContent = '$0.00';
});
