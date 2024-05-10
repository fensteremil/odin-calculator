// Basic Operations

let num1;
let num2;
let operator;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    } else {
        showWarning(false, "Please select an operator.");
    }
}

// HTML Variables

let displayValue = "";
const display = document.querySelector("#display");
const warningPara = document.querySelector("#warning");
const btnClear = document.querySelector("button.clear");
const btnEquals = document.querySelector("button.equals");
const btnsNumber = [...document.querySelectorAll("button.number")];
const btnsOperator = [...document.querySelectorAll("button.operator")];

// Event Listeners

btnClear.addEventListener("click", () => {
    displayValue = "";
    updateDisplay();
}, false);

btnEquals.addEventListener("click", () => { equalsPressed(); }, false);

for (let index = 0; index < btnsNumber.length; index++) {
    btnsNumber[index].addEventListener("click", (e) => {
        displayValue += String(btnsNumber[index].textContent);
        updateDisplay();
    }, false);
}

for (let index = 0; index < btnsOperator.length; index++) {
    btnsOperator[index].addEventListener("click", (e) => {
        displayValue += String(btnsOperator[index].textContent);
        updateDisplay();
    }, false);
}

// Assisting Functions

function updateDisplay() {
    display.textContent = displayValue;
}

function equalsPressed() {

    // try {
    let [num1, operator, num2] = displayValue.split(/([+\-\*/])+/g);
// }
// catch (error) {
//     alert(error);
// }
displayValue = operate(operator, +num1, +num2);
updateDisplay();
}

function showWarning(remove = false, text = "") {
    warningPara.classList.toggle("hidden", remove);
    warningPara.textContent = text;
}

// number or operator or clear or . input
// display update
// DONE

// equals input
// success or error
// do have at least 3 components
// do not divide by zero
// else show warning