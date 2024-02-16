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
        console.log("Please select an operator!");
        updateDisplay("...");
    }
}

let displayValue = "";
function updateDisplay(value = displayValue) {
    display.textContent = value;
}
const display = document.querySelector("#display");
const btnClear = document.querySelector("button.clear");
const btnEquals = document.querySelector("button.equals");
const btnsNumber = [...document.querySelectorAll("button.number")];
const btnsOperator = [...document.querySelectorAll("button.operator")];

btnClear.addEventListener("click", () => {
    displayValue = "";
    updateDisplay("...");
}, false);
btnEquals.addEventListener("click", () => {
    let [num1, operator, num2] = displayValue.split(/([+\-\*/])+/g);
    displayValue = operate(operator, +num1, +num2);
    updateDisplay();
}, false);
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